const cloudinary = require("./cloudinary");
const User = require("../../models/users");
const Song = require("../../models/Songs");
const iconv = require("iconv-lite");
const jsmediatags = require("jsmediatags");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

module.exports.getSpecifySong = async (req, res) => {
  const SongId = req.query.SongId;
  try {
    const song = await Song.findById({ _id: SongId });
    console.log(song);
    if (!song) {
      res.status(404).send("Can't find that song}");
    } else {
      res.status(200).send(song);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.getUploadedSongs = async (req, res) => {
  const { Author_Id } = req.body;
  try {
    Song.find({ AuthorID: Author_Id }).then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(200).send(error.message);
  }
};

module.exports.createSong = async (req, res) => {
  try {
    const mp3Path = req.file.path;
    console.log(mp3Path)
    const now = new Date();

    console.log(req.body.genre);

    // Adjust the font of the originalname
    const originalnameBuffer = Buffer.from(req.file.originalname, "binary");
    console.log(originalnameBuffer)
    const originalname = iconv.decode(originalnameBuffer, "utf-8");
    console.log(originalname)
    const thumbnailDir = "thumbnails";
    const thumbnailPath = path.join(thumbnailDir, `${originalname}.png`);

    // Create the thumbnail directory if it does not exist
    if (!fs.existsSync(thumbnailDir)) {
      fs.mkdirSync(thumbnailDir);
    }

    const mp3Upload = await cloudinary.uploader.upload(mp3Path, {
      resource_type: "video",
      format: "mp3",
      public_id: originalname,
    });

    jsmediatags.read(mp3Path, {
      onSuccess: function (tag) {
        if (tag && tag.tags.picture) {
          var tags = tag.tags;
          console.log(tag)
          const pictureData = Buffer.from(tags.picture.data);

          // Create a new Sharp object from the picture data
          const img = sharp(pictureData);

          // Resize the image and save it to a file
          img.resize(100, 100).toFile(thumbnailPath, (err, info) => {
            if (err) {
              console.error(err);
            } else {
              cloudinary.uploader.upload(thumbnailPath, (error, result) => {
                if (error) {
                  console.log(error);
                } else {
                  fs.unlink(thumbnailPath, (error, res) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("thumbnail unlinked");
                    }
                  });
                  const newSong = new Song({
                    titleSong: originalname,
                    Thumbnail: result.secure_url,
                    URL: mp3Upload.secure_url,
                    AuthorID: req.body.author || null,
                    GenreID: req.body.genre || null,
                    CreateAt: now,
                  });
                  newSong.save((err, savedSong) => {
                    if (err) {
                      console.log(err);
                      res.status(500).send(err.message);
                    } else {
                      res.status(200).send(savedSong);
                    }
                  });
                }
              });
            }
          });
        }
      },
      onError: function (error) {
        console.error("Error reading MP3 file:", error);
        res.status(500).send(error.message);
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports.SearchSong = async (req, res) => {
  const { SongName } = req.body;
  try {
    const SearchingSong = await Song.find({
      titleSong: { $regex: SongName, $options: "i" },
    });
    res.status(200).send(SearchingSong);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

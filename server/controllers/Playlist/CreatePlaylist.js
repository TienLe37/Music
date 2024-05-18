const Playlist = require("../../models/Playlist");

module.exports.CreatePlaylist = (req, res) => {
  const { Name, AuthorID, Thumbnail } = req.body;
  try {
    const NewPlaylist = new Playlist({
      Name: Name,
      AuthorID: AuthorID,
      Thumbnail: Thumbnail,
      CreatedAt: new Date(),
    });

    NewPlaylist.save((err, savedPlaylist) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).send(savedPlaylist);
      }
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

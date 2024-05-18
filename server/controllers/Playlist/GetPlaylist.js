const Playlist = require("../../models/Playlist");

module.exports.GetPlaylist = async (req, res) => {
  const { AuthorID } = req.body;
  try {
    await Playlist.find({ AuthorID: AuthorID }).then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

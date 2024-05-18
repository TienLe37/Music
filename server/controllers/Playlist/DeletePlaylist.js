const Playlist = require("../../models/Playlist");


module.exports.DeletePlaylist = async (req, res) => {
  const { PlaylistID } = req.body;

  try {
    const playlist = await Playlist.findById(PlaylistID);
    if (playlist) {
      await playlist.deleteOne(); // Use deleteOne() on the retrieved document
      res.status(200).send("Deleted playlist");
    } else {
      res.status(404).send("No playlist found");
    }
  } catch (err) {
    res.status(500).send("Error: " + err.message); // Concatenate the error message
  }
};


const Playlist = require("../../models/Playlist");
const PlaylistSong = require("../../models/PlaylistSong");
const Song = require("../../models/Songs");
module.exports.AddSongToPlaylist = async (req, res) => {
  const { PlaylistID, SongID } = req.body;
  
  try {
    const playlist = await Playlist.findById(PlaylistID);
    const song = await Song.findById(SongID);

    
    if (!playlist || !song) {
      return res.status(404).json({ message: "Playlist or Song not found" });
    }

    const existingPlaylistSong = await PlaylistSong.findOne({ SongID });
    if (existingPlaylistSong) {
      if (existingPlaylistSong.PlaylistID.toString() !== PlaylistID) {
        existingPlaylistSong.PlaylistID = PlaylistID;
        await existingPlaylistSong.save();
        return res.status(200).send("Changed PlaylistSong");
      } else {
        return res.status(200).json({ message: "Song is already in the playlist" });
      }
    }



    const playlistSong = new PlaylistSong({
      PlaylistID,
      SongID,
      CreatedAt: new Date(),
    });

    
    await playlistSong.save();

    return res
      .status(201)
      .json({ message: "Song added to playlist successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

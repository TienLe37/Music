const PlaylistSong = require("../../models/PlaylistSong");

module.exports.RemoveSongFromPlaylist = async(req, res) => {
    const {PlaylistID, SongID} = req.body;
    try {
        await PlaylistSong.findOneAndRemove({ PlaylistID: PlaylistID, SongID: SongID}).then((res) => {
            res.status(200).send('Delete Sucessfully');
        })
    } catch (error) {
        res.status(500).send(error);
    }
}
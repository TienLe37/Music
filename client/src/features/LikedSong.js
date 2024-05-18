import { createSlice } from "@reduxjs/toolkit";
import { setSongs } from "./musicSlice";


const initialState = {
    MusicLikedTrack: []
  };


const LikedSongSlice = createSlice({
  name: 'LikedSong',
  initialState,
  reducers: {
    fetchLikedTrack: (state, action) => {
      state.MusicLikedTrack = action.payload;
    },
    setLikedTrackToMusicTrack: (state, action) => {
      setSongs(state, {
        payload: state.MusicLikedTrack
      });
    }
  }
});

export const { fetchLikedTrack } = LikedSongSlice.actions;
export default LikedSongSlice.reducer;
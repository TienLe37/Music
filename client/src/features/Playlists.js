import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    Playlist: []
  };


const PlaylistSlice = createSlice({
  name: 'Playlists',
  initialState,
  reducers: {
    getPlaylist: (state, action) => {
      state.Playlist = action.payload;
    },
  }
});

export const { getPlaylist } = PlaylistSlice.actions;
export default PlaylistSlice.reducer;
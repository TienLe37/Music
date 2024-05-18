import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MusicTrack: [],
  CurrentTrackIndex: null,
  isPlaying: true,
  volume: 50,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.MusicTrack.push(action.payload)
      if (state.CurrentTrackIndex === null) {
        state.CurrentTrackIndex = 0;
      } else {
        state.CurrentTrackIndex += 1;
      }
      state.isPlaying = true;
    },
    PlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    NextSong: (state) => {
      state.CurrentTrackIndex += 1;
      state.isPlaying = true;
    },
    PreviousSong: (state) => {
      state.CurrentTrackIndex -= 1;
      state.isPlaying = true;
    },
  },
});

export const { setSongs, currentSong, PlayPause, NextSong, PreviousSong} =
  musicSlice.actions;
export default musicSlice.reducer;

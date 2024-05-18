import {configureStore} from "@reduxjs/toolkit"
import musicReducer from "./musicSlice"
import LikedSongReducer from "./LikedSong"
import PlaylistsReducer from './Playlists'
export const store = configureStore({
    reducer: {
        music: musicReducer,
        LikedSong: LikedSongReducer,
        Playlists: PlaylistsReducer
    }
})



import {configureStore} from '@reduxjs/toolkit';
import songsSlice from "./songs-slice";
import imagesSlice from "./images-slice";

const store = configureStore({
    reducer: {songs: songsSlice.reducer, images: imagesSlice.reducer}
})

export default store;

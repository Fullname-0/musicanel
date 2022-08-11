import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {picturesRequest} from "../api/pictures-api";

export const getPictures = createAsyncThunk(
    'get/pictures',
    async () => {
        return await picturesRequest();
    }
)

const imagesSlice = createSlice({
    name: 'images',
    initialState: {images: []},
    reducers: {},
    extraReducers: {
        [getPictures.pending]: (state) => {
            return state
        },
        [getPictures.fulfilled]: (state, { payload }) => {
            state.images = payload
        },
        [getPictures.rejected]: (state, action) => {
            state.errorMsg = action.error.message || ""
            return state
        },
    }
})
export const imagesActions = imagesSlice.actions;

export default imagesSlice;

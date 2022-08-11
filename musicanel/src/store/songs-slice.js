import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {songsRequest} from "../api/songs-api";

export const getSongs = createAsyncThunk(
    'get/songs',
    async () => {
        return await songsRequest();
    }
)

const songsSlice = createSlice({
    name: 'songs',
    initialState: {songs: []},
    reducers: {},
    extraReducers: {
        [getSongs.pending]: (state) => {
            return state
        },
        [getSongs.fulfilled]: (state, { payload }) => {
            state.songs = payload
        },
        [getSongs.rejected]: (state, action) => {
            state.errorMsg = action.error.message || ""
            return state
        },
    }
})
export const songsActions = songsSlice.actions;

export default songsSlice;

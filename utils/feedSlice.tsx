import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../features/user/userSlice"

const initialState: UserData[] = [];

const feedSlice = createSlice({
    name: "Feed",
    initialState,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeFeed: (state) => []
    }
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
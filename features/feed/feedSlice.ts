import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../user/user.types";

const initialState: UserData[] = [];

const feedSlice = createSlice({
    name: "Feed",
    initialState,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeFeed: (state, action) => state.filter((user: UserData) => user._id !== action.payload)
    }
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
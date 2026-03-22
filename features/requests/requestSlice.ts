import {createSlice} from "@reduxjs/toolkit";
import type { RequestData } from "./request.types";

const requestSlice = createSlice({
    name: "Requests",
    initialState: [] as RequestData[],
    reducers: {
        addRequest : (_, action) => action.payload,
        clearRequest : (state, action) => {
            return state.filter(request => request._id !== action.payload._id);
        }
    }
});

export const {addRequest, clearRequest} = requestSlice.actions;
export default requestSlice.reducer;
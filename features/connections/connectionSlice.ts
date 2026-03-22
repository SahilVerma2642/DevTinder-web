import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connections",
    initialState: [],
    reducers: {
        addConnections: (_, action) => action.payload,
        removeConnections: () => []
    }
});

export const {addConnections, removeConnections} = connectionSlice.actions;
export default connectionSlice.reducer;
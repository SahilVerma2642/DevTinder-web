import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../features/user/userSlice"
export interface UserState {
    status: boolean;
    data: UserData | null
}

const initialState: UserState = {
    status: false,
    data: null
}

export const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserData>) => {
            state.status = true;
            state.data = action.payload;
        },
        removeUser: (state) => {
            state.status = false;
            state.data = null;
        }
    }
});

//action creators are generated for each reducer function
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
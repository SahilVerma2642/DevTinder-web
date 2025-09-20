import { createSlice } from "@reduxjs/toolkit";

//create interface for the state
export interface UserState {
    _id: string;
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    photoUrl: string;
    about: string;
    skills: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const initialState: UserState | null = null;

export const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            return null;
        }
    }
});

//action creators are generated for each reducer function
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
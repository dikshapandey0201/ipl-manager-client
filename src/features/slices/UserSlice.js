import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    authenticated: false,
    user: null,
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.authenticated = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.authenticated = false;
        },
    },
});
export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;



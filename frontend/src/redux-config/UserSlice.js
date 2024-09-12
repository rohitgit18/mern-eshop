import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "UserSlice",
    initialState:{
        token: null,
        user: null,
        isLoggedIn: false
    },
    reducers:{
        saveUser: (state,action)=>{
            console.log(action.payload);
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isLoggedIn = true;
        },
        signOutUser: (state,action)=>{
            state.token = null;
            state.user = null;
            state.isLoggedIn = false;
        }
    }
});
export const {saveUser, signOutUser} = slice.actions;
export default slice.reducer;


import { createSlice } from "@reduxjs/toolkit";
const tokenFromStorage = typeof window !== "undefined" ? localStorage.getItem("token") : null;
const userFromStorage = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;


const authSlice=createSlice({
    name:'auth',
    initialState:{
        token:tokenFromStorage,
        user:userFromStorage
    },

    reducers:{
        setCredentials:(state,action)=>{
            state.token=action.payload.token,
            state.user=action.payload.user

             if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
        },

        logout:(state)=>{
            state.token=null,
            state.user=null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
})


export const {setCredentials,logout}=authSlice.actions
export default authSlice.reducer
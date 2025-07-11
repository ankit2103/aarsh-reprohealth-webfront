import { createSlice } from "@reduxjs/toolkit";

import {
  getTokenLocal,
  getUserLocal,
  getUserOrderLocal,
  getUserAppointmentLocal,
  setTokenLocal,
  setUserLocal,
  setUserOrderLocal,
  setUserAppointmentLocal
} from "../../utils/localstorage.util";

const initialState = {
  v_user_info: getUserLocal(),
  x_auth_token: getTokenLocal(),
  x_user_order_detail: getUserOrderLocal(),
  x_user_appointment_detail:{}
};

//internally using immer lib (can create mutable state)
export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      setUserLocal(action.payload);
      // console.log("action.payload:", typeof(action.payload),action.payload)
      state.v_user_info = action.payload;
    },
    updateToken: (state, action) => {
      setTokenLocal(action.payload);
      state.x_auth_token = action.payload;
    },
    updateAllUser: (state, action) => {
      state.User = action.payload;
    },
    
    resetUser: (state, action) => {
      state.User = [];

    },
    logoutUser: (state) => {
      state.v_user_info = null; // Clear user info
      state.x_auth_token = null; // Clear auth token
      state.x_user_order_detail = null;
      state.User = []; // Reset user list
      state.x_user_appointment_detail=null;
    },
    updateUserOrder:(state, action)=>{
      setUserOrderLocal(action.payload);
      // console.log("updateUserOrder action.payload:", action.payload)
      state.x_user_order_detail = action.payload;
    },
    userAppointmentOrderDetail:(state,action)=>{
      // console.log("userAppointmentOrderDetail:",action.payload);
      // setUserAppointmentLocal(action.payload);
      state.x_user_appointment_detail = action.payload;
      console.log("appointment action.payload:",action.payload)
    },
  
  },
  
});

// this is for dispatch
export const { updateUser, updateToken, updateAllUser,resetUser, logoutUser, updateUserOrder, userAppointmentOrderDetail } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;
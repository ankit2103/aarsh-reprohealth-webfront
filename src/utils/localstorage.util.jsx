import Cookies from "js-cookie";
import { decryptData } from "./encryptdecrypt";
// import { useState } from "react";
// const [isLoggedIn, setIsLoggedIn] = useState(false);

export const getTokenLocal = () => {
  return Cookies.get("x_auth_token")??null;
};


export const getUserLocal = () => {
  const user = Cookies.get("x_ufo");

  // check if user exists and is valid JSON
  if (!user || user === "undefined" || user === "null") {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Invalid user cookie:", error);
    return null;
  }
};
export const getUserOrderLocal = () => {
  const user = Cookies.get("x_user_order_detail");

  // check if user exists and is valid JSON
  if (!user || user === "undefined" || user === "null") {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Invalid user cookie:", error);
    return null;
  }
};
export const getUserAppointmentLocal=()=>{
  const appointment = Cookies.get("x_userappointment_detail");
  // console.log("appointment Data to get from cookies------------------",appointment)
} 

export const setTokenLocal = (token) => {
  // to fix token="null" set sometime on logout so change token set using json.stringify
  // Cookies.set("x_auth_token", JSON.parse(token), { expires: 30 });
  // insted of below line to set token
  Cookies.set("x_auth_token", token, { expires: 30 });
};

export const setUserLocal = (user) => {
  // console.log("set user local:", user);
  Cookies.set("x_ufo", JSON.stringify(user), { expires: 30 });
};
export const setUserOrderLocal = (user) => {
  // console.log("set user local setUserOrderLocal localutil:", user);
  Cookies.set("x_user_order_detail", JSON.stringify(user), { expires: 30 });
};

export const setUserAppointmentLocal=(PatientDetail)=>{
  Cookies.set("x_user_appointment_detail",JSON.stringify(PatientDetail))
} 

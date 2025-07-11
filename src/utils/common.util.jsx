import Cookies from "js-cookie";
import {
  logoutUser,
  updateToken,
  updateUser,
} from "../redux/slice/user.slice";

export const logout = (dispatch) => {
  // router,
  Cookies.remove("x_ufo");
  Cookies.remove("x_auth_token");
  Cookies.remove("x_user_order_detail");
  dispatch(updateUser(null));
  dispatch(updateToken(null));
  dispatch(logoutUser(null));
  // if (router) return router.push("/");
};


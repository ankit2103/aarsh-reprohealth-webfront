import ApiRoutes from "../../config/endpoint.config"; // Import the API Routes
import HttpClient from "../index.api";
import { decryptData, encryptData } from "../../utils/encryptdecrypt";
import { toast } from "react-toastify";
import { getTokenLocal } from "../../utils/localstorage.util";
import { Api } from "@mui/icons-material";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

class Auth extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${getTokenLocal()  || ""}`;
      config.headers["authKey"] = process.env.NEXT_PUBLIC_API_AUTH_KEY;
      config.headers["Content-Type"] = "text/plain";

      return config;
    });
  };

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      async (response) => {
        let data;
        if (response) {
          data = await decryptData(response); // Decrypt response body
          if (data.status == "success") {
          } else if (data.status == "fail") {
            console.log("Auth api data.message:",data.message)
            // toast.error(data.message);
          }
        } else {
          // toast.error(response.message);
          console.log("No encryptedData found in response.");
        }
        return data;
      },
      (error) => Promise.reject(error)
    );
  };

  // **Auth APIs with Encrypted Requests**
  login = async (reqBody) => {
    return this.instance({
      method: ApiRoutes.Auth.Login.Method,
      url: ApiRoutes.Auth.Login.Endpoint,
      data: encryptData(reqBody),
    });
  };

  //  Use `ApiRoutes` for Signup
  signup = async (reqBody) => {
    // console.log("Signup ReqBody: ", reqBody);
    return this.instance({
      method: ApiRoutes.Auth.Signup.Method,
      url: ApiRoutes.Auth.Signup.Endpoint,
      data: encryptData(reqBody),
    });
  };

  // api for verify-Otp
  verifyOtp = async (reqBody) => {
    return this.instance({
      method: ApiRoutes.Auth.VerifyOtp.Method,
      url: ApiRoutes.Auth.VerifyOtp.Endpoint,
      data: encryptData(reqBody),
    });
  };
  verifyOtpToResetPassword = async (reqBody) => {
    return this.instance({
      method: ApiRoutes.Auth.verifyOtpToRestetPassword.Method,
      url: ApiRoutes.Auth.verifyOtpToRestetPassword.Endpoint,
      data: encryptData(reqBody),
    });
  };
  createNewPassword = async (reqBody)=>{
    return this.instance({
      method: ApiRoutes.Auth.CreateNewPassword.Method,
      url:ApiRoutes.Auth.CreateNewPassword.Endpoint,
      data:encryptData(reqBody)
    })
  }
  resendOtp = async (reqBody) => {
    
    return this.instance({
      method: ApiRoutes.Auth.ResendOtp.Method,
      url: ApiRoutes.Auth.ResendOtp.Endpoint,
      data: encryptData(reqBody),
    });
  };
  createPassword = async (reqBody) => {
    return this.instance({
      method: ApiRoutes.Auth.CreatePassword.Method,
      url: ApiRoutes.Auth.CreatePassword.Endpoint,
      data: encryptData(reqBody),
    });
  };
  forgetPassword = async (reqbody)=>{
    return this.instance({
      method: ApiRoutes.Auth.ForgetPassword.Method,
      url:ApiRoutes.Auth.ForgetPassword.Endpoint,
      data: encryptData(reqbody)
    })
  }
  resetPassword = async (reqBody) => {
    return this.instance({
      method: ApiRoutes.Auth.ResetPassword.Method,
      url: ApiRoutes.Auth.ResetPassword.Endpoint,
      data: encryptData(reqBody),
    });
  };
  
  
}

//  Export an instance of the `Auth` class
const authInstance = new Auth();
export default authInstance;

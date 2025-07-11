import ApiRoutes from "../../config/endpoint.config"; // Import the API Routes
import HttpClient from "../index.api";
import { decryptData, encryptData } from "../../utils/encryptdecrypt";
import { toast } from "react-toastify";
import { getTokenLocal } from "../../utils/localstorage.util";


const baseURL = process.env.NEXT_PUBLIC_API_URL;

class File extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${getTokenLocal()}`;
      config.headers["authKey"] = process.env.NEXT_PUBLIC_API_AUTH_KEY;
      config.headers["Content-Type"] = 'multipart/form-data';

      return config;
    });
  };

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      async (response) => {
        let data;
        if (response) {
          data = await decryptData(response); // Decrypt response body
          // console.log("response of data:", data);
          if (data.status == "success")
             {
            // toast.success(data.message);
          } else if (data.status == "fail") {
            toast.error(data.message);
          }
        } else {
          toast.error(response.message);
          // console.log("No encryptedData found in response.");
        }
        return data;
      },
      (error) => Promise.reject(error)
    );
  };

  updateProfilePic = async(reqBody) =>{
    return this.instance({
      method:ApiRoutes.User.updateProfilePic.Method,
      url:ApiRoutes.User.updateProfilePic.Endpoint,
      data:reqBody,
      
    })
  }
  
  
  
}

//  Export an instance of the `Auth` class
const fileInstance = new File();
export default fileInstance;

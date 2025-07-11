import ApiRoutes from "../../config/endpoint.config"; //  Import the API Routes
import HttpClient from "../index.api";
import { decryptData, encryptData } from "../../utils/encryptdecrypt";
import { getTokenLocal } from "../../utils/localstorage.util";
const baseURL = process.env.NEXT_PUBLIC_API_URL;


class Lab extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  
  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${getTokenLocal() || ""}`;
      config.headers["authKey"] = process.env.NEXT_PUBLIC_API_AUTH_KEY;
      config.headers["Content-Type"] = "text/plain";

   

      return config;
    });
  };

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      (response) => {
        // console.log("Raw Response Data:", response);

        if (response) {
          //   console.log("Encrypted Data:", response);
          response = decryptData(response);
        } else {
          console.error("No encryptedData found in response.");
        }

        return response;
      },
      (error) => Promise.reject(error)
    );
  };

  //  Use `ApiRoutes` for Signup
  GetAllLab = async (reqBody) => {
    // reqBody
    return this.instance({
      method: ApiRoutes.Lab.GetAllLab.Method,
      url: ApiRoutes.Lab.GetAllLab.Endpoint,
      data:encryptData(reqBody)
    });
  };
  GetLabByLab = async(reqBody)=>{
    // console.log("lab id: ", reqBody);
    return this.instance({
      method: ApiRoutes.Lab.GetLabById.Method,
      url: ApiRoutes.Lab.GetLabById.Endpoint,
      data: encryptData(reqBody)
    })
  }
  GetLabSlots = async(reqBody)=>{
    return this.instance({

      method: ApiRoutes.Lab.GetLabSlot.Method,
      url:ApiRoutes.Lab.GetLabSlot.Endpoint,
      data: encryptData(reqBody)
    })
  }
  GetAllAvailableLabTest = async()=>{
    return this.instance({
      method: ApiRoutes.Lab.GetAllLabTest.Method,
      url:ApiRoutes.Lab.GetAllLabTest.Endpoint

    })
  }
}

//  Export an instance of the `Doctor` class
const labInstance = new Lab();
export default labInstance;

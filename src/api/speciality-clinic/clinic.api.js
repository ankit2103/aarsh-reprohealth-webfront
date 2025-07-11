import ApiRoutes from "../../config/endpoint.config"; //  Import the API Routes
import HttpClient from "../index.api";
import { decryptData, encryptData } from "../../utils/encryptdecrypt";
import { getTokenLocal } from "../../utils/localstorage.util";
const baseURL = process.env.NEXT_PUBLIC_API_URL;


class SpecialityClinic extends HttpClient {
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

      // if (config.data) {
      //   config.data = { encryptedData: encryptData(config.data) }; 
        
      // }

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
  GetAllClinic = async (reqBody) => {
    return this.instance({
      method: ApiRoutes.Clinic.GetAllClinic.Method,
      url: ApiRoutes.Clinic.GetAllClinic.Endpoint,
      data:encryptData(reqBody)
    });
  };
  GetClinicById = async(reqBody)=>{
    // console.log("api Clinic id: ", reqBody);
    return this.instance({
      method: ApiRoutes.Clinic.GetClinicById.Method,
      url: ApiRoutes.Clinic.GetClinicById.Endpoint,
      data: encryptData(reqBody)
    })
  };
  GetClinicServices = async()=>{
    return this.instance({
      method:ApiRoutes.Clinic.GetAllClinicServices.Method,
      url:ApiRoutes.Clinic.GetAllClinicServices.Endpoint
    })
  }

}
//  Export an instance of the `Doctor` class
const clinicInstance = new SpecialityClinic();
export default clinicInstance;

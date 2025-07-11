import ApiRoutes from "../../config/endpoint.config"; //  Import the API Routes
import HttpClient from "../index.api";
import { decryptData, encryptData } from "../../utils/encryptdecrypt";
import { getTokenLocal } from "../../utils/localstorage.util";
const baseURL = process.env.NEXT_PUBLIC_API_URL;


class Doctor extends HttpClient {
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
  GetAllDoctor = async (reqBody) => {
    console.log("GetAllDoctor reqBody:",reqBody);
    return this.instance({
      method: ApiRoutes.Doctor.GetAllDoctor.Method,
      url: ApiRoutes.Doctor.GetAllDoctor.Endpoint,
      data:encryptData(reqBody)
    });
  };
  GetDoctorById = async(reqBody)=>{
    // console.log("doctor id: ", reqBody);
    return this.instance({
      method: ApiRoutes.Doctor.GetDoctorById.Method,
      url: ApiRoutes.Doctor.GetDoctorById.Endpoint,
      data: encryptData(reqBody)
    })
  }

GetDoctorSlotsBySelectedClinic = async(reqBody)=>{

  // console.log("GetDoctorSlotsBySelectedClinic Api ", reqBody)
  return this.instance({
    method:ApiRoutes.Doctor.GetDoctorAvailableSlotsBySelectedClinic.Method,
    url:ApiRoutes.Doctor.GetDoctorAvailableSlotsBySelectedClinic.Endpoint,
    data: encryptData(reqBody)
  })
}
GetDoctorOnlineBookingSlots = async(reqBody)=>{

  // console.log("GetDoctorSlotsBySelectedClinic Api ", reqBody)
  return this.instance({
    method:ApiRoutes.Doctor.GetDoctorOnlineConsultationSlots.Method,
    url:ApiRoutes.Doctor.GetDoctorOnlineConsultationSlots.Endpoint,
    data: encryptData(reqBody)
  })
}
}
// GetDoctorOnlineConsultationSlots
//  Export an instance of the `Doctor` class
const doctorInstance = new Doctor();
export default doctorInstance;

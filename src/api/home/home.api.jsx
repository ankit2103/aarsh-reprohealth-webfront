import ApiRoutes from "../../config/endpoint.config"; //  Import the API Routes
import HttpClient from "../index.api";
import { decryptData, encryptData } from "../../utils/encryptdecrypt";
import { getTokenLocal } from "../../utils/localstorage.util";


const baseURL= process.env.NEXT_PUBLIC_API_URL;

class Home extends HttpClient {
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

 

  GetConsultTopDoctor = async () => {
    return this.instance({
      method: ApiRoutes.Home.GetConsultTopDoctor.Method,
      url: ApiRoutes.Home.GetConsultTopDoctor.Endpoint, 
    });
  };
}

const homeInstance = new Home();
export default homeInstance;
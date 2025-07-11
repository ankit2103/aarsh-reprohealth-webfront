import ApiRoutes from "../../config/endpoint.config"; // Import the API Routes
import HttpClient from "../index.api";
import { decryptData, encryptData } from "../../utils/encryptdecrypt";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

class Role extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers["authKey"] = process.env.NEXT_PUBLIC_API_AUTH_KEY;
      config.headers["Content-Type"] = "text/plain";
      return config;
    });
  };

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      (response) => {
        if (response) {
          response = decryptData(response); // Decrypt response body
        }
        return response;
      },
      (error) => Promise.reject(error)
    );
  };

  getAllRoleConfig = ApiRoutes.Role.getAllRole;
  getAllRole = async () => {
    return this.instance({
      method: this.getAllRoleConfig.Method,
      url: this.getAllRoleConfig.Endpoint,
    });
  };
}
export default Role;

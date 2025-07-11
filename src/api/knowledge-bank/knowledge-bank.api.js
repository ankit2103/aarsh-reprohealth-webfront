import ApiRoutes from "../../config/endpoint.config"; //  Import the API Routes
import HttpClient from "../index.api";
import { decryptData, encryptData } from "../../utils/encryptdecrypt";
const baseURL= process.env.NEXT_PUBLIC_API_URL;
class KnowledgeBank extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${
        localStorage.getItem("token") || ""
      }`;
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

  AllKnowledgeBank = async () => {
    return this.instance({
      method: ApiRoutes.KnowledgeBank.AllKnowledgeBank.Method,
      url: ApiRoutes.KnowledgeBank.AllKnowledgeBank.Endpoint,
    });
  }; 
  AllKnowledgeBankCategory = async () => {
    return this.instance({
      method: ApiRoutes.KnowledgeBank.AllKnowledgeBankCategory.Method,
      url: ApiRoutes.KnowledgeBank.AllKnowledgeBankCategory.Endpoint,
    });
  };
  KnowledgeBankById = async (reqBody) => {
    // console.log("KB Request Body: ", reqBody);
    return this.instance({
      method: ApiRoutes.KnowledgeBank.KnowledgeBankById.Method,
      url: ApiRoutes.KnowledgeBank.KnowledgeBankById.Endpoint,
      data: encryptData(reqBody),
    });
  };
  KnowledgeBankBySelectedCategory = async(reqBody)=>{
    return this.instance({
      method:ApiRoutes.KnowledgeBank.KnowledgeBankByFilterCategory.Method,
      url:ApiRoutes.KnowledgeBank.KnowledgeBankByFilterCategory.Endpoint,
      data:encryptData(reqBody)
    })
  }
}

const knowledgeBankInstance = new KnowledgeBank();
export default knowledgeBankInstance;

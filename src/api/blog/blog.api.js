import ApiRoutes from "../../config/endpoint.config"; //  Import the API Routes
import HttpClient from "../index.api";
import { decryptData, encryptData } from "../../utils/encryptdecrypt";
import { getTokenLocal } from "../../utils/localstorage.util";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

class Blog extends HttpClient {
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

  AllBlogs = async () => {
    return this.instance({
      method: ApiRoutes.Blog.AllBlogs.Method,
      url: ApiRoutes.Blog.AllBlogs.Endpoint,
    });
  };
  AllBlogCategory = async () => {
    return this.instance({
      method: ApiRoutes.Blog.AllBlogCategory.Method,
      url: ApiRoutes.Blog.AllBlogCategory.Endpoint,
    });
  };
  BlogById = async (reqBody) => {
    return this.instance({
      method: ApiRoutes.Blog.BlogById.Method,
      url: ApiRoutes.Blog.BlogById.Endpoint,
      data: encryptData(reqBody),
    });
  };
  RelatedBlogById = async (reqBody)=>{
    return this.instance({
      method:ApiRoutes.Blog.GetRelatedBlogById.Method,
      url:ApiRoutes.Blog.GetRelatedBlogById.Endpoint,
      data: encryptData(reqBody)
    })
  }
  OurStory = async () => {
    return this.instance({
      method: ApiRoutes.Blog.GetStory.Method,
      url: ApiRoutes.Blog.GetStory.Endpoint,
    });
  };
  StoryById = async (reqBody) => {
    return this.instance({
      method: ApiRoutes.Blog.GetStoryById.Method,
      url: ApiRoutes.Blog.GetStoryById.Endpoint,
      data: encryptData(reqBody),
    });
  };
}

const blogInstance = new Blog();
export default blogInstance;

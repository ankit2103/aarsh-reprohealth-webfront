import ApiRoutes from "../../config/endpoint.config"; // Import the API Routes
import HttpClient from "../index.api";
import { decryptData, encryptData } from "../../utils/encryptdecrypt";
import { toast } from "react-toastify";
import { getTokenLocal } from "../../utils/localstorage.util";
import { RedoTwoTone } from "@mui/icons-material";


const baseURL = process.env.NEXT_PUBLIC_API_URL;

class User extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${getTokenLocal()}`;
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
          // console.log("response of data:", data);
          if (data.status == "success")
             {
            // toast.success(data.message);
          } else if (data.status == "fail") {
            toast.error(data.message);
          }
        } else {
          // toast.error(response.message);
          console.log("No encryptedData found in response.",response.message);
        }
        return data;
      },
      (error) => Promise.reject(error)
    );
  };

  // updateProfilePic = async(reqBody) =>{
  //   return this.instance({
  //     method:ApiRoutes.User.updateProfilePic.Method,
  //     url:ApiRoutes.User.updateProfilePic.Endpoint,
  //     data:reqBody,
  //     headers: {
  //       'Content-Type':'multipart/form-data'
  //     },
  //   })
  // }
  GetAllPackage = async () => {
    
    return this.instance({
      method: ApiRoutes.User.Package.Method,
      url: ApiRoutes.User.Package.Endpoint
      
    });
  };
  
  updateUserProfile = async(reqBody) =>{
    return this.instance({
      method: ApiRoutes.User.updateUserProfile.Method,
      url: ApiRoutes.User.updateUserProfile.Endpoint,
      data: encryptData(reqBody)
    })
  }
  contactUs = (reqBody) =>{
    return this.instance({
      method: ApiRoutes.User.contactUs.Method,
      url: ApiRoutes.User.contactUs.Endpoint,
      data: encryptData(reqBody)
    })
  }
  partnershipSponsors = (reqBody)=>{
    return this.instance({
      method:ApiRoutes.User.partnershipSponsors.Method,
      url:ApiRoutes.User.partnershipSponsors.Endpoint,
      data:encryptData(reqBody)
    })
  }
  corporateEvents = (reqBody) =>{
    return this.instance({
      method:ApiRoutes.User.corporateEvents.Method,
      url:ApiRoutes.User.corporateEvents.Endpoint,
      data:encryptData(reqBody)
    })

  }
  // -----------------------------------------profile setting api --------------------------------------------
  getUserBookedAppointment = (reqBody) =>{
    
    return this.instance({
      method:ApiRoutes.User.getUserAllAppointment.Method,
      url:ApiRoutes.User.getUserAllAppointment.Endpoint,
      data: encryptData(reqBody)
    })
  }
  getUserBookedSpecificAppointmentDetail = (reqBody) =>{
    return this.instance({
      method:ApiRoutes.User.getUserSpecificAppointmentDetail.Method,
      url:ApiRoutes.User.getUserSpecificAppointmentDetail.Endpoint,
      data:encryptData(reqBody)
    })
  }
  getUserAllBookedLabTest = () =>{
    return this.instance({
      method:ApiRoutes.User.getUserLabTestRecords.Method,
      url:ApiRoutes.User.getUserLabTestRecords.Endpoint
    })
  }
  getUserAllBookedMedicalRecords = () =>{
    return this.instance({
      method:ApiRoutes.User.getUserMedicalRecords.Method,
      url:ApiRoutes.User.getUserMedicalRecords.Endpoint
    })
  }
  getUserAppointmentCancle = (reqBody)=>{
    return this.instance({
      method:ApiRoutes.User.getCancleAppointment.Method,
      url:ApiRoutes.User.getCancleAppointment.Endpoint,
      data:encryptData(reqBody)
    })
  }
  purchaseUserSuscriptionPlan = (reqBody)=>{
    
  return this.instance({
      method:ApiRoutes.User.purchaseSuscriptionPlan.Method,
      url:ApiRoutes.User.purchaseSuscriptionPlan.Endpoint,
      data:encryptData(reqBody)
    })
  }
  
  



  userReview = (reqBody)=>{
    return this.instance({
      method:ApiRoutes.User.getUserReview.Method,
      url:ApiRoutes.User.getUserReview.Endpoint,
      data:encryptData(reqBody)
    })
  }
  userApplyCoupon = (reqBody)=>{
    return this.instance({
      method:ApiRoutes.User.userApplyCoupon.Method,
      url:ApiRoutes.User.userApplyCoupon.Endpoint,
      data:encryptData(reqBody)
    })
  }
  userRegisterViaPhone =(reqBody)=>{
    return this.instance({
      method:ApiRoutes.User.registerUSerViaOtp.Method,
      url:ApiRoutes.User.registerUSerViaOtp.Endpoint,
      data:encryptData(reqBody)
    })
  }
  userRegisterPhoneOTPSend=(reqBody)=>{
     return this.instance({
      method:ApiRoutes.User.registerUSerOtpSend.Method,
      url:ApiRoutes.User.registerUSerOtpSend.Endpoint,
      data:encryptData(reqBody)
    })
  }
  resendOtpToRegisterGuestUSer=(reqBody)=>{
     return this.instance({
      method:ApiRoutes.User.resendOtpToRegisterGuestUSer.Method,
      url:ApiRoutes.User.resendOtpToRegisterGuestUSer.Endpoint,
      data:encryptData(reqBody)
    })
  }
  
   userNewsLetterForKnowlwdgeBank=(reqBody)=>{
     return this.instance({
      method:ApiRoutes.User.newsLetterForKnowlwdgeBank.Method,
      url:ApiRoutes.User.newsLetterForKnowlwdgeBank.Endpoint,
      data:encryptData(reqBody)
    })
  }
  // newLetterForKnowlwdgeBank


  
}

//  Export an instance of the `Auth` class
const userInstance = new User();
export default userInstance;

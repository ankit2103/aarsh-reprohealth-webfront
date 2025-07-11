import { Package } from "lucide-react";
import HttpClient from "../api/index.api";
import KnowledgeBank from "../app/knowledge-bank/page";

export const HttpMethod = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Patch: "PATCH",
  Delete: "DELETE",
};

const ApiRoutes = {
  Auth: {
    Login: {
      Endpoint: "/auth/login",
      Method: HttpMethod.Post,
    },
    Signup: {
      Endpoint: "/auth/sign-Up",
      Method: HttpMethod.Post,
    },

    VerifyOtp: {
      Endpoint: "/auth/verify-otp",
      Method: HttpMethod.Post,
    },
    ResendOtp: {
      Endpoint: "/auth/resend-otp",
      Method: HttpMethod.Post,
    },
    CreatePassword: {
      Endpoint: "/auth/create-password",
      Method: HttpMethod.Post,
    },
    ForgetPassword: {
      Endpoint: "/auth/forget-password",
      Method: HttpMethod.Post,
    },
    verifyOtpToRestetPassword: {
      Endpoint: "/auth/verify-forget-otp",
      Method: HttpMethod.Post,
    },
    CreateNewPassword: {
      Endpoint: "/auth/create-forget-password",
      Method: HttpMethod.Post,
    },
    ResetPassword: {
      Endpoint: "/auth/reset-password",
      Method: HttpMethod.Post,
    },
  },
  Role: {
    getAllRole: {
      Endpoint: "/role/get-all-role",
      Method: HttpMethod.Post,
    },
  },
  Doctor: {
    GetAllDoctor: {
      Endpoint: "/doctor/get-All-doctors",
      Method: HttpMethod.Post,
    },
    GetDoctorById: {
      Endpoint: "/doctor/get-doctor",
      Method: HttpMethod.Post,
    },
    GetDoctorAvailableSlotsBySelectedClinic: {
      Endpoint: "/doctor/get-clinic-half-month-slot",
      Method: HttpMethod.Post,
    },
    GetDoctorOnlineConsultationSlots: {
      Endpoint: "/doctor/get-doctor-online-unbooked-slot",
      Method: HttpMethod.Post,
    },
  },
  Lab: {
    GetAllLab: {
      Endpoint: "lab/get-all-labs",
      Method: HttpMethod.Post,
    },
    GetLabById: {
      Endpoint: "/lab/get-lab",
      Method: HttpMethod.Post,
    },
    GetLabSlot: {
      Endpoint: "/lab/get-lab-slot",
      Method: HttpMethod.Post,
    },
    GetAllLabTest: {
      // Endpoint: "/clinic-service/get-all-user-clinic-service",
      Endpoint: "/test/get-all-user-lab-test",
      Method: HttpMethod.Post,
    },
  },
  Clinic: {
    GetAllClinic: {
      Endpoint: "/clinic/get-all-clinics",
      Method: HttpMethod.Post,
    },
    GetClinicById: {
      Endpoint: "/clinic/get-clinic",
      Method: HttpMethod.Post,
    },
    GetAllClinicServices: {
      Endpoint: "/clinic-service/get-all-user-clinic-service",
      Method: HttpMethod.Post,
    },
  },
  User: {
    updateProfilePic: {
      Endpoint: "/image/upload-images",
      Method: HttpMethod.Post,
    },
    updateUserProfile: {
      Endpoint: "/user/update-profile",
      Method: HttpMethod.Post,
    },

    contactUs: {
      Endpoint: "/user/contact-us",
      Method: HttpMethod.Post,
    },
    partnershipSponsors: {
      Endpoint: "/user/create-partner-and-sponsors",
      Method: HttpMethod.Post,
    },
    corporateEvents: {
      Endpoint: "/user/create-corporate-event",
      Method: HttpMethod.Post,
    },
    Package: {
      Endpoint: "/package/get-all-web-package",
      Method: HttpMethod.Post,
    },
    getUserReview: {
      Endpoint: "/user/add-review",
      Method: HttpMethod.Post,
    },
    getUserOrderSummary: {
      Endpoint: "/user/appointment-summary",
      Method: HttpMethod.Post,
    },
    userApplyCoupon:{
      Endpoint:"/user/apply-coupon",
      Method: HttpMethod.Post,
    },
    // profile sidebar
    getUserAllAppointment: {
      Endpoint: "/user/get-all-user-appointments",
      Method: HttpMethod.Post,
    },
    getUserSpecificAppointmentDetail: {
      Endpoint: "/user/get-user-appointment-Detail",
      Method: HttpMethod.Post,
    },
    getUserLabTestRecords: {
      Endpoint: "/user/get-lab-records",
      Method: HttpMethod.Post,
    },
    getUserMedicalRecords: {
      Endpoint: "/user/get-medical-history",
      Method: HttpMethod.Post,
    },
    getCancleAppointment: {
      Endpoint: "/user/cancel-appointment",
      Method: HttpMethod.Post,
    },
    purchaseSuscriptionPlan: {
      Endpoint: "/user/take-subscription-plan-user",
      Method: HttpMethod.Post,
    },
    registerUSerViaOtp:{
      Endpoint:"/auth/send-guest-otp",
      Method:HttpMethod.Post,
    },
    registerUSerOtpSend:{
      Endpoint:"/auth/verify-guest-otp",
      Method:HttpMethod.Post,
    },
    resendOtpToRegisterGuestUSer:{
      Endpoint:"/auth/resend-guest-otp",
      Method:HttpMethod.Post
    },
    newsLetterForKnowlwdgeBank:{
      Endpoint:"/user/news-letter",
      Method:HttpMethod.Post
    },
    

  },
  Blog: {
    AllBlogs: {
      Endpoint: "/blog/get-all-user-blog",
      Method: HttpMethod.Post,
    },
    AllBlogCategory: {
      Endpoint: "/blog-category/get-all-user-blog-category",
      Method: HttpMethod.Post,
    },
    BlogById: {
      Endpoint: "/blog/get-user-blog",
      Method: HttpMethod.Post,
    },
    GetRelatedBlogById:{
      Endpoint: "/blog/get-all-user-related-blog",
      Method: HttpMethod.Post,
    },
    GetStory: {
      Endpoint: "/blog/get-all-user-our-story",
      Method: HttpMethod.Post,
    },
    GetStoryById: {
      Endpoint: "/blog/get-user-our-story",
      Method: HttpMethod.Post,
    },
  },
  KnowledgeBank: {
    AllKnowledgeBank: {
      // Endpoint: "/knowledge-bank/get-all-user-knowledge-bank",
      Endpoint:"/KnowledgeBank/get-all-user-knowledge-bank",
      Method: HttpMethod.Post,
    },
    AllKnowledgeBankCategory: {
      Endpoint: "/knowledge-bank-category/get-all-knowledge-bank-category",
      Method: HttpMethod.Post,
    },
    KnowledgeBankById: {
      Endpoint: "/knowledgeBank/get-user-knowledge-bank",
      Method: HttpMethod.Post,
      
    },
    KnowledgeBankByFilterCategory: {
      Endpoint: "/Knowledge-bank/get-user-same-category-knowledge-bank-list",
      Method: HttpMethod.Post,
    },
  },

  Home: {
    GetConsultTopDoctor: {
      Endpoint: "/service/get-All-service",
      Method: HttpMethod.Post,
    },
  },
};

export default ApiRoutes;

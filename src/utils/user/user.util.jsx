import orderSummaryInstance from "../../api/order-summary/order.summary.api";
import userInstance from "../../api/user/user.api";

export const contactUser = async (dataToSend) => {
  try {
    const reqBody = dataToSend;
    const response = await userInstance.contactUs(reqBody);
    return response;
  } catch (error) {
    console.log("Error in Contact user");
    return;
  }
};

export const FetchPackages = async () => {
  try {
    const response = await userInstance.GetAllPackage();
    // console.log("API Response FetchPackages:", response);
    return response; // Make sure this matches the API response structure
  } catch (error) {
    console.log("Error FetchPackages:", error);
    return [];
  }
};


export const PartnershipAndSponsors = async (dataToSend) => {
  try {
    const reqBody = dataToSend;
    const response = await userInstance.partnershipSponsors(reqBody);
    return response;
  } catch (error) {
    console.log("Error in PartnershipSponsors ", error);
    return;
  }
};

export const corporateEvents = async (dataToSend) => {
  try {
    const reqBody = dataToSend;
    const response = await userInstance.corporateEvents(reqBody);
    return response;
  } catch (error) {
    console.log("Error in corporateEvents ", error);
    return;
  }
};

export const getUserFeedback = async (dataToSend) => {
  try {
    const reqBody = dataToSend;
    // console.log("getUserFeedback:",reqBody)
    const response = await userInstance.userReview(reqBody);
    return response;
  } catch (error) {
    console.log("Error in getUserFeedback ", error);
    return;
  }
};

export const getUserAllBookedAppointment = async (dataToSend) => {
  try {
    const reqBody = dataToSend;
    console.log(reqBody);
    const response = await userInstance.getUserBookedAppointment(reqBody);
    return response;
  } catch (error) {
    console.log("Error in getUserAllBookedAppointment ", error);
    return;
  }
};
export const getSpecificBookedAppointmentDetail = async ({ appointmentId }) => {
  try {
    console.log("getSpecificBookedAppointmentDetail", appointmentId);
    const reqBody = { appointmentId };
    const response = await userInstance.getUserBookedSpecificAppointmentDetail(
      reqBody
    );
    return response;
  } catch (error) {
    console.log("Error in getSpecificBookedAppointmentDetail ", error);
    return;
  }
};
export const getUserAllBookedLabTestRecords = async () => {
  try {
    const response = await userInstance.getUserAllBookedLabTest();
    return response;
  } catch (error) {
    console.log("Error in getUserAllBookedLabTestRecords ", error);
    return;
  }
};
export const getUserAllBookedMedicalRecords = async () => {
  try {
    const response = await userInstance.getUserAllBookedMedicalRecords();
    return response;
  } catch (error) {
    console.log("Error in getUserAllBookedMedicalRecords ", error);
    return;
  }
};
export const getUSerAppliedCoupon = async(dataToSend)=>{
  console.log("body data------------------", dataToSend)
  try{
    const reqBody= dataToSend;
    const response = await userInstance.userApplyCoupon(reqBody);
      console.log("getUserAppliedCoupon----------------", response);
    return response;
  }
  catch (error) {
    console.log("Error in getUserAppliedCoupon ", error);
    return;
  }
}

export const getUserAppointmentOrderSummary = async (dataToSend) => {
  console.log("body data------------------", dataToSend)
  try {
    const reqBody = dataToSend;
    const response = await orderSummaryInstance.GetOrderSummary(reqBody);
    // console.log("getUserOrderSummary----------------", response);
    return response;
  } catch (error) {
    console.log("Error in getUserOrderSummary ", error);
    return;
  }
};
export const getUserAppointmentCancle = async (dataToSend) => {
  try {
    const reqBody = { appointmentId: dataToSend };
    // console.log("reqBody-----------------------------", reqBody)
    const response = await userInstance.getUserAppointmentCancle(reqBody);
    // console.log("getCancleAppointment----------------", response);
    return response;
  } catch (error) {
    console.log("Error in getUserAppointmentCancle ", error);
    return;
  }
};
export const getUserPurchasedSuscriptionPlan = async (dataToSend) => {
  try {
    // purchaseUserSuscriptionPlan
    const reqBody = dataToSend;
    // console.log("reqBody-----------------------------", reqBody);
    const response = await userInstance.purchaseUserSuscriptionPlan(reqBody);
    // console.log("purchaseUserSuscriptionPlan----------------", response);

    return response;
  } catch (error) {
    console.log("Error in purchaseUserSuscriptionPlan ", error);
    return;
  }
};
export const userRegisterViaPhone = async (dataToSend) => {
  try {
    // purchaseUserSuscriptionPlan
    const reqBody = dataToSend;
    console.log("reqBody-----------------------------", reqBody);
    const response = await userInstance.userRegisterViaPhone(reqBody);
    // console.log("purchaseUserSuscriptionPlan----------------", response);

    return response;
  } catch (error) {
    console.log("Error in purchaseUserSuscriptionPlan ", error);
    return;
  }
};
export const userRegisterViaPhoneOTPSend = async (dataToSend) => {
  try {
    // purchaseUserSuscriptionPlan
    const reqBody = dataToSend;
    console.log("reqBody-----------------------------", reqBody);
    const response = await userInstance.userRegisterPhoneOTPSend(reqBody);
    // console.log("purchaseUserSuscriptionPlan----------------", response);

    return response;
  } catch (error) {
    console.log("Error in purchaseUserSuscriptionPlan ", error);
    return;
  }
};
// resendOtpToRegisterGuestUSer
export const registerGuestUSerResendOtp = async (dataToSend) => {
  try {
    // purchaseUserSuscriptionPlan
    const reqBody = dataToSend;
    console.log("reqBody-----------------------------", reqBody);
    const response = await userInstance.resendOtpToRegisterGuestUSer(reqBody);
    console.log("registerGuestUSerResendOtp----------------", response);

    return response;
  } catch (error) {
    console.log("Error in purchaseUserSuscriptionPlan ", error);
    return;
  }
};
export const userNewsLetterSubscribeForKnowlwdgeBank = async (dataToSend) => {
  try {
    // purchaseUserSuscriptionPlan
    const reqBody = dataToSend;
    console.log("reqBody-----------------------------", reqBody);
    const response = await userInstance.userNewsLetterForKnowlwdgeBank(reqBody);
    // console.log("purchaseUserSuscriptionPlan----------------", response);

    return response;
  } catch (error) {
    console.log("Error in purchaseUserSuscriptionPlan ", error);
    return;
  }
};


// userRegisterViaOtp
// const { packageId, variantId, coupon = "" } = req.body;

// getOrderSummary

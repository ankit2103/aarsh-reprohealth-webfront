import { useState } from "react";
import axios from "axios";
import { decryptData, encryptData } from "../utils/encryptdecrypt";
import {
  getTokenLocal,
  setUserAppointmentLocal,
  userAppointmentOrderDetail
} from "../utils/localstorage.util";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useRazorpay = () => {
  const navigate = useRouter("");
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();
  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (appointmentData) => {
    // console.log(
    //   "appointmentData--------------",
    //   appointmentData,
    //   appointmentData?.type
    // );

    setIsProcessing(true);
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    try {
      let decryptedUserData;
      if (appointmentData?.type !== "userSubscripition") {
        const encryptedData = await encryptData(appointmentData);
        console.log("appointmentData?.type:", encryptedData);
        if (!encryptedData) {
          alert("Encryption failed!");
          return;
        }

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}user/book-appointment`,
          encryptedData,
          {
            headers: {
              "Content-Type": "text/plain",
              authKey:`${process.env.NEXT_PUBLIC_API_AUTH_KEY}`,
                // "U2FsdGVkX1+s7iaDHGXrA60BI1SaFnHfZI3Y6z89TSLi0wrWZ79rNOrHYJP89gns",
              Authorization: `Bearer ${getTokenLocal() || ""}`,
            },
          }
        );
        console.log("response.data-----------------",response.data)

        decryptedUserData = await decryptData(response.data);
        // Set cookie with appointment summary
        setUserAppointmentLocal(decryptedUserData.data);
        console.log("response-------------", decryptedUserData);
        
        // dispatch(userAppointmentOrderDetail(decryptedUserData.data));
        console.log("response dispatch-------------", decryptedUserData);
      }

      if (!decryptedUserData) {
        // alert("Decryption failed!");
        return;
      }
      console.log(decryptedUserData);

      const {
        orderId,
        amount,
        currency,
        userDetail,
        entityDetail,
      } = decryptedUserData.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        order_id: orderId,
        name: entityDetail?.name || "Clinic Appointment", //type
        description: "Doctor Consultation",
        prefill: {
          name: userDetail?.name,
          email: userDetail?.email,
          contact: userDetail?.contact,
        },

        handler: function (decryptedUserData) {
          // navigate.push('/profile/my-booked-appointments')
          navigate.push("/thanks-for-booking");
        },
      };

      // console.log("Opening Razorpay:", options);
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong!");
    } finally {
      setIsProcessing(false);
    }
  };
  const handleSubscriptionPayment = async (appointmentData) => {
    // console.log("appointmentData--------------", appointmentData);

    setIsProcessing(true);
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    try {
      let decryptedUserData = appointmentData?.data;
      if (!decryptedUserData) {
        // alert("Decryption failed!");
        return;
      }

      const { orderId, amount, currency, userDetail } = decryptedUserData;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        order_id: orderId,
        name: "Clinic Appointment", //type
        description: "Doctor Consultation",
        prefill: {
          name: userDetail?.name,
          email: userDetail?.email,
          contact: userDetail?.contact,
        },

        handler: function (decryptedUserData) {
          // navigate.push('/profile/my-booked-appointments')
          navigate.push("/thanks-for-booking");
        },
      };

      console.log("Opening Razorpay:", options);
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      // alert("Something went wrong!");
      toast("Something went wrong!")
    } finally {
      setIsProcessing(false);
    }
  };

  return { handlePayment, handleSubscriptionPayment, isProcessing };
};

export default useRazorpay;

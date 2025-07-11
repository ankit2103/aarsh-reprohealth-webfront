import React from "react";
import ComingSoon from "../../components/coming-soon/page";
import BookAppointmentForm from "../../components/get-in-touch/book-appointment-form/page";


const ContactUs = () => {

  const style={
    // background: "linear-gradient(191.42deg, rgba(255, 181, 208, 0.3) -16.56%, #FFFFFF 91.6%)",
    // background: "linear-gradient(197deg, rgba(46, 209, 226, 0.12) -19.27%, rgba(255, 255, 255, 0.6) 74.19%)",
    background: "linear-gradient(218.13deg, rgba(46, 209, 226, 0.12) 9.16%, rgba(255, 197, 220, 0.6) 78%)"
  }
  return (
    <div className="w-full  ">
      
      <div className="pt-20 pb-20 w-full  " style={style}>
        {/*  bg-gradient-to-b from-cyan-50 via-slate-50 to-white-50 */}
        <div className="flex flex-col justify-center items-center text-center">
        <BookAppointmentForm/>
        </div>
       
      </div>
    </div>
    //   <div className="w-full pt-16 flex justify-center items-center h-screen text-center bg-gradient-to-b from-slate-50 via-slate-50 to-cyan-100"></div>
  );
};

export default ContactUs;

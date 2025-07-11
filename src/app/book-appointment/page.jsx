import BookAppointmentForm from "../../components/get-in-touch/book-appointment-form/page";


const BookAppointment = () => {
  return (
    <div className="w-full  pt-10 flex flex-col justify-center items-center text-center">
      {/* Book-Appointment-Form Section */}
    <div className="pt-20 w-full  bg-gradient-to-b from-cyan-50 via-slate-50 to-white-50 ">
    <BookAppointmentForm/>
    </div>
     
    </div>
  );
};

export default BookAppointment;

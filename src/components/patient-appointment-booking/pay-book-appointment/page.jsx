import useRazorpay from "../hooks/useRazorpay"; // Update path if needed

const PayToBookAppointmentButton = ({ formData }) => {
  const { handlePayment, isProcessing } = useRazorpay();

  const handleClick = () => {
    const appointmentData = prepareAppointmentData(formData);
    handlePayment(appointmentData);
  };

  return (
    <button
      className="w-full my-4 bg-[var(--lightBlue)] text-white text-xl px-2 py-2 sm:px-3  sm:py-3  md:text-xl md:px-4 md:py-3 lg:px-4 lg:py-3 rounded-lg"
      onClick={handleClick}
      disabled={isProcessing}
    >
      {isProcessing ? "Processing..." : "Book Appointment"}
    </button>
  );
};

export default PayToBookAppointmentButton;

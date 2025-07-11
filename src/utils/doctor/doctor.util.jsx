import doctorInstance from "../../api/doctor/doctor.api"; // Adjust the import path as needed

export const fetchDoctors = async ({lat, lng,language, search }) => {
  try {
    // {lat, lng }
      const reqBody = { lat, lng ,language, search};
      console.log("ReqBody for doctor:", reqBody);
      // reqBody
      // const reqBody = "title";

      const response = await doctorInstance.GetAllDoctor(reqBody);
      // console.log("API Response:", response);
      return response; // Make sure this matches the API response structure
  } catch (error) {
      console.log("Error fetching doctors:", error);
      return [];
  }
};

export const fetchDoctorById = async ({ doctorId }) => {
  try {
      const reqBody = { doctorId }
      console.log("utils id:", reqBody);
      const response = await doctorInstance.GetDoctorById(reqBody);
      // console.log("API Response fetchDoctorById:", response);
      return response; // Make sure this matches the API response structure
  } catch (error) {
      console.log("Error fetchDoctorById:", error);
      return [];
  }
};
export const fetchDoctorSlotsBySelectedClinic = async ({doctorId, doctorClinicId}) => {

  try {  
      const reqBody = { doctorId, doctorClinicId };
      // console.log("utils id before:", reqBody);
      const response = await doctorInstance.GetDoctorSlotsBySelectedClinic(reqBody);
      // console.log("API Response fetchDoctorById:", response);
      return response; // Make sure this matches the API response structure
  } catch (error) {
      console.log("Error fetchDoctorById:", error);
      return [];
  }
};
export const fetchDoctorOnlineConsultationSlots = async ({doctorId}) => {
    if (!doctorId) {
    console.error("fetchDoctorOnlineConsultationSlots: doctorId is required");
    return [];
  }
  try {  
      const reqBody = {doctorId};
      console.log("utils id before: fetchDoctorOnlineConsultationSlots", reqBody);
      const response = await doctorInstance.GetDoctorOnlineBookingSlots(reqBody);
      console.log("API Response fetchDoctorOnlineConsultationSlots utils:", response);
      return response; // Make sure this matches the API response structure
  } catch (error) {
      console.log("Error fetchDoctorById:", error);
      return [];
  }
};



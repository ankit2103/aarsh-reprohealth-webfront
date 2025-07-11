import clinicInstance from "../../api/speciality-clinic/clinic.api";

export const fetchClinics = async ({ lat, lng, search }) => {
  try {
    // {lat, lng }
    const reqBody = { lat, lng, search };
    console.log("fetchClinics ReqBody:", reqBody);
    // reqBody
    // const reqBody = "title";
    const response = await clinicInstance.GetAllClinic(reqBody);
    // console.log("API Response:", response);
    return response; // Make sure this matches the API response structure
  } catch (error) {
    console.log("Error fetching Clinic:", error);
    return [];
  }
};

export const fetchClinicById = async (clinicId) => {
  try {
    const reqBody = { clinicId };
    // console.log("utils id:", reqBody);
    const response = await clinicInstance.GetClinicById(reqBody);
    // console.log("API Response fetchDoctorById:", response);
    return response; // Make sure this matches the API response structure
  } catch (error) {
    console.log("Error fetchClinicById:", error);
    return [];
  }
};

export const fetchAllClinicServices = async () => {
  try {
    const response = await clinicInstance.GetClinicServices();
    console.log("API Response fetchAllClinicServices:", response)
    return response;
  } catch (error) {
    console.log("Error fetchAllClinicServices:", error);
    return [];
  }
};

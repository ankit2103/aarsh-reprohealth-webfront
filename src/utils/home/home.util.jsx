import Home from "../../api/home/home.api"



export const fetchConsultTopDoctor = async () => {
  try {
      const response = await Home.GetConsultTopDoctor()
      console.log("GET Home API Response:", response);
      return response; // Make sure this matches the API response structure
  } catch (error) {
      // console.log("Error fetching doctors:", error);
      return [];
  }
};
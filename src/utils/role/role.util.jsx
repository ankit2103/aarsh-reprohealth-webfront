import Role from "../../api/role/role.api";



export const fetchAllRole = async () => {
  try {
      const response = await Role.getallrole()
      // console.log("GET ALL API Response:", response);
      return response; // Make sure this matches the API response structure
  } catch (error) {
      // console.log("Error fetching doctors:", error);
      return [];
  }
};
 

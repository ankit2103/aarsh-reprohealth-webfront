import labInstance from "../../api/lab/lab.api";

export const fetchLabs = async ({lat, lng, search }) => { //reqBody
    try {
          const reqBody = { lat, lng, search };
          console.log("reqBody lab------------", reqBody)
        // const response = await labInstance.GetAllLab(reqBody); as of now comment
        const response = await labInstance.GetAllLab(reqBody);
        // console.log("API Response:", response);
        return response; // Make sure this matches the API response structure
    } catch (error) {
        console.log("Error fetching labs:", error);
        return [];
    }
  };

  export const fetchLabById = async({labId})=>{
    try{
        const reqBody= {labId}
        const response = labInstance.GetLabByLab(reqBody);
        return response;
    }
    catch(error){
        console.log("Error fetching lab by id:",error);
        return ;
    }
  }

  export const fetchLabSlot = async({labId})=>{
    try{
        const reqBody= {labId}
        // console.log("fetchLabSlot reqBody----------------------", reqBody)
        const response = labInstance.GetLabSlots(reqBody);
        // console.log("fetchLabSlot response----------------------", response)
        return response;
    }
    catch(error){
        console.log("Error lab slot fetching by id:",error);
        return ;
    }
  }
  export const fetchLabTest  =async()=>{
    try{
      const response = await labInstance.GetAllAvailableLabTest();
      console.log("API Response GetAllAvailableLabTest:", response);
      return response;
    }
    catch(error){
      console.log("Error fetching labs:", error);
        return [];
    }
    
  }
//   GetLabSlots
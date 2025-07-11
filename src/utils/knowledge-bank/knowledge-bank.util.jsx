import knowledgeBankInstance from "../../api/knowledge-bank/knowledge-bank.api"; // Adjust the import path as needed

export const fetchKnowledgeBanks = async () => {
  try {
      const response = await knowledgeBankInstance.AllKnowledgeBank();
      // console.log("API Response AllBlog:", response);
      return response; // Make sure this matches the API response structure
  } catch (error) {
      console.log("Error fetching Knowledge Banks:", error);
      return [];
  }
};
export const fetchKnowledgeBankCategory = async () => {
  try {
      const response = await knowledgeBankInstance.AllKnowledgeBankCategory();
      // console.log("API Response AllBlog:", response);
      return response; // Make sure this matches the API response structure
  } catch (error) {
      console.log("Error fetching knowledge bank categories:", error);
      return [];
  }
};
export const fetchKnowledgeBankById = async (id) => {
    // console.log("API Response blog by id:", id);
  try {
      const response = await knowledgeBankInstance.KnowledgeBankById({kbId: id});
      // console.log("API Response BlogById:", response);
      return response; // Make sure this matches the API response structure
  } catch (error) {
      console.error("Error fetching the Knowledge Bank:", error);
      return null;
  }
};
export const fetchKnowledgeBankByCategory = async (id)=>{
    // console.log("API Response category by id:", id, {kbcId:id});
  try{
    const response = await knowledgeBankInstance.KnowledgeBankBySelectedCategory({kbcId:id});
    console.log("API Response knowledge bank By category:", response);
    return response;
  }
  catch(error){
    return null;
  }
}
 


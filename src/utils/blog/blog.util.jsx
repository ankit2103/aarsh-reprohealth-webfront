import blogInstance from "../../api/blog/blog.api"; // Adjust the import path as needed

export const fetchBlogs = async () => {
  try {
      const response = await blogInstance.AllBlogs();
    //   console.log("API Response AllBlog:", response);
      return response; // Make sure this matches the API response structure
  } catch (error) {
      console.log("Error fetching blogs:", error);
      return [];
  }
};
export const fetchBlogCategory = async () => {
  try {
      const response = await blogInstance.AllBlogCategory();
    //   console.log("API Response AllBlog:", response);
      return response; // Make sure this matches the API response structure
  } catch (error) {
      console.log("Error fetching blog categories:", error);
      return [];
  }
};
export const fetchBlogById = async (id) => {
    // console.log("API Response blog by id:", id);
  try {
      const response = await blogInstance.BlogById({blogId: id});
    //   console.log("API Response BlogById:", response);
      return response; // Make sure this matches the API response structure
  } catch (error) {
      console.log("Error fetching the blog:", error);
      return null;
  }
};
export const fetchRelatedBlogById = async (reqBody)=>{
  try{
    const response = await blogInstance.RelatedBlogById(reqBody);
    return response;
  }
  catch(error){
    console.log("Error fetching the related blog by id:", error);
      return null; 
  }
}

export const fetchOurStory = async ()=>{
  try{
    const response = await blogInstance.OurStory();
    return response;
  }
  catch(error){
    console.log("Error fetching the story:", error);
    return null;
  }
}
 export const fetchStoryById = async (id) => {
    // console.log("API Response blog by id:", id);
  try {
      const response = await blogInstance.StoryById({blogId: id});
    //   console.log("API Response BlogById:", response);
      return response; // Make sure this matches the API response structure
  } catch (error) {
      console.log("Error fetching the blog:", error);
      return null;
  }
};


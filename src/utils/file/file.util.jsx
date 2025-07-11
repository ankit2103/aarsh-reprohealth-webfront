import fileInstance from "../../api/file/file.api";

export const updateProfileImage  = async(formData) =>{
    
    try {
        const reqBody = formData;
        console.log("Profile User pic utils data:", reqBody);
        const response = await fileInstance.updateProfilePic(reqBody);
        console.log("API Response Profilepic User utils data:", response);
        return response; 
    } catch (error) {
        console.log("Error Profile User pic:", error);
        return [];
    }
}
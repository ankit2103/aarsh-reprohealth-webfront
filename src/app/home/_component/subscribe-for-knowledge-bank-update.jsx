import React, { useState } from "react";
import InputField from "../../../components/custom-mui-input/page";
import { MdOutlineMailOutline } from "react-icons/md";
import { userNewsLetterSubscribeForKnowlwdgeBank } from "../../../utils/user/user.util";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const SubscribeForKnowledgeBankUpdate = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
      if (!formData.email || formData.email.trim() === "") {
    toast.error("Please enter your email ID to subscribe.");
    return;
  }
  setLoading(true);
    try {
      
      console.log("formData-----------------", formData);
      const result = await userNewsLetterSubscribeForKnowlwdgeBank(formData);
      console.log("result------------", result);
      if(result.code==200){
        // setLoading(false);
        toast.success(result?.message);
        setFormData({emai:""});
      }
    } catch (error) {
      console.log("error in news letter:", error);
    }
    finally {
    setLoading(false);
  }
  };

  return (
    <div className="w-full mx-auto pb-10">
      <div className="main-container">
        <div className="container">
          <div className="w-full border bg-cover bg-[url(/assets/images/banners/knowledge-bank-home-img.png)]  bg-center py-10 flex flex-col justify-center items-center rounded-3xl text-center">
            <p className="text-[var(--pink)] text-lg">Get started now</p>
            {/* <h1>Never Miss a Health Update</h1> */}
            <h2 className="w-[80%] sm:w-[50%]  md:w-[70%] lg:w-[60%] text-lg md:text-3xl py-1 text-[var(--listText)]  ">
              Empowering you with care, clarity, and knowledge.
            </h2>
            <p className="text-[var(--greyP)] w-[80%]  sm:w-[50%] md:w-full">
              Subscribe to our Knowledge Bank and receive weekly expert tips,
            </p>
            <p className="text-[var(--greyP)] w-[80%]  sm:w-[50%]  md:w-full">
              health updates, and wellness insights—straight to your inbox.
            </p>
            <form
              onSubmit={handleSubmit}
              className=" w-full flex items-center justify-center mt-3 "
            >
              <div className="w-[80%] md:w-[40%] flex items-center justify-between  bg-[var(--White)] rounded-lg p-2">
                <span className="">
                  <MdOutlineMailOutline className="text-xl" color="gray" />
                </span>
                <input
                  type="email"
                  name="email"
                  // fullWidth
                  onChange={handleChange}
                  placeholder="Enter your email"
                  value={formData.email}
                  className="w-[80%] p-3 text-sm focus:outline-none focus:ring-0 focus:border-transparent"
                />
                <div className="">
                  <button type="submit" className="bg-[var(--lightBlue)] text-[var(--White)]  rounded-lg px-4 py-3 ">
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeForKnowledgeBankUpdate;

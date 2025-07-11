"use client";
import { useParams } from "next/navigation";
import { TiStar } from "react-icons/ti";
import { getUserFeedback } from "../../utils/user/user.util";
import { useEffect, useState } from "react";
import { BsPen } from "react-icons/bs";
import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { fetchClinicById } from "../../utils/speciality-clinic/clinic.util";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

export const formatToIST = (isoString) => {
  const date = new Date(isoString);

  const options = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short", // Use "2-digit" for 04 instead of "Mar"
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-IN", options).format(date);
};

const SpecialistClinicStoriesTab = ({ clinicInfo, setClinicInfo }) => {
  const [loading, setLoading] = useState(false);
  const { clinicId } = useParams();
  const [formData, setFormData] = useState({
    rating: 0,
    description: "",
    clinicId: clinicId || clinicInfo?._id,
  });
  const [isShareOpen, setIsShareOpen] = useState(false);
  const handleOpenReviewForm = async () => {
    setIsShareOpen(true);
  };
  const handleStarClick = (index) => {
    setFormData((prev) => ({
      ...prev,
      rating: index + 1,
    }));
  };
  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const { rating, description, clinicId } = formData;
    if (!description || !rating || clinicId <= 0) {
      if (!description) {
        toast("Comment is required.");
      } else if (!rating) {
        toast("Rating is required.");
      }
      return;
    }

    try {
      // console.log("object--------------------", formData);
      setLoading(true);
      const response = await getUserFeedback(formData);
      if (response?.status === 200) {
        console.log("response of add review of clinic:", response);

        try {
          await getClinicById();
          console.log("clinic details updated.");
        } catch (err) {
          console.error("Error while fetching clinic details:", err);
        }
      }
      setLoading(false);
      setIsShareOpen(false);
    } catch (error) {
      console.log("Error in post review api:", error);
    }
  };

  const getClinicById = async () => {
    try {
      const result = await fetchClinicById({ clinicId: clinicId });
      // console.log(
      //   "useEffect  in getClinicById------",
      //   result,
      //   result?.data?.[0]
      // );
      if (result?.code == 200) {
        setClinicInfo(result?.data?.[0]);
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getClinicById();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between">
        <h3 className=" text-[var(--listText)] capitalize ">
          {clinicInfo?.name}
        </h3>
        <button
          onClick={handleOpenReviewForm}
          className={`flex gap-1 items-center text-[var(--White)] bg-[var(--lightBlue)] text-center px-4 py-2  text-sm  rounded-md transition-all`}
        >
          <span>
            <BsPen />
          </span>
          {""} Share your story
        </button>
      </div>
      {isShareOpen && (
        <div className="flex flex-col gap-3 border rounded-lg px-4 py-2 mt-3">
          <p>Give your FeedBack</p>
          <div>
            <ul className="flex gap-1 cursor-pointer">
              {[...Array(5)].map((_, index) => (
                <li key={index} onClick={() => handleStarClick(index)}>
                  {index < formData.rating ? (
                    <MdOutlineStarPurple500 className="text-xl text-[var(--lightBlue)] transition" />
                  ) : (
                    <MdOutlineStarBorder className="text-xl text-gray-500 transition" />
                  )}
                </li>
              ))}
            </ul>
            {/* Textarea Input */}
            <textarea
              rows={4}
              className="my-3 w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--lightBlue)]"
              placeholder="Share the details of your own experience at this place"
              value={formData.description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="flex justify-end gap-1 ">
            <button
              onClick={() => setIsShareOpen(false)}
              className={`text-[var(--packageList)] bg-[var(--canleReview)] border  hover:text-[var(--greyP)] hover:border-[var(--greyP)] hover:bg-[var(--packageList)] text-center px-4 py-2  text-sm  rounded-full transition-all`}
            >
              Cancle
            </button>

            <button
              onClick={handleReviewSubmit}
              className={`text-[var(--White)] bg-[var(--lightBlue)] border hover:text-[var(--lightBlue)] hover:border-[var(--lightBlue)] hover:bg-[var(--White)] text-center px-4 py-2  text-sm  rounded-full transition-all`}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Add Review"
              )}
            </button>
          </div>
        </div>
      )}
      {/* name */}
      {/* {clinicInfo?.reviewsArray.length > 0 &&
          clinicInfo?.reviewsArray.map((item, index) => {
            return (
              <div>
                <h3 className="text-lg font-semibold">Patient Stories</h3>
                <p className="text-gray-700">
                  Success stories and patient experiences...
                </p>
                <ul>
                  <li>{item.userName}</li>
                  <li>{item.comment}</li>
                  <li>{item.rating}</li>
                  <li>{item.date}</li>
                </ul>
              </div>
            );
          })} */}
    </div>
  );
};

export default SpecialistClinicStoriesTab;

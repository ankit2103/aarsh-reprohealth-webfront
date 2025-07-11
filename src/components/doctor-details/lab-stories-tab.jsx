"use client";
import { useParams } from "next/navigation";
import { TiStar } from "react-icons/ti";
import { getUserFeedback } from "../../utils/user/user.util";
import { useEffect, useState } from "react";
import { BsPen } from "react-icons/bs";
import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { fetchLabById } from "../../utils/lab/lab.util";
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
const ReadMoreLess = ({ text, maxChars = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const shouldTruncate = text.length > maxChars;
  const displayText =
    isExpanded || !shouldTruncate ? text : `${text.slice(0, maxChars)}...`;

  return (
    <p className="text-sm py-2 text-[var(--listText)]">
      {displayText}
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[var(--lightBlue)] ml-1 underline text-xs"
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </p>
  );
};

const LabStoriesTab = ({ labData, setLabData }) => {
  const [loading, setLoading] = useState(false);
  const { labId } = useParams();
  const [formData, setFormData] = useState({
    rating: 0,
    description:
      "",
    labId: labId || labData?._id,
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
    const { rating, description, labId } = formData;
    if (!description || !rating || labId <= 0) {
      if (!description) {
        toast("Comment is required.");
      } else if (!rating) {
        toast("Rating is required.");
      }
      return;
    }
    try {
      setLoading(true);
      // console.log("object--------------------", formData);
      const response = await getUserFeedback(formData);
      if (response?.status === 200) {
        // console.log("response of add review:", response);
         try {
          await fetchDetailById();
          console.log("clinic details updated.");
        } catch (err) {
          console.error("Error while fetching clinic details:", err);
        }
      
      }
      setLoading(false);
      setIsShareOpen(false);
      // After successful submission, fetch latest doctor data
    } catch (error) {
      console.log("Error in post review api:", error);
    }
  };
  const fetchDetailById = async () => {
    try {
      const result = await fetchLabById({ labId: labId });
      if (result?.code === 200) {
        setLoading(false);
        // console.log(
        //   "result.data-------------------lab by id stories",
        //   result.data
        // );
        setLabData(result.data);
      }
    } catch (error) {
      console.log("Error in api response of Lab Detail:", error);
    }
  };
  useEffect(() => {
    fetchDetailById();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between">
        <h3 className=" text-[var(--listText)] capitalize ">{labData?.name}</h3>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        {labData?.reviewsArray.length > 0 &&
          labData?.reviewsArray.map((item, index) => {
            const [formattedDate, formattedTime] = formatToIST(item.date).split(
              ", "
            );
            return (
              <div
                key={item?._id}
                className="bg-[#FAFAF9] px-2 py-1 rounded-md"
              >
                <ul className=" px-3 py-2 rounded-lg text-[var(--listText)]">
                  <li className="flex">
                    {[...Array(5)].map((_, index) =>
                      index < item.rating ? (
                        <MdOutlineStarPurple500
                          key={index}
                          className="text-xl text-[var(--lightBlue)] transition"
                        />
                      ) : (
                        <MdOutlineStarBorder
                          key={index}
                          className="text-xl text-gray-400 transition"
                        />
                      )
                    )}
                  </li>
                  <li className="capitalize font-[600] text-[var(--black)] pt-2 ">
                    {item.userName}
                  </li>
                  <li className="text-sm py-2 text-[var(--listText)]">
                    {" "}
                    <ReadMoreLess text={item.comment} maxChars={120} />
                  </li>

                  <li className="flex justify-between">
                    <span> {formattedTime}</span>
                    <span>{formattedDate},</span>
                  </li>
                  {/* <li>{formattedTime}</li> */}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LabStoriesTab;

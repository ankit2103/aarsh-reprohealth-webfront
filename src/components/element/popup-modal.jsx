import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function ReferralModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative">
        {/* Cross Icon */}
        
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
          >
            <IoClose size={24} />
          </button>

          {/* Message */}
          <h2 className="text-xl font-semibold text-center text-gray-800 ">
            Doctor has referred you to this lab
          </h2>
     
      </div>
    </div>
  );
}

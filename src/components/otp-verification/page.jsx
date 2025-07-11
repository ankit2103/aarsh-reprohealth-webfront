import { useState, useRef , useEffect} from "react";

export const OTPInput = ({type="tel" ,name, value, onChange, label }) => {
  // console.log("value---------------------", value)
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (value) {
      setOtp(value.split("").concat(Array(6 - value.length).fill("")));
    }
  }, [value]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // Allow only numbers
    if (value.length > 1) return;

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    

    // Update parent form state
    onChange({ target: { name, value: newOtp.join("") } });

    // Move to next input if filled
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="mb-4  w-[100%] ">
      <label className="block mb-2  text-left">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="w-full flex gap-[0.5rem]  bg-grey-400 md:gap-2 justify-start sm:justify-start  md:justify-start md:items-center   ">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type={type}
            value={digit}
            maxLength={1}
            className="w-12 h-12 sm:w-12 sm:h-12  md:w-14 md:h-14  lg:w-16 lg:h-16 border-2 border-gray-300 text-center text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)]"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            // disabled
          />
        ))}
      </div>
      {/* {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>} */}
    </div>
  );
};

// Usage inside your form component


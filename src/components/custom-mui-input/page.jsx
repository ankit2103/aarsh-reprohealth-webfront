import {
  FormControl,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FaRegUser } from "react-icons/fa";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CustomInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon = '',
  sx = {},
  name,
  helperText,
  isRequired,
  showPassword,
  togglePasswordVisibility,
  showConfirmPassword,
  toggleConfirmPasswordVisibility,
  showNewPassword,
  toggleNewPasswordVisibility,
  showConfirmNewPassword,
  toggleConfirmNewPasswordVisibility,
   InputProps = {},
}) => {
  const { readOnly, ...otherInputProps } = InputProps;
  const isDOB = label === "DOB";
  const isPasswordField =
    name === "password" ||
    name === "confirmPassword" ||
    name === "newPassword" ||
    name === "confirmNewPassword";

  const visibilityToggle =
    name === "password"
      ? togglePasswordVisibility
      : name === "confirmPassword"
      ? toggleConfirmPasswordVisibility
      : name === "newPassword"
      ? toggleNewPasswordVisibility
      : name === "confirmNewPassword"
      ? toggleConfirmNewPasswordVisibility
      : null;

  const isVisible =
    name === "password"
      ? showPassword
      : name === "confirmPassword"
      ? showConfirmPassword
      : name === "newPassword"
      ? showNewPassword
      : name === "confirmNewPassword"
      ? showConfirmNewPassword
      : false;

  const commonInputStyles = {
    borderRadius: "10px",
    color: "var(--black) !important",
    "& .MuiOutlinedInput-root": { borderRadius: "10px" },
    "& fieldset": {
      borderColor: "var(--greyborder) !important",
      color: "var(--black) !important",
    },
    "&:hover fieldset": { borderColor: "var(--lightBlue)" },
    "&.Mui-focused fieldset": {
      borderColor: "var(--lightBlue) !important",
      borderWidth: "2px",
    },
    "& .MuiInputLabel-root": { color: "var(--greyP) !important" },
    "& .Mui-focused": { color: "var(--lightBlue) !important" },
    ...sx,
  };

  return (
    <>
      {isDOB ? (
        <LocalizationProvider dateAdapter={AdapterDayjs} className="w-full ">
          <div className="w-full mt-2">
            <label className="font-[500] whitespace-nowrap mt-2">
              {label}
              {isRequired && <span className="text-[var(--red)]"> *</span>}
            </label>

            <DatePicker
              className="mt-2 customlabel"
              value={value ? dayjs(value, "DD/MM/YYYY") : null}
              onChange={(newValue) => {
                if (newValue?.isValid?.()) {
                  onChange(name, newValue); // Pass field name and dayjs value
                }
              }}
              maxDate={dayjs()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    "& .MuiPickersOutlinedInput-root": {
                      borderRadius: "8px !important",
                    },
                    // Include your common styles if needed
                    // ...commonInputStyles,
                  },
                  error: Boolean(helperText),
                  helperText: helperText,
                },
              }}
            />
          </div>
        </LocalizationProvider>
      ) : (
        <div className="w-full mt-2">
          <label
            className="font-[500] whitespace-nowrap"
            style={{ whiteSpace: "nowrap !important" }}
          >
            {label}
            {isRequired && <span className="text-[var(--red)]"> *</span>}
          </label>
          <FormControl sx={{ width: "100%", mt: 1 }} variant="outlined">
            <OutlinedInput
              name={name}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              sx={commonInputStyles}
              readOnly={readOnly}
               {...otherInputProps} 
              startAdornment={
                icon && (
                  <InputAdornment position="start">
                    <div className="text-xl">{icon}</div>
                    {/* className={`${label==="Company Name"? "hidden" :"block"}`} */}
                  </InputAdornment>
                )
              }
              endAdornment={
                isPasswordField &&
                visibilityToggle && (
                  <InputAdornment position="end">
                    <IconButton onClick={visibilityToggle} edge="end">
                      {isVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            />
            {helperText && (
              <FormHelperText sx={{ color: "var(--red)" }}>
                {helperText}
              </FormHelperText>
            )}
          </FormControl>
        </div>
      )}{" "}
    </>
  );
};

export default CustomInput;

// <div className="w-full mt-2">
//       <label className="font-[500] whitespace-nowrap" style={{whiteSpace:'nowrap !important'}}>{label}{isRequired && <span className="text-[var(--red)]">{" "}*</span>}</label>
//       <FormControl sx={{ width: "100%", mt: 1 }} variant="outlined">
//         <OutlinedInput
//           name={name}
//           type={type}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           sx={commonInputStyles}
//           startAdornment={
//             icon && (
//               <InputAdornment position="start">
//                 <div className="text-xl">{icon}</div>
//               </InputAdornment>
//             )
//           }
//           endAdornment={
//             isPasswordField && visibilityToggle && (
//               <InputAdornment position="end">
//                 <IconButton onClick={visibilityToggle} edge="end">
//                   {isVisible ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             )
//           }

//         />
//         {helperText && <FormHelperText sx={{ color: 'var(--red)' }}>{helperText}</FormHelperText>}

//       </FormControl>
//     </div>

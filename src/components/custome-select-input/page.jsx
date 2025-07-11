import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";

export const SelectLocalityField = ({
  label,
  value,
  onChange,
  name,
  options = [],
  placeholder,
  className = "",
  isRequired = false,
  icon,
  error
}) => {
  const showSelect = Array.isArray(options) && options.length > 0 && typeof options[0] === "object";
  
  const commonSelectStyles = {
    borderRadius: "10px",
    color: "var(--black) !important",
    "& .MuiOutlinedInput-root": { borderRadius: "10px" },
    "& fieldset": {
      borderColor: "var(--greyborder) !important",
    },
    "&:hover fieldset": { borderColor: "var(--lightBlue)" },
    "&.Mui-focused fieldset": {
      borderColor: "var(--lightBlue) !important",
      borderWidth: "2px",
    },
    "& .MuiInputLabel-root": { color: "var(--greyP) !important" },
    "& .Mui-focused": { color: "var(--lightBlue) !important" },
  };

  return (
    <div className="w-full mt-2">
      <label className="font-[500]">
        {label}
        {isRequired && <span className="text-[var(--red)] ml-1">*</span>}
      </label>

      <FormControl sx={{ width: "100%", mt: 1 }} error={!!error}>
        {showSelect ? (
          <Select
            name={name}
            value={value}
            onChange={onChange}
            displayEmpty
            sx={commonSelectStyles}
            startAdornment={
              icon && (
                <InputAdornment position="start">
                  <div className="text-xl">{icon}</div>
                </InputAdornment>
              )
            }
            className={className}
          >
            {placeholder && (
              <MenuItem value="" disabled>
                {placeholder}
              </MenuItem>
            )}

            {options.map((opt, idx) => (
              <MenuItem key={idx} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <TextField
            fullWidth
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={isRequired}
            InputProps={{
              startAdornment: icon && (
                <InputAdornment position="start">
                  <div className="text-xl">{icon}</div>
                </InputAdornment>
              ),
            }}
            sx={commonSelectStyles}
            className={className}
          />
        )}
        {error && (
          <span className="text-[var(--red)] text-sm mt-1">{error}</span>
        )}
      </FormControl>
    </div>
  );
};


const CustomSelect = ({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  name,
  sx = {},
  isRequired,
  icon,
}) => {
  const commonSelectStyles = {
    borderRadius: "10px",
    color: "var(--black) !important",
    "& .MuiOutlinedInput-root": { borderRadius: "10px" },
    "& fieldset": {
      borderColor: "var(--greyborder) !important",
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
    <div className="w-full  mt-2">
      <label className="font-[500]  ">
        {label}
        {isRequired && <span className="text-[var(--red)]"> *</span>}
      </label>
      <FormControl sx={{ width: "100%", mt: 1 }}>
        {/* {label && <InputLabel>{label}</InputLabel>} */}

        <Select
          name={name}
          value={value}
          onChange={onChange}
          displayEmpty
          sx={commonSelectStyles}
          startAdornment={
            icon && (
              <InputAdornment position="start">
                <div className="text-xl">{icon}</div>
                {/* className={`${label==="Company Name"? "hidden" :"block"}`} */}
              </InputAdornment>
            )
          }
        >
          {placeholder && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}

          {(options || []).map((title, index) => (
            <MenuItem key={index} value={title}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CustomSelect;

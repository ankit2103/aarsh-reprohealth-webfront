import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
    Backdrop,
} from "@mui/material";
import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../utils/common.util";
import { updateToken, updateUser } from "../../redux/slice/user.slice";
import { useRouter } from "next/navigation";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";


const Transition = forwardRef(function Transition(props, ref) {


  return <Slide direction="up" ref={ref} {...props} />;
});

const LogoutModal = ({ open, handleClose, handleLogout }) => {
    
  return (
    <Dialog open={open} onClose={handleClose} 
        TransitionComponent={Transition}
      keepMounted
      BackdropProps={{
        style: {
          backdropFilter: "blur(4px)", // Blur effect
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          width: "90%",
          maxWidth: "400px",
        },
      }}
    >
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className="!bg-[var(--red)] !capitalize !rounded-full !px-6 py-2 !text-[var(--White)]  cursor-pointer  hover:!bg-[var(--White)] hover:!border-[var(--red)] hover:!text-[var(--red)] border border-solid border-1  transition-all duration-200 ease-in-out hover:ring-1 hover:ring-[var(--red)]">
          Cancel
        </Button>
        <Button onClick={handleLogout} className="!bg-[var(--lightBlue)] !capitalize !rounded-full !px-6 py-2 !text-[var(--White)]  cursor-pointer hover:!bg-[var(--White)] hover:!border-[var(--lightBlue)] hover:!text-[var(--lightBlue)]  border border-solid border-1  transition-all duration-200 ease-in-out hover:ring-1 hover:ring-[var(--lightBlue)]"  >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default LogoutModal

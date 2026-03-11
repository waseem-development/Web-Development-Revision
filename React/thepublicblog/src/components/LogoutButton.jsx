// src/components/LogoutButton.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { logoutUser } from "../store/authSlice";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await authService.logout(); // Wait for logout to complete
      dispatch(logoutUser()); // Then dispatch Redux action
      navigate("/"); // Then navigate
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button
      variant="ghost"
      className="bg-red-700 hover:bg-red-300 text-white py-2 px-4 transition-all duration-500 ease-in-out flex justify-between"
      onClick={logoutHandler}
    >
      <img
        src="/logout-icon.svg"
        alt="logout"
        className="filter invert brightness-0"
      />
      Logout
    </Button>
  );
};

export default LogoutButton;

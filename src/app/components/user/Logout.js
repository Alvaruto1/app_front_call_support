import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "./userSlice";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOut()).then(() => {
      navigate("/");
    });
  }, [dispatch]);
  return <div></div>;
}

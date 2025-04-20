import { IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import BulkUpload from "../BulkUpload/BulkUpload";
import ProfileMenu from "./ProfileMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function UserProfile() {
  const {user} = useSelector((state)=> state.user);
  const [name, setName] = useState('');
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);


  return (
    <div className="w-full h-full py-5 px-10 ">
      <div className="border-b flex justify-between items-center">
        <h5 className="font-semibold capitalize">Welcome {name || ''}</h5>
        <span className="flex">
          <ProfileMenu/>
        </span>
      </div>
        <Outlet/>
    </div>
  );
}

import EditSquareIcon from '@mui/icons-material/EditSquare';
import { IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import csk from "../../assets/teamLogo/ipl 1.png";
import trophy from "../../assets/trophy.png";

export default function TeamDetail({ team }) {
  const {authenticated} = useSelector((state) => state.user);
  const navigate = useNavigate();
  function handleEditClick() {
    if (authenticated) {
      navigate(`/user-profile/manage-team/${team._id}`);
    } else {
      alert("Please login to edit team details.");
    }

  }

  return (
    <div className="w-full h-full bg-[#071026] text-white flex flex-col items-center justify-center gap-10 py-10 relative">
      <IconButton
        sx={{
          position: "absolute",
          top: 40,
          right: 20,
          color: "#334155",
          zIndex: 1000,
        }}
        onClick={handleEditClick}
      >
        <EditSquareIcon fontSize="large"/>

        </IconButton>
      <div className=" flex items-center gap-10 w-[70%]">
        <img className="flex-1" src={team.team_logo || csk} alt="" />
        <section className="flex-1">
          <h1 className="font-bold text-5xl italic pr-20">{team?.team_name}</h1>
          <br />
          {team.championships?.length > 0 && (
            <span className="h-10 flex gap-5 w-fit border border-blue-100/20 items-center bg-blue-400/20 rounded-r-full px-2">
              <img className="h-8 mr-5" src={trophy} alt="trophy" />
              <span className="flex h-8 gap-5 pe-5 items-center ">
                {team?.championships?.map((championship, index) => (
                  <p key={index}>{championship}</p>
                ))}
              </span>
            </span>
          )}
          <br />
          <span className="flex gap-2">
            <h4 className="w-30 font-semibold italic text-yellow-500">
              Captain
            </h4>
            <p className="">{team?.captain}</p>
          </span>
          <span className="flex gap-2">
            <h4 className="w-30 font-semibold italic text-yellow-500">Coach</h4>
            <p className="">{team?.head_coach}</p>
          </span>
          <span className="flex gap-2">
            <h4 className="w-30 font-semibold italic text-yellow-500">Owner</h4>
            <p className="">{team?.owners}</p>
          </span>
          <span className="flex gap-2">
            <h4 className="w-30 font-semibold italic text-yellow-500">Venue</h4>
            <p className="">{team?.venue}</p>
          </span>
          <span className="flex gap-2">
            <h4 className="min-w-30 font-semibold italic text-yellow-500">
              Support Staff
            </h4>
            <p>
              {team?.support_staff
                ?.map((staff) => staff.split(" ").slice(0, 2).join(" "))
                .join(", ")}
            </p>
          </span>
        </section>
      </div>
    </div>
  );
}

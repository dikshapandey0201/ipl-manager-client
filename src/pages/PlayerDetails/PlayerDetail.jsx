import React, { useEffect, useState } from "react";
import { useGetPlayerByNameQuery } from "../../features/slices/PlayerSlice";
import { useParams } from "react-router-dom";
import { useGetAllTeamsQuery } from "../../features/slices/TeamSlice";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import PlayerModal from "./PlayerModal";
import { IconButton } from "@mui/material";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import playerPlaceHolder from "../../assets/playerDetailPlaceholder.png";

export default function PlayerDetail() {
  const {authenticated} = useSelector((state) => state.user);
  const { teamname, playername } = useParams();
  const { data, error, isLoading } = useGetPlayerByNameQuery(decodeURIComponent(playername));
  const {data: allTeam,error: allTeamError,isLoading: allTeamLoading} = useGetAllTeamsQuery();
  const [player, setPlayer] = useState({});
  const [themeColor, setThemeColor] = useState("");
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    if (allTeam) {
      const teamData = allTeam.find((team) => team.team_name === teamname);
      if (teamData) {
        setThemeColor(teamData.team_theme_color);
      }
    }
  }, [allTeam, teamname]);

  useEffect(() => {
    if (data) {
      const playerData = data[0];
      if (playerData) {
        const dobDate = new Date(playerData.dob);
        const debutDate = new Date(playerData.debut);

        const formattedDOB = dobDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        const formattedDebutYear = debutDate.getFullYear();

        setPlayer({
          name: playerData.name,
          dob: formattedDOB,
          skill: playerData.skill,
          debut: formattedDebutYear,
          matches_played: playerData.matches_played,
          nationality: playerData.nationality,
          image: playerData.image,
          runs: playerData.runs,
        });
      } else {
        setPlayer({});
      }
    }
  }, [data]);

  const handleEditClick = () => {
    if (authenticated) {
      setOpen(true);
    } else {
      alert("Please login to edit player details.");
    }
  }

  if (isLoading) {
    return <Spinner/>;
  }



  return (
    <div
      className={`w-full h-screen bg-neutral-950 flex items-center justify-center px-20 overflow-hidden  relative`}>
        <IconButton
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          color: "#c7c7c7",
          zIndex: 100,
        }}
        onClick={handleEditClick}
      >
        <EditSquareIcon fontSize="large"/>

        </IconButton>
      <section className="flex-1 relative flex  items-center justify-center">
        {/* border*/}
        <div className="border-15 border-neutral-300 w-[50%] h-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"></div>

        {/* Player image */}
        <img
          src={player?.image || playerPlaceHolder}
          alt="player"
          className={`${player?.image ? "min-w-100" : "w-100"} object-cover relative z-5`}
        />


        <p className="absolute text-center w-full bottom-25 left-1/2 -translate-x-1/2 text-6xl text-neutral-300 font-bold z-6">
          {player?.name}
        </p>
        
        <p className="absolute text-center w-full bottom-15 left-1/2 -translate-x-1/2 text-2xl text-neutral-300 font-semibold z-6 ">
          {player?.nationality}
        </p>

        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent from-40% to-neutral-950 z-5"></div>
      </section>
      <section className="flex-1 p-8 text-neutral-300">
        <h1 className="font-bold text-6xl mb-10 ">Player Overview</h1>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="border border-neutral-400 p-4 text-center w-1/2">
                <div className="font-bold text-2xl">{player?.debut}</div>
                <div className="text-lg">IPL Debut</div>
              </td>
              <td className="border border-neutral-400 p-4 text-center w-1/2">
                <div className="font-bold text-2xl">{player?.skill}</div>
                <div className="text-lg">Specialization</div>
              </td>
            </tr>
            <tr>
              <td className="border border-neutral-400 p-4 text-center w-1/2">
                <div className="font-bold text-2xl">{player?.dob}</div>
                <div className="text-lg">Date of Birth</div>
              </td>
              <td className="border border-neutral-400 p-4 text-center w-1/2">
                <div className="font-bold text-2xl">
                  {player?.matches_played}
                </div>
                <div className="text-lg">Matches</div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      {open && (
        <PlayerModal
          open={open}
          setOpen={setOpen}
          id = {data[0]?._id}
          formtype = "edit"
        />
      )}
    </div>
  );
}

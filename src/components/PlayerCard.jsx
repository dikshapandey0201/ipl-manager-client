import React from "react";
import dummyPlayer from "../assets/playerPlaceholder.png";
import Divider from "@mui/material/Divider";

const roleSrc = {
  batter: "https://www.iplt20.com/assets/images/teams-batsman-icon.svg",
  bowler: "https://www.iplt20.com/assets/images/teams-bowler-icon.svg",
  allrounder: "https://www.iplt20.com/assets/images/teams-all-rounder-icon.svg",
  wkbatter: "https://www.iplt20.com/assets/images/teams-wicket-keeper-icon.svg",
  foreigner: "https://www.iplt20.com/assets/images/teams-foreign-player-icon.svg",
};

const normalizeSkill = (skill) => {
  if (!skill) return '';
  const formatted = skill.toLowerCase().replace(/[-\s]/g, '');

  const aliasMap = {
    'wkbatter': 'wkbatter',
    'wicketkeeper': 'wkbatter',
    'allrounder': 'allrounder',
    'allround': 'allrounder',
    'batter': 'batter',
    'bowler': 'bowler',
  };

  return aliasMap[formatted] || 'allrounder';
};

export default function PlayerCard({ player, onClick }) {
  return (
    <div
      className="w-60 h-70 flex flex-col items-center bg-white rounded border border-gray-300 shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-stone-300 transition-all duration-300 ease-in-out overflow-hidden cursor-pointer p-5 relative"
      onClick={onClick}
    >
      <img
        src={player?.image || dummyPlayer}
        alt="Player"
        className="h-2/3 mb-4 hover:scale-110 transition-transform duration-300 ease-in-out"
      />
      <Divider
        orientation="horizontal"
        sx={{ width: "100%", borderColor: "#d6d6d6", marginY: 1 }}
      />
      <p className="font-semibold uppercase text-center">{player.name}</p>
      <p className="uppercase text-[0.7rem] text-gray-600">{player.skill}</p>
      <img
        className="absolute top-2 right-2"
        src={roleSrc[normalizeSkill(player.skill)]}
        alt="skill"
      />
      {player?.nationality !== "India" && (
        <img
          className="absolute top-2 left-2"
          src={roleSrc.foreigner}
          alt="nationality"
        />
      )}
    </div>
  );
}

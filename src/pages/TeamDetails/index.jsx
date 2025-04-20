import React, { useEffect, useState } from "react";
import TeamDetail from "./TeamDetail";
import TeamTab from "./TeamTab";
import { Outlet, useParams } from "react-router-dom";
import { useGetTeamByNameQuery } from "../../features/slices/TeamSlice";
import Spinner from "../../components/Spinner";


export default function TeamDetails() {
  const { teamName } = useParams();
  const {data, error, isLoading} = useGetTeamByNameQuery(teamName);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    if (data) {
      setTeam(data);
    }
  }, [data]);
  
  if (isLoading) {
    return <Spinner/>;
  }

  if (!team) {
    return <div>No team found</div>;
  }
  return (
    <>
      <TeamDetail team={team}/>
      <div className="w-full h-full relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#071026] rounded-xl shadow-lg shadow-gray-300/50 flex items-center justify-center">
          <TeamTab/>
        </div>
      </div>
      <Outlet />
    </>
  );
}

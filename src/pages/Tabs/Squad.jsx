import React, { useEffect, useState } from "react";
import PlayerCard from "../../components/PlayerCard";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTeamByNameQuery } from "../../features/slices/TeamSlice";
import Spinner from "../../components/Spinner";

export default function Squad() {
  const { teamName } = useParams();
    const decodedTeamName = decodeURIComponent(teamName);
    const {data, error, isLoading} = useGetTeamByNameQuery(decodedTeamName);
    const [players, setPlayers] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (data) {
        setPlayers(data.players);
      }
    }
    , [data]);
  
    if (isLoading) {
      return <Spinner/>
    }

  
  function handleCardClick(teamname,playername){
    navigate(`/player/${teamname}/${playername}`);
  }
  return (
    <div className="w-full h-full flex flex-col bg-gray-100 py-20 px-30">
      <h1 className="font-bold text-4xl my-10">Batters</h1>
      <div className="flex flex-wrap gap-5 justify-start">
        
        {players?.filter(player => player.skill === "Batter" || player.skill === "WK-Batter").map((player) => (
          
            <PlayerCard key={player._id} player={player} onClick={()=>handleCardClick(decodedTeamName,player.name)}/>
          
        ))}
        
      </div>
      <h1 className="font-bold text-4xl my-10">Bowlers</h1>
      <div className="flex flex-wrap gap-5 justify-start">
        
        {players?.filter(player => player.skill === "Bowler").map((player) => (
          <PlayerCard key={player.id} player={player} onClick={()=>handleCardClick(decodedTeamName,player.name)}/>
        ))}
      </div>
      <h1 className="font-bold text-4xl my-10">All-Rounders</h1>
      <div className="flex flex-wrap gap-2 justify-start">
        
        {players?.filter(player => player.skill === "All-Rounder").map((player) => (
          <PlayerCard key={player.id} player={player} onClick={()=>handleCardClick(decodedTeamName,player.name)}/>
        ))}
      </div>
      
    </div>
  );
}

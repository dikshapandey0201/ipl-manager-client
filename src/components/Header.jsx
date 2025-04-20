import React, { useEffect, useState } from "react";
import brandBg from "../assets/brandBg.png";
import brand from "../assets/ipl.png";
import AccountMenu from "./AccountMenu";
import { Link } from "react-router-dom";
import { useGetAllTeamsQuery } from "../features/slices/TeamSlice";
import Spinner from "./Spinner";


export default function Header() {
  const { data, error, isLoading } = useGetAllTeamsQuery();
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    if (data) {
      const useFulData = data.map((team) => {
        return {
          name: team.team_name,
          logo: team.team_logo,
          id: team._id,
          code: team.team_code,
        };
      });
      setTeams(useFulData);
    }
  }, [data]);
  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <div className="w-full h-15 bg-[#031537] flex items-center justify-between overflow-hidden pe-5 sticky top-0 z-10">
      <section
        className="w-70 h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${brandBg})` }}
      >
        <Link
          to=""
          className="flex items-center justify-between items-center h-full ps-5 pe-15"
        >
          <img src={brand} alt="brand" className="h-15" />
          <p className="text-stone-50 text-xl">All</p>
        </Link>
      </section>
      <div className="flex-1 flex items-center justify-evenly h-full px-5">
        {teams.map((team) => (
          <Link to={`/team-details/${team.name}`} key={team.id}>
            {!team.logo ? (
              <p className="text-white">{team.code}</p>
            ) : (
              <img
                src={team.logo}
                alt={team.name}
                className="menu-icon w-15 transition-all transform cursor-pointer"
              />
            )}
          </Link>
        ))}
      </div>
      <AccountMenu />
    </div>
  );
}
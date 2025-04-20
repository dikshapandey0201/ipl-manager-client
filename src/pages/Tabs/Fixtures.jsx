import React from "react";
import { IoTicketOutline } from "react-icons/io5";
import { IoIosMoon } from "react-icons/io";
import { IoSunnySharp } from "react-icons/io5";
import { futureMatches } from "../../constants/DummyTeamData";
import { useParams } from "react-router-dom";
import { useGetAllTeamsQuery } from "../../features/slices/TeamSlice";
import Spinner from "../../components/Spinner";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.toLocaleString("en-US", { weekday: "short" }).toUpperCase();
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const dateNum = date.getDate();

  return `${month}, ${day} ${dateNum}`;
};

export default function Fixtures() {
  const selectedTeamName = useParams().teamName;
  const { data, error, isLoading } = useGetAllTeamsQuery();
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const upcomingMatches = futureMatches.filter((match) => {
    const matchDate = new Date(match.date);
    matchDate.setHours(0, 0, 0, 0); 

    return match.fixture.includes(selectedTeamName) && matchDate >= today;
  });

  if (isLoading) return <Spinner />;
  console.log(data);

  return (
    <div div className="w-full p-20">
      {upcomingMatches.map((match) => {
        const [team1, team2] = match.fixture.split(" vs ");

        return (
          <section
            key={match.match_no}
            className="w-full h-32 flex flex-col rounded-lg  bg-white"
          >
            <section className=" w-full h-32 flex flex-row justify-between items-center border-b border-gray-300">
              <section className="w-60 h-full  flex flex-col py-6 px-8">
                <span className="border border-orange-500 w-20 p-1 uppercase text-xs font-semibold text-center mb-4">
                  Match-{match.match_no}
                </span>

                <span className="text-xl font-semibold uppercase">
                  {formatDate(match.date)}
                </span>
                <span className="text-xs font-semibold text-gray-600 flex items-center">
                  {match.time === "3:30 PM" ? <IoSunnySharp /> : <IoIosMoon />}
                  <span className="ml-2">{match.time}</span>
                </span>
              </section>
              <section className="w-auto  p-4 h-full  flex-1">
                <span className="  text-sm  text-center mb-4">
                  {match.stadium}
                </span>
                <section className="w-160 flex flex-row mt-6 justify-between items-center ">
                  <section className="flex gap-2 w-70 items-center">
                    <img
                      src={
                        data?.find((team) => team.team_name === team1)
                          ?.team_logo
                      }
                      alt={`${team1} logo`}
                      className="w-15 h-15 object-contain"
                    />
                    <span className="text-xs font-semibold">{team1}</span>
                  </section>

                  <span className="text-xl font-semibold uppercase w-20 text-center">
                    VS
                  </span>

                  <section className="flex gap-2 w-70 items-center justify-end">
                    <span className="text-xs font-semibold">{team2}</span>
                    <img
                      src={
                        data?.find((team) => team.team_name === team2)
                          ?.team_logo
                      }
                      alt={`${team2} logo`}
                      className="w-15 h-15 object-contain"
                    />
                  </section>
                </section>
              </section>

              <section className="w-60 h-full  flex gap-8 items-center justify-center ">
                <span className=" border border-grey-500 p-1 rounded-full">
                  <IoTicketOutline />
                </span>
                <span className="text-xs font-semibold border border-orange-500 bg-orange-500 text-white p-2  ">
                  Match Center
                </span>
              </section>
            </section>
          </section>
        );
      })}
    </div>
  );
}

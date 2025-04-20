import React from 'react';
import { IoTicketOutline } from 'react-icons/io5';
import { TbReportAnalytics } from 'react-icons/tb';
import { matchesPlayed } from '../../constants/DummyTeamData';
import { useParams } from 'react-router-dom';
import { useGetAllTeamsQuery } from '../../features/slices/TeamSlice';
import Spinner from '../../components/Spinner';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const dateNum = date.getDate();
  return `${month}, ${day} ${dateNum}`;
};

export default function Results() {
  const { teamName: selectedTeamName } = useParams();
  const { data, error, isLoading } = useGetAllTeamsQuery();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!selectedTeamName) {
    return <div className="text-red-500 font-semibold p-4">Team name is missing from URL.</div>;
  }

  const calculateMatchResult = (match) => {
    const { team1, team2, team1_score, team2_score } = match;

    if (!team1_score || !team2_score) return 'Match not played yet';

    const [team1_runs] = team1_score.split('/').map(Number);
    const [team2_runs, team2_wkts] = team2_score.split('/').map(Number);

    if (team1_runs > team2_runs) {
      return `${team1} won by ${team1_runs - team2_runs} runs`;
    } else if (team2_runs > team1_runs) {
      return `${team2} won by ${10 - team2_wkts} wickets`;
    } else {
      return 'Match tied';
    }
  };

  const matchesForTeam = matchesPlayed.filter((match) => {
    const matchDate = new Date(match.date);
    matchDate.setHours(0, 0, 0, 0);

    const isValidDate = !isNaN(matchDate.getTime());
    if (!isValidDate) {
      console.warn('Invalid date found in match:', match);
      return false;
    }

    const isTeamInvolved =
      (match.team1?.toLowerCase().includes(selectedTeamName.toLowerCase()) || false) ||
      (match.team2?.toLowerCase().includes(selectedTeamName.toLowerCase()) || false);

    const isPastOrToday = matchDate <= today;

    return isTeamInvolved && isPastOrToday;
  });

  if (matchesForTeam.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        No past matches found for <strong>{selectedTeamName}</strong>.
      </div>
    );
  }

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <div className="w-full flex flex-col gap-4 p-20">
      {matchesForTeam.map((match) => {
        const team1Logo = data?.find(team => team.team_name === match.team1)?.team_logo;
        const team2Logo = data?.find(team => team.team_name === match.team2)?.team_logo;

        return (
          <section
            key={match.match_no}
            className="w-full h-45 flex flex-col rounded-lg bg-white"
          >
            <section className="w-full h-45 flex flex-row justify-between items-center border-b border-gray-300">
              <section className="w-60 h-full flex flex-col gap-8 py-6 px-8">
                <span className="border border-orange-500 w-20 p-1 uppercase text-xs font-semibold text-center mb-4">
                  Match-{match.match_no}
                </span>
                <span className="font-semibold uppercase text-sm">
                  {calculateMatchResult(match)}
                </span>
              </section>

              <section className="w-auto p-4 h-full flex-1 flex-col">
                <section>
                  <span className="text-sm text-center mb-4">{match.stadium}</span>
                  <span className="text-xs font-semibold text-gray-600 flex items-center mt-2">
                    {formatDate(match.date)} | {match.time}
                  </span>
                </section>

                <section className="w-160 flex flex-row mt-6 justify-between items-center">
                  {/* Team 1 */}
                  <section className="flex gap-2 w-70 items-center">
                    {team1Logo && (
                      <img src={team1Logo} alt={`${match.team1} logo`} className="w-15 h-15 object-contain" />
                    )}
                    <span className="text-xs font-semibold flex flex-col">
                      <span>{match.team1}</span>
                      <span className="font-semibold text-xl">{match.team1_score}</span>
                      <span className="text-gray-500">({match.team1_overs} ov)</span>
                    </span>
                  </section>

                  <span className="text-xl font-semibold uppercase w-20 text-center">VS</span>

                  {/* Team 2 */}
                  <section className="flex gap-2 w-70 items-center justify-end">
                    <span className="text-xs font-semibold flex flex-col text-right">
                      <span>{match.team2}</span>
                      <span className="font-semibold text-xl">{match.team2_score}</span>
                      <span className="text-gray-500">({match.team2_overs} ov)</span>
                    </span>
                    {team2Logo && (
                      <img src={team2Logo} alt={`${match.team2} logo`} className="w-15 h-15 object-contain" />
                    )}
                  </section>
                </section>
              </section>

              <section className="w-60 h-full flex gap-8 items-center justify-center">
                <section className="flex gap-2">
                  <span className="border border-grey-500 p-1 rounded-full">
                    <TbReportAnalytics />
                  </span>
                  <span className="border border-grey-500 p-1 rounded-full">
                    <IoTicketOutline />
                  </span>
                </section>
                <span className="text-xs font-semibold border border-orange-500 bg-orange-500 text-white p-2">
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

import React, { useEffect, useState } from 'react';
import TeamCard from './TeamCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetAllTeamsQuery } from '../../features/slices/TeamSlice';
import { currentuser, handleGoogleLogin as apiGoogleLogin } from '../../api/UserApi/UserAuthApi';  
import { setUser } from '../../features/slices/UserSlice';
import { auth } from '../../firebase';
import Spinner from '../../components/Spinner'

export default function Home() {
  const { data, error, isLoading } = useGetAllTeamsQuery();
  const [teams, setTeams] = useState([]);
  const [firebaseUser, setFirebaseUser] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setTeams(data);
    }
  }, [data]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await currentuser();
        if (user) {
          dispatch(setUser(user.user));
        }
      } catch (error) {
        checkGoogleAuth();
      }
    };
    fetchUser();
  }, []);

  const checkGoogleAuth = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = {
          email: user.email,
          name: user.displayName,
        };
        setFirebaseUser(userData); 
      }
    });
  };

  useEffect(() => {
    const loginWithGoogle = async () => {
      if (!firebaseUser) return;
      try {
        const response = await apiGoogleLogin(firebaseUser);
        dispatch(setUser(response.user));
      } catch (err) {
        throw new Error("Google login failed: " + err.message);
      }
    };
    loginWithGoogle();
  }, [firebaseUser]);

  function handleCardClick(teamName) {
    navigate(`/team-details/${teamName}`);
  }

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <div className='w-full flex flex-wrap justify-center p-20 gap-10 bg-[#071026]'>
      {teams?.map((team) => (
        <TeamCard
          key={team._id}
          team={team}
          onClick={() => handleCardClick(team.team_name)}
        />
      ))}
    </div>
  );
}

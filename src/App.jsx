import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Banner from "./components/Banner";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import TeamDetails from "./pages/TeamDetails";
import Squad from "./pages/Tabs/Squad";
import Fixtures from "./pages/Tabs/Fixtures";
import Results from "./pages/Tabs/Results";
import Videos from "./pages/Tabs/Videos";
import News from "./pages/Tabs/News";
import Archives from "./pages/Tabs/Archives";
import PlayerDetail from "./pages/PlayerDetails/PlayerDetail";
import Auth from "./pages/Auth/Auth";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import UserProfile from "./pages/Profile/UserProfile";
import BulkUpload from "./pages/BulkUpload/BulkUpload";
import Team from "./pages/Profile/Team";
import ManagePlayers from "./pages/Profile/ManagePlayers";
import ManageTeam from "./pages/TeamDetails/ManageTeam";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import { currentuser, handleGoogleLogin as apiGoogleLogin } from './api/UserApi/UserAuthApi';  
import { setUser } from './features/slices/UserSlice';
import { auth } from './firebase';
import NotFound from "./components/NotFound";



export default function App() {
  const { authenticated } = useSelector((state) => state.user);
    const [firebaseUser, setFirebaseUser] = useState(null);

    const dispatch = useDispatch();

  
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

  return (
    <BrowserRouter>
      <Banner />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team-details/:teamName" element={<TeamDetails />}>
          <Route path="" element={<Squad />} />
          <Route path="fixtures" element={<Fixtures />} />
          <Route path="results" element={<Results />} />
          <Route path="videos" element={<Videos />} />
          <Route path="news" element={<News />} />
          <Route path="archives" element={<Archives />} />
        </Route>
        <Route
          path="/player/:teamname/:playername"
          element={<PlayerDetail />}
        />

        <Route element={<ProtectedRoute isAuth={!authenticated} />}>
          <Route path="/user-login" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>
        <Route element={<ProtectedRoute isAuth={authenticated} />}>

          <Route path="/user-profile" element={<UserProfile />}>
            <Route path="" element={<BulkUpload />} />
            <Route path="manage-team" element={<Team />} />
            <Route path="manage-player" element={<ManagePlayers />} />
            <Route path="manage-team/:id" element={<ManageTeam />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

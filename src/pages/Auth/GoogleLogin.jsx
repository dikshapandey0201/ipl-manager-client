import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleGoogleLogin as apiGoogleLogin } from "../../api/UserApi/UserAuthApi";
import { setUser } from "../../features/slices/UserSlice";

export default function GoogleLogin() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails) return;

    const loginUser = async () => {
      try {
        const response = await apiGoogleLogin(userDetails);

        dispatch(setUser(response.user));
        navigate("/");
      } catch (error) {
        alert("Error during Google login:");
      }
    };

    loginUser();
  }, [userDetails]);

  const signInWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;
        setUserDetails({ name: displayName, email });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Google sign-in error", error);
        setLoading(false);
      });
  };

  return (
    <button
      className="w-96 my-5 flex items-center justify-center gap-1 bg-stone-200 text-black rounded-full px-5 py-2 hover:bg-stone-100 transition duration-200 ease-in-out cursor-pointer active:scale-95"
      onClick={signInWithGoogle}
      disabled={loading}
    >
      {loading ? "Loading..." : "Login with Google"}
      <FcGoogle />
    </button>
  );
}

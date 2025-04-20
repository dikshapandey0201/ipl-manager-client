import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { currentuser, loginUser, signupUser, } from "../../api/UserApi/UserAuthApi";
import bg from "../../assets/loginbg.jfif";
import { setUser } from "../../features/slices/UserSlice";
import GoogleLogin from "./GoogleLogin";

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [formType, setFormType] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (formType === "signup" && !name)) {
      alert("Please fill all the fields");
      return;
    }
    // Check if the email format is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    // Check if the password is strong enough
    if (formType === "signup" && password.length < 8) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (formType === "login") {
      // Login logic
      setLoading(true);
      loginUser({ email, password })
        .then((response) => {
          alert("Login successful");
          currentuser()
            .then((user) => {
              dispatch(setUser(user));
              navigate("/");
            })
            .catch((error) => {
              alert("User not found: " + error.message);
            });
        })
        .catch((error) => {
          alert("Login failed: " + error.message);
          setLoading(false);
        });
    } else {
      // signup logic
      setLoading(true);
      signupUser({ name, email, password })
        .then((response) => {
          alert("Signup successful please login now");
          setFormType("login");
        })
        .catch((error) => {
          alert("Signup failed: " + error.message);
          setLoading(false);
        });
    }
  };

  return (
    <div className="w-full h-[86.8vh] flex justify-center items-center bg-gray-900">
      <section
        className="flex-1 h-full"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <section className="flex-1 h-full flex flex-col items-center justify-center">
        <h1 className="text-white font-semibold text-2xl mb-10">IPL Manager</h1>
        <form className="flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
          {formType === "signup" && (
            <input
              type="text"
              className="text-gray-300 border border-gray-800 rounded-full px-5 py-2"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            className="text-gray-300 border border-gray-800 rounded-full px-5 py-2"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative border border-gray-800 rounded-full px-1 py-1">
            <input
              type={showPassword ? "text" : "password"}
              className="text-gray-300 w-full bg-transparent rounded-full px-5 py-2 pr-12 focus:outline-none"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <IconButton
              className="!absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon sx={{ color: "gray" }} />
              ) : (
                <VisibilityOutlinedIcon sx={{ color: "gray" }} />
              )}
            </IconButton>
          </div>
          <Link
            to="/forgot-password"
            className="text-end text-blue-500 hover:text-blue-300"
          >
            Forgot Password ?
          </Link>
          <button
            className={`bg-red-600 text-white rounded-full px-5 py-2 hover:bg-red-700 transition duration-200 ease-in-out cursor-pointer active:scale-95 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {formType === "login"
              ? loading
                ? "Please wait..."
                : "Login"
              : loading
              ? "Please wait..."
              : "Signup"}
          </button>
        </form>
        <GoogleLogin />
        <div className="flex items-center gap-2 text-white font-semibold">
          <p>{formType === "login" ? "New User? " : "Existing User? "}</p>
          <button
            className="text-red-600 font-semibold hover:text-red-700 transition duration-200 ease-in-out cursor-pointer active:scale-95"
            onClick={() =>
              setFormType((prev) => (prev === "login" ? "signup" : "login"))
            }
          >
            {formType === "login" ? "Sign Up" : "Login"}
          </button>
        </div>
      </section>
    </div>
  );
}

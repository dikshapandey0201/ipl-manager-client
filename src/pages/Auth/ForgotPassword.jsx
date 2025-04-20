import React, { useState } from "react";
import { forgotPassword } from "../../api/UserApi/UserAuthApi";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    setLoading(true);
    forgotPassword({ email })
      .then((response) => {
        alert("Password reset link sent to your email address");
        setLoading(false);
      })
      .catch((error) => {
        alert("Error sending password reset link: " + error.message);
        setLoading(false);
      });
  }

  return (
    <div className="w-full h-[86.7vh] flex items-center justify-center bg-gray-200">
      <form  className="w-96" >
        <h1 className=" font-semibold text-2xl mb-10">Forgot Password</h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`${loading? "opacity-50 cursor-not-allowed":""} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full`}
          onClick={handleSubmit}
          disabled={loading}        
        >
          {loading ? "Sending..." : "Send Password Reset Link"}
        </button>
      </form>
    </div>
  );
}

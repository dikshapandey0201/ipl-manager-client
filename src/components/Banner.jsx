import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import React from "react";
import bcciLogo from "../assets/bcciLogo.webp";
import wpl from "../assets/wpl.webp";

export default function Banner() {
  return (
    <div className="w-full h-8 bg-blue-950 flex justify-between items-center text-white px-20">
      <section className="flex items-center gap-2">
        <img src={bcciLogo} alt="bcci" className="h-5" />
        <h1 className=" mr-5">BCCI</h1>
        <p>|</p>
        <img src={wpl} alt="wpl" className="h-5" />
      </section>
      <section className="flex items-center justify-center gap-2">
        <p className="mr-10 text-indigo-300">Follow us</p>
        <div className="flex items-center gap-2">
          <a
            href="https://www.bcci.tv/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-5 w-5 bg-indigo-300 rounded-full p-1 flex items-center justify-center hover:bg-indigo-200 transition duration-200"
          >
            <XIcon sx={{ color: "black", fontSize: 10 }} />
          </a>
          <a
            href="https://www.instagram.com/bcci/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-5 w-5 bg-indigo-300 rounded-full p-1 flex items-center justify-center hover:bg-indigo-200 transition duration-200"
          >
            <InstagramIcon sx={{ color: "black", fontSize: 15 }} />
          </a>
          <a
            href="https://www.facebook.com/BCCI/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-5 w-5 bg-indigo-300 text-black font-bold rounded-full p-1 flex items-center justify-center hover:bg-indigo-200 transition duration-200"
          >
            f
          </a>
        </div>
      </section>
    </div>
  );
}

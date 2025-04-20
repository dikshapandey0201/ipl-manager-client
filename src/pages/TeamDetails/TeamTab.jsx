import React from "react";
import { NavLink } from "react-router-dom";

export default function TeamTab() {
    const tabs = [
        { name: "Squad", path: "" },
        { name: "Fixtures", path: "fixtures" },
        { name: "Results", path: "results" },
        { name: "Videos", path: "videos" },
        { name: "News", path: "news" },
        { name: "Archives", path: "archives" },
    ];
  return (
    <div className="bg-white rounded-xl p-2 flex gap-2 border border-gray-200">
        {tabs.map((tab,index) => (
            <NavLink
            key={index}
            to={tab.path}
            end
            className={({ isActive }) =>
                `text-[#071026] font-semibold px-4 py-2 rounded-lg hover:bg-blue-200 hover:text-blue-800 transition-all duration-300 ease-in-out ${
                isActive ? "bg-blue-950 text-white" : ""
                }`
            }
            >
            {tab.name}
            </NavLink>
        ))}           
    </div>
  );
}

import React from "react";
import "../../App.css";
import logo from "../../assets/teamLogo/ipl 1.png";
import trophy from "../../assets/trophy.png"; 

export default function TeamCard({onClick,team}) {
  return (
    <div className={`${team.championships?.length > 0 ?"flip-card":''} w-70 h-75 cursor-pointer`} onClick={onClick}>
      <div className="flip-card-inner">
        {/* front */}
        <div className="flip-card-front rotating-card backface-hidden w-full h-full flex flex-col rounded-lg shadow-lg shadow-black hover:shadow-2xl hover:shadow-stone-900 transition-all duration-300 ease-in-out overflow-hidden relative"
        style={{ background: team.team_name_bg }}>
          <div
            className={`w-full h-[80%] [clip-path:ellipse(70%_75%_at_50%_10%)] flex justify-center text-white text-2xl font-bold z-10 border-b-2`}
            style={{ background: team.team_theme_color }}  
          >
            <img src={team?.team_logo || logo} alt="Team Logo" className="h-50" />
          </div>

          <div
            className={`w-full flex-1 flex justify-center text-white text-lg font-semibold z-9`}
            
          >
            {team.team_name}
          </div>
        </div>

        {/* back */}
        { team?.championships.length > 0 && <div className="flip-card-back backface-hidden w-full h-full bg-sky-100 text-white flex flex-col justify-start rounded-lg py-5">
          
          <section className='flex  items-start justify-start gap-2 mx-5 my-2'>

              <img src={team?.team_logo} alt="Team Logo" className="w-8 h-8" />
              <span className='text-stone-900 font-bold text-2xl'>{team?.team_code}</span>
            
           </section>
           <section className='flex items-center justify-center   '>
            <img src={trophy} alt="Trophy" className="w-26 h-26" />
           </section>
           <section className='flex items-center justify-center mx-2 my-6  flex-wrap '>
            {team?.championships.map((year, index) => (
              <div key={index} className='flex items-center justify-center gap-2 mx-1'>
                <span className='text-stone-900 text-lg'>{year}</span>
                {index !== team?.championships.length - 1 && <span className='text-stone-900  text-lg'>|</span>}
              </div>
            ))}
           </section>
          </div>
          }
      </div>
    </div>
  );
}

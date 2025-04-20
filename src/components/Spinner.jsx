import React from 'react';
import loader from '../assets/loaderBall.gif';

export default function Spinner() {
  return (
    <div className="w-screen h-screen bg-white/70 backdrop-blur flex justify-center items-center absolute top-0 left-0 z-50">
      <img src={loader} alt="Loading..." className="w-20 h-20" />
    </div>
  );
}

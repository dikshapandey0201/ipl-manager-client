import React from 'react'
import noball from '../assets/noball.webp'
export default function NotFound() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
      <img src={noball} alt="404 not found" className='w-100'/>
        <h1 className='text-2xl font-bold text-gray-700 ps-10'>Page Not Found</h1>
    </div>
  )
}

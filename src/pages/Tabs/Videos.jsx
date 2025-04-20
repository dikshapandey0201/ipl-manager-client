import React from 'react'
import { MdOutlineKeyboardArrowLeft,MdOutlineKeyboardArrowRight } from "react-icons/md";
import MediaCard from './MediaCard';
import { videoInfo } from '../../constants/DummyTeamData';




export default function Videos() {
  return (
    <div className=' h-auto w-full flex flex-col justify-center p-20'> 
      {Object.entries(videoInfo).map(([category, videos]) => (
        <div key={category}>
        
          <section className='w-full flex items-center justify-between mb-6 '>
            <h1 className='font-bold text-xl'>{category}</h1>
            <div className='flex items-center gap-2'>
              <button className='border border-gray-400 px-2 py-1 text-sm rounded'>See More</button>
              <span className='text-2xl'><MdOutlineKeyboardArrowLeft /></span>
              <span className='text-2xl'><MdOutlineKeyboardArrowRight /></span>
            </div>
          </section>

       
          <section className='w-full flex justify-evenly flex-wrap gap-4 mb-6'>
            {videos.map((item, index) => (
              <MediaCard
                key={`${category}-${index}`}
                heading={
                  item.heading.split(' ').length > 2
                    ? item.heading.split(' ').slice(0, 4).join(' ') + '...'
                    : item.heading
                }
                date={item.date}
                views={item.views}
                duration={item.duration}
                bgColor={category === 'Latest Videos' ? '#03046f' : '#fff'}
                textColor={category === 'Latest Videos' ? '#fff' : '#000'}
              />
            ))}
          </section>
        </div>
      ))}
    </div>
  );
  
}

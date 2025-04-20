import React from 'react'
import { MdOutlineKeyboardArrowLeft,MdOutlineKeyboardArrowRight } from "react-icons/md";
import { newsInfo } from '../../constants/DummyTeamData';
import MediaCard from './MediaCard';

export default function News() {
  return (
    <div className='p-20 w-full flex flex-col justify-center'> 
       {Object.entries(newsInfo).map(([category, news]) => (
              <div key={category}>
                
                <section className='w-full flex items-center justify-between mb-6'>
                  <h1 className='font-bold text-xl'>{category}</h1>
                  <div className='flex items-center gap-2'>
                    <button className='border border-gray-400 px-2 py-1 text-sm rounded'>See More</button>
                    <span className='text-2xl'><MdOutlineKeyboardArrowLeft /></span>
                    <span className='text-2xl'><MdOutlineKeyboardArrowRight /></span>
                  </div>
                </section>
                <section className='w-full flex justify-evenly flex-wrap gap-4 mb-6'>
                  {news.map((item, index) => (
                    <MediaCard
                      key={`${category}-${index}`}
                      heading={
                        item.heading.split(' ').length > 2
                          ? item.heading.split(' ').slice(0, 3).join(' ') + '...'
                          : item.heading
                      }
                      date={item.date}
                      bgColor={category === 'Latest Videos' ? '#03046f' : '#fff'}
                      textColor={category === 'Latest Videos' ? '#fff' : '#000'}
                    />
                  ))}
                </section>
              </div>
            ))}
    </div>
  )
}

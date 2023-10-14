import React from 'react';
import { useLacentContent } from '../../context/LacentContentContext';
import Image from 'next/image';
import { ClockIcon } from '@heroicons/react/solid';

const PodcastCard = () => {
  const { allContent } = useLacentContent();

  return (
    <div className='bg-white  flex flex-col w-[318px] p-4'>
      {allContent.map((item, i) => (
        <div key={i}>
          <Image src={item.contentImage} alt="image" width={234} height={234} className='w-full h-[86px] object-cover' />
          <div className='flex flex-col items-start'>
            <h2 className='text-[13px] font-semibold text-Black'>{item.contentName}</h2>
            <p className='text-Grey text-sm'>{item.contentDescription}</p>
            <div className='flex items-center justify-between w-full space-x-4'>
              <div className='flex items-center space-x-2'>
                <ClockIcon className='text-Orange w-[20px] h-[20px]' />
                <span className='text-Orange text-sm'>5:00</span>
              </div>
              <span>{item.shortTag}</span>
            </div>
            <div className='self-end items-end w-full'>
            
            </div>
          
            <button className='bg-Accent flex items-center justify-center space-x-2 w-full'>
              Buy now 
              <span >${Number(item.amount)}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PodcastCard;

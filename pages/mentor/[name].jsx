import React from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import Navbar from '../../components/Navbar'
import Avatar from 'react-avatar'
import { PhoneIcon } from '@heroicons/react/solid'

const MentorProfile = () => {
  return (
    <DefaultLayout>
        <Navbar />
        <div className='min-h-screen w-full overflow-y-scroll mx-[37px] my-[25px]'>
            <div className='w-[90%] bg-white p-[27px] flex items-center justify-between'>
               <div className='flex items-center space-x-5'>
                <Avatar />
                <div className='flex flex-col items-start'>
                    <span className='text-Black'>JosephK</span>
                    <span className='text-Black'>address</span>
                </div>
               </div>

               <div className='flex items-center border p-6'>
                  <PhoneIcon fontSize={23} className='text-Black w-[28px] h-[28px]' />
                  <span className='text-Black'>Schedule a call</span>
               </div>
            </div>
        </div>
    </DefaultLayout>
  )
}

export default MentorProfile
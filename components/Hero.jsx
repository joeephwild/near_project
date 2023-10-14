import { ConnectButton, useAccount } from '@particle-network/connect-react-ui';
import {boy, plant, main, logo} from '../assets/images'
import '@particle-network/connect-react-ui/dist/index.css';
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Hero = () => {
const account =  useAccount()
const route = useRouter()
  return (
    <div className=" my-[100px] gap-[190px]  w-full overflow-y-scroll">
      <div className="fixed left-[90px] top-[109px] flex flex-col items-start space-y-[35.47px]">
        <div className='flex items-start space-x-8'>
            <Image src={logo} alt="logo" className='w-[48px] h-[48px] object-contain' />
            <span className='text-[38px] font-bold text-Black'>Lacent</span>
        </div>
        <h2 className="w-[780px] text-Black text-8xl font-black">
          Learning and teaching, made <span className='text-Accent'>decentralized.</span>
        </h2>
        <span className="w-[780px] text-Grey text-xl font-normal">
          Enter the decentralized world in style as a langauge enthusiast, Earn
          and learn with smooth transaction all made possible with Verbal.
        </span>
        <div className="flex items-center space-x-7">
            {account && (
                    <button
                    onClick={() => route.push("/dashboard")}
                    className="bg-Accent text-Black px-[56px] py-[16px] rounded-[8px] text-[16px] font-bold"
                  >
                    Dashboard
                  </button>
            )}
            {!account &&  (
                  <div className=" flex items-center" >
                  <ConnectButton  />
                  </div>
            )}
          
    
          <button className="border-2 border-Accent text-Black px-[56px] py-[16px] rounded-[8px] text-[16px] font-bold">
            Learn More
          </button>
        </div>
        <div className="flex items-center space-x-[80px]">
          <div className="flex flex-col items-start">
            <span className="text-5xl text-Black leading-[100%] flex items-center">
              700<span className="text-Accent">+</span>
            </span>
            <span className='text-Black text-xl'>Hours of Content by 2024</span>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-5xl text-Black leading-[100%] flex items-center">
              575k<span className="text-Accent">+</span>
            </span>
            <span className='text-Black text-xl'>Active Users by 2024</span>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-5xl text-Black leading-[100%] flex items-center">
              $750k<span className="text-Accent">+</span>
            </span>
            <span className='text-Black text-xl'>Earned by 2024</span>
          </div>
        </div>
      </div>
      <>
        <Image
          src={main}
          alt="main"
          className="w-[312px] h-[234px] fixed top-[447px] right-[607px] object-contain"
        />
        <Image
          src={boy}
          alt="main"
          className="w-[705.699px] h-[597px] fixed top-[197px] right-[97px] object-fill"
        />
        <Image
          src={plant}
          alt="main"
          className="w-[494px] h-[747px] object-fill fixed top-[197px] right-0"
        />
      </>
    </div>
  );
};

export default Hero;
import React from 'react';
import { useLacentContent } from '../../context/LacentContentContext';
import Image from 'next/image';
import { ClockIcon } from '@heroicons/react/solid';
import { useAccount, useParticleProvider } from '@particle-network/connect-react-ui';
import {Packages} from '../../utils/index'
import { ethers } from 'ethers';

const StoreCard = () => {
  const {  conectwithContract } = useLacentContent();
  const account = useAccount()
  const particleProvider = useParticleProvider()

  const handlePurchase = async(id, amount) => {
    try {
       // Convert the amount to Wei (the smallest unit of Ether)
    const amountInWei = ethers.utils.parseEther(amount.toString());
  
    // Get the signer from the provider
    const provider = new ethers.providers.Web3Provider(particleProvider, "any");
    const signer = provider.getSigner()
  
    // Create a transaction
    const transaction = {
      to: "0xC0B95C81E256C4aACa3547903a48AC67De586499", // The address of the recipient
      value: amountInWei // The amount of Ether to send
    };

    
  const selectedPackage = Packages.find((pkg) => pkg.package_id === id);

  if (!selectedPackage) {
    alert('Invalid package ID');
    return;
  }

    const userBalance = await signer.getBalance();

    if (userBalance.lt(amountInWei)) {
      alert('Insufficient funds');
      return;
    }
  
    // Send the transaction
    const tx = await signer.sendTransaction({
      to: transaction.to,
      value: transaction.value,
      from: account,
    });
  
    // Wait for the transaction to be mined
    const receipt = await tx.wait();
  
    console.log('Transaction successful with hash:', receipt.transactionHash);
    } catch (error) {
      console.log(error.message)
    }
   
  };

  return (
    <div className=' flex gap-[20px] space-x-9  p-4'>
      {Packages.map((item, i) => (
        <div key={i} className='w-[318px] bg-white p-9'>
          <Image 
          src={item.image_url} 
          alt="image" 
          width={234} 
          height={234} 
          className='w-full h-[196px] object-cover' />
          <div className='flex flex-col mt-3 space-y-3 items-start'>
            <div className='flex items-center justify-between w-full space-x-4'>
              <span className='text-Black font-semibold text-lg'>{item.name}</span>
              <span className='text-sm font-medium text-Grey'>{item.lives_received} Lives</span>
            </div>
          
      
           <button 
           onClick={() => handlePurchase(item.package_id, item.price_in_ether)} 
           className='bg-Accent flex items-center text-Black justify-center py-[15px] mt-3 space-x-2 w-full'>
             Buy Now {item.price_in_ether}
           </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StoreCard;

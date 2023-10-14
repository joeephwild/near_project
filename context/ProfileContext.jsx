import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParticleProvider, useAccount } from '@particle-network/connect-react-ui';
import { ethers } from "ethers";
import { ProfileAbi, profileAddress } from "../constants/contract";
import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider"
import { AuroraTestnet } from "@particle-network/chains";

// Create a context for user data.
const ProfileContext = createContext();

// Custom hook for accessing user context data.
export const useUser = () => useContext(ProfileContext);

// Provider component that wraps parts of the app that need user context.
export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null); // Added user profile state
  const particleProvider = useParticleProvider();
  const account = useAccount();
  const [accountName, setAccountName] = useState("");
  const [userLearnImage, setUserLearnImage] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const route = useRouter()

  const conectwithContract = async() => {
    try {
      const provider = new ethers.providers.Web3Provider(particleProvider, "any");
      const signer = provider.getSigner()
      const contract =  new ethers.Contract(profileAddress, ProfileAbi, signer);
      return contract
    } catch (error) {
      console.log(error);
    }
  }

const createProfile = async(
  learnToSpeak,
  spokenLanguage,
  userNames,
  image
) => {
  try {
    const contract = await conectwithContract();
    const tx = await contract.createAProfile(
      learnToSpeak,
      spokenLanguage,
      userNames,
      image
    );
    console.log(tx,hash)
    await tx.wait()
    setModalOpen(true)
  } catch (error) {
    console.log(error.message);
  }
}

const getUserName = async() => {
  try {
    const contract = await conectwithContract();
    const name = await contract.retrieveUserName(account);
    console.log(name)
    setAccountName(name)
  } catch (error) {
    console.log(error.message)
  }
}

const getUserLanguage = async() => {
  try {
    const contract = await conectwithContract();
    const name = await contract.retrieveLearnLanguage(account);
    console.log(name)

  } catch (error) {
    console.log(error.message)
  }
}

const getAllAccount = async() => {
  try {
    const contract = await conectwithContract();
    const name = await contract.retriveallAccount();
    console.log(name)
  
  } catch (error) {
    console.log(error.message)
  }
}


useEffect(() => {
  getUserName();
  getUserLanguage();
  getAllAccount();
  fetchUserProfile(); // Fetch the user's profile when the component mounts
  fetchUserLanuageImage();
}, [account]);

// Fetch the user's profile data
const fetchUserProfile = async () => {
  try {
    const contract = await conectwithContract();
    const profileData = await contract.getUserProfile(account);
    setUserProfile(profileData);
  } catch (error) {
    console.log(error.message);
  }
};

// Fetch the user's profile data
const fetchUserLanuageImage = async () => {
  try {
    const contract = await conectwithContract();
    const profileData = await contract.retriveLanugeImage(account);
    setUserLearnImage(profileData);
  } catch (error) {
    console.log(error.message);
  }
};

  const value = {
    createProfile,
    userProfile,
    accountName,
    userLearnImage,
    modalOpen
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

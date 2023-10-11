import React, { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from '@mintbase-js/react'
import { useRouter } from "next/router";

// Create the context with default values
const FlowContext = createContext(undefined);

// Custom hook to use the Flow context
export const useFlow = () => useContext(FlowContext);

// Provider component to wrap around components that need access to the context
export const FlowProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [active, setActive] = useState("learn");
  const [modalOpen, setModalOpen] = useState(false);
  const route = useRouter();
  const {connect, disconnect, isConnected, accounts } = useWallet()

  // Log in function
  const logIn = async () => {
    try {
      if(!isConnected){
    const RES =    connect()
        setCurrentUser(accounts)
        console.log(RES)
      }
    } catch (error) {
      alert("error connectting wallet");
      console.error(error);
    }
  };

  // Log out function
  const logOut = async () => {
    try {
    
    } catch (error) {
      console.log(error);
    }
  };

  // // Effect to initialize Magic when the component mounts
  useEffect(() => {
    const getCurrentUser = async () => {
    if(isConnected){}
    };
    getCurrentUser();
  }, [currentUser]);

  return (
    <FlowContext.Provider
      value={{
        currentUser,
        logIn,
        // logOut,
        setActive,
        active,
        modalOpen,
        setModalOpen,
        // openWallet,
        isConnected
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

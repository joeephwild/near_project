import React from "react";
import ChatApp from '../components/ChatPage/ChatApp';
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import { RealTimeChat }  from "../components/ChatPage/RealTimeChat";
import { MagicLink } from "../components/ChatPage/MagicLink";
import { LoginPage } from "../components/ChatPage/LoginPage";
import StoreCard from "../components/store/storeCard";




function Chat() {
  return (
    <div>
      <DefaultLayout>
      <Navbar /> 
      <h1 class="text-black text-xl ml-6 pt-4 pb-4">Lacent Store</h1>
      <div className="m-9">
      <StoreCard />
      </div>
      </DefaultLayout>   
    </div>
    
  );
}

export default Chat;
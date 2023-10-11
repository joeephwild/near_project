import "../styles/globals.css";
import { FlowProvider } from "../context/FlowContext";
// import { UserProvider } from "../context/UserContext";
// import { ContractProvider } from "../context/ContractProvider";
import { WalletContextProvider } from '@mintbase-js/react';
import '@near-wallet-selector/modal-ui/styles.css';


function MyApp({ Component, pageProps }) {
  return (
    <WalletContextProvider network="testnet">
    <FlowProvider>
   <Component {...pageProps} />
   </FlowProvider>
   </WalletContextProvider>
  );
}

export default MyApp;
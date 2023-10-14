import "../styles/globals.css";
import { FlowProvider } from "../context/FlowContext";
// import { UserProvider } from "../context/UserContext";
// import { ContractProvider } from "../context/ContractProvider";
import { WalletContextProvider } from '@mintbase-js/react';
import '@near-wallet-selector/modal-ui/styles.css';
import { ModalProvider } from '@particle-network/connect-react-ui';
import { WalletEntryPosition } from '@particle-network/auth';
import { Aurora, AuroraTestnet } from '@particle-network/chains';
import { evmWallets } from '@particle-network/connect';
import { UserProvider } from "../context/ProfileContext";
import { MentorProvider } from "../context/MentorContext";
import { LacentBadgeProvider } from "../context/Badge";
import { LacentContentProvider } from "../context/LacentContentContext";


function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider
    options={{
      appId: "8ce5a31d-a471-48ff-b4c6-99b93b61ab0e",
      projectId: "937256ff-1c16-4637-9716-6abb9523400b",
      clientKey: "cQqy2FdDHCGNmJCWsQn2lCuxpBmZLqtjY2StlUBR",
      chains: [AuroraTestnet],
      particleWalletEntry: {
        defaultWalletEntryPosition: WalletEntryPosition.Left,
        displayWalletEntry: true,
        supportChains: [AuroraTestnet],
      },
      securityAccount: {
        promptMasterPasswordSettingWhenLogin: true,
        promptSettingWhenSign: true
      }
    }}
    language="en"
     theme="light"
     walletSort={["Particle Auth", "Wallet"]}
     particleAuthSort={[
        "email",
        "phone",
        "google",
        "apple",
        "facebook",
     ]}
    >
    <FlowProvider>
      <MentorProvider>
      <UserProvider>
        <LacentBadgeProvider>
          <LacentContentProvider>
   <Component {...pageProps} />
   </LacentContentProvider>
   </LacentBadgeProvider>
   </UserProvider>
   </MentorProvider>
   </FlowProvider>
   </ModalProvider>
  );
}

export default MyApp;
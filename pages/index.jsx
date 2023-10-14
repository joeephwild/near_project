import Head from "next/head";
import Image from "next/image";
import { useFlow } from "../context/FlowContext";
import ConnectModal from "../components/ConnectModal";
import { flow, hero, hero2, logo, magic } from "../assets/images";
import Link from "next/link";
import Hero from '../components/Hero'

export default function Home() {
  // const { logIn, currentUser, modalOpen, setModalOpen } = useFlow();
  return (
    <div>
      <Head>
        <title>Lancent: A Language space for Web3 Enthusiast</title>
        <meta
          name="description"
          content="Lancent Language learning in the web3 space"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
    <Hero />
      </main>
    </div>
  );
}

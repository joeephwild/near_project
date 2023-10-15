import { useAccount, useParticleProvider } from '@particle-network/connect-react-ui';
import { createContext, useContext, useState, useEffect} from 'react'
import { LacentContentAbi, LacentContentAddress } from '../constants/contract';
import { BigNumber, ethers } from 'ethers';

const LacentContentContext = createContext()

export const useLacentContent = () => useContext(LacentContentContext)

export const LacentContentProvider = ({ children }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [allContent, setAllContent] = useState([])
    const particleProvider = useParticleProvider();
    const account = useAccount()

    const contentAddress = LacentContentAddress
    const contentABI = LacentContentAbi

    const conectwithContract = async() => {
        try {
          if (!particleProvider) {
            throw new Error('Particle provider is not initialized');
          }
          const provider = new ethers.providers.Web3Provider(particleProvider, "any");
          const signer = provider.getSigner()
          const contract =  new ethers.Contract(contentAddress, contentABI, signer);
          return contract
        } catch (error) {
          console.log(error);
        }
      }

      const createAContent = async(
        _contentName,
        _contentImage,
        _contentDescription,
        _contentLink,
         _contentOwnerName,
        _shortTag,
        _category,
        _amount
      )  => {
        try {
            const contract = await conectwithContract();
            const tx = await contract.createContent(
                _contentName,
                _contentImage,
                _contentDescription,
                _contentLink,
                 _contentOwnerName,
                _shortTag,
                _category,
                _amount
            )
            console.log(tx.hash)
            await tx.wait()
            setModalOpen(true)
            return `https://explorer.testnet.aurora.dev/tx/${tx.hash}`
        } catch (error) {
            console.log(error.message)
        }
      }

      const retriveBuyers = async() => {
        try {
            const contract = await conectwithContract();
            const buyers = await contract.retrieveBuyers()
            console.log(buyers)
            return buyers
        } catch (error) {
            console.log(error)
        }
      }

      const getAllContent = async() => {   
        try {
            const contract = await conectwithContract();
            const allContent = await contract.retrieveAllContent()
            console.log(allContent)
            setAllContent(allContent)
            return allContent
        } catch (error) {
            console.log(error)
        }
      }

      const purcahseAContent = async(_id, amount) => {
        try {
            const contract = await conectwithContract();
            const tx = await contract.purchaseContent(
                _id,
                {
                  value: BigNumber.from(amount),
                  // gasLimit: 1000000,
                }
            )
            console.log(tx.hash)
            await tx.wait()
            setModalOpen(true)
            return `https://explorer.testnet.aurora.dev/tx/${tx.hash}`
        } catch (error) {
            console.log(error.message)
            alert(error.message)
        }
      }

      useEffect(() => {
            getAllContent()
      }, [account])

    return(
        <LacentContentContext.Provider value={{
            modalOpen,
            setModalOpen,
            createAContent,
            allContent,
            purcahseAContent,
            conectwithContract
        }}>
            {children}
        </LacentContentContext.Provider>
    )
}
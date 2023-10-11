require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const AURORA_PRIVATE_KEY = process.env.AURORA_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337
    },
    testnet_aurora: {
      url: 'https://testnet.aurora.dev',
      accounts: [`0x${AURORA_PRIVATE_KEY}`],
      chainId: 1313161555,
      gasPrice: 120 * 1000000000
    },
    local_aurora: {
      url: 'http://localhost:8545',
      accounts: [`0x${AURORA_PRIVATE_KEY}`],
      chainId: 1313161555,
      gasPrice: 120 * 1000000000
    },
    // ropsten: {
    //   url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
    //   accounts: [`0x${AURORA_PRIVATE_KEY}`],
    //   chainId: 3,
    //   live: true,
    //   gasPrice: 50000000000,
    //   gasMultiplier: 2,
    // },
  }
};

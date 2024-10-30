require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const AIA_URL = process.env.AIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    aiaTestnet: {
      url: AIA_URL,
      accounts: [PRIVATE_KEY],
      gas: 9000000000, // Gas limit
      gasPrice: 90000000000000, // Increased to 40 gwei from 20 gwei
      // Adding EIP-1559 specific settings
      maxFeePerGas: 90000000000000, // 40 gwei
      maxPriorityFeePerGas: 90000000000000, // 40 gwei
    },
  },
};
import "@nomicfoundation/hardhat-toolbox-viem";
import dotenv from "dotenv";
import type { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;

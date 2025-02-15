import * as fs from "fs";
import { artifacts, viem } from "hardhat";
import path from "path";

async function main() {
  const [deployer] = await viem.getWalletClients();
  console.log(deployer);
  const contractList = [
    // "Contract Name", "Contract Factory Name"
    // ["Simple DeFi Token", "SimpleDeFiToken"],
    // ["Meme Token", "MemeToken"],
    // ["Pair Factory", "PairFactory"],
    ["AMM Router", "AMMRouter"], // AMMRouter must come after PairFactory
  ];

  let pairFactoryAddress;

  // Deploying the smart contracts and save contracts to frontend
  for (const [name, factory] of contractList) {
    const args = factory === "PairFactory" ? [deployer.account.address] : [];
    let contractFactory: any = await viem.deployContract(factory, args);
    console.log(`${name} Contract Address:`, contractFactory.address);
    if (factory === "PairFactory") {
      pairFactoryAddress = contractFactory.address;
    }
    saveContractToFrontend(contractFactory, factory);
  }

  console.log("Deployer: ", deployer.account.address);
}

function saveContractToFrontend(contract: any, name: string) {
  const contractDir = path.join(__dirname, "/contracts");
  if (!fs.existsSync(contractDir)) {
    fs.mkdirSync(contractDir);
  }

  fs.writeFileSync(
    contractDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
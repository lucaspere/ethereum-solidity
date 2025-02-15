import * as fs from "fs";
import { artifacts, viem } from "hardhat";
import path from "path";
async function main() {
  const helloWorld = await viem.deployContract("TokenPair", []);
    await saveContractToFrontend(helloWorld.address, "TokenPair");
  console.log(`contract deployed at ${helloWorld.address}`);
}

async function saveContractToFrontend(address: `0x${string}`, name: string) {
  const contractDir = path.join(__dirname, "/contracts");
  if (!fs.existsSync(contractDir)) {
    fs.mkdirSync(contractDir);
  }

  fs.writeFileSync(
    `${contractDir}/${name}-address.json`,
    JSON.stringify({ address }, undefined, 2)
  );
    
  const contractArtifact = await artifacts.readArtifact(name);
    fs.writeFileSync(
        `${contractDir}/${name}.json`,
        JSON.stringify(contractArtifact.abi, undefined, 2)
        );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

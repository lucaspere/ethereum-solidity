import { viem } from "hardhat";


async function main() {
    // const helloWorld = await viem.deployContract("HelloWorld", []);
    const accounts = await viem.getWalletClients();
    console.log(accounts);
    // console.log(`contract deployed at ${helloWorld.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
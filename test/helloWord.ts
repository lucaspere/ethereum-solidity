import { expect } from "chai";
import hre from "hardhat";

describe("HelloWorld", function () {
    it("Should return the correct message", async function () {
        const {abi, bytecode} = await import("../artifacts/contracts/helloWord.sol/HelloWorld.json");
        const HelloWorld = await hre.viem.deployContract("HelloWorld", []);
        const message = await HelloWorld.read.getMessage();
        expect(message).to.equal("Hello, World!");
        await HelloWorld.write.setMessage(["Hey, Lucas!"]);
        const message2 = await HelloWorld.read.getMessage();
        expect(message2).to.equal("Hey, Lucas!");
    });
});
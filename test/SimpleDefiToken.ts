import "@nomicfoundation/hardhat-chai-matchers";
import { expect } from "chai";
import { ethers, parseEther } from "ethers";
import { viem } from "hardhat";

describe("MyToken", function () {
  async function deployMyTokenFixture() {
    const myTokenContract = await viem.deployContract("SimpleDeFiToken", []);
    const owner = await myTokenContract.read.owner();
    const user1 = ethers.getAddress(
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    );
    const user2 = ethers.getAddress(
      "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
    );
    console.log(user1, user2);
    return { myTokenContract, owner, user1, user2 };
  }

  it("Should transfer with auto burn 10%", async function () {
    const { myTokenContract, owner, user1, user2 } = await deployMyTokenFixture();
    await myTokenContract.write.transfer([
      user1 as `0x${string}`,
      parseEther("5"),
    ]);

    const balance1 = await myTokenContract.read.balanceOf([user1 as `0x${string}`]);
    const balance2 = await myTokenContract.read.balanceOf([owner as `0x${string}`]);
    expect(balance1).to.equal(parseEther("5"));
    expect(balance2).to.equal(parseEther("999995"));
  });

  it("Cannot transfer more than 10%", async function () {
    const { myTokenContract, owner, user1, user2 } = await deployMyTokenFixture();
    await myTokenContract.write.transfer([
      user1 as `0x${string}`,
      parseEther("10"),
    ]);

    await expect(
      myTokenContract.write.transfer([
        user1 as `0x${string}`,
        parseEther("1000"),
      ])
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });
});

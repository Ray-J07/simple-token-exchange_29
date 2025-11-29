const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Simple Token Exchange", function () {
  let owner, user;
  let tokenA, tokenB, exchange;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("TestToken");
    tokenA = await Token.deploy("TokenA", "TA", 1000000);
    tokenB = await Token.deploy("TokenB", "TB", 1000000);

    const Exchange = await ethers.getContractFactory("SimpleExchange");
    exchange = await Exchange.deploy(tokenA.address, tokenB.address, 100);

    await tokenB.transfer(exchange.address, ethers.utils.parseEther("100000"));
    await tokenA.transfer(user.address, ethers.utils.parseEther("1000"));
  });

  it("should allow user to swap A to B", async () => {
    await tokenA.connect(user).approve(exchange.address, ethers.utils.parseEther("10"));

    await exchange.connect(user).swapAtoB(ethers.utils.parseEther("10"));

    const balanceB = await tokenB.balanceOf(user.address);
    expect(balanceB).to.equal(ethers.utils.parseEther("1000")); // 10 * 100
  });
});

const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("TestToken");

  const tokenA = await Token.deploy("TokenA", "TA", 1000000);
  await tokenA.deployed();

  const tokenB = await Token.deploy("TokenB", "TB", 1000000);
  await tokenB.deployed();

  console.log("TokenA deployed to:", tokenA.address);
  console.log("TokenB deployed to:", tokenB.address);

  const Exchange = await hre.ethers.getContractFactory("SimpleExchange");
  const exchange = await Exchange.deploy(tokenA.address, tokenB.address, 100);
  await exchange.deployed();

  console.log("Exchange deployed to:", exchange.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

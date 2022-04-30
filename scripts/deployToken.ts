import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat";
import fs from "fs";

export const deployToken = async () => {
  const location = "./scripts/out/token.address";
  if (fs.existsSync(location)) {
    console.log("Token already exists");
  }

  const EasyLinkToken = await ethers.getContractFactory("EasyLinkToken");
  const easyLinkToken = await EasyLinkToken.deploy();

  console.log("EasyLinkToken token deployed to:", easyLinkToken.address);

  const outDir = "./scripts/out";
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  fs.writeFileSync(location, easyLinkToken.address);
}

deployToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
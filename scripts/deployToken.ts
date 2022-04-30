import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat";
import fs from "fs";

export const deployToken = async (path: string) => {
  if (fs.existsSync(path)) {
    console.log("Token already exists");
    return;
  }

  const EasyLinkToken = await ethers.getContractFactory("EasyLinkToken");
  const easyLinkToken = await EasyLinkToken.deploy();

  console.log("EasyLinkToken token deployed to:", easyLinkToken.address);

  fs.writeFileSync(path, easyLinkToken.address);
}
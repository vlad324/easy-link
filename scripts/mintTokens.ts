import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat";
import fs from "fs";
import { EasyLinkToken } from "../artifacts/contracts/types";

const mintTokens = async () => {
  const tokenAddress = fs.readFileSync("./scripts/out/token.address", "utf8");
  const EasyLinkToken = await ethers.getContractFactory("EasyLinkToken");
  const easyLinkToken = EasyLinkToken.attach(tokenAddress) as EasyLinkToken;

  const result = await easyLinkToken.mint(ethers.utils.parseEther("100"));
  console.log(result);
}

mintTokens()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat";
import fs from "fs";

const deploy = async () => {
  const amount = ethers.utils.parseEther("1");

  const outDir = "./scripts/out/";
  const tokenAddress = fs.readFileSync(`${outDir}token.address`, "utf8");
  const verifierAddress = fs.readFileSync(`${outDir}verifier.address`, "utf8");
  const hasherAddress = fs.readFileSync(`${outDir}hasher.address`, "utf8");

  const EasyLink = await ethers.getContractFactory("EasyLink");
  const easyLink = await EasyLink.deploy(tokenAddress, amount, verifierAddress, 10, hasherAddress);
  console.log("EasyLink deployed to:", easyLink.address);

  fs.writeFileSync(`${outDir}easyLink.address`, easyLink.address);
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
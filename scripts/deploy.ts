import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat";
import fs from "fs";
import { deployToken } from "./deployToken";
import { deployVerifier } from "./deployVerifier";
import { deployHasher } from "./deployHasher";

const deploy = async () => {
  const outDir = "./scripts/out/";

  const tokenPath = `${outDir}token.address`;
  if (!fs.existsSync(tokenPath)) {
    await deployToken();
  }

  const verifierPath = `${outDir}verifier.address`;
  if (!fs.existsSync(verifierPath)) {
    await deployVerifier();
  }

  const hasherPath = `${outDir}hasher.address`;
  if (!fs.existsSync(hasherPath)) {
    await deployHasher();
  }

  const amount = ethers.utils.parseEther("1");

  const tokenAddress = fs.readFileSync(tokenPath, "utf8");
  const verifierAddress = fs.readFileSync(verifierPath, "utf8");
  const hasherAddress = fs.readFileSync(hasherPath, "utf8");

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
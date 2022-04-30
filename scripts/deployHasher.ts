import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat";
import fs from "fs";

export const deployHasher = async () => {
  const location = "./scripts/out/hasher.address";
  if (fs.existsSync(location)) {
    console.log("Hasher already exists");
    return;
  }

  const PoseidonHasher = await ethers.getContractFactory("PoseidonHasher");
  const hasher = await PoseidonHasher.deploy();
  console.log("PoseidonHasher deployed to:", hasher.address);

  const outDir = "./scripts/out";
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  fs.writeFileSync(location, hasher.address);
}
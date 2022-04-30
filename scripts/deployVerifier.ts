import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat";
import fs from "fs";

export const deployVerifier = async () => {
  const location = "./scripts/out/verifier.address";
  if (fs.existsSync(location)) {
    console.log("Verifier already exists");
  }

  const Verifier = await ethers.getContractFactory("Verifier");
  const verifier = await Verifier.deploy();
  console.log("Verifier deployed to:", verifier.address);

  const outDir = "./scripts/out";
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  fs.writeFileSync(location, verifier.address);
}

deployVerifier()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
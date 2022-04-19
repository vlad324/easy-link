import { HardhatUserConfig, subtask } from "hardhat/config";
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import "hardhat-circom";
import * as path from "path";
import { readFile, writeFile } from "fs/promises";
import { TASK_CIRCOM_TEMPLATE } from "hardhat-circom";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const config: HardhatUserConfig = {
  solidity: "0.8.13",
  circom: {
    inputBasePath: "./circuits",
    outputBasePath: "./artifacts/circuits",
    ptau: "pot12_final.ptau",
    circuits: [{
      name: "withdraw",
      input: "input.json",
    }],
  },
  typechain: {
    outDir: "artifacts/contracts/types",
    target: "ethers-v5"
  },
}

export default config;

const circomTemplate = async ({ zkeys }: any, hre: HardhatRuntimeEnvironment) => {

  const groth16Template = await readFile(path.resolve("./circuits/template/verifier_groth16.sol.ejs"), "utf8");

  let combinedVerifier = "";
  for (const zkey of zkeys) {
    const verifierSol = await hre.snarkjs.zKey.exportSolidityVerifier(zkey, {
      groth16: groth16Template,
      plonk: "",
    });
    combinedVerifier += verifierSol;
  }

  await writeFile("./artifacts/circuits/Verifier.sol", combinedVerifier);
}

subtask(TASK_CIRCOM_TEMPLATE, "generate Verifier template shipped by SnarkjS").setAction(circomTemplate);

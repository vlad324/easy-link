import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"
import { Verifier } from "../artifacts/contracts/types"
// @ts-ignore
import { groth16 } from "snarkjs";
import { BigNumber } from "ethers";
// @ts-ignore
import { buildPoseidon } from "circomlibjs";
import { MerkleTree } from "fixed-merkle-tree";
// @ts-ignore
import { utils } from "ffjavascript";
import { expect } from "chai";
import { randomBN } from "./utils";
import { PoseidonHasher } from "./poseidonHasher";

describe("Verifier", () => {
  let poseidon: PoseidonHasher;

  before(async () => {
    poseidon = new PoseidonHasher(await buildPoseidon());
  });

  it("should verify proof", async () => {
    const Verifier = await ethers.getContractFactory("Verifier");
    const verifier = (await Verifier.deploy()) as Verifier;

    const index = 627;
    const leaves: string[] = [];
    let nullifier = "";
    let secret = "";
    for (let i = 0; i < 1024; i++) {
      const a = randomBN();
      const b = randomBN();
      if (i === index) {
        nullifier = a.toString();
        secret = b.toString();
      }

      leaves.push(poseidon.hash(a, b).toString());
    }
    const tree = new MerkleTree(10, [], {
      hashFunction: (a, b) => poseidon.hash(BigNumber.from(a), BigNumber.from(b)).toString()
    });
    tree.bulkInsert(leaves);

    const merkleProof = tree.proof(leaves[index]);

    const recipient = BigNumber.from("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2").toString();
    const input: Input = {
      recipient: recipient,
      root: merkleProof.pathRoot.toString(),
      nullifier: nullifier,
      secret: secret,
      pathElements: [...merkleProof.pathElements].map(it => it.toString()),
      pathIndices: [...merkleProof.pathIndices]
    }

    const pathAsNumber = [...merkleProof.pathIndices]
      .reverse()
      .reduce((previousValue, currentValue) => previousValue * 2 + currentValue, 0);
    const nullifierHash = poseidon.hash(BigNumber.from(nullifier), BigNumber.from(pathAsNumber)).toString();

    const proof = await generateProof(input);
    const valid = await verifier.verifyProof(
      [proof.pi_a[0], proof.pi_a[1]],
      [[proof.pi_b[0][1], proof.pi_b[0][0]], [proof.pi_b[1][1], proof.pi_b[1][0]]],
      [proof.pi_c[0], proof.pi_c[1]],
      [nullifierHash, recipient, merkleProof.pathRoot]
    );

    expect(valid).to.be.true;
  });
});

type Input = {
  recipient: string,
  root: string,
  nullifier: string,
  secret: string,
  pathElements: string[],
  pathIndices: number[]
}

type Proof = {
  pi_a: string[3],
  pi_b: string[3][2],
  pi_c: string[2],
  protocol: string,
  curve: string
}

const generateProof = async (input: Input): Promise<Proof> => {
  const { proof } = await groth16.fullProve(
    utils.stringifyBigInts(input),
    "./artifacts/circuits/withdraw.wasm",
    "./artifacts/circuits/withdraw.zkey");

  return proof;
}
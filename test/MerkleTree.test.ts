import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"
import { IPoseidonHasher, MerkleTree } from "../artifacts/contracts/types"
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { randomBN } from "./utils";
import { PoseidonHasher } from "./poseidonHasher";
// @ts-ignore
import { buildPoseidon } from "circomlibjs";
import { BigNumber } from "ethers";
import { MerkleTree as MerkleTreeJs } from "fixed-merkle-tree";

chai.use(solidity);

describe("MerkleTree", () => {
  let poseidon: PoseidonHasher;
  let hasher: IPoseidonHasher;
  let merkleTree: MerkleTree;

  before(async () => {
    poseidon = new PoseidonHasher(await buildPoseidon());
  });

  beforeEach(async () => {
    const Hasher = await ethers.getContractFactory("PoseidonHasher");
    hasher = (await Hasher.deploy()) as IPoseidonHasher;
    const MerkleTree = await ethers.getContractFactory("MerkleTree");
    merkleTree = (await MerkleTree.deploy(9, hasher.address)) as MerkleTree;
  });

  it("initial index should be 0", async () => {
    const MerkleTree = await ethers.getContractFactory("MerkleTree");
    const merkleTreeNew = (await MerkleTree.deploy(2, hasher.address)) as MerkleTree;

    const index = await merkleTreeNew.index();

    chai.expect(index).to.be.equal(0);
  });

  it("should insert a leaf into Merkle tree", async () => {
    const left = randomBN();
    await merkleTree.insert(left);

    const root = await merkleTree.roots(0);

    const tree = new MerkleTreeJs(9, [], {
      hashFunction: (a, b) => poseidon.hash(BigNumber.from(a), BigNumber.from(b)).toString(),
      zeroElement: "12339540769637658105100870666479336797812683353093222300453955367174479050262"
    });
    tree.insert(left.toString());

    chai.expect(root.toString()).to.be.equal(tree.root.toString());

    const newIndex = await merkleTree.index();
    chai.expect(newIndex).to.be.equal(1);
  });
});
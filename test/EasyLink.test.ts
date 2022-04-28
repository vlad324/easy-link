import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat";
import chai from "chai";
import { PoseidonHasher } from "./poseidonHasher";
import { EasyLink, EasyLinkToken, IPoseidonHasher, Verifier } from "../artifacts/contracts/types";
// @ts-ignore
import { buildPoseidon } from "circomlibjs";
import { randomBN } from "./utils";
import { solidity } from "ethereum-waffle";
import { MerkleTree } from "fixed-merkle-tree";
import { BigNumber } from "ethers";

chai.use(solidity);

describe("EasyLink", () => {
  let poseidon: PoseidonHasher;
  let token: EasyLinkToken;
  let verifier: Verifier;
  let hasher: IPoseidonHasher;
  let easyLink: EasyLink;

  before(async () => {
    poseidon = new PoseidonHasher(await buildPoseidon());
  });

  beforeEach(async () => {
    const Token = await ethers.getContractFactory("EasyLinkToken");
    token = (await Token.deploy()) as EasyLinkToken;

    await token.mint(ethers.utils.parseEther("100"));

    const Verifier = await ethers.getContractFactory("Verifier");
    verifier = (await Verifier.deploy()) as Verifier;

    const Hasher = await ethers.getContractFactory("PoseidonHasher");
    hasher = (await Hasher.deploy()) as IPoseidonHasher;

    const EasyLink = await ethers.getContractFactory("EasyLink");
    easyLink = (await EasyLink.deploy(token.address, ethers.utils.parseEther("1"),
      verifier.address, 9, hasher.address)) as EasyLink;
  });

  it("should have initial index set to 0", async () => {
    const index = await easyLink.index();

    chai.expect(index).to.be.equal(0);
  });

  it("should add a new commitment", async () => {
    const commitment = randomBN();

    await token.approve(easyLink.address, ethers.utils.parseEther("1"));

    await chai.expect(easyLink.deposit(commitment))
      .to.emit(easyLink, "Deposit")
      .withArgs(commitment, 0);

    const tree = new MerkleTree(9, [], {
      hashFunction: (a, b) => poseidon.hash(BigNumber.from(a), BigNumber.from(b)).toString(),
      zeroElement: "12339540769637658105100870666479336797812683353093222300453955367174479050262"
    });
    tree.insert(commitment.toString());

    const root = await easyLink.roots(0);

    chai.expect(root).to.be.equal(tree.root);
  });

  it("should revert when duplicated commitment", async () => {
    const commitment = randomBN();

    await token.approve(easyLink.address, ethers.utils.parseEther("1"));

    await chai.expect(easyLink.deposit(commitment))
      .to.emit(easyLink, "Deposit")
      .withArgs(commitment, 0);

    await chai.expect(easyLink.deposit(commitment))
      .to.revertedWith("Duplicated commitment");
  });
});
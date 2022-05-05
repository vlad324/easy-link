import { Box, Button, Text, Textarea, VStack } from "@chakra-ui/react"
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { GlobalContext, LocalStoredEvent } from "../contexts/GlobalContext";
import base64url from "base64url";
import { BigNumber } from "ethers";
import { MerkleTree } from "fixed-merkle-tree";
import { generateProof } from "../utils/proof";
import { CheckIcon } from "@chakra-ui/icons";
import { EASY_LINK_EVENTS_KEY } from "../utils/constants";

const Redeem = () => {

  const context = useContext(GlobalContext);

  const [secretBase64, setSecretBase64] = useState<string>();
  const [error, setError] = useState<string>();
  const [secret, setSecret] = useState<string>();
  const [nullifier, setNullifier] = useState<string>();
  const [tree, setTree] = useState<MerkleTree | undefined>();
  const [redeemLoading, setRedeemLoading] = useState<boolean>();
  const [redeemed, setRedeemed] = useState<boolean>();

  useEffect(() => {
    if (!secretBase64) {
      return;
    }

    setRedeemLoading(true);
    const decoded = base64url.decode(secretBase64);
    const dividerIndex = decoded.indexOf("#");

    if (dividerIndex == -1) {
      setError("Provided secret is not valid");
      setRedeemLoading(false);
      return;
    }

    let nullifierLocal;
    let secretLocal;
    try {
      nullifierLocal = decoded.slice(0, dividerIndex);
      setNullifier(BigNumber.from(nullifierLocal).toString());

      secretLocal = decoded.slice(dividerIndex + 1);
      setSecret(BigNumber.from(secretLocal).toString());

    } catch (e) {
      console.log(e);
      setError("Provided secret is not valid");
      setRedeemLoading(false);
      return;
    }

    if (!context.easyLink) {
      console.log("No EasyLink contract");
      setRedeemLoading(false);
      return;
    }

    const commitment = context.hasher.hash(BigNumber.from(nullifierLocal), BigNumber.from(secretLocal)).toString();

    const events = JSON.parse(localStorage.getItem(EASY_LINK_EVENTS_KEY) || "[]") as LocalStoredEvent[]
    const paidCommitment = events.filter(it => it.commitment === commitment);
    if (paidCommitment.length == 0) {
      setError("Related payment link wasn't payed yet");
      setRedeemLoading(false);
      return;
    }

    const tree = new MerkleTree(10, [], {
      hashFunction: (a, b) => context.hasher.hash(BigNumber.from(a), BigNumber.from(b)).toString(),
      zeroElement: "12339540769637658105100870666479336797812683353093222300453955367174479050262"
    });
    tree.bulkInsert(events.map(it => it.commitment));
    setTree(tree);

    setError(undefined);
    setRedeemLoading(false);
  }, [secretBase64]);

  const redeem = async () => {
    if (!context.easyLink) {
      console.log("No EasyLink contract");
      return;
    }

    if (!tree || !secret || !nullifier) {
      console.log("tree", tree);
      console.log("nullifier", nullifier);
      console.log("secret", secret);
      return;
    }

    setRedeemLoading(true);
    const commitment = context.hasher.hash(BigNumber.from(nullifier), BigNumber.from(secret)).toString();
    const merkleProof = tree.proof(commitment);

    const address = await context.provider?.getSigner(0).getAddress() as string;
    const root = merkleProof.pathRoot.toString();
    const proof = await generateProof({
      recipient: BigNumber.from(address).toString(),
      root: root,
      nullifier: nullifier,
      secret: secret,
      pathElements: [...merkleProof.pathElements].map(it => it.toString()),
      pathIndices: [...merkleProof.pathIndices]
    });
    console.log(proof);
    const pathAsNumber = [...merkleProof.pathIndices]
      .reverse()
      .reduce((previousValue, currentValue) => previousValue * 2 + currentValue, 0);
    const nullifierHash = context.hasher.hash(BigNumber.from(nullifier), BigNumber.from(pathAsNumber)).toString();

    const transaction = await context.easyLink.withdraw(proof.a, proof.b, proof.c, nullifierHash, address, root);
    await transaction.wait(1);

    console.log(transaction);
    setRedeemLoading(false);
    setRedeemed(true);
  }

  const onSecretChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setSecretBase64(e.target.value);
  }

  return (
    <VStack>
      <Box w={"50%"}>
        <Textarea onChange={onSecretChange} placeholder='Please provider a secret to redeem tokens'/>
      </Box>
      <Box>
        <Text>{error}</Text>
      </Box>
      <Button
        isDisabled={!context.provider || error !== undefined || redeemed}
        onClick={redeem}
        isLoading={redeemLoading}
      >
        {redeemed ? <CheckIcon/> : "Redeem"}
      </Button>
    </VStack>
  );
};

export default Redeem;
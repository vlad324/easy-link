import { Box, Center, Text, VStack, Divider } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { randomBN } from "../utils/random";
import base64url from "base64url";
import Link from "next/link";

const Create = () => {

  const { hasher } = useContext(GlobalContext);

  const [origin, setOrigin] = useState<string>();

  useEffect(() => {
    if (!origin && window) {
      setOrigin(window.location.origin);
    }
  })

  const nullifier = randomBN();
  const secret = randomBN();

  const commitment = hasher.hash(nullifier, secret).toHexString().slice(2);
  const base64commitment = base64url.encode(commitment);
  const link = origin + "/pay/" + base64commitment;

  const redeemSecret = base64url.encode(`${nullifier.toHexString()}#${secret.toHexString()}`);

  return (
    <Center>
      <VStack>
        <Box>
          <Text>Your link to receive 1 ELT is:</Text>
        </Box>
        <Box>
          <Link href={link}>
            {link}
          </Link>
        </Box>
        <Text>Share it with someone who owns you money</Text>
        <Divider/>
        <Text>Use this secret to redeem tokens later:</Text>
        <Box bg={"#D3D3D3"} w={"45%"} borderRadius={"5px"} padding={"10px"}>
          <Text noOfLines={[2, 3]}>{redeemSecret}</Text>
        </Box>
      </VStack>
    </Center>
  );
};

export default Create;
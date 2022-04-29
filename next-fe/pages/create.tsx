import { Box, Center, Text, VStack } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { randomBN } from "../utils/random";
import base64url from "base64url";

const Create = () => {

  const { hasher } = useContext(GlobalContext);

  const [origin, setOrigin] = useState<string>();

  useEffect(() => {
    if (!origin && window) {
      setOrigin(window.location.origin);
    }
  })

  const secret = randomBN();
  const nullifier = randomBN();

  const commitment = hasher.hash(secret, nullifier).toHexString().slice(2);
  const base64commitment = base64url.encode(commitment);

  return (
    <Center>
      <VStack>
        <Box>
          <Text>Your link to receive 1 ELT is:</Text>
        </Box>
        <Box>
          <Text>{origin + "/pay/" + base64commitment}</Text>
        </Box>
        <Text>Share it with someone who owns you money</Text>
      </VStack>
    </Center>
  );
};

export default Create;
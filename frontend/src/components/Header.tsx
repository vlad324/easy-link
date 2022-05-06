import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Center, Link, Select, Text } from '@chakra-ui/react';
import { useRouter } from "next/router";
import { shortenAddress } from "../utils/address";
import { CHAINS } from "../utils/chains";
import { GlobalContext } from "../contexts/GlobalContext";

const Header = () => {
  const router = useRouter();

  const { provider, chainId, connect, switchChain } = useContext(GlobalContext);
  const [account, setAccount] = useState<string>();

  useEffect(() => {
    if (!account && provider) {
      provider.getSigner(0).getAddress()
        .then((account: string) => {
          setAccount(account);
        });
    }
  })

  const connectWallet = async () => {
    await connect();
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent={"space-between"}
        px="200px"
        py="20px"
        borderBottomWidth="1px"
      >
        <Center>
          <Link onClick={() => router.push("/")}>
            <Text fontSize="2xl">EasyLink</Text>
          </Link>
        </Center>
        <Center textAlign="right">
          <Box>
            <Select isDisabled={!provider}
                    value={chainId}
                    paddingRight={'10px'}
                    onChange={(e) => switchChain(parseInt(e.target.value))}>
              {
                Object.keys(CHAINS)
                  .map(currentChainId => {
                    const chain = CHAINS[currentChainId];
                    return (
                      <option key={currentChainId} value={currentChainId}>
                        {chain.chainName}
                      </option>
                    )
                  })
              }
            </Select>
          </Box>
          {
            account ?
              shortenAddress(account) :
              <Button onClick={connectWallet} textAlign="center">Connect wallet</Button>
          }
        </Center>
      </Box>
    </>
  );
};

export default Header;

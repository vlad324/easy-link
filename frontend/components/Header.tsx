import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Center, Link, Text } from '@chakra-ui/react';
import { useRouter } from "next/router";
import { GlobalContext } from "../contexts/GlobalContext";
import { ethers } from "ethers";

const Header = () => {
  const router = useRouter();

  const { provider, setProvider } = useContext(GlobalContext);
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
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
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
          {
            account ?
              "" + account :
              <Button onClick={connectWallet} textAlign="center">Connect wallet</Button>
          }
        </Center>
      </Box>
    </>
  );
};

export default Header;

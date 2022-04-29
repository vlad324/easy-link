import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ethers } from "ethers";

const DApp = () => {

  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  useEffect(() => {
    if (!provider) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum));
          }
        });
    }
  });

  return (
    <>
      <Navbar
        provider={provider}
        setProvider={setProvider}
      />
    </>
  );
}
export default DApp;
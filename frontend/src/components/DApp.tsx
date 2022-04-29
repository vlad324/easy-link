import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";
import { ethers } from "ethers";
import CssBaseline from "@mui/material/CssBaseline";

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
      <CssBaseline/>
      <Navbar
        provider={provider}
        setProvider={setProvider}
      />
      <Menu/>
    </>
  );
}
export default DApp;
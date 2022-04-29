import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";
import { ethers } from "ethers";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pay from "./Pay";

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
    <Router>
      <CssBaseline/>
      <Navbar
        provider={provider}
        setProvider={setProvider}
      />
      <Routes>
        <Route path="/" element={<Menu/>}/>
        <Route path="/create" element={<h2>TODO: create link</h2>}/>
        <Route path="/redeem" element={<h2>TODO: redeem link</h2>}/>
        <Route path="/pay/:commitment" element={<Pay/>}/>
      </Routes>
    </Router>
  );
}
export default DApp;
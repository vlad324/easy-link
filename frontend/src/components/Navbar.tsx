import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  provider: ethers.providers.Web3Provider | undefined,
  setProvider: (p: ethers.providers.Web3Provider) => void
}

const Navbar = (props: Props) => {

  const [account, setAccount] = useState<string>();

  useEffect(() => {
    if (!account && props.provider) {
      console.log("here")
      props.provider.getSigner(0).getAddress()
        .then((account: string) => {
          setAccount(account);
        });
    }
  })

  const connectWallet = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    props.setProvider(new ethers.providers.Web3Provider(window.ethereum));
  }

  return (
    <AppBar position="static"
            color="default"
            elevation={0}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            Easy Link
          </Link>
        </Typography>
        {
          account ?
            "" + account :
            <Button variant="outlined" onClick={connectWallet}>
              Connect wallet
            </Button>
        }
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
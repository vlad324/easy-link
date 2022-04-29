import { Button, Container, Nav, Row } from "react-bootstrap";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

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
    <Container>
      <Row>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            {
              account ?
                <div>{account}</div> :
                <Button variant="warning" onClick={connectWallet}>Connect wallet</Button>
            }
          </Nav.Item>
        </Nav>
      </Row>
    </Container>
  );
}

export default Navbar;
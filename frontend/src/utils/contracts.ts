import EasyLink from "../contracts/EasyLink.sol/EasyLink.json";
import EasyLinkToken from "../contracts/EasyLinkToken.sol/EasyLinkToken.json";

export const easyLink = 'easyLink';
export const easyLinkToken = 'easyLinkToken';

export const CONTRACTS: {
  [name: string]: {
    [chainId: string]: {
      address: string,
      deploymentBlock?: number
    }
  }
} = {
  [easyLink]: {
    '80001': {
      address: '0xbe9EFd3c826C9bDF14c8F175e07b0B40543982fF',
      deploymentBlock: 26147022
    },
    '1666700000': {
      address: '0x8d29119bB6f610d0B830A5af198fb6e8607bf947',
      deploymentBlock: 24697828
    },
  },
  [easyLinkToken]: {
    '80001': {
      address: '0xc8aa842e648f9fe24594087abc597480d2881097',
    },
    '1666700000': {
      address: '0x99BD0Ee8B9aeE9991Ae02a1ccfA34DF4F7d9f896',
    }
  }
}

export const CONTRACT_TO_ABI: { [n: string]: any } = {
  [easyLink]: [...EasyLink.abi],
  [easyLinkToken]: [...EasyLinkToken.abi]
}
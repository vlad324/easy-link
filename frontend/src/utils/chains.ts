import { BigNumber } from "ethers";

export const CHAINS: {
  [key: string]: {
    chainName: string,
    rpcUrl: string,
    blockExplorerUrl: string,
    nativeCurrency: string,
    nativeCurrencyDecimals: number,
  }
} = {
  '80001': {
    chainName: 'Polygon Mumbai',
    rpcUrl: 'https://rpc-mumbai.matic.today',
    blockExplorerUrl: 'https://mumbai.polygonscan.com/',
    nativeCurrency: 'MATIC',
    nativeCurrencyDecimals: 18,
  },
  '1666700000': {
    chainName: 'Harmony Testnet',
    rpcUrl: 'https://api.s0.b.hmny.io',
    blockExplorerUrl: 'https://explorer.pops.one/',
    nativeCurrency: 'ONE',
    nativeCurrencyDecimals: 18,
  },
}

export const SUPPORTED_CHAIN_IDS_HEX = Object.keys(CHAINS)
  .map(chainId => BigNumber.from(chainId).toHexString())
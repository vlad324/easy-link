export const CHAINS: {
  [key: string]: {
    chainName: string,
    rpcUrl: string,
    blockExplorerUrl: string,
    nativeCurrency: string,
    nativeCurrencyDecimals: number,
    testnet: boolean,
  }
} = {
  '80001': {
    chainName: 'Polygon Mumbai',
    rpcUrl: 'https://rpc-mumbai.matic.today',
    blockExplorerUrl: 'https://mumbai.polygonscan.com/',
    nativeCurrency: 'MATIC',
    nativeCurrencyDecimals: 18,
    testnet: true,
  },
  '1666700000': {
    chainName: 'Harmony Testnet',
    rpcUrl: 'https://api.s0.b.hmny.io',
    blockExplorerUrl: 'https://explorer.pops.one/',
    nativeCurrency: 'ONE',
    nativeCurrencyDecimals: 18,
    testnet: true,
  },
}

export const isTestnet = (chainId: string): boolean => {
  return CHAINS[chainId]?.testnet || false;
}
import { createContext, useState } from "react";
import { ethers } from "ethers";
import { PoseidonHasher } from "../utils/hasher";
import EasyLinkJson from "../../artifacts/contracts/EasyLink.sol/EasyLink.json";
import EasyLinkTokenJson from "../../artifacts/contracts/EasyLinkToken.sol/EasyLinkToken.json";
import { EasyLink, EasyLinkToken } from "../../artifacts/contracts/types";
import { EASY_LINK_CONTRACT, ELT_TOKEN } from "../utils/constants";

const buildPoseidon = require("circomlibjs").buildPoseidon;

const hasher = new PoseidonHasher(await buildPoseidon());
export const GlobalContext = createContext<Context>({
  provider: undefined,
  setProvider: (p) => {
  },
  hasher: hasher,
  easyLink: undefined,
  easyLinkToken: undefined
});

export interface Context {
  provider: ethers.providers.Web3Provider | undefined,
  setProvider: (p: ethers.providers.Web3Provider) => void,
  hasher: PoseidonHasher,
  easyLink: EasyLink | undefined
  easyLinkToken: EasyLinkToken | undefined
}

export const GlobalContextProvider = ({ children }: any) => {

  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  let easyLink;
  let easyLinkToken;
  if (provider) {
    easyLink = new ethers.Contract(EASY_LINK_CONTRACT, EasyLinkJson.abi, provider.getSigner(0)) as EasyLink;
    easyLinkToken = new ethers.Contract(ELT_TOKEN, EasyLinkTokenJson.abi, provider.getSigner(0)) as EasyLinkToken;
  }

  return (
    <GlobalContext.Provider value={{
      provider,
      setProvider,
      hasher,
      easyLink,
      easyLinkToken
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
import { createContext, useState } from "react";
import { ethers } from "ethers";
import { PoseidonHasher } from "../utils/hasher";

const buildPoseidon = require("circomlibjs").buildPoseidon;

const hasher = new PoseidonHasher(await buildPoseidon());
export const GlobalContext = createContext<Context>({
  provider: undefined,
  setProvider: (p) => {
  },
  hasher: hasher
});

export interface Context {
  provider: ethers.providers.Web3Provider | undefined,
  setProvider: (p: ethers.providers.Web3Provider) => void,
  hasher: PoseidonHasher
}

export const GlobalContextProvider = ({ children }: any) => {

  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  return (
    <GlobalContext.Provider value={{
      provider,
      setProvider,
      hasher
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
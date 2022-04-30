import { createContext, useState } from "react";
import { ethers } from "ethers";
import { PoseidonHasher } from "../utils/hasher";
import EasyLinkJson from "../../artifacts/contracts/EasyLink.sol/EasyLink.json";
import EasyLinkTokenJson from "../../artifacts/contracts/EasyLinkToken.sol/EasyLinkToken.json";
import { EasyLink, EasyLinkToken } from "../../artifacts/contracts/types";
import { EASY_LINK_CONTRACT, ELT_TOKEN } from "../utils/constants";
import { DepositEvent } from "../../artifacts/contracts/types/EasyLink";

const buildPoseidon = require("circomlibjs").buildPoseidon;

const hasher = new PoseidonHasher(await buildPoseidon());
export const GlobalContext = createContext<Context>({
  provider: undefined,
  setProvider: (p) => {
  },
  hasher: hasher,
  easyLink: undefined,
  easyLinkToken: undefined,
  depositEvents: []
});

export interface Event {
  commitment: string,
  index: number
}

export interface Context {
  provider: ethers.providers.Web3Provider | undefined,
  setProvider: (p: ethers.providers.Web3Provider) => void,
  hasher: PoseidonHasher,
  easyLink: EasyLink | undefined
  easyLinkToken: EasyLinkToken | undefined,
  depositEvents: Event[]
}

export const GlobalContextProvider = ({ children }: any) => {

  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [easyLink, setEasyLink] = useState<EasyLink>();
  const [easyLinkToken, setEasyLinkToken] = useState<EasyLinkToken>();
  const [depositEvents, setDepositEvents] = useState<Event[]>([]);

  if (provider && !easyLink) {
    setEasyLink(new ethers.Contract(EASY_LINK_CONTRACT, EasyLinkJson.abi, provider.getSigner(0)) as EasyLink);
  }

  if (provider && !easyLinkToken) {
    setEasyLinkToken(new ethers.Contract(ELT_TOKEN, EasyLinkTokenJson.abi, provider.getSigner(0)) as EasyLinkToken);
  }

  if (easyLink && depositEvents.length === 0) {
    easyLink.queryFilter(easyLink.filters.Deposit(), 26144671)
      .then(events => {
        const map = events.map((it: DepositEvent) => {
          return {
            commitment: it.args.commitment.toString(),
            index: it.args.index
          };
        });
        setDepositEvents(map);
      });
  }

  return (
    <GlobalContext.Provider value={{
      provider,
      setProvider,
      hasher,
      easyLink,
      easyLinkToken,
      depositEvents
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
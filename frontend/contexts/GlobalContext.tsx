import { createContext, useState } from "react";
import { ethers } from "ethers";
import { PoseidonHasher } from "../utils/hasher";
import EasyLinkJson from "../contracts/EasyLink.sol/EasyLink.json";
import EasyLinkTokenJson from "../contracts/EasyLinkToken.sol/EasyLinkToken.json";
import { EasyLink, EasyLinkToken } from "../contracts/types";
import { EASY_LINK_CONTRACT, EASY_LINK_DEPLOYMENT_BLOCK, EASY_LINK_EVENTS_KEY, ELT_TOKEN } from "../utils/constants";
import { DepositEvent } from "../contracts/types/contracts/EasyLink";

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

export interface LocalStoredEvent {
  commitment: string,
  index: number
}

export interface Context {
  provider: ethers.providers.Web3Provider | undefined,
  setProvider: (p: ethers.providers.Web3Provider) => void,
  hasher: PoseidonHasher,
  easyLink: EasyLink | undefined
  easyLinkToken: EasyLinkToken | undefined
}

export const GlobalContextProvider = ({ children }: any) => {

  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [easyLink, setEasyLink] = useState<EasyLink>();
  const [easyLinkToken, setEasyLinkToken] = useState<EasyLinkToken>();

  const populateEvents = (el: EasyLink) => {
    console.log("populateEvents");
    el.queryFilter(el.filters.Deposit(), EASY_LINK_DEPLOYMENT_BLOCK)
      .then(events => {
        const mappedEvents = events.map((it: DepositEvent) => {
          return {
            commitment: it.args.commitment.toString(),
            index: it.args.index
          };
        });

        localStorage.setItem(EASY_LINK_EVENTS_KEY, JSON.stringify(mappedEvents));
      })
      .catch(console.log);
  }

  if (provider && !easyLink) {
    console.log("easy link contract creation");
    const contract = new ethers.Contract(EASY_LINK_CONTRACT, EasyLinkJson.abi, provider.getSigner(0)) as EasyLink;
    setEasyLink(contract);
    populateEvents(contract);
    setInterval(() => populateEvents(contract), 5000);
  }

  if (provider && !easyLinkToken) {
    console.log("token contract creation");
    setEasyLinkToken(new ethers.Contract(ELT_TOKEN, EasyLinkTokenJson.abi, provider.getSigner(0)) as EasyLinkToken);
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
}
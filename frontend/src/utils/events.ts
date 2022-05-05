import { EasyLink } from "../contracts/types";
import { Web3Provider } from "@ethersproject/providers";
import { EASY_LINK_DEPLOYMENT_BLOCK, EASY_LINK_EVENTS_KEY } from "./constants";
import { DepositEvent } from "../contracts/types/contracts/EasyLink";

export interface LocalStoredEvent {
  commitment: string,
  index: number,
  blockNumber: number
}

let processing = false;
export const populateEvents = async (easyLink: EasyLink, provider: Web3Provider) => {
  console.log("populateEvents");

  if (processing) {
    return;
  }

  try {
    processing = true;
    await populateEventsInternal(easyLink, provider);
  } finally {
    processing = false;
  }
}

// todo: would be good to move to the graph
const populateEventsInternal = async (easyLink: EasyLink, provider: Web3Provider) => {
  const events = JSON.parse(localStorage.getItem(EASY_LINK_EVENTS_KEY) || "[]") as LocalStoredEvent[];

  let startBlock = (events.length > 0 ? events[events.length - 1].blockNumber : EASY_LINK_DEPLOYMENT_BLOCK) + 1;
  const currentBlock = await provider.getBlockNumber();

  while (startBlock < currentBlock) {
    const endBlock = Math.min(startBlock + 1000, currentBlock);
    console.log("Searching events from", startBlock, "to", endBlock);
    const rangeEvents = (await easyLink.queryFilter(easyLink.filters.Deposit(), startBlock, endBlock))
      .map((it: DepositEvent) => {
        return {
          commitment: it.args.commitment.toString(),
          index: it.args.index,
          blockNumber: it.blockNumber
        } as LocalStoredEvent;
      });
    events.push(...rangeEvents);
    localStorage.setItem(EASY_LINK_EVENTS_KEY, JSON.stringify(events));
    startBlock = endBlock;
  }
}
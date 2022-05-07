import { EasyLink } from "../contracts/types";
import { Web3Provider } from "@ethersproject/providers";
import { EASY_LINK_DEPLOYMENT_BLOCK, EASY_LINK_EVENTS_KEY, EASY_LINK_EVENTS_LAST_BLOCK_KEY } from "./constants";
import { DepositEvent } from "../contracts/types/contracts/EasyLink";

export interface LocalStoredEvent {
  commitment: string,
  index: number,
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

const parseIntSafe = (item: string | null) => {
  if (item) {
    return parseInt(item);
  }
  return undefined;
}

// todo: would be good to move to the graph
const populateEventsInternal = async (easyLink: EasyLink, provider: Web3Provider) => {
  const events = JSON.parse(localStorage.getItem(EASY_LINK_EVENTS_KEY) || "[]") as LocalStoredEvent[];
  const lastBlock = parseIntSafe(localStorage.getItem(EASY_LINK_EVENTS_LAST_BLOCK_KEY)) || EASY_LINK_DEPLOYMENT_BLOCK;

  let startBlock = lastBlock + 1;
  const currentBlock = await provider.getBlockNumber();

  while (startBlock < currentBlock) {
    const endBlock = Math.min(startBlock + 1000, currentBlock);
    console.log("Searching events from", startBlock, "to", endBlock);
    const rangeEvents = (await easyLink.queryFilter(easyLink.filters.Deposit(), startBlock, endBlock))
      .map((it: DepositEvent) => ({
        commitment: it.args.commitment.toString(),
        index: it.args.index
      }) as LocalStoredEvent);
    events.push(...rangeEvents);

    localStorage.setItem(EASY_LINK_EVENTS_KEY, JSON.stringify(events));
    localStorage.setItem(EASY_LINK_EVENTS_LAST_BLOCK_KEY, endBlock.toString());

    startBlock = endBlock;
  }
}
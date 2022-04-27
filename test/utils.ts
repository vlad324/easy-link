import { BigNumber } from "ethers";
import { randomBytes } from "crypto";

export const randomBN = (nbytes = 31) => BigNumber.from(randomBytes(nbytes));
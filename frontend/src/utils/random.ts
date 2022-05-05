import { BigNumber } from "ethers";

const randomBytes = require("randombytes");
export const randomBN = (nbytes = 31) => BigNumber.from(randomBytes(nbytes));
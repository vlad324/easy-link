import { useRouter } from 'next/router'
import { Center } from "@chakra-ui/react";
import base64url from "base64url";
import { BigNumber } from "ethers";
import UrlIsNotValid from "../../components/UrlIsNotValid";
import PayCommitment from "../../components/PayCommitment";

const Pay = () => {
  const router = useRouter();
  const { commitment } = router.query;

  let rawCommitment;
  if (commitment) {
    try {
      rawCommitment = BigNumber.from("0x" + base64url.decode(commitment as string));
    } catch (e) {
      console.log(e);
      rawCommitment = BigNumber.from(0);
    }
  }

  return (
    <Center>
      {
        rawCommitment && !rawCommitment.isZero() ?
          <PayCommitment commitment={rawCommitment}/> :
          <UrlIsNotValid/>
      }
    </Center>
  );
}

export default Pay;
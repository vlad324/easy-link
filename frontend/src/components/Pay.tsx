import { useParams } from "react-router-dom";
import React from "react";

const Pay = () => {
  const params = useParams();
  return (
    <h1>
      Provided commitment: {params.commitment}
    </h1>
  );
}

export default Pay;
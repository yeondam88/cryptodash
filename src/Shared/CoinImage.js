import React from "react";

const CoinImage = ({ coin, style }) => (
  <img
    src={`http://cryptocompare.com/${coin.ImageUrl}`}
    alt={coin.CoinSymbol}
    style={style || { height: "50px" }}
  />
);

export default CoinImage;

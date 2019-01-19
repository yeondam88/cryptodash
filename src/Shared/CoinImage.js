import React from "react";
import styled, { css } from "styled-components";

const CoinImageStyled = styled.img`
  height: 50px;
  ${props =>
    props.spotlight &&
    css`
      height: 200px;
      margin: auto;
      display: block;
    `}
`;

const CoinImage = ({ coin, spotlight }) => (
  <CoinImageStyled
    spotlight={spotlight}
    src={`http://cryptocompare.com/${coin.ImageUrl}`}
    alt={coin.CoinSymbol}
  />
);

export default CoinImage;

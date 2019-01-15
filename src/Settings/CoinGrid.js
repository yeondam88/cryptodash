import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import { SelectableTile } from "../Shared/Tile";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;

function getCoinsToDisplay(coinList, topSection) {
  return Object.keys(coinList).slice(0, topSection ? 10 : 100);
}

const CoinGrid = ({ topSection }) => (
  <AppContext.Consumer>
    {({ coinList }) => {
      return (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList, topSection).map(coinKey => (
            <CoinTile topSection={topSection} coinKey={coinKey} />
          ))}
        </CoinGridStyled>
      );
    }}
  </AppContext.Consumer>
);

export default CoinGrid;

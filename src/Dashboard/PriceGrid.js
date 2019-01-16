import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import PriceTile from "./PriceTile";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;

const PriceGrid = () => (
  <AppContext.Consumer>
    {({ prices }) => {
      return (
        <Grid>
          {prices &&
            prices.map((price, index) => (
              <PriceTile key={index} price={price} index={index} />
            ))}
        </Grid>
      );
    }}
  </AppContext.Consumer>
);

export default PriceGrid;

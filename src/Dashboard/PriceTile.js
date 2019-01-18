import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig } from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";
import { numberFormat } from "../utils";

const JustifyRight = styled.div`
  justify-self: right;
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig}
`;

const ChangePercent = styled.div`
  color: green;
  ${props =>
    props.red &&
    css`
      color: red;
    `}
`;

const PriceTileStyled = styled(SelectableTile)`
  ${props =>
    props.compact &&
    css`
      display: grid;
      grid-gap: 5px;
      ${fontSize3}
      grid-template-columns: repeat(3, 1fr);
      justify-items: right;
    `}
`;

const PriceTileWrapper = ({ sym, data }) => {
  return (
    <PriceTileStyled>
      <CoinHeaderGridStyled>
        <div>{sym}</div>
        <JustifyRight>
          <ChangePercentWrapper data={data} />
        </JustifyRight>
      </CoinHeaderGridStyled>
      <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
};

const ChangePercentWrapper = ({ data }) => {
  return (
    <JustifyRight>
      <ChangePercent red={data.CHANGEPCT24HOUR < 0}>
        {numberFormat(data.CHANGEPCT24HOUR)}
      </ChangePercent>
    </JustifyRight>
  );
};

const PriceTileCompact = ({ sym, data }) => {
  return (
    <PriceTileStyled compact>
      <JustifyLeft>{sym}</JustifyLeft>
      <ChangePercentWrapper data={data} />
      <div>${numberFormat(data.PRICE)}</div>
    </PriceTileStyled>
  );
};

const PriceTile = ({ price, index }) => {
  let sym = Object.keys(price)[0];
  let data = price[sym]["USD"];
  let TileClass = index < 5 ? PriceTileWrapper : PriceTileCompact;
  return <TileClass sym={sym} data={data} />;
};

export default PriceTile;

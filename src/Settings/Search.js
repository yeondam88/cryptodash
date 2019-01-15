import React from "react";
import styled from "styled-components";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";
import { AppContext } from "../App/AppProvider";
import { debounce, pickBy, includes } from "lodash";
import fuzzy from "fuzzy";

const SearchGridStyled = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const SearchInputStyled = styled.input`
  ${backgroundColor2}
  ${fontSize2}
  border: 1px solid;
  height: 25px;
  color: #1163c9;
  place-self: center left;
`;

const handleFilter = debounce((inputValue, coinList, setFilteredCoins) => {
  // Get all the coin symbols
  let coinSymbols = Object.keys(coinList);
  // Get all the coin names, map symbol to name
  let coinNames = coinSymbols.map(sym => coinList[sym].CoinName);
  let allStringsToSearch = coinSymbols.concat(coinNames);
  let fuzzyResults = fuzzy
    .filter(inputValue, allStringsToSearch, {})
    .map(result => result.string);

  let filteredCoins = pickBy(coinList, (result, symKey) => {
    let coinName = result.CoinName;
    return includes(fuzzyResults, symKey) || includes(fuzzyResults, coinName);
  });

  setFilteredCoins(filteredCoins);
}, 500);

function filterCoins(e, setFilteredCoins, coinList) {
  let inputValue = e.target.value;
  if (!inputValue) {
    setFilteredCoins(null);
    return;
  }
  handleFilter(inputValue, coinList, setFilteredCoins);
}

const Search = () => (
  <AppContext.Consumer>
    {({ coinList, setFilteredCoins }) => (
      <SearchGridStyled>
        <h2>Search all coins</h2>
        <SearchInputStyled
          onKeyUp={e => filterCoins(e, setFilteredCoins, coinList)}
        />
      </SearchGridStyled>
    )}
  </AppContext.Consumer>
);

export default Search;

import React from "react";
import styled from "styled-components";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";

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

const Search = () => (
  <SearchGridStyled>
    <h2>Search all coins</h2>
    <SearchInputStyled />
  </SearchGridStyled>
);

export default Search;

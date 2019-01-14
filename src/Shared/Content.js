import React from "react";
import { AppContext } from "../App/AppProvider";

const Content = ({ children }) => (
  <AppContext.Consumer>
    {({ coinList }) => {
      if (!coinList) return <div> Loading coins.. </div>;
      return <div>{children}</div>;
    }}
  </AppContext.Consumer>
);

export default Content;

import React from "react";
import { AppContext } from "../App/AppProvider";

const Page = ({ name, children }) => (
  <AppContext.Consumer>
    {({ page }) => {
      if (page !== name) return null;
      return <div>{children}</div>;
    }}
  </AppContext.Consumer>
);

export default Page;

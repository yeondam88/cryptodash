import React from "react";
import { AppContext } from "../App/AppProvider";

const WelcomeMessage = () => (
  <AppContext.Consumer>
    {({ firstVisit }) => {
      return firstVisit ? (
        <div>
          Welcome to CrytoDash, please select your favorite coins to begin.
        </div>
      ) : null;
    }}
  </AppContext.Consumer>
);

export default WelcomeMessage;

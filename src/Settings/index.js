import React from "react";
import WelcomeMessage from "./WelcomeMessage";
import ConfirmButton from "./ConfirmButton";
import Page from "../Shared/Page";
import CoinGrid from "./CoinGrid";

const Settings = () => (
  <Page name="settings">
    <WelcomeMessage />
    <CoinGrid topSection />
    <ConfirmButton />
    <CoinGrid />
  </Page>
);

export default Settings;

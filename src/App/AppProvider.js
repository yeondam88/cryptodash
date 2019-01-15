import React from "react";
import cc from "cryptocompare";
import { pull, includes } from "lodash";

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

class AppProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "dashboard",
      favorites: ["BTC", "ETH", "XMR", "DOGE"],
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      setFilteredCoins: this.setFilteredCoins,
      confirmFavorites: this.confirmFavorites
    };
  }

  componentDidMount() {
    this.fetchCoins();
    this.fetchPrices();
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
  };

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    this.setState({ prices });
  };

  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        let priceData = await cc.priceFull(this.state.favorites[i], "USD");
        returnData.push(priceData);
      } catch (e) {
        console.warn("Fetch price error", e);
      }
    }

    return returnData;
  };

  addCoin = key => {
    let favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: pull(favorites, key) });
  };

  confirmFavorites = () => {
    this.setState(
      {
        firstVisit: false,
        page: "dashboard"
      },
      () => {
        this.fetchPrices();
      }
    );
    localStorage.setItem(
      "crytoDash",
      JSON.stringify({
        favorites: this.state.favorites
      })
    );
  };

  isInFavorites = key => includes(this.state.favorites, key);

  savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem("crytoDash"));
    if (!cryptoDashData) {
      return {
        page: "settings",
        firstVisit: true
      };
    }
    let { favorites } = cryptoDashData;

    return {
      favorites
    };
  };

  setPage = page => this.setState({ page });

  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;

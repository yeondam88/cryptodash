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
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
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
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });
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

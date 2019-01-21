import React from "react";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighcharts from "react-highcharts";
import HighChartConfig from "./HighChartConfig";
import HighChartTheme from "./HighChartTheme";

ReactHighcharts.Highcharts.setOptions(HighChartTheme);

const PriceChart = () => (
  <AppContext.Consumer>
    {({ historical }) => (
      <Tile>
        {historical ? (
          <ReactHighcharts config={HighChartConfig(historical)} />
        ) : (
          <div>Loading Chart...</div>
        )}
      </Tile>
    )}
  </AppContext.Consumer>
);

export default PriceChart;

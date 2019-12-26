import React, { Component } from "react";
import NVD3Chart from "react-nvd3";

const datum = [
  {
    key: "Cumulative Return",
    values: [
      {
        label: "Offline",
        value: 2500,
        color: "#75A5DE"
      },
      {
        label: "Web",
        value: 1750,
        color: "#2561A8"
      },
      {
        label: "Mobile",
        value: 2500,
        color: "#75A5DE"
      }
    ]
  }
];
class BarChart extends Component {
  render() {
    return (
      <NVD3Chart
        tooltip={{ enabled: false }}
        type="discreteBarChart"
        datum={datum}
        x="label"
        y="value"
      />
    );
  }
}

export default BarChart;

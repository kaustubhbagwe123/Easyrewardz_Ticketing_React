import React, { Component } from "react";
import NVD3Chart from "react-nvd3";

const datum = [
  {
    key: "Cumulative Return",
    values: [
      {
        label: "Total",
        value: 200,
        color: "#3B92F5"
      },
      {
        label: "In Queue",
        value: 95,
        color: "#FAED48"
      },
      {
        label: "Ongoing",
        value: 105,
        color: "#50E3C2"
      }
    ]
  }
];
class ChartStatusLive extends Component {
  render() {
    return (
      <NVD3Chart
        tooltip={{ enabled: false }}
        type="discreteBarChart"
        datum={datum}
        x="label"
        y="value"
        width={400}
        height={180}
      />
    );
  }
}

export default ChartStatusLive;

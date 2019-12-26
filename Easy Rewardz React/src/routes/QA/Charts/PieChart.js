import React, { Component } from "react";
import NVD3Chart from "react-nvd3";

const datum = [
  { key: "One", y: 23, color: "#5d61b3" },
  { key: "Three", y: 37, color: "#f2726f" },
  { key: "Two", y: 40, color: "#29c2be" }

  // {key: "Four", y: 196, color: "#3ebfea"},
  // {key: "Five", y: 2, color: "#4F5467"},
  // {key: "Six", y: 98, color: "#1de9b6"},
  // {key: "Seven", y: 13, color: "#a389d4"},
];

class PieChart extends Component {
  render() {
    return (
      <NVD3Chart
        tooltip={{ enabled: false }}
        id="chart"
        height={215}
        width={215}
        type="pieChart"
        datum={datum}
        // labelType="percent"
        donut="true"
        donutRatio="0.45"
      />
    );
  }
}
export default PieChart;

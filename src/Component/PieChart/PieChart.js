import React, { Component } from "react";
import NVD3Chart from "react-nvd3";

const datum = [
  { key: "One", y: 40, color: "#29C2BE" },
  { key: "Three", y: 37, color: "#F2726F" },
  { key: "Two", y: 22, color: "#5D62B4" }

  // {key: "Four", y: 196, color: "#3ebfea"},
  // {key: "Five", y: 2, color: "#4F5467"},
  // {key: "Six", y: 98, color: "#1de9b6"},
  // {key: "Seven", y: 13, color: "#a389d4"},
];

class PieChart extends Component {
  render() {
    return (
      <NVD3Chart
        id="chart"
        height={200}
        type="pieChart"
        datum={datum}
        x="key"
        y="y"
        donut
        labelType="percent"
      />
    );
  }
}
export default PieChart;

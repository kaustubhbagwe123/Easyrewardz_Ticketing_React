import React, { Component } from "react";
import NVD3Chart from "react-nvd3";

const datum = [
  {
    key: "Cumulative Return",
    values: [
      {
        label: "QA Lead 1",
        value: 76,
        color: "#29C2BE"
      },
      {
        label: "QA Lead 2",
        value: 140,
        color: "#29C2BE"
      },
      {
        label: "QA Lead 3",
        value: 76,
        color: "#29C2BE"
      },
      {
        label: "QA Lead 4",
        value: 101,
        color: "#29C2BE"
      }
    ]
  }
];
class BarQualityScore extends Component {
  render() {
    return (
      <NVD3Chart
        tooltip={{ enabled: false }}
        type="discreteBarChart"
        datum={datum}
        x="label"
        y="value"
        height={220}
        width={300}
      />
    );
  }
}

export default BarQualityScore;

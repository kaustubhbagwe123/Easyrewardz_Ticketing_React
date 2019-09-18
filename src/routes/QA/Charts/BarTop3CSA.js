import React, { Component } from "react";
import NVD3Chart from "react-nvd3";

const datum = [
  {
    key: "Cumulative Return",
    values: [
      {
        label: "Agent 1",
        value: 70,
        color: "#4A90E2"
      },
      {
        label: "Agent 2",
        value: 135,
        color: "#4A90E2"
      },
      {
        label: "Agent 3",
        value: 70,
        color: "#4A90E2"
      }
    ]
  }
];
class BarTop3CSA extends Component {
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

export default BarTop3CSA;

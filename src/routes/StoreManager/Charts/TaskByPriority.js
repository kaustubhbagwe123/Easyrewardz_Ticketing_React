import React, { Component } from "react";
import NVD3Chart from "react-nvd3";

const datum = [
  {
    key: "Cumulative Return",
    values: [
      {
        label: "High",
        value: 50,
        color: "#F2726F"
      },
      {
        label: "Medium",
        value: 126,
        color: "#FBC463"
      },
      {
        label: "Low",
        value: 90,
        color: "#29C2BE"
      }
    ]
  }
];
class TaskByPriority extends Component {
  render() {
    return (
      <NVD3Chart
        tooltip={{ enabled: false }}
        type="discreteBarChart"
        datum={datum}
        x="label"
        y="value"
        height={240}
        width={250}
      />
    );
  }
}

export default TaskByPriority;

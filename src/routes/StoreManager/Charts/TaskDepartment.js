import React, { Component } from "react";
import NVD3Chart from "react-nvd3";

const datum = [
  {
    key: "Cumulative Return",
    values: [
      {
        label: "Fianance",
        value: 76,
        color: "#29C2BE"
      },
      {
        label: "HR",
        value: 140,
        color: "#29C2BE"
      },
      {
        label: "Infra",
        value: 76,
        color: "#29C2BE"
      },
      {
        label: "Logistics",
        value: 101,
        color: "#29C2BE"
      }
    ]
  }
];
class TaskDepartment extends Component {
  render() {
    return (
      <NVD3Chart
        tooltip={{ enabled: false }}
        type="discreteBarChart"
        datum={datum}
        x="label"
        y="value"
        height={240}
        width={280}
      />
    );
  }
}

export default TaskDepartment;

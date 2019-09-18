import React, { Component } from "react";
import NVD3Chart from "react-nvd3";

const datum = [
  {
    key: "Cumulative Return",
    values: [
      {
        label: "Total Claim",
        value: 50,
        color: "#F2726F"
      },
      {
        label: "Exchange",
        value: 126,
        color: "#F2726F"
      },
      {
        label: "Refund",
        value: 90,
        color: "#F2726F"
      }
    ]
  }
];
class OpenClaim extends Component {
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

export default OpenClaim;

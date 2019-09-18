import React, { Component } from "react";
import NVD3Chart from "react-nvd3";

const datum = [
  {
    key: "Cumulative Return",
    values: [
      {
        label: "Total Claim",
        value: 76,
        color: "#3B92F5"
      },
      {
        label: "Invoice Mapped",
        value: 140,
        color: "#3B92F5"
      },
      {
        label: "Mapped Article",
        value: 76,
        color: "#3B92F5"
      },
      {
        label: "Claimed Article",
        value: 101,
        color: "#3B92F5"
      }
    ]
  }
];
class ClaimVsInvoice extends Component {
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

export default ClaimVsInvoice;

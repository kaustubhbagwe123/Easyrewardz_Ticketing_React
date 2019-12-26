import React, { Component } from "react";
import NVD3Chart from "react-nvd3";

const datum = [
  
  { key: "TOTAL CLAIM AMOUNT", y: 20, color: "#FBC463" },
  { key: "TOTAL INVOICE AMOUNT", y: 78, color: "#3B92F5" }
];

class InvoiceAmountPie extends Component {
  render() {
    return (
      <NVD3Chart
        tooltip={{ enabled: false }}
        id="chart"
        height={250}
        width={215}
        type="pieChart"
        datum={datum}
        donut
        donutRatio="0"
      />
    );
  }
}
export default InvoiceAmountPie;

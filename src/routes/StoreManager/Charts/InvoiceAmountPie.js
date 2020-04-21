import React, { Component } from "react";
import NVD3Chart from "react-nvd3";

// const datum = [
//   { key: "TOTAL CLAIM AMOUNT", y: 20, color: "#FBC463" },
//   { key: "TOTAL INVOICE AMOUNT", y: 78, color: "#3B92F5" }
// ];

class InvoiceAmountPie extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      data: {
        values: []
      },
      sort: null
    };

    this.handleGetDashboardGraphData = this.handleGetDashboardGraphData.bind(
      this
    );
  }
  componentDidMount() {
    this.handleGetDashboardGraphData();
  }

  handleGetDashboardGraphData() {
   debugger;

      debugger;
      var propsData = this.props.data;
      let values = [];
      if (propsData !== null) {
        for (let i = 0; i < propsData.length; i++) {
          let name = propsData[i].name;
          let value = propsData[i].value;
          let obj = {x: `${name}, ${value}`, y: value};
          values.push(obj);
        }
        this.setState({
          data: {
              values
          }
        });
      }
  }
  
  render() {
    return (
      <NVD3Chart
        tooltip={{ enabled: false }}
        id="chart"
        height={250}
        width={215}
        type="pieChart"
        datum={this.state.data}
        donut
        donutRatio="0"
      />
    );
  }
}
export default InvoiceAmountPie;

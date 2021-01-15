import React, { Component } from "react";
import NVD3Chart from "react-nvd3";

class InvoiceAmountPie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      sort: null,
    };

    this.handleGetDashboardGraphData = this.handleGetDashboardGraphData.bind(
      this
    );
  }
  componentDidMount() {
    this.handleGetDashboardGraphData();
  }

  handleGetDashboardGraphData() {
    var propsData = this.props.data;
    if (propsData !== null) {
      let values = [];
      for (let i = 0; i < propsData.length; i++) {
        var obj = {};
        let name = propsData[i].name;
        let value = propsData[i].value;
        obj = { key: `${name}`, y: value };
        values.push(obj);
      }
      this.setState({
        values,
      });
    }
  }

  render() {
    return (
      <NVD3Chart
        tooltip={{ enabled: true }}
        id="chart"
        height={250}
        width={215}
        type="pieChart"
        datum={this.state.values}
        donut
        donutRatio="0"
      />
    );
  }
}
export default InvoiceAmountPie;

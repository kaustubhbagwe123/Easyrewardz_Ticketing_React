// import React, { Component } from "react";
// import NVD3Chart from "react-nvd3";

// const datum = [
//   { key: "EOSS", y: 22, color: "#5d61b3" },
//   { key: "ANIVERSERY", y: 37, color: "#f2726f" },
//   { key: "BIRTHDAY", y: 40, color: "#29c2be" },

//   // {key: "Four", y: 196, color: "#3ebfea"},
//   // {key: "Five", y: 2, color: "#4F5467"},
//   // {key: "Six", y: 98, color: "#1de9b6"},
//   // {key: "Seven", y: 13, color: "#a389d4"},
// ];

// class OpenCompaign extends Component {
//   render() {
//     return (
//       <NVD3Chart
//         x="key"
//         y="y"
//         id="chart"
//         height={220}
//         type="pieChart"
//         datum={datum}
//         labelType="percent"
//         donut
//       />
//     );
//   }
// }
// export default OpenCompaign;

import React, { Component } from 'react'
import Chart from 'react-apexcharts'
class OpenCompaign extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      options: {},
      series: [22, 37, 40],
      labels: ['A', 'B', 'C']
    }
  }
  
  render() {
    return (
      <div className="donut">
        <Chart options={this.state.options} series={this.state.series} type="donut" width="350" />
      </div>
    );
  }
}

export default OpenCompaign;

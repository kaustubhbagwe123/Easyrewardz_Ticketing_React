// import React, { Component } from "react";
// import NVD3Chart from "react-nvd3";

// const datum = [
//   {
//     key: "Cumulative Return",
//     values: [
//       {
//         label: "Total Claim",
//         value: 50,
//         color: "#F2726F"
//       },
//       {
//         label: "Exchange",
//         value: 126,
//         color: "#F2726F"
//       },
//       {
//         label: "Refund",
//         value: 90,
//         color: "#F2726F"
//       }
//     ]
//   }
// ];
// class OpenClaim extends Component {
//   render() {
//     return (
//       <NVD3Chart
//         tooltip={{ enabled: false }}
//         type="discreteBarChart"
//         datum={datum}
//         x="label"
//         y="value"
//         height={240}
//         width={250}
//       />
//     );
//   }
// }

// export default OpenClaim;

import React, { Component } from 'react'
import Chart from "react-apexcharts";
export class OpenClaim extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        xaxis: {
          // categories: ['Fianance', 'HR', 'Logistics', 'Infra']
          categories: [],
        },
      },
      series: [
        {
          // data: [76, 140, 76, 101]
          data: [],
        },
      ],
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
    var taskData = this.props.data;
    var category=[];
    var data=[];
    if (taskData !== null) {
      for (let i = 0; i < taskData.length; i++) {
        let categoryName = taskData[i].name;
        category.push(categoryName);
        let dataCount = taskData[i].value;
        data.push(dataCount)
      }
      this.setState({
        options: {
          xaxis: {
            categories:category
          },
        },
        series: [
          {
            data
          },
        ],
      });
    }
  }
  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        width={320}
        height={220}
      />
    );
  }
}

export default OpenClaim

// import React, { Component } from "react";
// import NVD3Chart from "react-nvd3";

// const datum = [
//   {
//     key: "Cumulative Return",
//     values: [
//       {
//         label: "High",
//         value: 50,
//         color: "#F2726F"
//       },
//       {
//         label: "Medium",
//         value: 126,
//         color: "#FBC463"
//       },
//       {
//         label: "Low",
//         value: 90,
//         color: "#29C2BE"
//       }
//     ]
//   }
// ];
// class TaskByPriority extends Component {
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

// export default TaskByPriority;
import React, { Component } from 'react'
import Chart from 'react-apexcharts'
class TaskByPriority extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      optionsMixedChart: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
      },
      seriesMixedChart: [ {
        name: 'ANIVERSERY',
        type: 'column',
        data: [23, 12, 54, 61, 32, 56, 81, 19]
      }, {
        name: 'BIRTHDAY',
        type: 'column',
        data: [62, 12, 45, 55, 76, 41, 23, 43]
      }],
    }
  }
  
  render() {
    return (
      <div className="app">
      <div className="row">
        <div className="col mixed-chart">
          <Chart options={this.state.optionsMixedChart} series={this.state.seriesMixedChart} type="line" width="340" />
        </div>
      </div>
    </div>
    );
  }
}

export default TaskByPriority;
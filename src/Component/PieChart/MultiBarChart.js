// import React, { Component } from "react";
// import NVD3Chart from "react-nvd3";

// function generateNumber(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// function getDatum() {
//   let sin = [],
//     sin2 = [],
//     sin3 = [];

//   const len = 35 + Math.random() * (70 - 35);
//   for (let i = 0; i < len; i++) {
//     sin.push({
//       x: i,
//       y: generateNumber(0, 60)
//     });
//     sin2.push({
//       x: i,
//       y: generateNumber(0, 100)
//     });
//     sin3.push({
//       x: i,
//       y: generateNumber(0, 30)
//     });
//   }
//   return [
//     {
//       values: sin,
//       // key: 'Stream #0',
//       color: "#A389D4"
//     },
//     {
//       values: sin3,
//       // key: 'Stream #1',
//       color: "#04a9f5"
//     }
//     // {
//     //     values: sin2,
//     //     key: 'Stream #3',
//     //     color: '#1de9b6',
//     //     area: true
//     // }
//   ];
// }
// class MultiBarChart extends Component {
//   render() {
//     const data = getDatum();
//     return (
//       <NVD3Chart
//         type="multiBarChart"
//         datum={data}
//         x="x"
//         y="y"
//         height={200}
//         weight={150}
//         showValues
//         groupSpacing={0.2}
//       />
//     );
//   }
// }

// export default MultiBarChart;

import React, { Component } from 'react'
import Chart from 'react-apexcharts'
class MultiBarChart extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      optionsMixedChart: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
      },
      seriesMixedChart: [ {
        name: 'Total Tickets',
        type: 'column',
        data: [23, 12, 54, 61, 32, 56, 81, 19]
      }, {
        name: 'Tickets with Task',
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
          <Chart options={this.state.optionsMixedChart} series={this.state.seriesMixedChart} type="line" width="540" height="200" className="ticketToTask-chart"/>
        </div>
      </div>
    </div>
    );
  }
}

export default MultiBarChart;
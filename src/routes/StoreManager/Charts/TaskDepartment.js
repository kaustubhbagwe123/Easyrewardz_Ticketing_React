// import React, { Component } from "react";
// import NVD3Chart from "react-nvd3";

// const datum = [
//   {
//     key: "Cumulative Return",
//     values: [
//       {
//         label: "Fianance",
//         value: 76,
//         color: "#29C2BE"
//       },
//       {
//         label: "HR",
//         value: 140,
//         color: "#29C2BE"
//       },
//       {
//         label: "Infra",
//         value: 76,
//         color: "#29C2BE"
//       },
//       {
//         label: "Logistics",
//         value: 101,
//         color: "#29C2BE"
//       }
//     ]
//   }
// ];
// class TaskDepartment extends Component {
//   render() {
//     return (
//       <NVD3Chart
//         tooltip={{ enabled: false }}
//         type="discreteBarChart"
//         datum={datum}
//         x="label"
//         y="value"
//         height={240}
//         width={280}
//       />
//     );
//   }
// }

// export default TaskDepartment;
import React, { Component } from 'react'
import Chart from 'react-apexcharts'
class TaskDepartment extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: ['Fianance', 'HR', 'Logistics', 'Infra']
          // categories: [1990, 1991, 1992, 1993]
        }
      },
      series: [{
        name: 'series-1',
        data: [76, 140, 76, 101]
      }]
    }
  }
  
  render() {
    return (
      <Chart options={this.state.options} series={this.state.series} type="bar" width={320} height={220} />
    )
  }
}

export default TaskDepartment


// import React, { Component } from 'react'
// import Chart from 'react-apexcharts'
// class TaskByPriority extends Component {
//   constructor(props) {
//     super(props);
  
//     this.state = {
//       optionsMixedChart: {
//         chart: {
//           id: 'basic-bar'
//         },
//         xaxis: {
//           categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//         },
//       },
//       seriesMixedChart: [ {
//         name: 'ANIVERSERY',
//         type: 'column',
//         data: [23, 12, 54, 61, 32, 56, 81, 19]
//       }, {
//         name: 'BIRTHDAY',
//         type: 'column',
//         data: [62, 12, 45, 55, 76, 41, 23, 43]
//       }],
//     }
//   }
  
//   render() {
//     return (
//       <div className="app">
//       <div className="row">
//         <div className="col mixed-chart">
//           <Chart options={this.state.optionsMixedChart} series={this.state.seriesMixedChart} type="line" width="340" />
//         </div>
//       </div>
//     </div>
//     );
//   }
// }

// export default TaskByPriority;
import React, { Component } from 'react'
import Chart from "react-apexcharts";

export class TaskByPriority extends Component {
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
          // name: 'series-1',
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

export default TaskByPriority

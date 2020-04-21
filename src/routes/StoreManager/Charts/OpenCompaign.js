// import React, { Component } from 'react'
// import Chart from 'react-apexcharts'
// class OpenCompaign extends Component {
//   constructor(props) {
//     super(props);
  
//     this.state = {
//       options: {
//         responsive: [{
//           breakpoint: 450,
//           options: {
//             chart: {
//               width: 100
//             },
//             legend: {
//               position: 'bottom'
//             }
//           }
//         }]
//       },
//       series: [44.50, 55, 41, 17]
//     }
//   }
  
//   render() {
//     return (
//       <div className="chart">
//         <Chart options={this.state.options} series={this.state.series} type="donut" width="400" className="opendonutChart"/>
//       </div>
//     );
//   }
// }

// export default OpenCompaign;
import React, { Component } from 'react'
import { PieChart } from "react-d3-components";

export class OpenCompaign extends Component {
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
      <div className="obpml">
        <PieChart
          data={this.state.data}
          width={350}
          height={270}
          margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
          sort={this.state.sort}
        />
      </div>
    )
  }
}

export default OpenCompaign


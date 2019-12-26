import React, { Component } from 'react'
import Chart from 'react-apexcharts'
class TicketToBillBarGraph extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      optionsMixedChart: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: ['Offline', 'Web', 'Mobile']
        },
      },
      seriesMixedChart: [ {
        name: 'Total Bills',
        type: 'column',
        data: [2500, 2500, 2500]
      }, {
        name: 'Ticketed Bills',
        type: 'column',
        data: [1700, 1700, 1700]
      }],
    }
  }
  
  render() {
    return (
      <div className="app">
      <div className="row">
        <div className="col mixed-chart">
          <Chart options={this.state.optionsMixedChart} series={this.state.seriesMixedChart} type="line" width="400" height="180" className="ticketToTask-chart-1"/>
        </div>
      </div>
    </div>
    );
  }
}

export default TicketToBillBarGraph;
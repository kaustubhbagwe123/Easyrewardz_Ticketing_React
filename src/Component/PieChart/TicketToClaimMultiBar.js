import React, { Component } from 'react'
import Chart from 'react-apexcharts';

class TicketToClaimMultiBar extends Component {
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

export default TicketToClaimMultiBar;
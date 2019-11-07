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
        data: [2500, 2000, 1700, 1700, 1300, 1800, 2000]
      }, {
        name: 'Tickets with Task',
        type: 'column',
        data: [1300, 1200, 1100, 1200, 1000, 1300, 1100]
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
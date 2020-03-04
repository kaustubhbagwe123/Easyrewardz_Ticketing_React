import React, { Component } from 'react'
import Chart from 'react-apexcharts';
// import { authHeader } from "./../../helpers/authHeader";
// import axios from "axios";
// import config from "./../../helpers/config";

class TicketToClaimMultiBar extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      optionsMixedChart: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: []
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          markers: {
            fillColors: ['#75A5DE', '#2561A8']
          }
        },
        fill: {
          colors: ['#75A5DE', '#2561A8'],
          opacity: 1
        },
        stroke: {
          show: false
        },
        states: {
          hover: {
            filter: {
              type: 'none'
            }
          },
          active: {
            filter: {
              type: 'none'
            }
          }
        },
        tooltip: {
          //enabled: false
          marker: {
            fillColors: [ '#2561A8','#75A5DE']
          }
        }
      },
      seriesMixedChart: [ {
        name: 'Total Tickets',
        type: 'column',
        data: []
      }, {
        name: 'Tickets with Claim',
        type: 'column',
        data: []
      }],
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
    // let self = this;
    // axios({
    //   method: "post",
    //   url: config.apiUrl + "/DashBoard/DashBoardGraphData",
    //   headers: authHeader(),
    //   params: {
    //     UserIds: "6,7,8",
    //     fromdate: "2019-12-26",
    //     todate: "2020-01-15",
    //     BrandID: "26, 31"
    //   }
    // }).then(function(res) {
      debugger;
      var propsData = this.props.data;
      let categories = [],
        totalTicketsData = [],
        claimTicketsData = [];
      // let DashboardBillGraphData = res.data.responseData.tickettoClaimGraph;
      for (let i = 0; i < propsData.length; i++) {
        let day = propsData[i].day;
        categories.push(day);
        let totalTickets = propsData[i].totalTickets;
        totalTicketsData.push(totalTickets);
        let claimTickets = propsData[i].claimTickets;
        claimTicketsData.push(claimTickets);
      }

      this.setState({
        optionsMixedChart: {
          xaxis: {
            categories
          }
        },
        seriesMixedChart: [
          {
            data: totalTicketsData
          },
          {
            data: claimTicketsData
          }
        ]
      });
      
    // });
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
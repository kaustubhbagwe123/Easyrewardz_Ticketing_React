import React, { Component } from 'react'
import Chart from 'react-apexcharts';
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";

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
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/DashBoardGraphData",
      headers: authHeader(),
      params: {
        UserIds: "6,7,8",
        fromdate: "2019-12-26",
        todate: "2020-01-15",
        BrandID: "26, 31"
      }
    }).then(function(res) {
      debugger;
      let categories = [],
        totalTicketsData = [],
        claimTicketsData = [];
      let DashboardBillGraphData = res.data.responseData.tickettoClaimGraph;
      for (let i = 0; i < DashboardBillGraphData.length; i++) {
        let day = DashboardBillGraphData[i].day;
        categories.push(day);
        let totalTickets = DashboardBillGraphData[i].totalTickets;
        totalTicketsData.push(totalTickets);
        let claimTickets = DashboardBillGraphData[i].claimTickets;
        claimTicketsData.push(claimTickets);
      }

      self.setState({
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
      
    });
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
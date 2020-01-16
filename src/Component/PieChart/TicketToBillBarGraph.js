import React, { Component } from "react";
import Chart from "react-apexcharts";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";
class TicketToBillBarGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionsMixedChart: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: []
          // categories: ["Offline", "Web", "Mobile"]
        }
      },
      seriesMixedChart: [
        {
          name: "Total Bills",
          type: "column",
          data: []
          // data: [2500, 2500, 2500]
        },
        {
          name: "Ticketed Bills",
          type: "column",
          data: []
          // data: [1700, 1700, 1700]
        }
      ]
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
      url: config.apiUrl + "/Ticketing/DashBoardGraphData",
      headers: authHeader(),
      params: {
        UserIds: "6,7,8",
        fromdate: "2019-12-26",
        todate: "2020-01-15"
      }
    }).then(function(res) {
      debugger;
      let categories = [],
        totalBillsData = [],
        ticketedBillsData = [];
      let DashboardBillGraphData = res.data.responseData.tickettoBillGraph;
      for (let i = 0; i < DashboardBillGraphData.length; i++) {
        let ticketSourceName = DashboardBillGraphData[i].ticketSourceName;
        categories.push(ticketSourceName);
        let totalBills = DashboardBillGraphData[i].totalBills;
        totalBillsData.push(totalBills);
        let ticketedBills = DashboardBillGraphData[i].ticketedBills;
        ticketedBillsData.push(ticketedBills);
      }

      self.setState({
        optionsMixedChart: {
          xaxis: {
            categories
          }
        },
        seriesMixedChart: [
          {
            data: totalBillsData
          },
          {
            data: ticketedBillsData
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
            <Chart
              options={this.state.optionsMixedChart}
              series={this.state.seriesMixedChart}
              type="line"
              width="400"
              height="180"
              className="ticketToTask-chart-1"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TicketToBillBarGraph;

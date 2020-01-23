import React, { Component } from "react";
import Chart from "react-apexcharts";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";

class TicketGenerationSourceBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "apexchart-example"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "series-1",
          data: []
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
        totalCountData = [];
      let DashboardSourceGraphData = res.data.responseData.ticketSourceGraph;
      if (DashboardSourceGraphData !== null) {
      for (let i = 0; i < DashboardSourceGraphData.length; i++) {
        let ticketSourceName = DashboardSourceGraphData[i].ticketSourceName;
        categories.push(ticketSourceName);
        let totalCount = DashboardSourceGraphData[i].ticketSourceCount;
        totalCountData.push(totalCount);
      }

      self.setState({
        options: {
          xaxis: {
            categories
          }
        },
        series: [
          {
            data: totalCountData
          }
        ]
      });
    }
    });
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="col mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width={400}
              height={180}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TicketGenerationSourceBar;

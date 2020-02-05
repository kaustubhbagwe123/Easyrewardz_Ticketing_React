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
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          colors: ['#2561A8'],
          opacity: 1
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
          enabled: false
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
    // debugger;
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
        totalCountData = [];
      // let DashboardSourceGraphData = res.data.responseData.ticketSourceGraph;
      if (propsData !== null) {
      for (let i = 0; i < propsData.length; i++) {
        let ticketSourceName = propsData[i].ticketSourceName;
        categories.push(ticketSourceName);
        let totalCount = propsData[i].ticketSourceCount;
        totalCountData.push(totalCount);
      }

      this.setState({
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
    // });
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

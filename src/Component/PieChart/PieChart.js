import React, { Component } from 'react';
import { PieChart } from "react-d3-components";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";

class OpenByPriorityPie extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      data: {
        // label: 'somethingA',
        values: [
          { x: "Low,22", y: 22 },
          { x: "High,37", y: 37 },
          { x: "Medium,40", y: 40 }
        ]
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
    // var sort = null;
    // var data = {
    //   values: [
    //     { x: "Low,22", y: 22 },
    //     { x: "High,37", y: 37 },
    //     { x: "Medium,40", y: 40 }
    //   ]
    // };
    return (
      <div className="obpml">
        <PieChart
          data={this.state.data}
          width={300}
          height={260}
          margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
          sort={this.state.sort}
        />
      </div>
    )
  }
}

export default OpenByPriorityPie

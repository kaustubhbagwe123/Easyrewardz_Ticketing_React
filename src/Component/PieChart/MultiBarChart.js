import React, { Component } from 'react';
import Chart from 'react-apexcharts';
// import { authHeader } from "./../../helpers/authHeader";
// import axios from "axios";
// import config from "./../../helpers/config";

class MultiBarChart extends Component {
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
        name: 'Tickets with Task',
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
      if (propsData !== null && propsData !== undefined) {
        let categories = [],
          totalTicketsData = [],
          ticketedTaskData = [];
        // let DashboardBillGraphData = res.data.responseData.tickettoTaskGraph;
        for (let i = 0; i < propsData.length; i++) {
          let day = propsData[i].day;
          categories.push(day);
          let totalTickets = propsData[i].totalTickets;
          totalTicketsData.push(totalTickets);
          let taskTickets = propsData[i].taskTickets;
          ticketedTaskData.push(taskTickets);
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
              data: ticketedTaskData
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
          <Chart options={this.state.optionsMixedChart} series={this.state.seriesMixedChart} type="line" width="540" height="200" className="ticketToTask-chart"/>
        </div>
      </div>
    </div>
    );
  }
}

export default MultiBarChart;
import React, { Component } from "react";
import Chart from "react-apexcharts";

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
        plotOptions: {
          bar: {
            columnWidth: '90%'
          }
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
          marker: {
            fillColors: [ '#2561A8','#75A5DE']
          }
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
        totalBillsData = [],
        ticketedBillsData = [];
      // let DashboardBillGraphData = res.data.responseData.tickettoBillGraph;
      for (let i = 0; i < propsData.length; i++) {
        let ticketSourceName = propsData[i].ticketSourceName;
        categories.push(ticketSourceName);
        let totalBills = propsData[i].totalBills;
        totalBillsData.push(totalBills);
        let ticketedBills = propsData[i].ticketedBills;
        ticketedBillsData.push(ticketedBills);
      }

      this.setState({
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
    // });
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
              // width="400"
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

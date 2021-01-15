import React, { Component } from "react";
import Chart from "react-apexcharts";

export class OpenCompaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        xaxis: {
          // categories: ['Fianance', 'HR', 'Logistics', 'Infra']
          categories: [],
        },
      },
      series: [
        {
          // name: 'series-1',
          // data: [76, 140, 76, 101]
          data: [],
        },
      ],
    };

    this.handleGetDashboardGraphData = this.handleGetDashboardGraphData.bind(
      this
    );
  }
  componentDidMount() {
    this.handleGetDashboardGraphData();
  }

  handleGetDashboardGraphData() {
    var taskData = this.props.data;
    var category = [];
    var data = [];
    if (taskData !== null) {
      for (let i = 0; i < taskData.length; i++) {
        let categoryName = taskData[i].campaignStatusName;
        category.push(categoryName);
        let dataCount = taskData[i].campaignStatusCount;
        data.push(dataCount);
      }
      this.setState({
        options: {
          xaxis: {
            categories: category,
            // colors: ["#f5a623", "#c0505f", "#9cc541"],
          },
          dataLabels: {
            enabled: true,
            // formatter: function (val) {
            //   return val + "%";
            // },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"],
            },
          },
          legend: {
            show: false,
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: "top", // top, center, bottom
              },
            },
          },
          // colors: ["#f5a623", "#c0505f", "#9cc541"],
          // markers: {
          //   colors: ["#f5a623", "#c0505f", "#9cc541"],
          // },
        },
        series: [
          {
            data,
          },
        ],
      });
    }
  }
  render() {
    return (
      <div className="obpml" style={{ marginLeft: "10px" }}>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          // width={370}
          // height={250}
        />
      </div>
    );
  }
}

export default OpenCompaign;

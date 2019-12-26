import React, { Component, Fragment } from "react";
import ReactApexChart from "react-apexcharts";

class LineTotalChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          shadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          toolbar: {
            show: false
          }
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: "smooth"
        },
        grid: {
          borderColor: "#e7e7e7"
        },
        markers: {
          size: 6
        },
        xaxis: {
          categories: ["12-9 AM", "9-10 AM", "10-11 AM", "11-12 PM", "1-2 PM", "2-3 PM", "3-4 PM","4-5 PM","5-6 PM","6-7 PM","7-12 PM"],
        },
        yaxis: {
          min: 5,
          max: 40
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },
      series: [
        {
          name: "High - 2013",
          data: [12, 20, 23, 13, 25, 30, 27,15,15,18,27]
        }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height="190"
          />
        </div>
      </Fragment>
    );
  }
}

export default LineTotalChat;

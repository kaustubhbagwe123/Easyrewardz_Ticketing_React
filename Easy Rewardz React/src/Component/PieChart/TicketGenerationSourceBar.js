import React, { Component } from "react";
import Chart from "react-apexcharts";
class TicketGenerationSourceBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "apexchart-example"
        },
        xaxis: {
          categories: ["Call", "Email", "Social"]
        }
      },
      series: [
        {
          name: "series-1",
          data: [1600, 1450, 2300]
        }
      ]
    };
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

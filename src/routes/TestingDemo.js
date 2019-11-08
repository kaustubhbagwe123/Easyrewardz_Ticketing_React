import React, { Component } from "react";
import { PieChart } from "react-d3-components";
class TestingDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var sort = null;
    var data = {
      // label: 'somethingA',
      values: [
        { x: "Low", y: 22 },
        { x: "High", y: 37 },
        { x: "Medium", y: 40 }
      ]
    };
    return (
      <div>
        <PieChart
          data={data}
          width={370}
          height={250}
          margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
          sort={sort}
        />
      </div>
    );
  }
}

export default TestingDemo;

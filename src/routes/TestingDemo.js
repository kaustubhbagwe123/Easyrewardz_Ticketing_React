import React, { Component } from 'react';
import { PieChart } from "react-d3-components";
class TestingDemo extends Component {
  render() {
    var sort = null;
    var data = {
      // label: 'somethingA',
      values: [
        { x: "Low,22", y: 22 },
        { x: "High,37", y: 37 },
        { x: "Medium,40", y: 40 }
      ]
    };
    return (
      <div className="brush" style={{float: 'none'}}>
        <PieChart
          data={data}
          width={350}
          height={260}
          margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
          sort={sort}
        />
      </div>
    )
  }
}

export default TestingDemo
import React, { Component } from 'react';
import { PieChart } from "react-d3-components";
// import { authHeader } from "./../../helpers/authHeader";
// import axios from "axios";
// import config from "./../../helpers/config";

class OpenByPriorityPie extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      data: {
        values: []
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
      let values = [];
      // let DashboardBillGraphData = res.data.responseData.priorityChart;
      if (propsData !== null) {
        for (let i = 0; i < propsData.length; i++) {
          let priorityName = propsData[i].priorityName;
          let priorityCount = propsData[i].priorityCount;
          let obj = {x: `${priorityName}, ${priorityCount}`, y: priorityCount};
          values.push(obj);
        }
        this.setState({
          data: {
              values
          }
        });
      }
    // });
  }

  render() {
    return (
      <div className="obpml">
        <PieChart
          data={this.state.data}
          width={350}
          height={260}
          margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
          sort={this.state.sort}
          
        />
      </div>
    )
  }
}

export default OpenByPriorityPie

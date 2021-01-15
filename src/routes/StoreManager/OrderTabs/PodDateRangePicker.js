import React, { Component } from "react";
import moment from "moment";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

class PodDateRangePicker extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    ).subtract(30, "days");
    let end = moment(start).add(30, "days");
    this.state = {
      start: start,
      end: end
    };
  }
  handleApplyCallback = async (startDate, endDate) => {
    await this.setState({
      start: endDate[0],
      end: endDate[1]
    });

    this.props.applyCallbackPOD(startDate, endDate);
  };

  render() {
    return (
      <div>
        <RangePicker
          onChange={this.handleApplyCallback}
          bordered={false}
          format="DD-MM-YYYY"
      />
      </div>
    );
  }
}
export default PodDateRangePicker;

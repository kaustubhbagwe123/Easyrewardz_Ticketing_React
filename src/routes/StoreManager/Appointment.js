import React, { Component, Fragment } from "react";
import { Table, Select } from "antd";
import axios from "axios";
import config from "./../../helpers/config";
import { authHeader } from "./../../helpers/authHeader";
import moment from "moment";
import { NotificationManager } from "react-notifications";

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      appointmentGridData: [],
      rowExpandedCount: 0,
      todayCount: 0,
      tomorrowCount: 0,
      dayAfterTomorrowCount: 0,
      tomorrowDay: "",
      dayAfterTomorrowDay: "",
      status: [],
      tabFor: 1,
    };
    this.onRowExpand = this.onRowExpand.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.handleAppointmentGridData(1);
    this.handleAppointmentCount();
  }

  handleAppointmentGridData(tabFor) {
    debugger;
    let self = this;
    var date = "";
    this.setState({
      loading: true,
      tabFor: tabFor,
      status: [],
    });
    if (tabFor === 1) {
      date = moment(new Date()).format("YYYY-MM-DD");
    }
    if (tabFor === 2) {
      var todayDate = new Date();
      date = moment(todayDate.setDate(todayDate.getDate() + 1)).format(
        "YYYY-MM-DD"
      );
    }
    if (tabFor === 3) {
      var todayDate = new Date();
      date = moment(todayDate.setDate(todayDate.getDate() + 2)).format(
        "YYYY-MM-DD"
      );
    }

    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/GetAppointmentList",
      params: { AppDate: date },
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success" && data) {
          self.setState({
            appointmentGridData: data,
          });
        } else {
          self.setState({
            appointmentGridData: [],
          });
        }
        self.setState({
          loading: false,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAppointmentCount() {
    debugger;
    let self = this;
    var todayDate = new Date();
    var tomorrowDate = moment(
      todayDate.setDate(todayDate.getDate() + 1)
    ).format("Do");
    var dayAterTomorrowDate = moment(
      todayDate.setDate(todayDate.getDate() + 1)
    ).format("Do");
    self.setState({
      tomorrowDay: tomorrowDate,
      dayAfterTomorrowDay: dayAterTomorrowDate,
    });

    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/GetAppointmentCount",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success" && data) {
          self.setState({
            todayCount: data[0].today,
            tomorrowCount: data[0].tomorrow,
            dayAfterTomorrowCount: data[0].dayAfterTomorrow,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateAppointment(appointmentID) {
    debugger;
    let self = this;
    if (
      this.state.status[appointmentID] !== "" &&
      this.state.status[appointmentID] !== undefined
    ) {
      axios({
        method: "post",
        url: config.apiUrl + "/Appointment/UpdateAppointmentStatus",
        data: {
          AppointmentID: appointmentID,
          Status: parseInt(this.state.status[appointmentID]),
        },
        headers: authHeader(),
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success("Record updated successFully.");
          } else {
            NotificationManager.error(status);
          }
          self.handleAppointmentGridData(self.state.tabFor);
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      NotificationManager.error("Please select status.");
    }
  }

  onRowExpand(expanded, record) {
    debugger;
    let rowExpandedCount;
    if (expanded) {
      rowExpandedCount = this.state.rowExpandedCount + 1;
      this.setState({
        rowExpandedCount,
      });
    } else {
      rowExpandedCount = this.state.rowExpandedCount - 1;
      this.setState({
        rowExpandedCount,
      });
    }
  }

  handleOnChange(event, index) {
    const val = event.target.value;
    this.setState((oldState) => {
      const newStatus = oldState.status.slice();
      newStatus[index] = val;
      return {
        status: newStatus,
      };
    });
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    const { Option } = Select;
    return (
      <div className="custom-tableak custom-table-ck">
        <div className="custom-tabs">
          <div
            className={
              this.state.tabFor === 1 ? "custom-tabcount" : "custom-tabcount1"
            }
            onClick={this.handleAppointmentGridData.bind(this, 1)}
          >
            <p className={this.state.tabFor === 1 ? "tab-title" : "tab-title1"}>
              Today
            </p>
            <span
              className={this.state.tabFor === 1 ? "tab-count" : "tab-count1"}
            >
              {this.state.todayCount}
            </span>
          </div>
          <div
            className={
              this.state.tabFor === 2 ? "custom-tabcount" : "custom-tabcount1"
            }
            onClick={this.handleAppointmentGridData.bind(this, 2)}
          >
            <p className={this.state.tabFor === 2 ? "tab-title" : "tab-title1"}>
              {this.state.tomorrowDay}
            </p>
            <span
              className={this.state.tabFor === 2 ? "tab-count" : "tab-count1"}
            >
              {this.state.tomorrowCount}
            </span>
          </div>
          <div
            className={
              this.state.tabFor === 3 ? "custom-tabcount" : "custom-tabcount1"
            }
            onClick={this.handleAppointmentGridData.bind(this, 3)}
          >
            <p className={this.state.tabFor === 3 ? "tab-title" : "tab-title1"}>
              {this.state.dayAfterTomorrowDay}
            </p>
            <span
              className={this.state.tabFor === 3 ? "tab-count" : "tab-count1"}
            >
              {this.state.dayAfterTomorrowCount}
            </span>
          </div>
        </div>
        <div className="table-cntr store">
          <Table
            className="components-table-demo-nested antd-table-campaign custom-antd-table"
            columns={[
              {
                title: "Date",
                dataIndex: "appointmentDate",
              },
              {
                title: "Time",
                dataIndex: "timeSlot",
              },
              {
                title: "Appointments",
                dataIndex: "nOofPeople",
                className: "appointment-desktop",
              },
              {
                title: "Appt.",
                dataIndex: "nOofPeople",
                className: "appointment-mobile",
              },
              {
                title: "Max Capacity",
                dataIndex: "maxCapacity",
                className: "appointment-desktop",
              },
              {
                title: "Max Cap.",
                dataIndex: "maxCapacity",
                className: "appointment-mobile",
              },
              {
                title: "Actions",
                // dataIndex: "orderPricePaid"
              },
            ]}
            expandedRowRender={(row) => {
              return (
                <Table
                  dataSource={row.appointmentCustomerList}
                  columns={[
                    {
                      title: "Customer Name",
                      dataIndex: "customerName",
                      className: "appointment-desktop",
                    },
                    {
                      title: "Mobile No.",
                      dataIndex: "customerNumber",
                      className: "appointment-desktop",
                    },
                    {
                      title: "No. of People",
                      dataIndex: "nOofPeople",
                      className: "appointment-desktop",
                    },
                    {
                      title: "Customer Name",
                      dataIndex: "customerName",
                      className: "appointment-mobile",
                      render: (row, item) => {
                        return (
                          <div>
                            <p className="appt-cust-name">
                              {item.customerName}
                            </p>
                            <p className="appt-cust-mob">
                              {item.customerNumber}
                            </p>
                            <p className="appt-cust-mob">
                              No. of People: {item.nOofPeople}
                            </p>
                          </div>
                        );
                      },
                    },
                    {
                      title: "Status",
                      render: (row, item) => {
                        if (item.status !== "") {
                          return (
                            <div className="d-flex">
                              <div>
                                <button
                                  className="statusBtn"
                                  type="button"
                                  style={{ marginRight: "10px" }}
                                  disabled
                                >
                                  <label className="statusLabel">
                                    {item.status}
                                  </label>
                                </button>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div className="appt-status">
                              {/* <select
                                  value={this.state.status[row.appointmentID]}
                                  onChange={(e) =>
                                    this.handleOnChange(e, row.appointmentID)
                                  }
                                >
                                  <option value="">Select Status</option>
                                  <option value="0">Cancel</option>
                                  <option value="1">Visited</option>
                                  <option value="2">Not Visited</option>
                                </select> */}
                              <Select
                                // defaultValue="0"
                                placeholder="Select Status"
                                onChange={this.handleChange}
                                dropdownClassName="appt-status-dropdown"
                              >
                                <Option value="0">Cancel</Option>
                                <Option value="1">Visited</Option>
                                <Option value="2">Not Visited</Option>
                              </Select>
                            </div>
                          );
                        }
                      },
                      //   render: (row, item) => {
                      //     return (
                      //       <div className="d-flex">
                      //         <div>
                      //           <input
                      //             type="radio"
                      //             name={
                      //               "campaign-status-" + item.campaignCustomerID
                      //             }
                      //             className="campaign-status-btn"
                      //             id={"contactBtnGreen" + item.campaignCustomerID}
                      //             onChange={this.onStatusChange.bind(
                      //               this,
                      //               item.campaignTypeID,
                      //               item.campaignCustomerID
                      //             )}
                      //             value="100"
                      //             checked={item.campaignStatus === 100}
                      //           />
                      //           <label
                      //             className="table-btnlabel contactBtnGreen"
                      //             htmlFor={
                      //               "contactBtnGreen" + item.campaignCustomerID
                      //             }
                      //           >
                      //             Contacted
                      //           </label>
                      //         </div>
                      //         <div className="position-relative">
                      //           {item.noOfTimesNotContacted !== 0 &&
                      //             item.campaignStatus === 101 && (
                      //               <div className="not-contacted-count">
                      //                 {item.noOfTimesNotContacted}
                      //               </div>
                      //             )}
                      //           <input
                      //             type="radio"
                      //             name={
                      //               "campaign-status-" + item.campaignCustomerID
                      //             }
                      //             className="campaign-status-btn"
                      //             id={
                      //               "notConnectedBtnRed" + item.campaignCustomerID
                      //             }
                      //             onChange={this.onStatusChange.bind(
                      //               this,
                      //               item.campaignTypeID,
                      //               item.campaignCustomerID
                      //             )}
                      //             value="101"
                      //             checked={item.campaignStatus === 101}
                      //           />
                      //           <label
                      //             className="table-btnlabel notConnectedBtnRed"
                      //             htmlFor={
                      //               "notConnectedBtnRed" + item.campaignCustomerID
                      //             }
                      //           >
                      //             Not Contacted
                      //           </label>
                      //         </div>
                      //         <div>
                      //           <input
                      //             type="radio"
                      //             name={
                      //               "campaign-status-" + item.campaignCustomerID
                      //             }
                      //             className="campaign-status-btn"
                      //             id={
                      //               "followUpBtnYellow" + item.campaignCustomerID
                      //             }
                      //             onChange={this.onStatusChange.bind(
                      //               this,
                      //               item.campaignTypeID,
                      //               item.campaignCustomerID
                      //             )}
                      //             value="102"
                      //             checked={item.campaignStatus === 102}
                      //           />
                      //           <label
                      //             className="table-btnlabel followUpBtnYellow"
                      //             htmlFor={
                      //               "followUpBtnYellow" + item.campaignCustomerID
                      //             }
                      //           >
                      //             Follow Up
                      //           </label>
                      //         </div>
                      //       </div>
                      //     );
                      //   },
                    },
                    {
                      title: "Actions",
                      render: (row, item) => {
                        if (item.status === "") {
                          return (
                            <div className="d-flex">
                              <div>
                                <button
                                  className="saveBtn"
                                  type="button"
                                  style={{
                                    minWidth: "5px",
                                    marginRight: "10px",
                                  }}
                                  onClick={this.handleUpdateAppointment.bind(
                                    this,
                                    item.appointmentID
                                  )}
                                >
                                  <label className="saveLabel">Update</label>
                                </button>
                              </div>
                            </div>
                          );
                        }
                      },
                    },
                  ]}
                  pagination={false}
                />
              );
            }}
            onExpand={this.onRowExpand}
            expandIconColumnIndex={6}
            expandIconAsCell={false}
            pagination={{ defaultPageSize: 5 }}
            loading={this.state.loading}
            dataSource={this.state.appointmentGridData}
          />
        </div>
      </div>
    );
  }
}
export default Appointment;

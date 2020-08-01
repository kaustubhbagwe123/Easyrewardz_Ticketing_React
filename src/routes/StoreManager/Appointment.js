import React, { Component, Fragment } from "react";
import { Table, Select } from "antd";
import axios from "axios";
import config from "./../../helpers/config";
import { authHeader } from "./../../helpers/authHeader";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
import SchRight from "./../../assets/Images/sch-right.png";

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
      translateLanguage: {},
      appointmentDaysData: [],
    };
    this.onRowExpand = this.onRowExpand.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.handleAppointmentCount();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  handleAppointmentGridData(tabFor, adate) {
    debugger;
    let self = this;
    var date = "";
    this.setState({
      loading: true,
      tabFor: tabFor,
      status: [],
    });
    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/GetAppointmentList",
      params: { AppDate: moment(new Date(adate)).format("YYYY-MM-DD") },
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
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/GetAppointmentCount",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success" && data) {
          self.setState({
            appointmentDaysData: data,
          });
          self.handleAppointmentGridData(1, data[0].appointmentDate);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateAppointment(appointmentID) {
    const TranslationContext = this.state.translateLanguage.default;
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
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordupdatedsuccessfully
                : "Record updated successFully."
            );
          } else {
            NotificationManager.error(status);
          }
          self.handleAppointmentGridData(self.state.tabFor);
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseselectstatus
          : "Please select status."
      );
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

  handleOnChange(value, index) {
    debugger;
    const val = value;
    this.setState((oldState) => {
      const newStatus = oldState.status.slice();
      newStatus[index] = val;
      return {
        status: newStatus,
      };
    });
  }
  ////handle scroll right
  handleScrollRight(num) {
    document.getElementById("AppointmentDiv").scrollLeft += 20;
  }
  ////handle scroll left
  handleScrollLeft(num) {
    document.getElementById("AppointmentDiv").scrollLeft -= 20;
  }

  render() {
    const { Option } = Select;
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <div className="custom-tableak custom-table-ck custom-table-bg">
        <div className="custom-tabs">
          <div
            className="selectdot-blue selectdot-blue-left"
            onClick={this.handleScrollLeft.bind(this)}
            style={{ marginTop: "0" }}
          >
            <img src={SchRight} alt="right arrow" />
          </div>
          <div id="AppointmentDiv" className="appointmentDiv">
            {this.state.appointmentDaysData
              ? this.state.appointmentDaysData.map((item, i) => {
                  var fdate = new Date(item.appointmentDate);
                  // var adate = fdate.getDate();
                  {
                    return (
                      <div
                        className={
                          this.state.tabFor === i + 1
                            ? "custom-tabcount"
                            : "custom-tabcount1"
                        }
                        onClick={this.handleAppointmentGridData.bind(
                          this,
                          i + 1,
                          item.appointmentDate
                        )}
                      >
                        {i === 0 &&
                        new Date() === new Date(item.appointmentDate) ? (
                          <p
                            style={{ marginRight: "10px" }}
                            className={
                              this.state.tabFor === i + 1
                                ? "tab-title"
                                : "tab-title1"
                            }
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.p.today
                              : "Today"}
                          </p>
                        ) : (
                          <p
                            style={{ marginRight: "10px" }}
                            className={
                              this.state.tabFor === i + 1
                                ? "tab-title"
                                : "tab-title1"
                            }
                          >
                            {moment(fdate.setDate(fdate.getDate())).format(
                              "Do"
                            )}
                          </p>
                        )}
                        <span
                          className={
                            this.state.tabFor === i + 1
                              ? "tab-count"
                              : "tab-count1"
                          }
                        >
                          {item.aptCount}
                        </span>
                      </div>
                    );
                  }
                })
              : null}
          </div>
          <div
            className="selectdot-blue"
            onClick={this.handleScrollRight.bind(this)}
            style={{ marginTop: "0" }}
          >
            <img src={SchRight} alt="right arrow" />
          </div>
        </div>
        <div className="table-cntr store">
          <Table
            className="components-table-demo-nested antd-table-campaign custom-antd-table"
            columns={[
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.date
                    : "Date",
                dataIndex: "appointmentDate",
                width: "20%",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.time
                    : "Time",
                dataIndex: "timeSlot",
                width: "20%",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.appointments
                    : "Appointments",
                dataIndex: "nOofPeople",
                className: "appointment-desktop",
                width: "20%",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.appointments
                    : "Appt.",
                dataIndex: "nOofPeople",
                className: "appointment-mobile",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.maxcapacity
                    : "Max Capacity",
                dataIndex: "maxCapacity",
                className: "appointment-desktop",
                width: "20%",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.maxcapacity
                    : "Max Cap.",
                dataIndex: "maxCapacity",
                className: "appointment-mobile",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.actions
                    : "Actions",

                width: "20%",
              },
            ]}
            expandedRowRender={(row) => {
              return (
                <Table
                  dataSource={row.appointmentCustomerList}
                  columns={[
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.title.appointmentID
                          : "Appointment ID",
                      dataIndex: "appointmentID",
                      className: "appointment-desktop",
                      width: "20%",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.title.customername
                          : "Customer Name",
                      dataIndex: "customerName",
                      className: "appointment-desktop",
                      width: "20%",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.title.mobilenumber
                          : "Mobile No.",
                      dataIndex: "customerNumber",
                      className: "appointment-desktop",
                      width: "20%",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.title.numberofpeople
                          : "No. of People",
                      dataIndex: "nOofPeople",
                      className: "appointment-desktop",
                      width: "20%",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.title.customername
                          : "Customer Name",
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
                              {TranslationContext !== undefined
                                ? TranslationContext.p.numberofpeople
                                : "No. of People"}
                              : {item.nOofPeople}
                            </p>
                          </div>
                        );
                      },
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.title.status
                          : "Status",
                      width: "20%",
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
                              <Select
                                placeholder={
                                  TranslationContext !== undefined
                                    ? TranslationContext.placeholder
                                        .selectstatus
                                    : "Select Status"
                                }
                                onChange={(e) =>
                                  this.handleOnChange(e, row.appointmentID)
                                }
                                dropdownClassName="appt-status-dropdown"
                              >
                                <Option value="0">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.option.cancel
                                    : "Cancel"}
                                </Option>
                                <Option value="1">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.option.visited
                                    : "Visited"}
                                </Option>
                                <Option value="2">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.option.notvisited
                                    : "Not Visited"}
                                </Option>
                              </Select>
                            </div>
                          );
                        }
                      },
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.title.actions
                          : "Actions",
                      width: "20%",
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
                                  <label className="saveLabel">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.update
                                      : "Update"}
                                  </label>
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
            pagination={{ defaultPageSize: 10, showSizeChanger: true }}
            showSizeChanger={true}
            onShowSizeChange={true}
            loading={this.state.loading}
            dataSource={this.state.appointmentGridData}
          />
        </div>
      </div>
    );
  }
}
export default Appointment;

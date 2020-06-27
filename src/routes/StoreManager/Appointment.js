import React, { Component, Fragment } from "react";
import { Table, Select } from "antd";
import axios from "axios";
import config from "./../../helpers/config";
import { authHeader } from "./../../helpers/authHeader";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import * as translationHI from '../../translations/hindi'
import * as translationMA from '../../translations/marathi'


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
      translateLanguage: {}
    };
    this.onRowExpand = this.onRowExpand.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.handleAppointmentGridData(1);
    this.handleAppointmentCount();

    if(window.localStorage.getItem("translateLanguage") === "hindi"){
      this.state.translateLanguage = translationHI
     }
     else if(window.localStorage.getItem("translateLanguage") === 'marathi'){
       this.state.translateLanguage = translationMA
     }
     else{
       this.state.translateLanguage = {}
     }

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
            NotificationManager.success(TranslationContext!==undefined?TranslationContext.alertmessage.recordupdatedsuccessfully:"Record updated successFully.");
          } else {
            NotificationManager.error(status);
          }
          self.handleAppointmentGridData(self.state.tabFor);
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      NotificationManager.error(TranslationContext!==undefined?TranslationContext.alertmessage.pleaseselectstatus:"Please select status.");
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

  render() {
    const { Option } = Select;
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <div className="custom-tableak custom-table-ck custom-table-bg">
        <div className="custom-tabs">
          <div
            className={
              this.state.tabFor === 1 ? "custom-tabcount" : "custom-tabcount1"
            }
            onClick={this.handleAppointmentGridData.bind(this, 1)}
          >
            <p className={this.state.tabFor === 1 ? "tab-title" : "tab-title1"}>
              
              {TranslationContext!==undefined?TranslationContext.p.today:"Today"}
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
                title: TranslationContext!==undefined?TranslationContext.title.date:"Date",
                dataIndex: "appointmentDate",
                width: "20%",
              },
              {
                title:TranslationContext!==undefined?TranslationContext.title.time:"Time",
                dataIndex: "timeSlot",
                width: "20%",
              },
              {
                title: TranslationContext!==undefined?TranslationContext.title.appointments:"Appointments",
                dataIndex: "nOofPeople",
                className: "appointment-desktop",
                width: "20%",
              },
              {
                title: TranslationContext!==undefined?TranslationContext.title.appointments:"Appt.",
                dataIndex: "nOofPeople",
                className: "appointment-mobile",
              },
              {
                title: TranslationContext!==undefined?TranslationContext.title.maxcapacity:"Max Capacity",
                dataIndex: "maxCapacity",
                className: "appointment-desktop",
                width: "20%",
              },
              {
                title: TranslationContext!==undefined?TranslationContext.title.maxcapacity:"Max Cap.",
                dataIndex: "maxCapacity",
                className: "appointment-mobile",
              },
              {
                title: TranslationContext!==undefined?TranslationContext.title.actions:"Actions",
                // dataIndex: "orderPricePaid"
                width: "20%",
              },
            ]}
            expandedRowRender={(row) => {
              return (
                <Table
                  dataSource={row.appointmentCustomerList}
                  columns={[
                    {
                      title: TranslationContext!==undefined?TranslationContext.title.customername:"Customer Name",
                      dataIndex: "customerName",
                      className: "appointment-desktop",
                      width: "20%",
                    },
                    {
                      title: TranslationContext!==undefined?TranslationContext.title.mobilenumber:"Mobile No.",
                      dataIndex: "customerNumber",
                      className: "appointment-desktop",
                      width: "20%",
                    },
                    {
                      title: TranslationContext!==undefined?TranslationContext.title.numberofpeople:"No. of People",
                      dataIndex: "nOofPeople",
                      className: "appointment-desktop",
                      width: "20%",
                    },
                    {
                      title: TranslationContext!==undefined?TranslationContext.title.customername:"Customer Name",
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
                        {TranslationContext!==undefined?TranslationContext.p.numberofpeople:"No. of People"}: {item.nOofPeople}
                            </p>
                          </div>
                        );
                      },
                    },
                    {
                      title: TranslationContext!==undefined?TranslationContext.title.status:"Status",
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
                                placeholder="Select Status"
                                onChange={(e) =>
                                  this.handleOnChange(e, row.appointmentID)
                                }
                                dropdownClassName="appt-status-dropdown"
                              >
                                <Option value="0">
                                {TranslationContext!==undefined?TranslationContext.option.cancel:"Cancel"}
                                </Option>
                                <Option value="1">
                                {TranslationContext!==undefined?TranslationContext.option.visited:"Visited"}
                                </Option>
                                <Option value="2">
                                {TranslationContext!==undefined?TranslationContext.option.notvisited:"Not Visited"}
                                </Option>
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
                      title: TranslationContext!==undefined?TranslationContext.title.actions:"Actions",
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
                                  {TranslationContext!==undefined?TranslationContext.label.update:"Update"}
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

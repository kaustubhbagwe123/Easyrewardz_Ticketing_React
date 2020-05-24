import React, { Component, Fragment } from "react";
import { Table, Select } from "antd";
import axios from "axios";
import config from "./../../helpers/config";
import { authHeader } from "./../../helpers/authHeader";
import ProgressMenIcon from "./../../assets/Images/progress-men-icon.png";
import SearchBlue from "./../../assets/Images/appoint-search.png";
import Location from "./../../assets/Images/location.png";
import Calling from "./../../assets/Images/calling.png";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import Modal from "react-responsive-modal";

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
      appointProgress: "90%",
      searchExpand: false,
      createAppointModal: false,
    };
    this.onRowExpand = this.onRowExpand.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.handleAppointmentGridData(1);
    this.handleAppointmentCount();
  }

  handleSearchExpand() {
    this.setState({
      searchExpand: !this.state.searchExpand,
    });
  }

  handleCreateAppointmentOpen() {
    this.setState({
      createAppointModal: true,
    });
  }

  handleCreateAppointmentClose() {
    this.setState({
      createAppointModal: false,
    });
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
    return (
      <div className="custom-tableak custom-table-ck custom-table-bg p-0">
        <div className="custom-tabs">
          <div className="d-flex">
            <div
              className={
                this.state.tabFor === 1 ? "custom-tabcount" : "custom-tabcount1"
              }
              onClick={this.handleAppointmentGridData.bind(this, 1)}
            >
              <p
                className={this.state.tabFor === 1 ? "tab-title" : "tab-title1"}
              >
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
              <p
                className={this.state.tabFor === 2 ? "tab-title" : "tab-title1"}
              >
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
              <p
                className={this.state.tabFor === 3 ? "tab-title" : "tab-title1"}
              >
                {this.state.dayAfterTomorrowDay}
              </p>
              <span
                className={this.state.tabFor === 3 ? "tab-count" : "tab-count1"}
              >
                {this.state.dayAfterTomorrowCount}
              </span>
            </div>
          </div>
          <div className="appointment-top-right">
            <div className="butn d-flex align-items-center">
              <input
                placeholder="Search by Appointment ID or Mobile No"
                type="text"
                className={
                  this.state.searchExpand
                    ? "appoint-input appoint-input-full"
                    : "appoint-input"
                }
              />
              <a
                href="#!"
                className="appoint-search"
                onClick={this.handleSearchExpand.bind(this)}
              >
                <img src={SearchBlue} alt="search icon" />
              </a>
            </div>
            <a
              href="#!"
              className="butn"
              onClick={this.handleCreateAppointmentOpen.bind(this)}
            >
              + Create Appointment
            </a>
            {/* Create Appointment Modal */}
            <Modal
              open={this.state.createAppointModal}
              onClose={this.handleCreateAppointmentClose.bind(this)}
              center
              modalId="create-appoint-popup"
              overlayId="chat-popup-overlay"
            >
              <div className="appnt-top-blue">
                <div className="position-relative">
                  <i
                    class="arrow-left"
                    onClick={this.handleCreateAppointmentClose.bind(this)}
                  ></i>
                  <h5>Create Appointment</h5>
                </div>
                <div className="create-appnt-details">
                  <h4>Looks Salon</h4>
                  <div className="appnt-info-cntr">
                    <div className="appnt-img-cntr">
                      <img src={Location} alt="location icon" />
                    </div>
                    <p>
                      SHOP No 1. IInd floor, Gaur Central Mall, RDC, Ghaziabad,
                      Uttar Pradesh 201002
                    </p>
                  </div>
                  <div className="appnt-info-cntr">
                    <div className="appnt-img-cntr">
                      <img src={Calling} alt="phone icon" />
                    </div>
                    <p>Phone: 0120 282 3444</p>
                  </div>
                </div>
              </div>
              <div className="appnt-bottom-white">
                <div className="appnt-input-group">
                  <label>Name</label>
                  <input type="text" />
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <div className="appoint-outer-pad">
          <div className="customer-count-block">
            <div className="vacancy-info">
              <div className="total-info">
                <p className="tot-all">
                  <span className="total-dis">Total </span>Customer Allowed{" "}
                  <span className="tot-cnt">50</span>
                </p>
                <div className="cust-prog-outer">
                  <div
                    className="cust-prog-fill"
                    style={{ width: this.state.appointProgress }}
                  ></div>
                  <div
                    className="cust-prog-circ"
                    style={{ left: this.state.appointProgress }}
                  >
                    <img src={ProgressMenIcon} alt="progress icon" />
                  </div>
                </div>
                <p className="cust-store">Customers Instore</p>
              </div>
              <div className="empty-filled-info">
                <div className="empty-info">10</div>
                <div className="filled-info">40</div>
              </div>
            </div>
            <div className="slot-info">
              <p>09-10 PM</p>
              <p>Slot already booked for 5 more people</p>
            </div>
          </div>
          <div className="table-cntr store">
            <Table
              className="components-table-demo-nested antd-table-campaign custom-antd-table"
              columns={[
                {
                  title: "Date",
                  dataIndex: "appointmentDate",
                  width: "20%",
                },
                {
                  title: "Time",
                  dataIndex: "timeSlot",
                  width: "20%",
                },
                {
                  title: "Appointments",
                  dataIndex: "nOofPeople",
                  className: "appointment-desktop",
                  width: "20%",
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
                  width: "20%",
                },
                {
                  title: "Max Cap.",
                  dataIndex: "maxCapacity",
                  className: "appointment-mobile",
                },
                {
                  title: "Actions",
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
                        title: "Customer Name",
                        dataIndex: "customerName",
                        className: "appointment-desktop",
                        width: "20%",
                      },
                      {
                        title: "Mobile No.",
                        dataIndex: "customerNumber",
                        className: "appointment-desktop",
                        width: "20%",
                      },
                      {
                        title: "No. of People",
                        dataIndex: "nOofPeople",
                        className: "appointment-desktop",
                        width: "20%",
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
              pagination={{ defaultPageSize: 10, showSizeChanger: true }}
              showSizeChanger={true}
              onShowSizeChange={true}
              loading={this.state.loading}
              dataSource={this.state.appointmentGridData}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Appointment;

import React, { Component, Fragment, PureComponent, useState } from "react";
import {
  Table,
  Select,
  Collapse,
  Spin,
  DatePicker as DatePickerAnt,
} from "antd";
import axios from "axios";
import config from "./../../helpers/config";
import { authHeader } from "./../../helpers/authHeader";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
import WhiteRightArrow from "./../../assets/Images/down-white.png";
import SchRight from "./../../assets/Images/sch-right.png";
import LeftWhi from "./../../assets/Images/down.png";
import Pagination from "react-pagination-js";
import DatePicker from "react-datepicker";
import "react-pagination-js/dist/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import Filter from "./../../assets/Images/icons8-filter.svg";
import CancalImg from "./../../assets/Images/cancal blue.png";
import SearchIcon from "./../../assets/Images/search-icon.png";
const { Panel } = Collapse;
const { Option } = Select;

class AppointmentExpandComponent extends PureComponent {
  state = {
    appointmentCustomerListData: this.props.appointmentCustomerListData,
    status: 0,
    activePanel: [],
  };

  handleStatusChange = (e) => {
    this.setState({ status: e });
  };

  PaginationOnChange = (e) => {
    // this.setState({pageNo:})
  };
  handleUpdateAppointment = (appointmentID) => {
    if (this.state.status) {
      this.props.handleUpdateAppointmentMobile(
        appointmentID,
        Number(this.state.status)
      );
    } else {
      NotificationManager.error("please select status.");

      this.forceUpdate();
    }
  };
  handlecollapseChange = (e) => {
    this.state.activePanel = e[e.length - 1];
    this.setState({ activePanel: this.state.activePanel });
    this.forceUpdate();
  };

  render() {
    const TranslationContext = this.props.translateLanguage.default;
    return (
      <div style={{ marginTop: "25px" }}>
        {/* <Pagination
            currentPage={this.state.pageNo}
            totalSize={this.state.pageCount}
            sizePerPage={this.state.pageSize}
            changeCurrentPage={this.PaginationOnChange}
          /> */}

        <Collapse
          bordered={false}
          className="site-collapse-custom-collapse"
          expandIconPosition={"right"}
          destroyInactivePanel={true}
          onChange={this.handlecollapseChange.bind(this)}
          activeKey={this.state.activePanel}
        >
          {this.state.appointmentCustomerListData.length > 0
            ? this.state.appointmentCustomerListData.map((item, key) => {
                return (
                  <Panel
                    header={
                      <>
                        <div className="appcusname">
                          <label className="ite1">{item.customerName}</label>
                          <label className="ite2">{item.customerNumber}</label>
                        </div>
                      </>
                    }
                    key={key}
                    className="site-collapse-custom-panel"
                  >
                    <div className="extendap">
                      <div className="row mb-2">
                        <div className="col-5">
                          <label>ID</label>
                        </div>
                        <div className="col-7">
                          <label>{item.appointmentID}</label>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-5">
                          <label>Select Status</label>
                        </div>
                        <div className="col-7">
                          {!item.status ? (
                            <div className="select">
                              <Select
                                placeholder={
                                  TranslationContext !== undefined
                                    ? TranslationContext.placeholder
                                        .selectstatus
                                    : "Select Status"
                                }
                                dropdownClassName="appt-status-dropdown"
                                onChange={this.handleStatusChange.bind(this)}
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
                          ) : (
                            <button
                              className="statusBtn"
                              type="button"
                              style={{ marginRight: "10px" }}
                            >
                              <label className="statusLabel">
                                {item.status}
                              </label>
                            </button>
                          )}
                        </div>
                      </div>
                      {!item.status ? (
                        <div className="row mb-2">
                          <div className="col-5"></div>
                          <div className="col-7">
                            <button
                              onClick={this.handleUpdateAppointment.bind(
                                this,
                                item.appointmentID
                              )}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </Panel>
                );
              })
            : null}
        </Collapse>
      </div>
    );
  }
}

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
      isMobileView: false,
      isTableRowClick: false,
      appointmentDate: "",
      appointmentCustomerListData: [],
      isSearch: false,
      endDate: null,
      startDate: null,
      appointmentID: "",
      customerNumber: "",
      isSearchData: false,
      collapseSearch: false,
    };
    this.onRowExpand = this.onRowExpand.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    // if (window.localStorage.getItem("module")) {
    //
    //   var moduleData = JSON.parse(window.localStorage.getItem("module"));
    //   if (moduleData) {
    //
    //     var campModule = moduleData.filter(
    //       (x) => x.moduleName === "Appointment" && x.modulestatus === true
    //     );
    //     if (campModule.length === 0) {
    //       this.props.history.push("/store/404notfound");
    //     }
    //   }
    // }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.handleAppointmentCount();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }
  resize() {
    if (window.innerWidth <= 760) {
      this.setState({ isMobileView: window.innerWidth <= 760 });
    } else {
      this.setState({ isTableRowClick: false, isMobileView: false });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  handleAppointmentGridData(tabFor, adate) {
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
  handleUpdateAppointmentMobile = (appointmentID, statusId) => {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/UpdateAppointmentStatus",
      data: {
        AppointmentID: appointmentID,
        Status: Number(statusId),
      },
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.setState({
            isSearch: false,
            isSearchData: false,
            isTableRowClick: false,
          });
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordupdatedsuccessfully
              : "Record updated successFully."
          );
        } else {
          NotificationManager.error(status);
        }
        self.handleAppointmentGridData(
          self.state.tabFor,
          self.state.appointmentDaysData[self.state.tabFor - 1].appointmentDate
        );
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleUpdateAppointment(appointmentID) {
    const TranslationContext = this.state.translateLanguage.default;

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
          self.handleAppointmentGridData(
            self.state.tabFor,
            self.state.appointmentDaysData[self.state.tabFor - 1]
              .appointmentDate
          );
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

  handelAppointmentRowClick = (data) => {
    if (this.state.isMobileView) {
      this.setState({
        isTableRowClick: true,
        appointmentDate: data.appointmentDate,
        appointmentCustomerListData: data.appointmentCustomerList,
      });
    } else {
    }
  };
  handleAppointmentBackClick = () => {
    if (this.state.isMobileView) {
      this.setState({
        isTableRowClick: false,
        isSearch: false,
      });
    }
  };
  handleSearchDatePickerChange = (dates) => {
    if (this.state.isMobileView) {
      this.setState({
        startDate: dates,
      });
    } else {
      this.setState({
        startDate: moment(dates).toString(),
      });
    }
  };

  handleAppointmentGridDataSearch() {
    let self = this;
    debugger;
    if (
      this.state.appointmentID.length > 0 ||
      this.state.customerNumber.length > 0 ||
      this.state.startDate
    ) {
      this.setState({
        loading: true,
        isSearch: false,
      });
      var selectedDate = "";
      var startDate = moment(this.state.startDate)
        .format("DD-MM-YYYY")
        .toString();
      if (this.state.endDate) {
        var endDate = moment(this.state.endDate)
          .format("DD-MM-YYYY")
          .toString();
        selectedDate = startDate + "," + endDate;
      } else {
        if (this.state.startDate) {
          selectedDate = startDate + "," + startDate;
        }
      }

      axios({
        method: "post",
        url: config.apiUrl + "/Appointment/GetAppointmentSearchList",
        data: {
          AppointmentID: this.state.appointmentID || 0,
          CustomerNumber: this.state.customerNumber || "",
          Date: selectedDate,
        },
        headers: authHeader(),
      })
        .then((response) => {
          var message = response.data.message;
          var responseData = response.data.responseData;
          self.setState({ loading: false });
          if (message === "Success") {
            self.setState({
              appointmentGridData: responseData,
              isSearchData: true,
            });
            self.handleAppointmentBackClick();
          } else {
            self.setState({
              appointmentGridData: [],

              isSearchData: true,
            });
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  handleSeachTextChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    if (name === "appointmentID") {
      this.setState({
        appointmentID: value,
      });
    }
    if (name === "customerNumber") {
      this.setState({
        customerNumber: value,
      });
    }
  };
  handleAppointmentclearSearch = () => {
    this.setState({
      isSearch: false,
      isSearchData: false,
      isTableRowClick: false,
      appointmentID: "",
      customerNumber: "",
      startDate: null,
      endDate: null,
    });
    this.handleAppointmentGridData(
      this.state.tabFor,
      this.state.appointmentDaysData[this.state.tabFor - 1].appointmentDate
    );
  };

  handleSearchDatePickerEndChange = (date) => {
    if (this.state.isMobileView) {
      this.setState({
        endDate: date,
      });
    } else {
      this.setState({
        endDate: moment(date).toString(),
      });
    }
  };
  handleFilterSearchClick = () => {
    this.setState({
      isSearch: true,
    });
  };
  HandleToggleSearch = () => {
    this.setState({ collapseSearch: !this.state.collapseSearch });
  };

  render() {
    const { Option } = Select;
    const TranslationContext = this.state.translateLanguage.default;

    return (
      <div
        className="custom-tableak custom-table-ck custom-table-bg apoinmentmobvi"
        style={{
          maxHeight: this.state.isMobileView
            ? this.state.isSearch
              ? ""
              : "calc(100vh - 130px)"
            : "",
          overflow: this.state.isMobileView
            ? this.state.isSearch
              ? ""
              : "auto"
            : "",
        }}
      >
        {this.state.isMobileView && !this.state.isSearch ? (
          <div
            className="filter"
            onClick={this.handleFilterSearchClick.bind(this)}
          >
            <img src={Filter} className="fil" alt="Filter" width="15px" />
          </div>
        ) : null}
        <div
          className="custom-tabs appoinmentMob"
          style={{ marginBottom: !this.state.isMobileView ? "10px" : "" }}
        >
          <div
            className="selectdot-blue selectdot-blue-left"
            onClick={this.handleScrollLeft.bind(this)}
            style={{ marginTop: "0" }}
          >
            <img src={SchRight} alt="right arrow" className="righ" />
            <img src={LeftWhi} alt="right arrow" className="d-none right" />
          </div>
          <div id="AppointmentDiv" className="appointmentDiv">
            {this.state.appointmentDaysData
              ? this.state.appointmentDaysData.map((item, i) => {
                  var fdate = new Date(item.appointmentDate);
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
            <img src={SchRight} alt="right arrow" className="righ" />
            <img src={LeftWhi} alt="right arrow" className="d-none right1" />
          </div>
        </div>
        <div className="appcusto">
          <span className="apleft apl">
            {this.state.isTableRowClick
              ? "Appointment: " + this.state.appointmentDate
              : this.state.isSearch
              ? "Search Appointment"
              : "Appointment:"}
          </span>
          {!this.state.isTableRowClick &&
          !this.state.isSearch &&
          !this.state.isSearchData ? (
            <span class="apright apl">Customers</span>
          ) : this.state.isTableRowClick || this.state.isSearch ? (
            <a
              className="aprightbck apr"
              onClick={this.handleAppointmentBackClick.bind(this)}
            >
              Back
            </a>
          ) : null}
          {this.state.isSearchData ? (
            <a
              className="aprightbck apr"
              onClick={this.handleAppointmentclearSearch.bind(this)}
            >
              {TranslationContext !== undefined
                ? TranslationContext.label.clearsearch
                : "CLEAR SEARCH"}
            </a>
          ) : null}
        </div>

        <div
          className="table-cntr store extendappoin"
          style={{ marginTop: this.state.isSearch ? "25px" : "" }}
        >
          {!this.state.isMobileView ? (
            <div
              className="float-search"
              onClick={this.HandleToggleSearch.bind(this)}
            >
              <small>
                {this.state.collapseSearch
                  ? "Close Search"
                  : "Search Appointment"}
              </small>
              {this.state.collapseSearch ? (
                <img
                  className="search-icon"
                  src={CancalImg}
                  alt="search-icon"
                />
              ) : (
                <img
                  className="search-icon"
                  src={SearchIcon}
                  alt="search-icon"
                />
              )}
            </div>
          ) : null}
          <div>
            {this.state.collapseSearch ? (
              <Collapse
                bordered={false}
                activeKey={this.state.collapseSearch ? 1 : 0}
                className="appointmentSearchcollp"
              >
                <Panel showArrow={false} key={1}>
                  <div className="myticlist-expand-sect">
                    <div className="position-relative">
                      <ul
                        className="nav nav-tabs lower-tabs"
                        role="tablist"
                      ></ul>
                      <div className="container-fluid">
                        <div
                          className="row all-row"
                          style={{ paddingTop: "25px" }}
                        >
                          <div className="col-md-3 col-sm-6 myticket-text m-10">
                            <input
                              type="text"
                              placeholder="Enter Appointment ID"
                              name="appointmentID"
                              autoComplete="off"
                              value={this.state.appointmentID}
                              onChange={this.handleSeachTextChange.bind(this)}
                            />
                          </div>
                          <div className="col-md-3 col-sm-6 myticket-text m-10">
                            <input
                              type="text"
                              placeholder="Enter Customer No"
                              name="customerNumber"
                              autoComplete="off"
                              value={this.state.customerNumber}
                              onChange={this.handleSeachTextChange.bind(this)}
                            />
                          </div>
                          <div className="col-md-3 col-sm-6 m-10">
                            <DatePickerAnt
                              id={"AppointmentStartDate"}
                              size="large"
                              style={{ width: "100%" }}
                              placeholder={"Appointment Start Date"}
                              className="ant-calendar-date-picker-input"
                              onChange={this.handleSearchDatePickerChange}
                              value={
                                this.state.startDate
                                  ? moment(this.state.startDate)
                                  : null
                              }
                            />
                          </div>
                          <div className="col-md-3 col-sm-6 m-10">
                            <DatePickerAnt
                              id={"AppointmentEndDate"}
                              size="large"
                              style={{ width: "100%" }}
                              value={
                                this.state.endDate
                                  ? moment(this.state.endDate)
                                  : null
                              }
                              placeholder={"Appointment End Date"}
                              className="ant-calendar-date-picker-input"
                              onChange={this.handleSearchDatePickerEndChange.bind(
                                this
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="save-view-search mobileticket1"
                        style={{ top: "38%" }}
                      >
                        <button
                          type="button"
                          className="btn-inv"
                          onClick={this.handleAppointmentGridDataSearch.bind(
                            this
                          )}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.viewsearch
                            : "View Search"}
                        </button>
                      </div>
                    </div>

                    {!this.state.isMobileView && this.state.isSearchData ? (
                      <div className="container-fluid myticlist-expand-sect">
                        <div className="row common-adv-padd justify-content-between">
                          <div className="col-auto d-flex align-items-center">
                            <p className="font-weight-bold mr-3">
                              <span
                                className="blue-clr"
                                style={{ cursor: "default" }}
                              >
                                &nbsp;
                              </span>
                              {TranslationContext !== undefined
                                ? TranslationContext.p.results
                                : "Results : "}
                              {this.state.appointmentGridData.length}
                            </p>
                            <label
                              className="blue-clr fs-14"
                              onClick={this.handleAppointmentclearSearch.bind(
                                this
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.label.clearsearch
                                : "CLEAR SEARCH"}
                            </label>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Panel>
              </Collapse>
            ) : null}
          </div>
          {!this.state.isTableRowClick && !this.state.isSearch ? (
            <Table
              className="components-table-demo-nested antd-table-campaign custom-antd-table apptab"
              columns={[
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.date
                      : "Date",
                  dataIndex: "appointmentDate",
                  width: "20%",
                  render: (row, item) => {
                    return (
                      <div className="backcolo bord1">
                        <div className="appdatemob">
                          {item.appointmentDate}
                          <div className="apptimemob">{item.timeSlot}</div>
                        </div>
                      </div>
                    );
                  },
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.time
                      : "Time",
                  dataIndex: "timeSlot",
                  width: "20%",
                  className: "hidecol",
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
                  className: this.state.isMobileView
                    ? "appointment-mobile mobappne show"
                    : "hide",
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
                  className: "hidecol",
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.actions
                      : "Actions",
                  width: "20%",
                  render: (row, item) => {
                    return (
                      <div className="backcolo bord2">
                        <div className="d-flex justify-content-end">
                          <label className="noofpeoplemob">
                            {item.nOofPeople}
                          </label>
                          <div className="rightarrow">
                            <img
                              src={WhiteRightArrow}
                              className=""
                              width="10px"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  },
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
              expandIconColumnIndex={this.state.isMobileView === false ? 6 : -1}
              expandIconAsCell={false}
              pagination={{ defaultPageSize: 10, showSizeChanger: true }}
              showSizeChanger={true}
              onShowSizeChange={true}
              loading={this.state.loading}
              onRowClick={this.handelAppointmentRowClick.bind(this)}
              dataSource={this.state.appointmentGridData}
            />
          ) : this.state.isSearch ? (
            <div className="myticlist-expand-sect">
              <div className="container-fluid">
                <div className="row all-row">
                  <div className="col-md-3 col-sm-6 myticket-text m-10">
                    <input
                      type="text"
                      placeholder="Enter Appointment ID"
                      name="appointmentID"
                      autoComplete="off"
                      onChange={this.handleSeachTextChange.bind(this)}
                    />
                  </div>
                  <div className="col-md-3 col-sm-6 myticket-text m-10">
                    <input
                      type="text"
                      placeholder="Enter Customer No"
                      name="customerNumber"
                      autoComplete="off"
                      onChange={this.handleSeachTextChange.bind(this)}
                    />
                  </div>
                  <div className="col-md-3 col-sm-6 m-10">
                    <DatePicker
                      selectsRange
                      autoComplete="off"
                      className="ant-calendar-date-picker-input"
                      placeholderText={"Appointment Start Date"}
                      // startDate={this.state.startDate}
                      // endDate={this.state.endDate}
                      selected={this.state.startDate}
                      dateFormat="dd/MM/yyyy"
                      onChange={this.handleSearchDatePickerChange.bind(this)}
                    />
                  </div>
                  <div className="col-md-3 col-sm-6 m-10">
                    <DatePicker
                      selectsRange
                      autoComplete="off"
                      className="ant-calendar-date-picker-input"
                      placeholderText={"Appointment End Date"}
                      // startDate={this.state.startDate}
                      // endDate={this.state.endDate}
                      selected={this.state.endDate}
                      minDate={this.state.startDate}
                      dateFormat="dd/MM/yyyy"
                      onChange={this.handleSearchDatePickerEndChange.bind(this)}
                    />
                  </div>
                  <div
                    className="save-view-search mobileticket"
                    style={{ transform: "none", width: "100%" }}
                  >
                    <button
                      type="button"
                      className="btn-inv"
                      onClick={this.handleAppointmentGridDataSearch.bind(this)}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.button.viewsearch
                        : "View Search"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <AppointmentExpandComponent
              appointmentCustomerListData={
                this.state.appointmentCustomerListData
              }
              translateLanguage={this.state.translateLanguage}
              handleUpdateAppointmentMobile={this.handleUpdateAppointmentMobile}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Appointment;

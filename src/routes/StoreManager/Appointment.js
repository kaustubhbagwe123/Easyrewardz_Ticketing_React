import React, { Component, Fragment } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Table, Select } from "antd";
import axios from "axios";
import config from "./../../helpers/config";
import { authHeader } from "./../../helpers/authHeader";
import CancelIcon from "./../../assets/Images/cancel.png";
import ProgressMenIcon from "./../../assets/Images/progress-men-icon.png";
import SearchBlue from "./../../assets/Images/appoint-search.png";
import Location from "./../../assets/Images/location.png";
import Calling from "./../../assets/Images/calling.png";
import People from "./../../assets/Images/people.png";
import WhiteCalendar from "./../../assets/Images/white-calendar.png";
import WhiteClock from "./../../assets/Images/white-clock.png";
import NumberVerified from "./../../assets/Images/number-verified.png";
import WhitePeople from "./../../assets/Images/white-people.png";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import Modal from "react-responsive-modal";
import DatePicker from "react-datepicker";

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
      showPeople: false,
      appointDate: "",
      appointTime: false,
      updateAppointModal: false,
      date: "",
      searchItem: "",
      otp: "",
      timeSlotData: [],
      timeSlotColor: "",
      slotColorName: "",
      slotError: "",
      timeSlotId: 0,
      bookAppointment: "",
      btnText: "generate otp",
      isVerified: 0,
      type: "GenerateOTP",
      noOfMember: "",
      appointmentID: 0,
      noOfPeople: 0,
      statusUpdate: "Visit Booked",
      appointmentDate: "",
      timeSlot: "",
      numberOfPeople: 0,
      customerName: "",
      customerNumber: "",
      slotID: 0,
      appointStatus: "EndVisitedTime",
      peopleEntered: 0,
      peopleCheckout: 0,
      enteredPeople: 0,
      custName: "",
      custPhoneNo: "",
      appointDate: "",
      errCustName: "",
      errCustNumber: "",
      errAppDate: "",
      errNoOfMember: "",
      otpID: 0
    };
    this.onRowExpand = this.onRowExpand.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangeData = this.handleOnChangeData.bind(this);
    this.handleOnChangeNoOfPeople = this.handleOnChangeNoOfPeople.bind(this);
  }

  componentDidMount() {
    this.handleAppointmentGridData(1);
    this.handleAppointmentCount();
  }

  ShowPeopleModalOpen() {
    this.setState({
      showPeople: true,
    });
  }

  ShowPeopleModalClose() {
    this.setState({
      showPeople: false,
    });
  }

  handleSearchExpand() {
    this.setState({
      searchExpand: true,
    });
    let self = this;
    if (this.state.searchExpand === true) {
      axios({
        method: "post",
        url: config.apiUrl + "/Appointment/SearchAppointment",
        params: {
          searchText: this.state.searchItem,
          appointmentDate: this.state.date,
        },
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
  }

  handleAppointDate(date) {
    debugger;
    this.setState({
      appointDate: date,
      errAppDate: ""
    });

    var date = moment(date).format("YYYY-MM-DD");
    this.handleTimeSlotDetails(date);
  }

  handleAppointTime(e) {
    var slotColor = "";
    var slotColorName = "";
    var slotError = "";
    var selectedSlotData = this.state.timeSlotData.filter(
      (x) => x.timeSlotId === parseInt(e.target.value)
    );

    if (selectedSlotData[0].remaining === 0) {
      slotColor = "#bd3939";
      slotColorName = "Red";
      slotError = "This slot is full.";
    }
    if (
      selectedSlotData[0].remaining !== 0 &&
      selectedSlotData[0].visitedCount >=
        (1 / 2) * selectedSlotData[0].maxCapacity
    ) {
      slotColor = "#f7b500";
      slotColorName = "Yellow";
      slotError = "";
    }
    if (
      selectedSlotData[0].remaining !== 0 &&
      selectedSlotData[0].visitedCount <
        (1 / 2) * selectedSlotData[0].maxCapacity
    ) {
      slotColor = "#30ba93";
      slotColorName = "Green";
      slotError = "";
    }

    this.setState({
      appointTime: true,
      timeSlotColor: slotColor,
      slotColorName,
      slotError,
      timeSlotId: e.target.value === "" ? 0 : parseInt(e.target.value),
    });
  }

  handleCreateAppointmentOpen() {
    this.setState({
      createAppointModal: true,
      timeSlotData: [],
      timeSlotColor: "",
      slotColorName: "",
      slotError: "",
      timeSlotId: 0,
      bookAppointment: "",
      btnText: "generate otp",
      isVerified: 0,
      type: "GenerateOTP",
      noOfMember: "",
      custName: "",
      custPhoneNo: "",
      appointDate: "",
      otpID: 0
    });
  }

  handleCreateAppointmentClose() {
    this.setState({
      createAppointModal: false,
    });
  }

  handleUpdateAppointmentClose() {
    this.setState({
      updateAppointModal: false,
    });
  }

  setOTP(e) {
    debugger;
    this.setState({
      otp: e,
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

    this.setState({
      date,
    });

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

  handleUpdateAppointment(slotData, custDetails) {
    debugger;
    let self = this;
    this.setState({
      updateAppointModal: true,
      appointmentID: custDetails.appointmentID,
      statusUpdate: custDetails.status,
      appointmentDate: slotData.appointmentDate,
      timeSlot: slotData.timeSlot,
      numberOfPeople: custDetails.nOofPeople,
      peopleEntered:custDetails.peopleEntered,
      peopleCheckout:custDetails.peopleCheckout,
      customerName: custDetails.customerName,
      customerNumber: custDetails.customerNumber,
      slotID: slotData.slotId
    });
    // if (
    //   this.state.status[appointmentID] !== "" &&
    //   this.state.status[appointmentID] !== undefined
    // ) {
    //   axios({
    //     method: "post",
    //     url: config.apiUrl + "/Appointment/UpdateAppointmentStatus",
    //     data: {
    //       AppointmentID: appointmentID,
    //       Status: parseInt(this.state.status[appointmentID]),
    //     },
    //     headers: authHeader(),
    //   })
    //     .then(function(res) {
    //       debugger;
    //       let status = res.data.message;
    //       if (status === "Success") {
    //         NotificationManager.success("Record updated successFully.");
    //       } else {
    //         NotificationManager.error(status);
    //       }
    //       self.handleAppointmentGridData(self.state.tabFor);
    //     })
    //     .catch((data) => {
    //       console.log(data);
    //     });
    // } else {
    //   NotificationManager.error("Please select status.");
    // }
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

  handleOnChangeSearch(e) {
    debugger;
    this.setState({ searchItem: e.target.value });
  }

  handleTimeSlotDetails(appointmentDate) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/GetTimeSlotDetail",
      params: {
        AppDate: appointmentDate,
      },
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success" && data) {
          self.setState({
            timeSlotData: data,
          });
        } else {
          self.setState({
            timeSlotData: [],
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

  handleOnChangeData(e) {
    debugger;
    this.setState({
      [e.target.name]: e.target.value,
      errCustName: "",
      errCustNumber: "",
      errNoOfMember: "",
      errAppDate: ""
    });
  }

  handleOnChangeNoOfPeople(e) {
    this.setState({
      enteredPeople: parseInt(e.target.innerText),
    });

    if(this.state.statusUpdate === "In Store" || this.state.statusUpdate === "Partial Checkout")
    {
      if((this.state.peopleCheckout + parseInt(e.target.innerText)) < this.state.peopleEntered)
      {
        this.setState({ appointStatus: "PartialCheckout" });
      }
      if((this.state.peopleCheckout + parseInt(e.target.innerText)) === this.state.peopleEntered)
      {
        this.setState({ appointStatus: "EndVisitedTime" });
      }
      if((this.state.peopleCheckout + parseInt(e.target.innerText)) > this.state.peopleEntered)
      {
        this.setState({ appointStatus: "EndVisitedTime" });
      }
    }
  }

  handleCreateAppointment(type) {
    if (type === "GenerateOTP") {
      this.handleGenerateOTP();
    }
    if (type === "BookAppointment") {
      this.handleBookAppointment();
    }
  }

  handleGenerateOTP() {
    let self = this;
    if(this.state.custName !== "" && this.state.custPhoneNo !== "" 
      && this.state.noOfMember !== "" && this.state.appointDate !== ""
    ){
      axios({
        method: "post",
        url: config.apiUrl + "/Appointment/GenerateOTP",
        params: {
          mobileNumber: this.state.custPhoneNo,
        },
        headers: authHeader(),
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success" && data) {
            self.setState({
              generateOTP: "OTP",
              otpID: data
            });
          } else {
            self.setState({
              generateOTP: "",
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    }
    else{
        if(this.state.custName === ""){
          this.setState({errCustName: "Please enter name"});
        }
        if(this.state.custPhoneNo === ""){
          this.setState({errCustNumber: "Please enter phone number"});
        }
        if(this.state.noOfMember === ""){
          this.setState({errNoOfMember: "Please enter no of members"});
        }
        if(this.state.appointDate === ""){
          this.setState({errAppDate: "Please enter appointment date"});
        }
    }
  }

  handleEditNumber() {
    this.setState({
      generateOTP: "",
    });
  }

  handleSubmitOTP() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/VarifyOTP",
      params: {
        otpID: this.state.otpID,
        otp: this.state.otp
      },
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success" && data) {
          self.setState({
            bookAppointment: "BookAppointment",
            btnText: "book appointment",
            isVerified: 1,
            type: "BookAppointment",
            generateOTP: "",
          });
        } else {
          self.setState({
            bookAppointment: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleBookAppointment() {
    let self = this;

    if(this.state.custName !== "" && this.state.custPhoneNo !== "" 
      && this.state.noOfMember !== "" && this.state.appointDate !== ""
    ){
      axios({
        method: "post",
        url: config.apiUrl + "/Appointment/CreateAppointment",
        data: {
          AppointmentDate: moment(this.state.appointDate).format("YYYY-MM-DD"),
          CustomerName: this.state.custName,
          MobileNo: this.state.custPhoneNo,
          NOofPeople: parseInt(this.state.noOfMember),
          SlotID: this.state.timeSlotId,
        },
        params: {
          IsSMS: true,
          IsLoyalty: true,
        },
        headers: authHeader(),
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success" && data) {
            self.setState({
              createAppointModal: false,
            });
            NotificationManager.success("Appointment booked successfully.");
            self.handleAppointmentGridData(self.state.tabFor);
            self.handleAppointmentCount();
          } else {
            NotificationManager.error(status);
          }
        })
        .catch((data) => {
          console.log(data);
        });
    }
    else{
      if(this.state.custName === ""){
        this.setState({errCustName: "Please enter name"});
      }
      if(this.state.custPhoneNo === ""){
        this.setState({errCustNumber: "Please enter phone number"});
      }
      if(this.state.noOfMember === ""){
        this.setState({errNoOfMember: "Please enter no of members"});
      }
      if(this.state.appointDate === ""){
        this.setState({errAppDate: "Please enter appointment date"});
      }
    }
  }

  handleStartVisit(){
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/StartAppointmentVisit",
      data: {
        AppointmentID: this.state.appointmentID,
        Status: 2,
        NOofPeople: this.state.enteredPeople,
        SlotId: this.state.slotID,
        Slotdate: this.state.appointmentDate,
        CustomerNumber: this.state.customerNumber
      },
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.setState({
            updateAppointModal: false,
          });
          NotificationManager.success("Record updated successfully");
          self.handleAppointmentGridData(self.state.tabFor);
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleEndVisited(type){
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/UpdateAppointmentStatus",
      data: {
        AppointmentID: this.state.appointmentID,
        Status: type==="partialcheckout"?3:4,
        PeopleCheckout: (this.state.peopleCheckout + this.state.enteredPeople)
      },
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.setState({
            updateAppointModal: false,
          });
          NotificationManager.success("Record updated successfully");
          self.handleAppointmentGridData(self.state.tabFor);
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  render() {
    const { Option } = Select;
    const renderButton = (buttonProps) => {
      return (
        <div className="resend-otp">
          <p {...buttonProps}>
            {buttonProps.remainingTime !== 0 &&
              `Resend in ${buttonProps.remainingTime} sec`}
          </p>
          <a href="#!" {...buttonProps}>
            {buttonProps.remainingTime === 0 && "Resend"}
          </a>
        </div>
      );
    };
    const renderTime = () => {
      return null;
    };
    return (
      <div className="custom-tableak custom-table-ck custom-table-bg p-0">
        <div className="custom-tabs">
          <a href="#!" className="back-butn" style={{ display: "none" }}>
            <i class="arrow-left"></i>
            Back
          </a>
          <div className="d-flex appnt-date-cntr">
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
              <span className="mid-divider"></span>
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
              <span className="mid-divider"></span>
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
              <span className="mid-divider"></span>
              <span
                className={this.state.tabFor === 3 ? "tab-count" : "tab-count1"}
              >
                {this.state.dayAfterTomorrowCount}
              </span>
            </div>
          </div>
          <div className="mobile-appoint-search d-none">
            <input
              placeholder="Search by Mobile No, Appointment ID"
              type="text"
              className="appoint-input"
            />
            <a href="#!" className="appoint-search">
              <img src={SearchBlue} alt="search icon" />
            </a>
          </div>
          <div className="appointment-top-right">
            <div className="butn d-flex align-items-center">
              <input
                placeholder="Search by Mobile No or Appointment ID"
                type="text"
                className={
                  this.state.searchExpand
                    ? "appoint-input appoint-input-full"
                    : "appoint-input"
                }
                onChange={this.handleOnChangeSearch.bind(this)}
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
              classNames={{
                modal: "ticket-cut",
                overlay: "create-appoint-popup",
              }}
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
                <div
                  className={this.state.generateOTP === "OTP" ? "d-none" : ""}
                >
                  <div className="appnt-input-group">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      name="custName"
                      value={this.state.custName}
                      onChange={this.handleOnChangeData}
                    />
                    {this.state.errCustName !== "" ? (
                        <p
                          style={{
                          color: "red",
                          marginBottom: "0px",
                          }}
                        >
                          {this.state.errCustName}
                        </p>
                        ) : null}
                  </div>
                  <div className="appnt-input-group">
                    <div className="d-flex">
                      <label>Phone no.</label>
                      {this.state.isVerified === 1 ? (
                        <div className="number-verified">
                          <div className="verify-img">
                            <img src={NumberVerified} alt="number verified" />
                          </div>
                          <span>verified</span>
                        </div>
                      ) : null}
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone No"
                      name="custPhoneNo"
                      value={this.state.custPhoneNo}
                      onChange={this.handleOnChangeData}
                    />
                    {this.state.errCustNumber !== "" ? (
                        <p
                          style={{
                          color: "red",
                          marginBottom: "0px",
                          }}
                        >
                          {this.state.errCustNumber}
                        </p>
                        ) : null}
                  </div>
                  <div className="appnt-input-group">
                    <label>Date &amp; Time</label>
                    <div className="row time-date-sep">
                      <div className="col-6">
                        <DatePicker
                          selected={this.state.appointDate}
                          onChange={(date) => this.handleAppointDate(date)}
                          placeholderText="00 - 00 - 0000"
                          value={this.state.appointDate}
                          // maxDate={new Date()}
                          showMonthDropdown
                          showYearDropdown
                          className="appoint-date"
                          dateFormat="dd - MM - yyyy"
                        />
                        {this.state.errAppDate !== "" ? (
                        <p
                          style={{
                          color: "red",
                          marginBottom: "0px",
                          }}
                        >
                          {this.state.errAppDate}
                        </p>
                        ) : null}
                      </div>
                      <div className="col-6">
                        <select
                          className={
                            this.state.appointTime ? "" : "appoint-time"
                          }
                          onChange={this.handleAppointTime.bind(this)}
                          style={{ color: this.state.timeSlotColor }}
                          value={this.state.timeSlotId}
                        >
                          {this.state.timeSlotData !== null &&
                            this.state.timeSlotData.map((item, i) => (
                              <option value={item.timeSlotId}>
                                {item.timeSlot}
                              </option>
                            ))}
                        </select>
                        {this.state.slotError !== "" ? (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.slotError}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="appnt-input-group">
                    <div className="row">
                      <div className="col">
                        <label>No. of members</label>
                        <input
                          type="number"
                          placeholder="00"
                          min="1"
                          max="2"
                          name="noOfMember"
                          value={this.state.noOfMember}
                          onChange={this.handleOnChangeData}
                        />
                        {this.state.errNoOfMember !== "" ? (
                        <p
                          style={{
                          color: "red",
                          marginBottom: "0px",
                          }}
                        >
                          {this.state.errNoOfMember}
                        </p>
                        ) : null}
                      </div>
                      <div className="col">
                        <label>Loyalty Member</label>
                        <div className="promotional-sms">
                          <input type="checkbox" id="promo-sms" />
                          <label htmlFor="promo-sms">Promotional SMS</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      className={
                        this.state.slotColorName === "Red"
                          ? "appoint-butn appoint-butn-grey"
                          : "appoint-butn"
                      }
                      disabled={
                        this.state.slotColorName === "Red" ? true : false
                      }
                      onClick={this.handleCreateAppointment.bind(
                        this,
                        this.state.type
                      )}
                    >
                      {this.state.btnText}
                    </button>{" "}
                    {/* book appointment OR generate otp */}
                    <br />
                    <a
                      href="#!"
                      className="appoint-cancel"
                      onClick={this.handleCreateAppointmentClose.bind(this)}
                    >
                      Cancel
                    </a>
                  </div>
                </div>
                <div
                  className={
                    this.state.generateOTP === "OTP" ? "otp-appoint" : "d-none"
                  }
                >
                  <div className="otp-appoint-height">
                    <div className="appnt-input-group">
                      <label>
                        Enter 4 digit OTP send to {this.state.custPhoneNo}
                      </label>
                      <OTPInput
                        value={this.state.otp}
                        onChange={this.setOTP.bind(this)}
                        OTPLength={4}
                        otpType="number"
                        inputClassName="otp-appoint-input"
                      />
                      <ResendOTP
                        maxTime={180}
                        renderButton={renderButton}
                        renderTime={renderTime}
                      />
                      <a
                        href="#!"
                        className="edit-num"
                        onClick={this.handleEditNumber.bind(this)}
                      >
                        Edit Number
                      </a>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      className="appoint-butn"
                      onClick={this.handleSubmitOTP.bind(this)}
                    >
                      Submit OTP
                    </button>
                    <br />
                    <a
                      href="#!"
                      className="appoint-cancel"
                      onClick={this.handleCreateAppointmentClose.bind(this)}
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <div className="appoint-outer-pad">
          <span className="appoint-search-res" style={{ display: "none" }}>
            2 search result
          </span>
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
                <div
                  className="filled-info"
                  onClick={this.ShowPeopleModalOpen.bind(this)}
                >
                  40
                </div>
              </div>
            </div>
            <div className="slot-info">
              <p>09-10 PM</p>
              <p>Slot already booked for 5 more people</p>
            </div>
          </div>
          <Modal
            open={this.state.showPeople}
            onClose={this.ShowPeopleModalClose.bind(this)}
            center
            modalId="totalconcount-popup"
            overlayId="logout-ovrly"
            classNames={{
              overlay: "totalconcount-popup",
            }}
          >
            <img
              src={CancelIcon}
              alt="cancel-icone"
              className="cust-icon"
              style={{ height: "12px" }}
              onClick={this.ShowPeopleModalClose.bind(this)}
            />
            <div className="counttab">
              <table>
                <tr>
                  <td>
                    <label>02</label>
                    <span>09AM-10AM</span>
                  </td>
                  <td>
                    <label>03</label>
                    <span>10AM-12AM</span>
                  </td>
                  <td>
                    <label>01</label>
                    <span>11AM-12AM</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>02</label>
                    <span>09AM-10AM</span>
                  </td>
                  <td>
                    <label>03</label>
                    <span>10AM-12AM</span>
                  </td>
                  <td>
                    <label>01</label>
                    <span>11AM-12AM</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>02</label>
                    <span>09AM-10AM</span>
                  </td>
                  <td>
                    <label>03</label>
                    <span>10AM-12AM</span>
                  </td>
                  <td>
                    <label>01</label>
                    <span>11AM-12AM</span>
                  </td>
                </tr>
              </table>
            </div>
          </Modal>
          <div className=" antd-table-appoint">
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
                            if (item.status !== "Visit Booked") {
                              return (
                                <div className="d-flex">
                                  <div>
                                    <button
                                      className={item.status==="In Store"?"statusBtn visitedBtn":
                                                 item.status==="Partial Checkout"?"statusBtn partialBtn":"endVisitBtn statusBtn"}
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
                          render: (item) => {
                            if (item.status !== "Visited") {
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
                                        row,
                                        item
                                      )}
                                    >
                                      <label className="saveLabel">
                                        Update
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
          <a
            href="#!"
            className="add-appoint-mob"
            onClick={this.handleCreateAppointmentOpen.bind(this)}
          >
            Add instant appointment
          </a>
        </div>
        {/* Update Appointment Modal */}
        <Modal
          open={this.state.updateAppointModal}
          onClose={this.handleUpdateAppointmentClose.bind(this)}
          center
          modalId="create-appoint-popup"
          overlayId="chat-popup-overlay"
          classNames={{
            overlay: "create-appoint-popup",
          }}
        >
          <div className="appnt-top-blue">
            <div className="position-relative">
              <i
                class="arrow-left"
                onClick={this.handleUpdateAppointmentClose.bind(this)}
              ></i>
              <h5>Appointment Details</h5>
              <div className="people-img">
                <img src={People} alt="people icon" />
              </div>
            </div>
            <div className="create-appnt-details">
              <h4>{this.state.customerName}</h4>
              <div className="row appoint-update-det">
                <div className="col-md-7">
                  <div className="appnt-info-cntr">
                    <div className="appnt-img-cntr">
                      <img src={WhiteCalendar} alt="calendar icon" />
                    </div>
                    <p>Date: {this.state.appointmentDate}</p>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="appnt-info-cntr">
                    <div className="appnt-img-cntr">
                      <img src={WhiteClock} alt="clock icon" />
                    </div>
                    <p>Time: {this.state.timeSlot}</p>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="appnt-info-cntr">
                    <div className="appnt-img-cntr">
                      <img src={Calling} alt="phone icon" />
                    </div>
                    <p>Phone: +91 {this.state.customerNumber}</p>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="appnt-info-cntr">
                    <div className="appnt-img-cntr">
                      <img src={WhitePeople} alt="people icon" />
                    </div>
                    <p>People: {this.state.numberOfPeople}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="appnt-bottom-white appnt-bottom-white-update">
            <div className="appnt-input-group">
              <div className="row">
              {this.state.statusUpdate !== "Visit Booked"?(
                <>
                <div className="col-md-6">
                  <label>
                    People entered :{" "}
                    <span className="font-weight-bold">{this.state.peopleEntered}</span>
                  </label>
                </div>
                <div className="col-md-6">
                  <label>
                    People Checkout :{" "}
                    <span className="font-weight-bold">{this.state.peopleCheckout}</span>
                  </label>
                </div>
                </>):null}
              </div>
            </div>
            <div className="appnt-input-group">
              <label>No. of people entering</label>{" "}
              {/* here, entering or existing will come conditionally */}
              <div
                className="people-selection"
                onClick={this.handleOnChangeNoOfPeople}
              >
                <span className={this.state.enteredPeople === 1 ? "active" : ""}>
                  1
                </span>
                <span className={this.state.enteredPeople === 2 ? "active" : ""}>
                  2
                </span>
                <span className={this.state.enteredPeople === 3 ? "active" : ""}>
                  3
                </span>
                <span className={this.state.enteredPeople === 4 ? "active" : ""}>
                  4
                </span>
                <span className={this.state.enteredPeople === 5 ? "active" : ""}>
                  5
                </span>
                <span className={this.state.enteredPeople === 6 ? "active" : ""}>
                  6
                </span>
              </div>
            </div>
            <div className="ticket-cut">
              <span></span>
            </div>
            <div className="appoint-code">
              <p>Appointment Code</p>
              <span>{this.state.appointmentID}</span>
            </div>
            <div className="text-center">
              {this.state.statusUpdate === "Visit Booked"?(
              <button className="appoint-butn appoint-butn-blue"
               onClick={this.handleStartVisit.bind(this)}
              >
                Start Visit Time
              </button>):null}
              {this.state.statusUpdate !== "Visit Booked"?(
              
              this.state.appointStatus === "EndVisitedTime"?(
              <button className="appoint-butn appoint-butn-red"
               onClick={this.handleEndVisited.bind(this,"endvisited")}
              >
                End Visit Time
              </button>):(
              <button className="appoint-butn appoint-butn-orange"
               onClick={this.handleEndVisited.bind(this,"partialcheckout")}
              >
                Partial Check Out
              </button>)
              ):null}
              <br />
              <a
                href="#!"
                className="appoint-cancel"
                onClick={this.handleUpdateAppointmentClose.bind(this)}
              >
                Cancel
              </a>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Appointment;

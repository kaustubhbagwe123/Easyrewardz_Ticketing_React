import React, { Component, Fragment } from "react";
import ArrowCircleImg from "./../assets/Images/arrow-circle-left.png";
import HeadphoneImg from "./../assets/Images/headphone.png";
import PasteImg from "./../assets/Images/past.png";
import SearchBlueImg from "./../assets/Images/search-blue.png";
import NotFoundImg from "./../assets/Images/notFound.png";
import Modal from "react-responsive-modal";
import { Radio } from "antd";
import DatePicker from "react-datepicker";
// import ReactAutocomplete from "react-autocomplete";
import axios from "axios";
import config from "./../helpers/config";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import SimpleReactValidator from "simple-react-validator";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
// import { authHeader } from "../helpers/authHeader";

class AddSearchMyTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddCustomer: false,
      customerName: "",
      customerPhoneNumber: "",
      customerEmailId: "",
      genderID: 1,
      dob: "",
      customerId: 0,
      altNumber: "",
      altEmailID: "",
      loading: false,
      SrchEmailPhone: "",
      // searchEmailPhone: {},
      tenantID: 1,
      createdBy: 6,
       SearchData: []
    };
    this.handleAddCustomerOpen = this.handleAddCustomerOpen.bind(this);
    this.handleAddCustomerClose = this.handleAddCustomerClose.bind(this);
    // this.handleAddCustomerSave = this.handleAddCustomerSave.bind(this);
    this.handleSearchCustomer = this.handleSearchCustomer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validator = new SimpleReactValidator();
  }
  handleAddCustomerOpen() {
    this.setState({ AddCustomer: true });
  }
  handleAddCustomerClose() {
    this.setState({
      AddCustomer: false,
      customerName: "",
      customerPhoneNumber: "",
      customerEmailId: "",
      genderID: 1,
      dob: "",
      altNumber: "",
      altEmailID: ""
    });
    this.validator.hideMessages();
  }
  handleSearchCustomer() {
    debugger;
    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Customer/searchCustomer",
      params: {
        SearchText: this.state.SrchEmailPhone
      }
    }).then(function(res) {
      debugger;
      let SearchData = res.data.responseData[0];
      let GetCustId = SearchData.customerID;
      if(GetCustId !== null){
        // self.props.history.push({
        //   pathname: "ticketsystem",
        //   state: self.state
        // });
        // self.setState({
        //   customerId: GetCustId
        // });
        setTimeout(function() {
          self.props.history.push({
            pathname: "ticketsystem",
            state: self.state
          });
        }, 500);
        self.setState({
          customerId: GetCustId
        });
       
      }
      
      // self.setState({ SearchData: SearchData });
    });

  }
  // handleSearchCustomer(field, e) {
  //   debugger;
  //   let self = this;
  //   let SearchData = this.state.searchEmailPhone;
  //   SearchData[field] = e.target.value;

  //   if (SearchData[field].length > 2) {
  //     axios({
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Methods": "*"
  //       },
  //       url: config.apiUrl + "/Customer/searchCustomer",
  //       params: {
  //         SearchText: SearchData[field]
  //       }
  //     }).then(function(res) {
  //       debugger;

  //       var SearchItem = res.data.responseData;
  //       if (SearchItem.length > 0) {
  //         self.setState({
  //           SearchItem
  //         });
  //       } else {
  //         self.setState({ SearchItem: [] });
  //       }
  //     });
  //   } else {
  //     self.setState({
  //       SearchData
  //       // polpodData: []
  //     });
  //   }
  // }
  // HandleSelectdata(e, field, value, id) {
  //   debugger;
  //   let SearchData = this.state.SearchData;
  //    SearchData[field] = value;

  //   var customerID = id.customerID;
  //   var customerName = id.customerName;
  //   this.setState({
  //     customerID,
  //     customerName,
  //     SearchData
  //   });
  // }
  handleAddCustomerSave() {
    debugger;
    let self = this;

    if (this.validator.allValid()) {
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "*"
        },
        url: config.apiUrl + "/Customer/createCustomer",
        data: {
          TenantID: this.state.tenantID,
          CustomerName: this.state.customerName,
          CustomerPhoneNumber: this.state.customerPhoneNumber,
          CustomerEmailId: this.state.customerEmailId,
          GenderID: this.state.genderID,
          AltNumber: this.state.altNumber,
          AltEmailID: this.state.altEmailID,
          DateOfBirth: moment(this.state.dob).format("L"),
          IsActive: 1,
          CreatedBy: this.state.createdBy,
          ModifyBy: 1,
          ModifiedDate: "2019-12-17"
        }
      }).then(function(res) {
        debugger;
        let responseMessage = res.data.message;
        let custId = res.data.responseData;
        self.setState({
          loading: true
        });
        if (responseMessage === "Success") {
          NotificationManager.success("New Customer added successfully.");
          setTimeout(function() {
            self.props.history.push({
              pathname: "ticketsystem",
              state: self.state
            });
          }, 500);
          self.setState({
            customerId: custId
          });
        }
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  genderSelect = e => {
    this.setState({
      genderID: e.target.value
    });
  };
  handleChange(date) {
    debugger;
    this.setState({
      dob: date
    });
  }

  addCustomerData = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  render() {
    return (
      <Fragment>
        <NotificationContainer />
        <div className="addSearch-header">
          <img
            src={ArrowCircleImg}
            alt="ArrowCircle"
            className="arrowImg-addSearch"
          />
          <label className="label-addsearch">Source</label>
          <img src={HeadphoneImg} alt="HeadphoneImg" className="headphonered" />
          <label className="mobile-noAddsearch">+91-9873470074</label>
          <img src={PasteImg} alt="PasteImage" className="paste-addSearch" />
        </div>
        <div className="addsearch-div">
          <div className="card">
            <div className="addSearchCard">
              <label className="label1-AddSearch">
                SEARCH CUSTOMER BY
                <label className="label2-AddSearch">
                  &nbsp;(PHONE NUMBER, EMAIL ID)
                  <span className="span-color">*</span>
                </label>
              </label>

              {/* <ReactAutocomplete
                getItemValue={item => item.customerName}
                items={this.state.SearchItem}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={{
                      background: isHighlighted ? "lightgray" : "white"
                    }}
                    value={item.customerID}
                  >
                    {item.customerName}
                  </div>
                )}
                renderInput={function(props) {
                  return (
                    <input
                      placeholder="Search Customer"
                      className="search-customerAddSrch"
                      type="text"
                      {...props}
                    />
                  );
                }}
                onChange={this.handleSearchCustomer.bind(this, "customer")}
                onSelect={this.HandleSelectdata.bind(this,item=>item.customerID, "customer")}
                value={this.state.searchEmailPhone["customer"]}
              /> */}
              <input
                type="text"
                className="search-customerAddSrch"
                placeholder="Search Customer"
                name="SrchEmailPhone"
                value={this.state.SrchEmailPhone}
                onChange={this.addCustomerData}
              />
              <div className="seacrh-img-addsearch">
                <img
                  src={SearchBlueImg}
                  alt="SearchBlueImg"
                  className="srch-imge"
                  onClick={this.handleSearchCustomer}
                />
              </div>
              <div className="div-notFoundaddseacr">
                <img
                  src={NotFoundImg}
                  alt="Not Found"
                  className="notFound-addSrch"
                />
                <br />
                <label className="lbl-count-foundData">
                  We couldn't find the customer with this
                  <br /> <span>Phone number, Email Id</span>
                </label>
              </div>
              <div style={{ width: "90%", textAlign: "center" }}>
                <button
                  type="button"
                  className="btn btn-addCustomer"
                  onClick={this.handleAddCustomerOpen}
                >
                  Add Customer
                </button>
              </div>
            </div>
            <Modal
              onClose={this.handleAddCustomerClose}
              open={this.state.AddCustomer}
              modalId="AddSearchModel"
              overlayId="logout-ovrly"
            >
              <div className="pop-upAddSearchPD">
                <label className="lbl-popup-title">Add New Customer</label>
                <hr />
                <div className="row row-margin1">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Full Name"
                      name="customerName"
                      value={this.state.customerName}
                      onChange={this.addCustomerData}
                    />
                    {this.validator.message(
                      "Full Name",
                      this.state.customerName,
                      "required|alpha_space"
                    )}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Mobile Number"
                      name="customerPhoneNumber"
                      maxLength={10}
                      value={this.state.customerPhoneNumber}
                      onChange={this.addCustomerData}
                    />
                    {this.validator.message(
                      "Mobile Number",
                      this.state.customerPhoneNumber,
                      "required|integer|size:10"
                    )}
                  </div>
                </div>
                <div className="row row-margin1">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Email ID"
                      name="customerEmailId"
                      value={this.state.customerEmailId}
                      onChange={this.addCustomerData}
                    />
                    {this.validator.message(
                      "Email Id",
                      this.state.customerEmailId,
                      "required|email"
                    )}
                  </div>
                  <div className="col-md-6 radio-btn-margin">
                    <Radio.Group
                      onChange={this.genderSelect}
                      value={this.state.genderID}
                    >
                      <Radio value={1}>Male</Radio>
                      <Radio value={2}>Female</Radio>
                    </Radio.Group>
                  </div>
                </div>
                <div className="row row-margin1">
                  <div className="col-md-6 addcustdate">
                    <DatePicker
                      selected={this.state.dob}
                      onChange={date => this.handleChange(date)}
                      placeholderText="DOB"
                      value={this.state.dob}
                      maxDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                      className="txt-1"
                      dateFormat="dd/MM/yyyy"
                    />
                    {this.validator.message(
                      "Date of Birth",
                      this.state.dob,
                      "required"
                    )}
                    {/* <ModernDatepicker
                      date={this.state.startDate}
                      format={"DD-MM-YYYY"}
                      className="cXcRo datePicker-modal"
                      showBorder
                      onChange={date => this.handleChange(date)}
                      placeholder={"DOB"}
                    /> */}
                  </div>
                </div>
                <hr />
                <div className="row row-margin1">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Alternate Number"
                      name="altNumber"
                      maxLength={10}
                      value={this.state.altNumber}
                      onChange={this.addCustomerData}
                    />
                    {this.validator.message(
                      "Alternate Number",
                      this.state.altNumber,
                      "integer|size:10"
                    )}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Alternate Email"
                      name="altEmailID"
                      value={this.state.altEmailID}
                      onChange={this.addCustomerData}
                    />
                    {this.validator.message(
                      "Alternate Email Id",
                      this.state.altEmailID,
                      "email"
                    )}
                  </div>
                </div>
                <div className="btn-float">
                  <button
                    className="cancel-btn-A"
                    onClick={this.handleAddCustomerClose}
                  >
                    CANCEL
                  </button>
                  {/* <Link onClick={this.handleAddCustomerSave}> */}
                  <button
                    type="button"
                    className="butn add-cust-butn"
                    onClick={this.handleAddCustomerSave.bind(this)}
                    disabled={this.state.loading}
                  >
                    {this.state.loading ? (
                      <FontAwesomeIcon
                        className="circular-loader"
                        icon={faCircleNotch}
                        spin
                      />
                    ) : (
                      ""
                    )}
                    {this.state.loading ? "Please Wait ..." : "SAVE"}
                  </button>
                  {/* </Link> */}
                </div>
                {/* <div className="btn-float">
                  <a
                    href="#!"
                    className="cancel-btn-A"
                    onClick={this.handleAddCustomerClose}
                  >
                    CANCEL
                  </a>
                  <a href="ticketsystem">
                    <button className="butn">SAVE</button>
                  </a>
                </div> */}
              </div>
            </Modal>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default AddSearchMyTicket;

import React, { Component, Fragment } from "react";
import ArrowCircleImg from "./../assets/Images/arrow-circle-left.png";
import HeadphoneImg from "./../assets/Images/headphone.png";
import PasteImg from "./../assets/Images/past.png";
import SearchBlueImg from "./../assets/Images/search-blue.png";
import NotFoundImg from "./../assets/Images/notFound.png";
import Modal from "react-responsive-modal";
import { Radio } from "antd";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "./../helpers/config";
import moment from "moment";

class AddSearchMyTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddCustomer: false,
      fullName: "",
      mobileNumber: "",
      emailId: "",
      genderId: "",
      dob: "",
      alternateNumber: "",
      alternateEmailId: "",
      tenantID: 1
    };
    this.handleAddCustomerOpen = this.handleAddCustomerOpen.bind(this);
    this.handleAddCustomerClose = this.handleAddCustomerClose.bind(this);
    this.handleAddCustomerSave = this.handleAddCustomerSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleAddCustomerOpen() {
    this.setState({ AddCustomer: true });
  }
  handleAddCustomerClose() {
    this.setState({ AddCustomer: false });
  }
  handleAddCustomerSave() {
    debugger;
    const requestOptions = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      body: ""
    };
    let self = this;

    axios(config.apiUrl + "/Customer/createCustomer", requestOptions, {
      params: {
        CustomerID: 0,
        TenantID: this.state.tenantID,
        CustomerName: this.state.fullName,
        CustomerPhoneNumber: this.state.mobileNumber,
        CustomerEmailId: this.state.emailId,
        GenderID: this.state.genderId,
        AltNumber: this.state.alternateNumber,
        AltEmailID: this.state.alternateEmailId,
        dob: moment(this.state.dob).format("L"),
        IsActive: 1,
        CreatedBy: "abc",
        ModifyBy: 1,
        ModifiedDate: "20/12/2019"
      }
    }).then(function(res) {
      console.log(JSON.stringify(res.data.responseData));
      debugger;
      // let ChannelOfPurchaseData = res.data.responseData;
      // self.setState({ ChannelOfPurchaseData: ChannelOfPurchaseData });
    });
  }
  genderSelect = e => {
    debugger;
    this.setState({
      genderId: e.target.value
    });
  };
  handleChange(date) {
    debugger;
    this.setState({
      dob: date
    });
  }
  handleRedirect = () => {
    this.props.history.push("/admin/ticketsystem");
  };
  addCustomerData = e => {
    debugger;
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  render() {
    return (
      <Fragment>
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
              <input
                type="text"
                className="search-customerAddSrch"
                placeholder="Search Customer"
              />
              <div className="seacrh-img-addsearch">
                <img
                  src={SearchBlueImg}
                  alt="SearchBlueImg"
                  className="srch-imge"
                  onClick={this.handleRedirect}
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
                      name="fullName"
                      value={this.state.fullName}
                      onChange={this.addCustomerData}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Mobile Number"
                      name="mobileNumber"
                      value={this.state.mobileNumber}
                      onChange={this.addCustomerData}
                    />
                  </div>
                </div>
                <div className="row row-margin1">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Email ID"
                      name="emailId"
                      value={this.state.emailId}
                      onChange={this.addCustomerData}
                    />
                  </div>
                  <div className="col-md-6 radio-btn-margin">
                    <Radio.Group
                      onChange={this.genderSelect}
                      value={this.state.genderId}
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
                      showMonthDropdown
                      showYearDropdown
                      className="txt-1"
                    />
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
                      name="alternateNumber"
                      value={this.state.alternateNumber}
                      onChange={this.addCustomerData}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Alternate Email"
                      name="alternateEmailId"
                      value={this.state.alternateEmailId}
                      onChange={this.addCustomerData}
                    />
                  </div>
                </div>
                <div className="btn-float">
                  <button
                    className="cancel-btn-A"
                    onClick={this.handleAddCustomerClose}
                  >
                    CANCEL
                  </button>
                  <Link onClick={this.handleAddCustomerSave} to="ticketsystem">
                    <button className="butn">SAVE</button>
                  </Link>
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

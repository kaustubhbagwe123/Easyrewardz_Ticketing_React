import React, { Component, Fragment } from "react";
import ArrowCircleImg from "./../assets/Images/arrow-circle-left.png";
import HeadphoneImg from "./../assets/Images/headphone.png";
import PasteImg from "./../assets/Images/past.png";
import SearchBlueImg from "./../assets/Images/search-blue.png";
import NotFoundImg from "./../assets/Images/notFound.png";
import Modal from "react-responsive-modal";
import { Radio } from "antd";
import DatePicker from "react-datepicker";
import axios from "axios";
import config from "./../helpers/config";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import SimpleReactValidator from "simple-react-validator";
import { NotificationManager } from "react-notifications";
import { authHeader } from "../helpers/authHeader";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as translationHI from "../translations/hindi";
import * as translationMA from "../translations/marathi";

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
      message: "",
      SearchData: [],
      value: "",
      copied: false,
      searchCompulsion: "",
      translateLanguage: {},
    };
    this.handleAddCustomerOpen = this.handleAddCustomerOpen.bind(this);
    this.handleAddCustomerClose = this.handleAddCustomerClose.bind(this);
    this.handleAddCustomerSave = this.handleAddCustomerSave.bind(this);
    this.handleSearchCustomer = this.handleSearchCustomer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCopyToaster = this.handleCopyToaster.bind(this);
    this.validator = new SimpleReactValidator({
      messages: {
        size: "The :attribute must be :size digits.",
      },
    });
  }

  componentWillMount() {
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  handleCopyToaster() {
    const TranslationContext = this.state.translateLanguage.default;

    setTimeout(() => {
      if (this.state.copied && this.state.copied) {
        NotificationManager.success(
          TranslationContext !== undefined
            ? TranslationContext.span.copied
            : "Copied."
        );
      }
    }, 100);
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
      altEmailID: "",
    });
    this.validator.hideMessages();
  }
  handleSearchCustomer(e) {
    const TranslationContext = this.state.translateLanguage.default;
    e.preventDefault();
    if (this.state.SrchEmailPhone.length > 0) {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/Customer/searchCustomer",
        headers: authHeader(),
        params: {
          SearchText: this.state.SrchEmailPhone.trim(),
        },
      })
        .then(function(res) {
          let SearchData = res.data.responseData[0];
          if (SearchData) {
            let GetCustId = SearchData.customerID;
            setTimeout(function() {
              self.props.history.push({
                pathname: "ticketsystem",
                state: self.state,
              });
            }, 100);
            self.setState({
              customerId: GetCustId,
            });
          } else {
            var filter = Number(self.state.SrchEmailPhone.trim());
            if (filter) {
              self.setState({
                customerPhoneNumber: self.state.SrchEmailPhone.trim(),
              });
            } else {
              self.setState({
                customerEmailId: self.state.SrchEmailPhone.trim(),
              });
            }
            self.setState({
              message: res.data.message,
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        searchCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.searchfieldiscompulsory
            : "Search field is compulsory.",
      });
    }
  }
  CheckValidCustomerEmailPhoneNo() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (this.validator.allValid()) {
      if (this.state.altEmailID === this.state.customerEmailId) {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard
                .emailidandalternateemailidfieldscannotbesame
            : "Email ID and Alternate Email ID fields cannot be same."
        );
      } else {
        axios({
          method: "post",
          url: config.apiUrl + "/Customer/validateCustomerExist",
          headers: authHeader(),
          params: {
            Cust_EmailId: this.state.customerEmailId.trim(),
            Cust_PhoneNumber: this.state.customerPhoneNumber.trim(),
          },
        })
          .then(function(res) {
            let validCheck = res.data.message;
            if (validCheck === "Success") {
              self.handleAddCustomerSave();
            } else {
              NotificationManager.error(res.data.responseData);
            }
          })
          .catch((data) => {
            console.log(data);
          });
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  handleAddCustomerSave() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this,
      dob;

    if (this.state.dob === "") {
      dob = "";
    } else {
      dob = moment(this.state.dob).format("L");
    }

    axios({
      method: "post",
      url: config.apiUrl + "/Customer/createCustomer",
      headers: authHeader(),
      data: {
        CustomerName: this.state.customerName.trim(),
        CustomerPhoneNumber: this.state.customerPhoneNumber.trim(),
        CustomerEmailId: this.state.customerEmailId.trim(),
        GenderID: this.state.genderID,
        AltNumber: this.state.altNumber.trim(),
        AltEmailID: this.state.altEmailID.trim(),
        DateOfBirth: dob,
        IsActive: 1,
      },
    })
      .then(function(res) {
        let responseMessage = res.data.message;
        let custId = res.data.responseData;
        self.setState({
          loading: true,
        });
        if (responseMessage === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.newcustomeraddedsuccessfully
              : "New Customer added successfully."
          );
          setTimeout(function() {
            self.props.history.push({
              pathname: "ticketsystem",
              state: self.state,
            });
          }, 1000);
          self.setState({
            customerId: custId,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  genderSelect = (e) => {
    this.setState({
      genderID: e.target.value,
    });
  };
  handleChange(date) {
    this.setState({
      dob: date,
    });
  }
  handlebackprev() {
    this.props.history.push("myTicketList");
  }

  addCustomerData = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <Fragment>
        <div className="addSearch-header">
          <img
            src={ArrowCircleImg}
            alt="ArrowCircle"
            className="arrowImg-addSearch"
            onClick={this.handlebackprev.bind(this)}
          />
          <label className="label-addsearch">
            {TranslationContext !== undefined
              ? TranslationContext.label.source
              : "Source"}
          </label>
          <img src={HeadphoneImg} alt="HeadphoneImg" className="headphonered" />
          <label className="mobile-noAddsearch">+91-9873470074</label>
          <CopyToClipboard
            text={"+91-9873470074"}
            onCopy={() => this.setState({ copied: true })}
          >
            <img
              src={PasteImg}
              alt="PasteImage"
              className="paste-addSearch"
              onClick={this.handleCopyToaster}
            />
          </CopyToClipboard>
        </div>
        <div className="addsearch-div">
          <div className="card">
            <div className="addSearchCard">
              <form name="form" onSubmit={this.handleSearchCustomer}>
                <div>
                  <label className="label1-AddSearch">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.searchcustomerby
                      : "SEARCH CUSTOMER BY"}
                    <label className="label2-AddSearch">
                      &nbsp;(
                      {TranslationContext !== undefined
                        ? TranslationContext.label.phonenumberemail
                        : "PHONE NUMBER, EMAIL ID"}
                      )<span className="span-color">*</span>
                    </label>
                  </label>
                  <div className="input-group" style={{ background: "none" }}>
                    <input
                      type="text"
                      className="search-customerAddSrch search-customerAddSrch-plcholder"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.label.entercustphonenoemailid
                          : "Enter Customer Phone Number, Email ID"
                      }
                      name="SrchEmailPhone"
                      value={this.state.SrchEmailPhone}
                      onChange={this.addCustomerData}
                      maxLength="100"
                      autoComplete="off"
                    />
                    <span className="input-group-addon seacrh-img-addsearch">
                      <img
                        src={SearchBlueImg}
                        alt="SearchBlueImg"
                        className="srch-imge"
                        onClick={this.handleSearchCustomer}
                      />
                    </span>
                  </div>
                  <div></div>
                </div>
              </form>
              {this.state.SrchEmailPhone.length === 0 && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.searchCompulsion}
                </p>
              )}

              {this.state.message === "Record Not Found" ? (
                <div>
                  <div className="div-notFoundaddseacr">
                    <img
                      src={NotFoundImg}
                      alt="Not Found"
                      className="notFound-addSrch"
                    />
                    <br />
                    <label className="lbl-count-foundData">
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard
                            .wecouldntfindthecustomerwiththis
                        : "We couldn't find the customer with this"}
                      <br />{" "}
                      <span>
                        {TranslationContext !== undefined
                          ? TranslationContext.ticketingDashboard
                              .phonenumberemailId
                          : "Phone number, Email Id"}
                      </span>
                    </label>
                  </div>
                  <div style={{ width: "90%", textAlign: "center" }}>
                    <button
                      type="button"
                      className="btn-addCustomer"
                      onClick={this.handleAddCustomerOpen}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.addcustomer
                        : "Add Customer"}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
            <Modal
              onClose={this.handleAddCustomerClose}
              open={this.state.AddCustomer}
              modalId="AddSearchModel"
              overlayId="logout-ovrly"
            >
              <div className="pop-upAddSearchPD">
                <label className="lbl-popup-title">
                  {TranslationContext !== undefined
                    ? TranslationContext.ticketingDashboard.addnewcustomer
                    : "Add New Customer"}
                </label>
                <hr />
                <div className="row row-margin1">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.label.fullname
                          : "Full Name"
                      }
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
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.label.mobilenumber
                          : "Mobile Number"
                      }
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
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.label.emailid
                          : "Email ID"
                      }
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
                      <Radio value={1}>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.male
                          : "Male"}
                      </Radio>
                      <Radio value={2}>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.female
                          : "Female"}
                      </Radio>
                    </Radio.Group>
                  </div>
                </div>
                <div className="row row-margin1">
                  <div className="col-md-6 addcustdate">
                    <DatePicker
                      selected={this.state.dob}
                      onChange={(date) => this.handleChange(date)}
                      placeholderText="DOB"
                      value={this.state.dob}
                      maxDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                      className="txt-1"
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>
                <hr />
                <div className="row row-margin1">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.b.alternatenumber
                          : "Alternate Number"
                      }
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
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.label.alternateemail
                          : "Alternate Email"
                      }
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
                    {TranslationContext !== undefined
                      ? TranslationContext.option.cancel
                      : "CANCEL"}
                  </button>
                  <button
                    type="button"
                    className="butn add-cust-butn"
                    onClick={this.CheckValidCustomerEmailPhoneNo.bind(this)}
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
                    {this.state.loading
                      ? "Please Wait ..."
                      : TranslationContext !== undefined
                      ? TranslationContext.button.save
                      : "SAVE"}
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default AddSearchMyTicket;

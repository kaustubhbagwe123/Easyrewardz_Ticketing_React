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

class AddSearchMyTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddCustomer: false,
      value: "",
      startDate: ""
    };
    this.handleAddCustomerOpen = this.handleAddCustomerOpen.bind(this);
    this.handleAddCustomerClose = this.handleAddCustomerClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleAddCustomerOpen() {
    this.setState({ AddCustomer: true });
  }
  handleAddCustomerClose() {
    this.setState({ AddCustomer: false });
  }
  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  handleRedirect = () => {
    this.props.history.push("/admin/ticketsystem");
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
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Mobile Number"
                    />
                  </div>
                </div>
                <div className="row row-margin1">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Email ID"
                    />
                  </div>
                  <div className="col-md-6 radio-btn-margin">
                    <Radio.Group
                      onChange={this.onChange}
                      value={this.state.value}
                    >
                      <Radio value={1}>Male</Radio>
                      <Radio value={2}>Female</Radio>
                    </Radio.Group>
                  </div>
                </div>
                <div className="row row-margin1">
                  <div className="col-md-6 addcustdate">
                    <DatePicker
                      selected ={this.state.startDate}
                      onChange={date => this.handleChange(date)}
                      placeholderText="DOB"
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
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Alternate Email"
                    />
                  </div>
                </div>
                <div className="btn-float">
                  <button className="cancel-btn-A"
                  onClick={this.handleAddCustomerClose}>CANCEL</button>
                  <Link to="ticketsystem">
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

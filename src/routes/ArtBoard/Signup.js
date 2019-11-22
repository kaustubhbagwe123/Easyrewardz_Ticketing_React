import React, { Component, useState } from "react";
import StepZilla from "react-stepzilla";
import { Radio } from "antd";
// import visa from "./../../assets/Images/visa.png";
// import master from "./../../assets/Images/master.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faSquareFull } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
// import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
// import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { Popover } from "antd";
import { Link } from "react-router-dom";
// import offlineMode from "./PaymentMode/offlineMode";
// import offilinePurchase from "./PaymentMode/offilinePurchase";
// import paymentMode from "./PaymentMode/paymentMode";
// import chequeDetails from "./PaymentMode/chequeDetails";
import OnlinePaymentMode from "./PaymentMode/OnlinePaymentMode";
import PaymentMode from "./PaymentMode/PaymentMode";
import OfflineMode from "./PaymentMode/OfflineMode";
// import ChequeDetails from './PaymentMode/ChequeDetails';
import OffilinePurchase from "./PaymentMode/OffilinePurchase";
import OffileneChequeMode from "./PaymentMode/OffileneChequeMode";
import CreditDebitCard from "./PaymentMode/CreditDebitCard";
import PaymentModeOption from "./PaymentMode/PaymentModeOption";
import './../../assets/css/artboard.css'

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onStep4: false,
      ChoosePayment: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChoosePaymentDiv = this.handleChoosePaymentDiv.bind(this);
  }
  handleChoosePaymentDiv() {
    debugger;
    this.setState({
      ChoosePayment: !this.state.ChoosePayment
    });
  }

  handleChange(step) {
    if (step === 3) {
      this.setState({
        onStep4: true
      });
    } else {
      this.setState({
        onStep4: false
      });
    }
  }
  render() {
    return (
      <div className="customArtboard">
        <div
          className={
            this.state.onStep4 === true
              ? "bg-white signuppage-main footer-buttons-hide"
              : "signuppage-main"
          }
        >
          <div className="">
            <div className="step-progress">
              <StepZilla
                steps={steps}
                // startAtStep={4}
                stepsNavigation={false}
                backButtonText="Back"
                nextButtonText="Save / Next"
                onStepChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const steps = [
  { name: "Company Details", component: <Step1 /> },
  { name: "Billing Details", component: <Step2 /> },
  { name: "Other Details", component: <Step3 /> },
  { name: "Plan Details", component: <Step4 /> },
  { name: "Checkout", component: <Step5 /> }
];

function Step1(props) {
  return (
    <div>
      <div className="tabs-content">
        <form>
          <div className="row">
            <div className="col-12">
              <h3>Enter Company Details</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label>Company Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Company Name"
              ></input>
            </div>
            <div className="col-12 col-sm-6">
              <label>Company Type</label>
              <select className="dropdown" name="Company Type">
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2">3</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label>Company Incorporation Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Company Incorporation Date"
              ></input>
            </div>
            <div className="col-12 col-sm-6">
              <label>No. of Employees</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter No. of Employees"
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label>Email ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email ID"
              ></input>
            </div>
            <div className="col-12 col-sm-6">
              <label>Contact No.</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Contact No."
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label>Contact Person Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Contact Person Name"
              ></input>
            </div>
            <div className="col-12 col-sm-6">
              <label>Contact Person Phone No.</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Contact Person Phone No."
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label>Address</label>
              <textarea
                className="form-control"
                placeholder="Enter your Address"
                style={{ height: "auto" }}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label>Pincode</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Pincode"
              ></input>
            </div>
            <div className="col-12 col-sm-6">
              <label>City</label>
              <select className="dropdown" name="Company Type">
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2">3</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label>State</label>
              <select className="dropdown" name="Company Type">
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2">3</option>
              </select>
            </div>
            <div className="col-12 col-sm-6">
              <label>Country</label>
              <select className="dropdown" name="Company Type">
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2">3</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
function Step2(props) {
  return (
    <div>
      <div className="tabs-content">
        <form>
          <div className="row">
            <div className="col-12">
              <h3>Enter Billing Details</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label>Company Registration No.</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Registration No."
              ></input>
            </div>
            <div className="col-12 col-sm-6">
              <label>GSTIN No.</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your GSTIN No."
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label>PAN No.</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your PAN No"
              ></input>
            </div>
            <div className="col-12 col-sm-6">
              <label>TAN No.</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your TAN No"
              ></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
function Step3(props) {
  return (
    <div>
      <div className="tabs-content">
        <form>
          <div className="row">
            <div className="col-12">
              <h3>Enter Other Details</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label>No. of Users</label>
              <select className="dropdown" name="users">
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2">3</option>
              </select>
            </div>
            <div className="col-12 col-sm-6">
              <label>No. of Simultaneous Logins</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter No. of Simultaneous Logins"
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label>Monthly Ticket Volume</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Monthly Ticket Volume"
              ></input>
            </div>
            <div className="col-12 col-sm-6">
              <label>Ticket Archiving Policy</label>
              <div className="radio-tabs">
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button value="3 Months">3 Months</Radio.Button>
                  <Radio.Button value="6 Months">6 Months</Radio.Button>
                  <Radio.Button value="9 Months">9 Months</Radio.Button>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label>Tenant Type</label>
              <div className="radio-tabs">
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button value="Shared">Shared</Radio.Button>
                  <Radio.Button value="Dedicated">Dedicated</Radio.Button>
                </Radio.Group>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <label>Server Type</label>
              <div className="radio-tabs">
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button value="Shared">Shared</Radio.Button>
                  <Radio.Button value="Dedicated">Dedicated</Radio.Button>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label>Email Sender ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email Sender ID"
              ></input>
            </div>
            <div className="col-12 col-sm-6">
              <label>SMS Sender ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter SMS Sender ID"
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label>CRM Interface Language</label>
              <select className="dropdown" name="Interface">
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2">3</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
function Step4(props) {
  const content1 = (
    <div className="store-popDiv">
      <Link to="#!" className="complans-poplinks">
        Essential Vs Professional
      </Link>
      <Link to="#!" className="complans-poplinks">
        Essential Vs Premium
      </Link>
      <Link to="#!" className="complans-poplinks">
        Professional Vs Premium
      </Link>
    </div>
  );
  return (
    <div>
      <div className="plan-details-main">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="togbtn">
                <label className="customerOrder-text">Monthly</label>
                <label className="customerItem-text">Yearly</label>
                <div className="orderswitch">
                  <div className="switch switch-primary d-inline">
                    <input type="checkbox" id="editTasks-p-2" />
                    <label htmlFor="editTasks-p-2" className="cr ord"></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="plan-datatable table-responsive">
              <table className="table">
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                    <span className="most-popular">* Most Popular *</span>
                  </th>
                </tr>
                <tr className="value-th">
                  <th>
                    <h2>Plan</h2>
                    <h2>Features</h2>
                  </th>
                  <th>
                    <div className="plan-th text-center">
                      <h3>Essential</h3>
                      <h2>₹ 999</h2>
                      <p>Per User/Month</p>
                    </div>
                  </th>
                  <th>
                    <div className="plan-th text-center">
                      <h3>Professional</h3>
                      <h2>₹ 1999</h2>
                      <p>Per User/Month</p>
                    </div>
                  </th>
                  <th className="active-col">
                    <div className="plan-th text-center">
                      <h3>Premium</h3>
                      <h2>₹ 2999</h2>
                      <p>Per User/Month</p>
                    </div>
                  </th>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Calls to Ticket
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Email Ticketing
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Social Tickets
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Chat Tickets
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Support Bot
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Live Chat Support to customers
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check"></td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Knowledge Base
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Reporting and Analytics
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check"></td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Prebuild Dashboard
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Roles and Permission
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    SLA Management
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Skilled Based Ticket Assignment
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    IVR Phone Trees
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check"></td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Inbound / Outbound Calling
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Realtime IVR Analytics
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    SLA Management
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Skilled Based Ticket Assignment
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    IVR Phone Trees
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Inbound / Outbound Calling
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faPlusCircle} className="plusicon" />
                  </td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check"></td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Roles and Permission
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faPlusCircle} className="plusicon" />
                  </td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check"></td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Realtime IVR Analytics
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check"></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      type="submit"
                      className="btn addplanbtn btn-primary"
                    >
                      Add Plan
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="plan-footerbtns">
                <button
                  type="button"
                  className="btn btn-primary back"
                  style={{ margin: "0 10px 0 0" }}
                >
                  {" "}
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary cusplan"
                  style={{ margin: "0 10px 0 0" }}
                >
                  +Create Custom Plan
                </button>
                <Popover content={content1} placement="top" trigger="click">
                  <button
                    type="button"
                    className="btn btn-primary complan"
                    // style={{ margin: "0" }}
                  >
                    Compare Plan
                  </button>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Step5(props) {
  // const [toggle, setToggle] = useState(true);
  // const handleToggle = () => {
  //   setToggle(false);
  // };
  // const [toggleOnline, setToggleOnline] = useState(true);
  // const handleOnlineMode = () => {
  //   setToggleOnline(false);
  // };

  // const [toggle1, SetChequeDetails] = useState(true);
  // const handleChequeDetails = () => {
  //   SetChequeDetails(false);
  // };

  // const [PurchaseOrderDiv, SetPurchaseOrder] = useState(true);
  // const handlePurchaseOreder = () => {
  //   SetPurchaseOrder(false);
  // };

  const [activetab, setActivetab] = useState("PAYMENT_MODE");
  const tabToggle = tab => {
    setActivetab(tab);
  };

  return (
    <div>
      <div
        className="tabs-content"
        style={{ padding: "0", background: "none" }}
      >
        <form>
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="checkout-cart cc-left">
                <div className="value text-center">
                  <h3>Premium</h3>
                  <h2>₹ 2999</h2>
                  <p>Per User/Month</p>
                </div>
                <div className="plan-det">
                  <h3>Plan Details</h3>
                  <p>
                    Premium Plan Price <span>₹ 2999</span>
                  </p>
                  <h3 style={{ marginTop: "25px" }}>Addons</h3>
                  <p>
                    Store Task Management <span>₹ 499</span>
                  </p>
                  <p>
                    Quality Audit Helpdesk <span>₹ 299</span>
                  </p>
                </div>
                <div className="subtotal">
                  <p>
                    Subtotal <span>₹ 299</span>
                  </p>
                  <p>
                    GST <span>₹ 299</span>
                  </p>
                </div>
                <div className="total">
                  <p>
                    Total <span>₹ 299</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              {activetab === "PAYMENT_MODE" && (
                <PaymentMode change={tabToggle} />
              )}

              {activetab === "OFFLINE_MODE" && (
                <OfflineMode change={tabToggle} />
              )}

              {activetab === "OFFLINECHEQUE_MODE" && (
                <OffileneChequeMode change={tabToggle} />
              )}

              {activetab === "OFFLINEPURCHASE_MODE" && (
                <OffilinePurchase change={tabToggle} />
              )}
              {activetab === "ONLINEPAYMENT_MODE" && (
                <OnlinePaymentMode change={tabToggle} />
              )}
              {activetab === "CREDITDEBIT_MODE" && (
                <CreditDebitCard change={tabToggle} />
              )}
              {activetab === "PAYMENTMODE_OPTION" && (
                <PaymentModeOption change={tabToggle}/>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;

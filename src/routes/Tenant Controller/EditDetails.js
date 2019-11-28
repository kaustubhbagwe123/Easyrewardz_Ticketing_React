import React, { Component, Fragment } from "react";
import LooksSmall from "./../../assets/Images/looks.png";
import Chat from "./../../assets/Images/chat.png";
import Store from "./../../assets/Images/store-tikcet-system.png";
import Ticket from "./../../assets/Images/Ticket1.png";
import { Tabs, Tab } from "react-bootstrap-tabs";
import Modal from "react-responsive-modal";

class EditDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Payment: false,
      Remainder: false
    };
  }

  HandlePaymentModalOpen() {
    this.setState({ Payment: true });
  }
  HandlePaymentModalClose() {
    this.setState({ Payment: false });
  }
  HandleRemainderModalOpen() {
    this.setState({ Remainder: true });
  }
  HandleRemainderModalClose() {
    this.setState({ Remainder: false });
  }
  render() {
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="paddingtenatedit">
            <div className="row">
              <div className="col-md-6">
                <img src={LooksSmall} alt="Bata" className="Looksedit" />

                <label className="looksedittext">Looks Salon Pvt.Ltd</label>
                <label className="deactivatedlook">DEACTIVATED</label>
              </div>
              <div className="col-md-6">
                <div>
                <div className="twogeneratepayment">
                  <button
                    className="GenPayLink"
                    onClick={this.HandlePaymentModalOpen.bind(this)}
                  >
                    Generate Payment Link
                  </button>
                  <button
                    className="SendPayRem"
                    onClick={this.HandleRemainderModalOpen.bind(this)}
                  >
                    Send Payment Remainder
                  </button>
                </div>
                </div>
              </div>
            </div>
            <Modal
              open={this.state.Payment}
              onClose={this.HandlePaymentModalClose.bind(this)}
              closeIconId="sdsg"
              modalId="PaymentTenant-popup"
              overlayId="logout-ovrly"
            >
              <div className="row m-b-20">
                <div className="col-md-12">
                  <label className="paymentlink">Generate Payment Link</label>
                </div>
              </div>
              <div className="row m-b-10">
                <div className="col-md-4">
                  <label className="paymentlinktext">Plan Name</label>
                </div>
                <div className="col-md-8">
                  <label className="paymentlinktext1">Plan 1</label>
                </div>
              </div>
              <div className="row m-b-10">
                <div className="col-md-4">
                  <label className="paymentlinktext">Plan Value</label>
                </div>
                <div className="col-md-8">
                  <label className="paymentlinktext1">₹999</label>
                </div>
              </div>
              <div className="row m-b-10">
                <div className="col-md-4">
                  <label className="paymentlinktext">Payment Link</label>
                </div>
                <div className="col-md-8">
                  <label className="paymentlinktext1">
                    https://plan2.easyrewardzpayment.com
                  </label>
                </div>
              </div>
              <div className="row m-b-10">
                <div className="col-md-4">
                  <label className="paymentlinktext">Valid Upto</label>
                </div>
                <div className="col-md-8">
                  <label className="paymentlinktext1">
                    2 December,2019 23:59
                  </label>
                </div>
              </div>
              <div className="row m-b-10">
                <div className="col-md-4">
                  <label className="paymentlinktext">Share On</label>
                </div>
                <div className="col-md-8 checkbox-plan">
                  <input
                    type="checkbox"
                    id="EmailId"
                    name="filter-type"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="EmailId"
                    style={{ display: "block", paddingLeft: "25px" }}
                  >
                    <span className="emailcheck">Email ID</span>
                  </label>
                  <input
                    type="checkbox"
                    id="Sms"
                    name="filter-type"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="Sms" style={{ paddingLeft: "25px" }}>
                    <span className="emailcheck">SMS</span>
                  </label>
                </div>
              </div>
              <div className="row m-t-40">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                  <button className="cancelpopbtn">Cancel</button>
                  <button className="savepopbtn">Send</button>
                </div>
              </div>
            </Modal>
            <Modal
              open={this.state.Remainder}
              onClose={this.HandleRemainderModalClose.bind(this)}
              closeIconId="sdsg"
              modalId="RemainderTenant-popup"
              overlayId="logout-ovrly"
            >
              <div className="row m-b-20">
                <div className="col-md-12">
                  <label className="paymentlink">Set Payment Remainder</label>
                </div>
              </div>
              <div className="row">
                    <div className="col-md-12">
                    <div className="SePaRe">
                            <label className="dearcompany">
                              Dear Rohan,
                            </label>
                            <label className="dearcompany1">
                              Your total payment of <span style={{fontWeight:"bold"}}>₹999</span> for Plan1
                              is due on <span style={{fontWeight:"bold"}}>22 December 2019</span>.Please make payments
                              on or before <span style={{fontWeight:"bold"}}>22 December 2019</span> to enjoy
                              uninterpreted service.
                            </label>
                            <label className="dearcompany2">Regards</label>
                            <label className="dearcompany2">
                              Easy Rewardz
                            </label>
                          </div>
                    </div>
              </div>

              <div className="row m-t-30">
                <div className="col-md-2">
                  <label className="paymentlinktext">Share On</label>
                </div>
                <div className="col-md-4 checkbox-plan">
                  <input
                    type="checkbox"
                    id="EmailId"
                    name="filter-type"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="EmailId"
                    style={{ display: "block", paddingLeft: "25px" }}
                  >
                    <span className="emailcheck">Email ID</span>
                  </label>
                  <input
                    type="checkbox"
                    id="Sms"
                    name="filter-type"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="Sms" style={{ paddingLeft: "25px" }}>
                    <span className="emailcheck">SMS</span>
                  </label>
                </div>
              </div>
              <div className="row m-t-40">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                    <div style={{float:"right"}}>
                  <button className="cancelpopbtn">Cancel</button>
                  <button className="savepopbtn">Send</button>
                  </div>
                </div>
              </div>
            </Modal>
            <div className="row m-t-20 editde">
              <div className="col-md-12">
                <ul>
                  <li>
                    <h3>Account Created on</h3>
                    <p>25 Jan 2019</p>
                  </li>
                  <li>
                    <h3>Package Amount</h3>
                    <p>INR 25k</p>
                  </li>
                  <li>
                    <h3>Package Mode</h3>
                    <p>INR 25k</p>
                  </li>
                  <li>
                    <h3>Payment Status</h3>
                    <p style={{ color: "red" }}>Pending</p>
                  </li>
                  <li>
                    <h3>Payment Remainder</h3>
                    <p>1 Day Ago</p>
                  </li>
                  <li>
                    <h3>Plan</h3>
                    <p>Pro</p>
                  </li>
                  <li>
                    <h3>Contact Details</h3>
                    <p>+91 9873470074 | v@look.com</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card-a">
                  <label className="PlanDetail">Plan Details</label>
                  <input type="text" className="txt-1pro" placeholder="PRO" />
                  <div className="row m-t-20">
                    <div className="col-md-6">
                      <label className="plantexta1">Modules</label>
                    </div>
                    <div className="col-md-6">
                      <label className="plantexta">Active Users</label>
                    </div>
                  </div>
                  <div className="row m-t-20">
                    <div className="col-md-6">
                      <img src={Ticket} alt="Bata" className="chat" />
                      <label className="plantext1">Ticketing</label>
                    </div>
                    <div className="col-md-6">
                      <label className="plantext">25</label>
                    </div>
                  </div>
                  <div className="row m-t-10">
                    <div className="col-md-6">
                      <img src={Chat} alt="Bata" className="chat" />
                      <label className="plantext1">Chat</label>
                    </div>
                    <div className="col-md-6">
                      <label className="plantext">25</label>
                    </div>
                  </div>
                  <div className="row m-t-10">
                    <div className="col-md-6">
                      <img src={Ticket} alt="Bata" className="chat" />
                      <label className="plantext1">Quality Audit</label>
                    </div>
                    <div className="col-md-6">
                      <label className="plantext">25</label>
                    </div>
                  </div>
                  <div className="row m-t-10">
                    <div className="col-md-6">
                      <img src={Store} alt="Bata" className="chat" />
                      <label className="plantext1">Store Desk</label>
                    </div>
                    <div className="col-md-6">
                      <label className="plantext">25</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-a SenderCard">
                  <label className="PlanDetail">Sender ID</label>
                  <Tabs>
                    <Tab label="Email">
                      <div className="row m-t-20">
                        <div className="col-md-12">
                          <label className="PlanName">From Email</label>
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Support@looks32244.com"
                          />
                        </div>
                      </div>
                      <div className="row m-t-20">
                        <div className="col-md-12">
                          <label className="PlanName">From Name</label>
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Looks Support"
                          />
                        </div>
                      </div>
                    </Tab>
                    <Tab label="SMS">
                      <div className="row m-t-20">
                        <div className="col-md-12">
                          <label className="PlanName">From Sms</label>
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="+91"
                          />
                        </div>
                      </div>
                      <div className="row m-t-20">
                        <div className="col-md-12">
                          <label className="PlanName">From Name</label>
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Looks Support"
                          />
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-a">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="PlanDetail">Payments</label>
                    </div>
                    <div className="col-md-6">
                      <label className="more">More</label>
                    </div>
                  </div>
                  <div className="reactplandetail m-t-20">
                    <table className="table-responsive">
                      <thead>
                        <tr>
                          <td>Date</td>
                          <td>Plan</td>
                          <td>Amount</td>
                          <td style={{ float: "right" }}>Invoice</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01 09 2019</td>
                          <td>Pro</td>
                          <td>25k</td>
                          <td className="printdownload">Print | Download</td>
                        </tr>
                        <tr>
                          <td>01 10 2019</td>
                          <td>Pro</td>
                          <td>25k</td>
                          <td className="printdownload">Print | Download</td>
                        </tr>
                        <tr>
                          <td>31 10 2019</td>
                          <td>Pro</td>
                          <td>25k</td>
                          <td className="printdownload">Print | Download</td>
                        </tr>
                        <tr>
                          <td>30 11 2019</td>
                          <td>Pro</td>
                          <td>25k</td>
                          <td className="printdownload">Print | Download</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EditDetails;

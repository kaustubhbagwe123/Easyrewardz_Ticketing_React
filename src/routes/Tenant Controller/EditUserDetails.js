import React, { Component, Fragment } from "react";
import LooksSmall from "./../../assets/Images/looks.png";
import Chat from "./../../assets/Images/chat.png";
import Store from "./../../assets/Images/store-tikcet-system.png";
import Ticket from "./../../assets/Images/Ticket1.png";
import EditPencil from "./../../assets/Images/EditPencil.png";
import { Tabs, Tab } from "react-bootstrap-tabs";

class EditUserDetails extends Component {
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
            </div>

            <div className="row m-t-20 editde">
              <div className="col-md-12">
                <ul>
                  <li>
                    <h3>Account Created on</h3>
                    <p>25 Jan 2019</p>
                  </li>
                  <li>
                    <h3>Plan</h3>
                    <p>Pro</p>
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
                    <h3>Contact Details</h3>
                    <p>+91 9873470074 | v@look.com</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row m-t-20">
              <div className="col-md-4">
                <div className="card-a card-b">
                  <div className="row m-b-20">
                    <div className="col-md-6">
                      <label className="PlanDetail">Company Details</label>
                    </div>
                    <div className="col-md-6">
                      <img src={EditPencil} alt={EditPencil} className="more"
                      // onClick={this.handleCompanyDetailModalOpen.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="row m-b-15">
                    <div className="col-md-12">
                      <label className="plantexta1">Company Name</label>
                      <span className="plantext1z">
                        BigTree Entertainment Pvt.Ltd
                      </span>
                    </div>
                  </div>
                  <div className="row m-b-15">
                    <div className="col-md-12">
                      <label className="plantexta1">Company Type</label>
                      <span className="plantext1z">Pvt.Ltd</span>
                    </div>
                  </div>
                  <div className="row m-b-15">
                    <div className="col-md-12">
                      <label className="plantexta1">
                        Company Incorporation Date
                      </label>
                      <span className="plantext1z">09/11/2001</span>
                    </div>
                  </div>
                  <div className="row m-b-15">
                    <div className="col-md-12">
                      <label className="plantexta1">No. Of Employee</label>
                      <span className="plantext1z">1672</span>
                    </div>
                  </div>
                  <div className="row m-b-15">
                    <div className="col-md-12">
                      <label className="plantexta1">Email ID</label>
                      <span className="plantext1z">
                        Customeremail@email.com
                      </span>
                    </div>
                  </div>
                  <div className="row m-b-15">
                    <div className="col-md-12">
                      <label className="plantexta1">Contact No.</label>
                      <span className="plantext1z">9874561230</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-a card-b">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="PlanDetail">Billing Details</label>
                    </div>
                    <div className="col-md-6">
                      <img src={EditPencil} alt={EditPencil} className="more" />
                    </div>
                  </div>
                  <div className="row m-t-10">
                    <div className="col-md-12">
                      <label className="PlanName">
                        Company Registration No.
                      </label>
                      <input type="text" className="txt-1bill" />
                    </div>
                  </div>
                  <div className="row m-t-10">
                    <div className="col-md-12">
                      <label className="PlanName">GSTN No.</label>
                      <input type="text" className="txt-1bill" />
                    </div>
                  </div>
                  <div className="row m-t-10">
                    <div className="col-md-12">
                      <label className="PlanName">PAN No.</label>
                      <input type="text" className="txt-1bill" />
                    </div>
                  </div>
                  <div className="row m-t-10">
                    <div className="col-md-12">
                      <label className="PlanName">TAN No.</label>
                      <input type="text" className="txt-1bill" />
                    </div>
                  </div>
                  <div className="row m-t-10">
                    <div className="col-md-12">
                      <div style={{ textAlign: "center" }}>
                        <button className="billsavebtn">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-a card-b">
                  <div className="row m-b-20">
                    <div className="col-md-6">
                      <label className="PlanDetail">Other Details</label>
                    </div>
                    <div className="col-md-6">
                      <img src={EditPencil} alt={EditPencil} className="more" />
                    </div>
                  </div>
                  <div className="row m-b-15">
                    <div className="col-md-12">
                      <label className="plantexta12">No. Of Users</label>
                      <span className="plantext1z">100</span>
                    </div>
                  </div>
                  <div className="row m-b-15">
                    <div className="col-md-12">
                      <label className="plantexta12">
                        No. of simultanous Login
                      </label>
                      <span className="plantext1z">100</span>
                    </div>
                  </div>
                  <div className="row m-b-15">
                    <div className="col-md-12">
                      <label className="plantexta12">
                        Monthly Ticket Volume
                      </label>
                      <span className="plantext1z">1,00,000</span>
                    </div>
                  </div>
                  <div className="row m-b-15">
                    <div className="col-md-12">
                      <label className="plantexta12">
                        Ticket Archiving Policy
                      </label>
                      <span className="plantext1z">3 Months</span>
                    </div>
                  </div>
                  <div className="row m-b-15">
                    <div className="col-md-12">
                      <label className="plantexta12">Tenant Type</label>
                      <span className="plantext1z">Shared</span>
                    </div>
                  </div>
                  <div className="row m-b-15">
                    <div className="col-md-12">
                      <label className="plantexta12">Server Type</label>
                      <span className="plantext1z">Shared</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row m-t-20">
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

export default EditUserDetails;

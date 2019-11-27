import React, { Component, Fragment } from "react";
import { Tabs, Tab } from "react-bootstrap-tabs";
// import Smile from "./../../assets/Images/smile.png";
import BluePlus from "./../../assets/Images/blueplus.png";
import ListAll from "./../../assets/Images/listall.png";
import Custom from "./../../assets/Images/custom.png";
import NextBlue from "./../../assets/Images/nextblue.png";
import Pencil from "./../../assets/Images/pencil.png";


export class Settings extends Component {
  render() {
    return (
      <Fragment>
        <div className="contaoner-fluid">
          <div className="dash-cntr">
            <div className="paddsett">
              <div className="settingstenant-tabs1">
                <section>
                  <Tabs>
                    <Tab label="Plans">
                      <div className="row d-flex plans">
                        <div className="col-md-4">
                          <div className="card-essential">
                          <div className="row">
                              <div className="col-md-12 pro">
                                <div>
                                <a href="Enterprise">
                                  <img src={Pencil} alt="plus" className="pencil"/></a>
                              </div>
                                <label className="p3">Essential</label>
                                <label className="p4">1 User</label>
                              </div>
                            </div>
                            <div className="row m-t-30">
                              <div className="col-md-12 pro1">
                                <div className="pro3">
                                  <label className="p1">₹ 999</label>
                                  <label className="p2">Monthly</label>
                                </div>
                                <div className=" pro2">
                                  <label className="p1">₹ 1199</label>
                                  <label className="p2">Yearly</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="customerplan">
                            <img
                              src={BluePlus}
                              alt="plus"
                              className="blueplus"
                            />
                            <label>Create New Plan</label>
                            <a href="createNewPlan"><img
                              src={NextBlue}
                              alt="custom"
                              className="nextblue"
                            />
                            </a>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="card-pro">
                            <div className="row">
                              <div className="col-md-12 pro">
                                <label className="p3">Pro</label>
                                <label className="p4">1 User</label>
                              </div>
                            </div>
                            <div className="row m-t-30">
                              <div className="col-md-12 pro1">
                                <div className="pro3">
                                  <label className="p1">₹ 999</label>
                                  <label className="p2">Monthly</label>
                                </div>
                                <div className=" pro2">
                                  <label className="p1">₹ 1199</label>
                                  <label className="p2">Yearly</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="customerplan">
                            <img
                              src={ListAll}
                              alt="list"
                              className="blueplus"
                            />
                            <label>List of all Feature</label>
                            <a href="listAllFeature">
                            <img
                              src={NextBlue}
                              alt="custom"
                              className="nextblue"
                            />
                            </a>
                          </div>
                        </div>


                        <div className="col-md-4">
                          <div className="card-enterprise">
                          <div className="row">
                              <div className="col-md-12 pro">
                                <label className="p3">Enterprise</label>
                                <label className="p4">1 User</label>
                              </div>
                            </div>
                            <div className="row m-t-30">
                              <div className="col-md-12 pro1">
                                <div className="pro3">
                                  <label className="p1">₹ 999</label>
                                  <label className="p2">Monthly</label>
                                </div>
                                <div className=" pro2">
                                  <label className="p1">₹ 1199</label>
                                  <label className="p2">Yearly</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="customerplan">
                            <img
                              src={Custom}
                              alt="custom"
                              className="blueplus"
                            />
                            <label>Customer Plan</label>
                            <a href="customPlan">
                            <img
                              src={NextBlue}
                              alt="custom"
                              className="nextblue"
                            /></a>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab label="Payment Reminder">
                      <div>
                        <div className="row m-b-20">
                          <div
                            className="col-md-5"
                            style={{ marginLeft: "50px" }}
                          >
                            <label className="automatic">
                              Automatic Payment Remainder
                            </label>
                          </div>
                        </div>
                        <div className="row m-b-30">
                          <div
                            className="col-md-4"
                            style={{ marginLeft: "50px" }}
                          >
                            <label className="automatic1">
                              Payment Remainder set to
                            </label>
                            <span className="fivedays">
                              <select>
                                <option>5 Days</option>
                              </select>
                            </span>
                          </div>
                        </div>
                        <div className="row m-b-20">
                          <div
                            className="col-md-4"
                            style={{ marginLeft: "50px" }}
                          >
                            <label className="automatic1">
                              Manual Payment Remainder
                            </label>
                          </div>
                        </div>
                        <div className="row m-b-20">
                          <div className="col-md-8 textautomatic">
                            <label className="dearcompany">
                              Dear $ Company_Name,
                            </label>
                            <label className="dearcompany1">
                              Your total payment of $Plan_Amount for $Plan_Name
                              is due on 4Plan_Renewel_Date.Please make payments
                              on or before $ Plan_Renewel_Date to enjoy
                              uninterpreted service.
                            </label>
                            <label className="dearcompany2">Regards</label>
                            <label className="dearcompany2 m-b-20">
                              Easy Rewardz
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className="col-md-8 m-t-10 m-b-10"
                            style={{ marginLeft: "65px" }}
                          >
                            <div className="twobutton d-flex">
                              <button className="cancel">Cancel</button>
                              <button className="save">Save</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Settings;

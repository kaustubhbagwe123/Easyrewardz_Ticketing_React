import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import StrImg from "./../../assets/Images/store-black.png";
import Demo from "./../../store/Hashtag.js";

class StoreTaskView extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="store-task-view-top">
          <p>Store ticket id : ABC1234</p>
          <div className="str-dtls d-flex">
            <div className="str-owner">
              <div className="str-img">
                <img src={StrImg} alt="store icon" />
              </div>
              <p>Naman.R</p>
            </div>
            <select>
              <option>Submit as Reopen</option>
              <option>Submit as Solved</option>
              <option>Submit as Closed</option>
            </select>
          </div>
        </div>
        <div className="container-fluid my-3">
          <div className="row">
            <div className="col-md-7 pl-0">
              <div className="task-view-cntr">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>Task Title</label>
                    <input type="text" placeholder="Task Title"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label>Department</label>
                    <select>
                      <option>Internet</option>
                      <option>Internet</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>Function</label>
                    <select>
                      <option>WiFi</option>
                      <option>WiFi</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>Priority</label>
                    <select>
                      <option>High</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>Task Details</label>
                    <textarea placeholder="Add Task Details"></textarea>
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-md-12">
                    <label>Comments</label>
                    <textarea
                      placeholder="Add your comment here"
                      className="store-cmnts"
                    ></textarea>
                  </div>
                </div>
                <div className="add-cmnts">
                  <p>Comments: 02</p>
                  <a href={Demo.BLANK_LINK}>Add Comment</a>
                </div>
                <div className="outer-cmnts">
                  <div className="cmnts-sctn">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="str-owner">
                        <div className="str-img">
                          <img src={StrImg} alt="store icon" />
                        </div>
                        <p>Naman.R</p>
                      </div>
                      <p className="fs-14 blak-clr">5 hr ago</p>
                    </div>
                    <div className="cmnts pt-1">
                      <span>Comment :</span>
                      <p>
                        Hi Diwakar, I really appreciate you joining us at
                        Voucherify! My top priority is that you have a great
                        experience with us and learn how to easily implement
                        successful promo campaigns.
                      </p>
                    </div>
                  </div>
                  <div className="cmnts-sctn">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="str-owner">
                        <div className="str-img">
                          <img src={StrImg} alt="store icon" />
                        </div>
                        <p>Naman.R</p>
                      </div>
                      <p className="fs-14 blak-clr">5 hr ago</p>
                    </div>
                    <div className="cmnts pt-1">
                      <span>Comment :</span>
                      <p>
                        Hi Diwakar, I really appreciate you joining us at
                        Voucherify! My top priority is that you have a great
                        experience with us and learn how to easily implement
                        successful promo campaigns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 pr-0">
              <div className="task-view-cntr task-view-right">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label>Issue Raised By:</label>
                    <div className="str-owner">
                      <div className="str-img">
                        <img src={StrImg} alt="store icon" />
                      </div>
                      <p>Naman Rampal</p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label>Store Name:</label>
                    <p>Bata Store Name</p>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-12">
                    <label>Store Address:</label>
                    <p>
                      Opposite sardar jalebi, Sadar Bazar Rd, Sadar Bazar,
                      Roshan Pura, Gurugram, Haryana 122007
                    </p>
                  </div>
                </div>
                <div className="task-closure">
                  <p className="font-weight-normal mb-2">Task Closure Date</p>
                  <div className="d-flex">
                    <p className="dte">28 March 19</p>
                    <div className="w-100">
                      <ProgressBar className="task-closure-progress" now={65} />
                      <p className="nos-days">2 day</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StoreTaskView;

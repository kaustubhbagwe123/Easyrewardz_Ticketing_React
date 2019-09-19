import React, { Component } from "react";
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
                <img src={StrImg} alt="store image icon" />
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
                    <input type="text" value="Wifi is not working form 5hrs" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <label>Department</label>
                    <select>
                      <option>Internet</option>
                      <option>Internet</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label>Function</label>
                    <select>
                      <option>WiFi</option>
                      <option>WiFi</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label>Priority</label>
                    <select>
                      <option>High</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StoreTaskView;

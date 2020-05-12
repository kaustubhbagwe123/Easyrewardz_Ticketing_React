import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import StrImg from "./../../assets/Images/store-black.png";
import Demo from "./../../store/Hashtag.js";
import { MyContext } from './../../context'

class StoreTaskView extends Component {
  render() {
    const TranslationContext = this.context.state.translateLanguage.default
    return (
      <React.Fragment>
        <div className="store-task-view-top">
          <p>
          {
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.p.storeticketid
                            }
                            else {
                              return "Store ticket id"
                            }
                          })()
                        }
           : ABC1234</p>
          <div className="str-dtls d-flex">
            <div className="str-owner">
              <div className="str-img">
                <img src={StrImg} alt="store icon" />
              </div>
              <p>
              {
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.p.namanr
                            }
                            else {
                              return "Naman.R"
                            }
                          })()
                        }
              </p>
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
                    <label>
                    {
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.label.tasktitle
                            }
                            else {
                              return "Task Title"
                            }
                          })()
                        }
                    </label>
                    <input type="text" placeholder="Task Title"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label>{
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.label.department
                            }
                            else {
                              return "Department"
                            }
                          })()
                        }</label>
                    <select>
                      <option>Internet</option>
                      <option>Internet</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>
                    {
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.label.function
                            }
                            else {
                              return "Function"
                            }
                          })()
                        }
                    </label>
                    <select>
                      <option>WiFi</option>
                      <option>WiFi</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>
                    {
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.label.priority
                            }
                            else {
                              return "Priority"
                            }
                          })()
                        }
                    </label>
                    <select>
                      <option>High</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>
                    {
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.label.taskdetails
                            }
                            else {
                              return "Task Details"
                            }
                          })()
                        }
                    </label>
                    <textarea placeholder="Add Task Details"></textarea>
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-md-12">
                    <label>{
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.label.comments
                            }
                            else {
                              return "Comments"
                            }
                          })()
                        }</label>
                    <textarea
                      placeholder="Add your comment here"
                      className="store-cmnts"
                    ></textarea>
                  </div>
                </div>
                <div className="add-cmnts">
                  <p>{
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.p.comments
                            }
                            else {
                              return "Comments"
                            }
                          })()
                        }: 02</p>
                  <a href={Demo.BLANK_LINK}>{
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.a.addcomments
                            }
                            else {
                              return "Add Comment"
                            }
                          })()
                        }</a>
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
                      <span>{
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.span.comments
                            }
                            else {
                              return "Comments"
                            }
                          })()
                        } :</span>
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
                      <span>{
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.span.comments
                            }
                            else {
                              return "Comments"
                            }
                          })()
                        } :</span>
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
                    <label>
                    {
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.label.issueraisedby
                            }
                            else {
                              return "Issue Raised By"
                            }
                          })()
                        }
                    :</label>
                    <div className="str-owner">
                      <div className="str-img">
                        <img src={StrImg} alt="store icon" />
                      </div>
                      <p>Naman Rampal</p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label>{
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.label.storename
                            }
                            else {
                              return "Store Name"
                            }
                          })()
                        }:</label>
                    <p>Bata Store Name</p>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-12">
                    <label>{
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.label.storeaddress
                            }
                            else {
                              return "Store Address"
                            }
                          })()
                        }:</label>
                    <p>
                      Opposite sardar jalebi, Sadar Bazar Rd, Sadar Bazar,
                      Roshan Pura, Gurugram, Haryana 122007
                    </p>
                  </div>
                </div>
                <div className="task-closure">
                  <p className="font-weight-normal mb-2">
                  {
                          (() => {
                            if (TranslationContext !== undefined) {
                              return TranslationContext.p.taskclosuredate
                            }
                            else {
                              return "Task Closure Date"
                            }
                          })()
                        }
                  </p>
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

StoreTaskView.contextType = MyContext;
export default StoreTaskView;

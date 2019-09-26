import React , {Component} from 'react';
import TableArr from "./../../assets/Images/table-arr.png";
import RedDeleteIcon from "./../../assets/Images/red-delete-icon.png";
import BlackDeleteIcon from "./../../assets/Images/delete.svg";
import UploadIcon from './../../assets/Images/clip.png';
import CrossIcon from './../../assets/Images/cross-icon.png';
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import BlackInfoIcon from "./../../assets/Images/Info-black.png";
import Demo from "../../store/Hashtag.js";

class CreateCRMRoles extends Component
{

    render(){
        return (
          <>
            <div className="breadcrumbs-row">
              <div className="breadcrumbs-row-padding">
                <label className="settings-ticketing">
                  Settings > Ticketing >
                </label>
                <label className="storemaster-text">&nbsp;CRM Roles</label>
              </div>
            </div>
            <br />
            <div className="bottom-margin-class">
              <div className="row">
                <div
                  className="store-col-1 category-master-table crm-pagi-1 new-table"
                  style={{ height: "1025px" }}
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          Role Name <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Created By <img src={TableArr} alt="table-arr" />
                        </th>

                        <th>
                          Status <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <label className="table-data-text">HOD</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="role-1"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="role-1"
                            className="general-popover created-popover role-info"
                          >
                            <PopoverBody>
                              <div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Dashboard
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Tickets
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    knowledge Base
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Settings
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Chat
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Notification
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Reports
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created-1"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created-1"
                            className="general-popover created-popover"
                            flip={true}
                          >
                            <PopoverBody>
                              <div>
                                <p className="title">Created By: Admin</p>
                                <p className="sub-title">
                                  Created Date: 12 March 2018
                                </p>
                              </div>
                              <div>
                                <p className="title">Updated By: Manager</p>
                                <p className="sub-title">
                                  Updated Date: 12 March 2018
                                </p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>

                        <td>
                          <label className="table-data-text">Active</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="crm-del1">
                                <img src={RedDeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="crm-del1"
                                className="general-popover delete-popover"
                                flip={true}
                              >
                                <PopoverBody className="d-flex">
                                  <div className="del-big-icon">
                                    <img src={BlackDeleteIcon} alt="del-icon" />
                                  </div>
                                  <div>
                                    <p className="font-weight-bold blak-clr">
                                      Delete file?
                                    </p>
                                    <p className="mt-1 fs-12">
                                      Are you sure you want to delete this file?
                                    </p>
                                    <div className="del-can">
                                      <a href={Demo.BLANK_LINK}>CANCEL</a>
                                      <button className="butn">Delete</button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="crm-edit-pop-1"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="crm-edit-pop-1"
                                className="general-popover delete-popover"
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT ROLE
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Role Name
                                      </label>
                                      <input
                                        type="text"
                                        className="pop-over-text-crm"
                                        placeholder="6"
                                      />
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Dashboard
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-dashboard-en"
                                          name="edit-dashboard"
                                        />
                                        <label htmlFor="edit-dashboard-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-dashboard-dis"
                                          name="edit-dashboard"
                                        />
                                        <label htmlFor="edit-dashboard-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Tickets
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-tickets-en"
                                          name="edit-tickets"
                                        />
                                        <label htmlFor="edit-tickets-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-tickets-dis"
                                          name="edit-tickets"
                                        />
                                        <label htmlFor="edit-tickets-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          knowledge Base
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-knowledge-en"
                                          name="edit-knowledge"
                                        />
                                        <label htmlFor="edit-knowledge-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-knowledge-dis"
                                          name="edit-knowledge"
                                        />
                                        <label htmlFor="edit-knowledge-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Settings
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-settings-en"
                                          name="edit-settings"
                                        />
                                        <label htmlFor="edit-settings-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-settings-dis"
                                          name="edit-settings"
                                        />
                                        <label htmlFor="edit-settings-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Chat
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-chat-en"
                                          name="edit-chat-en"
                                        />
                                        <label htmlFor="edit-chat-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-chat-dis"
                                          name="edit-chat"
                                        />
                                        <label htmlFor="edit-chat-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Notification
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-notification-en"
                                          name="edit-notification"
                                        />
                                        <label htmlFor="edit-notification-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-notification-dis"
                                          name="edit-notification"
                                        />
                                        <label htmlFor="edit-notification-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Reports
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-reports-en"
                                          name="edit-reports"
                                        />
                                        <label htmlFor="edit-reports-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-reports-dis"
                                          name="edit-reports"
                                        />
                                        <label htmlFor="edit-reports-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <br />
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select-crm">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>

                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <label className="table-data-text">Manager</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="role-2"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="role-2"
                            className="general-popover created-popover role-info"
                          >
                            <PopoverBody>
                              <div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Dashboard
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Tickets
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    knowledge Base
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Settings
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Chat
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Notification
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Reports
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created-2"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created-2"
                            className="general-popover created-popover"
                            flip={true}
                          >
                            <PopoverBody>
                              <div>
                                <p className="title">Created By: Admin</p>
                                <p className="sub-title">
                                  Created Date: 12 March 2018
                                </p>
                              </div>
                              <div>
                                <p className="title">Updated By: Manager</p>
                                <p className="sub-title">
                                  Updated Date: 12 March 2018
                                </p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>

                        <td>
                          <label className="table-data-text">Inactive</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="crm-del2">
                                <img src={RedDeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="crm-del2"
                                className="general-popover delete-popover"
                                flip={true}
                              >
                                <PopoverBody className="d-flex">
                                  <div className="del-big-icon">
                                    <img src={BlackDeleteIcon} alt="del-icon" />
                                  </div>
                                  <div>
                                    <p className="font-weight-bold blak-clr">
                                      Delete file?
                                    </p>
                                    <p className="mt-1 fs-12">
                                      Are you sure you want to delete this file?
                                    </p>
                                    <div className="del-can">
                                      <a href={Demo.BLANK_LINK}>CANCEL</a>
                                      <button className="butn">Delete</button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="crm-edit-pop-2"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="crm-edit-pop-2"
                                className="general-popover delete-popover"
                                flip={true}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT ROLE
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Role Name
                                      </label>
                                      <input
                                        type="text"
                                        className="pop-over-text-crm"
                                        placeholder="6"
                                      />
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Dashboard
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-dashboard-en"
                                          name="edit-dashboard"
                                        />
                                        <label htmlFor="edit-dashboard-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-dashboard-dis"
                                          name="edit-dashboard"
                                        />
                                        <label htmlFor="edit-dashboard-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Tickets
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-tickets-en"
                                          name="edit-tickets"
                                        />
                                        <label htmlFor="edit-tickets-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-tickets-dis"
                                          name="edit-tickets"
                                        />
                                        <label htmlFor="edit-tickets-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          knowledge Base
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-knowledge-en"
                                          name="edit-knowledge"
                                        />
                                        <label htmlFor="edit-knowledge-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-knowledge-dis"
                                          name="edit-knowledge"
                                        />
                                        <label htmlFor="edit-knowledge-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Settings
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-settings-en"
                                          name="edit-settings"
                                        />
                                        <label htmlFor="edit-settings-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-settings-dis"
                                          name="edit-settings"
                                        />
                                        <label htmlFor="edit-settings-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Chat
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-chat-en"
                                          name="edit-chat-en"
                                        />
                                        <label htmlFor="edit-chat-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-chat-dis"
                                          name="edit-chat"
                                        />
                                        <label htmlFor="edit-chat-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Notification
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-notification-en"
                                          name="edit-notification"
                                        />
                                        <label htmlFor="edit-notification-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-notification-dis"
                                          name="edit-notification"
                                        />
                                        <label htmlFor="edit-notification-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Reports
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-reports-en"
                                          name="edit-reports"
                                        />
                                        <label htmlFor="edit-reports-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-reports-dis"
                                          name="edit-reports"
                                        />
                                        <label htmlFor="edit-reports-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <br />
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select-crm">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>

                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <label className="table-data-text">Team Leader</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="role-3"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="role-3"
                            className="general-popover created-popover role-info"
                          >
                            <PopoverBody>
                              <div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Dashboard
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Tickets
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    knowledge Base
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Settings
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Chat
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Notification
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Reports
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created-3"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created-3"
                            className="general-popover created-popover"
                            flip={true}
                          >
                            <PopoverBody>
                              <div>
                                <p className="title">Created By: Admin</p>
                                <p className="sub-title">
                                  Created Date: 12 March 2018
                                </p>
                              </div>
                              <div>
                                <p className="title">Updated By: Manager</p>
                                <p className="sub-title">
                                  Updated Date: 12 March 2018
                                </p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>

                        <td>
                          <label className="table-data-text">Active</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="crm-del3">
                                <img src={RedDeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="crm-del3"
                                className="general-popover delete-popover"
                                flip={true}
                              >
                                <PopoverBody className="d-flex">
                                  <div className="del-big-icon">
                                    <img src={BlackDeleteIcon} alt="del-icon" />
                                  </div>
                                  <div>
                                    <p className="font-weight-bold blak-clr">
                                      Delete file?
                                    </p>
                                    <p className="mt-1 fs-12">
                                      Are you sure you want to delete this file?
                                    </p>
                                    <div className="del-can">
                                      <a href={Demo.BLANK_LINK}>CANCEL</a>
                                      <button className="butn">Delete</button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="crm-edit-pop-3"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="crm-edit-pop-3"
                                className="general-popover delete-popover"
                                flip={true}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT ROLE
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Role Name
                                      </label>
                                      <input
                                        type="text"
                                        className="pop-over-text-crm"
                                        placeholder="6"
                                      />
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Dashboard
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-dashboard-en"
                                          name="edit-dashboard"
                                        />
                                        <label htmlFor="edit-dashboard-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-dashboard-dis"
                                          name="edit-dashboard"
                                        />
                                        <label htmlFor="edit-dashboard-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Tickets
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-tickets-en"
                                          name="edit-tickets"
                                        />
                                        <label htmlFor="edit-tickets-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-tickets-dis"
                                          name="edit-tickets"
                                        />
                                        <label htmlFor="edit-tickets-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          knowledge Base
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-knowledge-en"
                                          name="edit-knowledge"
                                        />
                                        <label htmlFor="edit-knowledge-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-knowledge-dis"
                                          name="edit-knowledge"
                                        />
                                        <label htmlFor="edit-knowledge-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Settings
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-settings-en"
                                          name="edit-settings"
                                        />
                                        <label htmlFor="edit-settings-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-settings-dis"
                                          name="edit-settings"
                                        />
                                        <label htmlFor="edit-settings-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Chat
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-chat-en"
                                          name="edit-chat-en"
                                        />
                                        <label htmlFor="edit-chat-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-chat-dis"
                                          name="edit-chat"
                                        />
                                        <label htmlFor="edit-chat-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Notification
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-notification-en"
                                          name="edit-notification"
                                        />
                                        <label htmlFor="edit-notification-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-notification-dis"
                                          name="edit-notification"
                                        />
                                        <label htmlFor="edit-notification-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Reports
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-reports-en"
                                          name="edit-reports"
                                        />
                                        <label htmlFor="edit-reports-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-reports-dis"
                                          name="edit-reports"
                                        />
                                        <label htmlFor="edit-reports-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <br />
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select-crm">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>

                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <label className="table-data-text">Supervisor</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="role-4"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="role-4"
                            className="general-popover created-popover role-info"
                          >
                            <PopoverBody>
                              <div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Dashboard
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Tickets
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    knowledge Base
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Settings
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Chat
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Notification
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Reports
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created-4"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created-4"
                            className="general-popover created-popover"
                            flip={true}
                          >
                            <PopoverBody>
                              <div>
                                <p className="title">Created By: Admin</p>
                                <p className="sub-title">
                                  Created Date: 12 March 2018
                                </p>
                              </div>
                              <div>
                                <p className="title">Updated By: Manager</p>
                                <p className="sub-title">
                                  Updated Date: 12 March 2018
                                </p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>

                        <td>
                          <label className="table-data-text">Inactive</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="crm-del4">
                                <img src={RedDeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="crm-del4"
                                className="general-popover delete-popover"
                                flip={true}
                              >
                                <PopoverBody className="d-flex">
                                  <div className="del-big-icon">
                                    <img src={BlackDeleteIcon} alt="del-icon" />
                                  </div>
                                  <div>
                                    <p className="font-weight-bold blak-clr">
                                      Delete file?
                                    </p>
                                    <p className="mt-1 fs-12">
                                      Are you sure you want to delete this file?
                                    </p>
                                    <div className="del-can">
                                      <a href={Demo.BLANK_LINK}>CANCEL</a>
                                      <button className="butn">Delete</button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="crm-edit-pop-4"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="crm-edit-pop-4"
                                className="general-popover delete-popover"
                                flip={true}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT ROLE
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Role Name
                                      </label>
                                      <input
                                        type="text"
                                        className="pop-over-text-crm"
                                        placeholder="6"
                                      />
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Dashboard
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-dashboard-en"
                                          name="edit-dashboard"
                                        />
                                        <label htmlFor="edit-dashboard-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-dashboard-dis"
                                          name="edit-dashboard"
                                        />
                                        <label htmlFor="edit-dashboard-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Tickets
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-tickets-en"
                                          name="edit-tickets"
                                        />
                                        <label htmlFor="edit-tickets-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-tickets-dis"
                                          name="edit-tickets"
                                        />
                                        <label htmlFor="edit-tickets-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          knowledge Base
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-knowledge-en"
                                          name="edit-knowledge"
                                        />
                                        <label htmlFor="edit-knowledge-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-knowledge-dis"
                                          name="edit-knowledge"
                                        />
                                        <label htmlFor="edit-knowledge-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Settings
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-settings-en"
                                          name="edit-settings"
                                        />
                                        <label htmlFor="edit-settings-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-settings-dis"
                                          name="edit-settings"
                                        />
                                        <label htmlFor="edit-settings-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Chat
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-chat-en"
                                          name="edit-chat-en"
                                        />
                                        <label htmlFor="edit-chat-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-chat-dis"
                                          name="edit-chat"
                                        />
                                        <label htmlFor="edit-chat-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Notification
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-notification-en"
                                          name="edit-notification"
                                        />
                                        <label htmlFor="edit-notification-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-notification-dis"
                                          name="edit-notification"
                                        />
                                        <label htmlFor="edit-notification-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Reports
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-reports-en"
                                          name="edit-reports"
                                        />
                                        <label htmlFor="edit-reports-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-reports-dis"
                                          name="edit-reports"
                                        />
                                        <label htmlFor="edit-reports-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <br />
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select-crm">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>

                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <label className="table-data-text">Executive</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="role-5"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="role-5"
                            className="general-popover created-popover role-info"
                          >
                            <PopoverBody>
                              <div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Dashboard
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Tickets
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    knowledge Base
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Settings
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Chat
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Notification
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Reports
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created-5"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created-5"
                            className="general-popover created-popover"
                            flip={true}
                          >
                            <PopoverBody>
                              <div>
                                <p className="title">Created By: Admin</p>
                                <p className="sub-title">
                                  Created Date: 12 March 2018
                                </p>
                              </div>
                              <div>
                                <p className="title">Updated By: Manager</p>
                                <p className="sub-title">
                                  Updated Date: 12 March 2018
                                </p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>

                        <td>
                          <label className="table-data-text">Active</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="crm-del5">
                                <img src={RedDeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="crm-del5"
                                className="general-popover delete-popover"
                                flip={true}
                              >
                                <PopoverBody className="d-flex">
                                  <div className="del-big-icon">
                                    <img src={BlackDeleteIcon} alt="del-icon" />
                                  </div>
                                  <div>
                                    <p className="font-weight-bold blak-clr">
                                      Delete file?
                                    </p>
                                    <p className="mt-1 fs-12">
                                      Are you sure you want to delete this file?
                                    </p>
                                    <div className="del-can">
                                      <a href={Demo.BLANK_LINK}>CANCEL</a>
                                      <button className="butn">Delete</button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="crm-edit-pop-5"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="crm-edit-pop-5"
                                className="general-popover delete-popover"
                                flip={true}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT ROLE
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Role Name
                                      </label>
                                      <input
                                        type="text"
                                        className="pop-over-text-crm"
                                        placeholder="6"
                                      />
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Dashboard
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-dashboard-en"
                                          name="edit-dashboard"
                                        />
                                        <label htmlFor="edit-dashboard-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-dashboard-dis"
                                          name="edit-dashboard"
                                        />
                                        <label htmlFor="edit-dashboard-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Tickets
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-tickets-en"
                                          name="edit-tickets"
                                        />
                                        <label htmlFor="edit-tickets-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-tickets-dis"
                                          name="edit-tickets"
                                        />
                                        <label htmlFor="edit-tickets-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          knowledge Base
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-knowledge-en"
                                          name="edit-knowledge"
                                        />
                                        <label htmlFor="edit-knowledge-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-knowledge-dis"
                                          name="edit-knowledge"
                                        />
                                        <label htmlFor="edit-knowledge-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Settings
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-settings-en"
                                          name="edit-settings"
                                        />
                                        <label htmlFor="edit-settings-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-settings-dis"
                                          name="edit-settings"
                                        />
                                        <label htmlFor="edit-settings-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Chat
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-chat-en"
                                          name="edit-chat-en"
                                        />
                                        <label htmlFor="edit-chat-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-chat-dis"
                                          name="edit-chat"
                                        />
                                        <label htmlFor="edit-chat-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Notification
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-notification-en"
                                          name="edit-notification"
                                        />
                                        <label htmlFor="edit-notification-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-notification-dis"
                                          name="edit-notification"
                                        />
                                        <label htmlFor="edit-notification-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <div className="store-create-margin roll-radio">
                                      <div>
                                        <p className="rolle-name-text-popover">
                                          Reports
                                        </p>
                                        <input
                                          type="radio"
                                          id="edit-reports-en"
                                          name="edit-reports"
                                        />
                                        <label htmlFor="edit-reports-en">
                                          Enable
                                        </label>
                                        <input
                                          type="radio"
                                          id="edit-reports-dis"
                                          name="edit-reports"
                                        />
                                        <label htmlFor="edit-reports-dis">
                                          Disable
                                        </label>
                                      </div>
                                    </div>
                                    <br />
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select-crm">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>

                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="position-relative">
                    <div className="pagi">
                      <ul>
                        <li>
                          <a href={Demo.BLANK_LINK}>&lt;</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>1</a>
                        </li>
                        <li className="active">
                          <a href={Demo.BLANK_LINK}>2</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>3</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>4</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>5</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>6</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>&gt;</a>
                        </li>
                      </ul>
                    </div>
                    <div className="item-selection">
                      <select>
                        <option>30</option>
                        <option>50</option>
                        <option>100</option>
                      </select>
                      <p>Items per page</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="store-col-2">
                    <br />
                    <div className="row">
                      <label className="Create-role-text">CREATE ROLE</label>
                    </div>

                    <div className="store-create-margin">
                      <div className="row">
                        <label className="store-create-lable-text">
                          Role Name
                        </label>
                      </div>
                      <div className="row">
                        <input
                          type="text"
                          className="cp-textbox"
                          placeholder="Manager"
                        />
                      </div>
                    </div>

                    <div className="store-create-margin roll-radio">
                      <div>
                        <p className="rolle-name-text">Dashboard</p>
                        <input
                          type="radio"
                          id="dashboard-en"
                          name="dashboard"
                        />
                        <label htmlFor="dashboard-en">Enable</label>
                        <input
                          type="radio"
                          id="dashboard-dis"
                          name="dashboard"
                        />
                        <label htmlFor="dashboard-dis">Disable</label>
                      </div>
                    </div>
                    <div className="store-create-margin roll-radio">
                      <div>
                        <p className="rolle-name-text">Tickets</p>
                        <input type="radio" id="tickets-en" name="tickets" />
                        <label htmlFor="tickets-en">Enable</label>
                        <input type="radio" id="tickets-dis" name="tickets" />
                        <label htmlFor="tickets-dis">Disable</label>
                      </div>
                    </div>
                    <div className="store-create-margin roll-radio">
                      <div>
                        <p className="rolle-name-text">Knowledge Base</p>
                        <input
                          type="radio"
                          id="knowledgebase-en"
                          name="knowledgebase"
                        />
                        <label htmlFor="knowledgebase-en">Enable</label>
                        <input
                          type="radio"
                          id="knowledgebase-dis"
                          name="knowledgebase"
                        />
                        <label htmlFor="knowledgebase-dis">Disable</label>
                      </div>
                    </div>
                    <div className="store-create-margin roll-radio">
                      <div>
                        <p className="rolle-name-text">Settings</p>
                        <input type="radio" id="settings-en" name="settings" />
                        <label htmlFor="settings-en">Enable</label>
                        <input type="radio" id="settings-dis" name="settings" />
                        <label htmlFor="settings-dis">Disable</label>
                      </div>
                    </div>
                    <div className="store-create-margin roll-radio">
                      <div>
                        <p className="rolle-name-text">Chat</p>
                        <input type="radio" id="chat-en" name="chat" />
                        <label htmlFor="chat-en">Enable</label>
                        <input type="radio" id="chat-dis" name="chat" />
                        <label htmlFor="chat-dis">Disable</label>
                      </div>
                    </div>
                    <div className="store-create-margin roll-radio">
                      <div>
                        <p className="rolle-name-text">Notification</p>
                        <input
                          type="radio"
                          id="notification-en"
                          name="notification"
                        />
                        <label htmlFor="notification-en">Enable</label>
                        <input
                          type="radio"
                          id="notificationdi-dis"
                          name="notification"
                        />
                        <label htmlFor="notificationdi-dis">Disable</label>
                      </div>
                    </div>
                    <div className="store-create-margin roll-radio">
                      <div>
                        <p className="rolle-name-text">Reports</p>
                        <input type="radio" id="reports-en" name="reports" />
                        <label htmlFor="reports-en">Enable</label>
                        <input type="radio" id="reports-dis" name="reports" />
                        <label htmlFor="reports-dis">Disable</label>
                      </div>
                    </div>
                    <br />

                    <div className="store-create-margin">
                      <div className="row">
                        <label className="store-create-lable-text">
                          Status
                        </label>
                      </div>
                      <div className="row">
                        <select className="store-create-select">
                          <option>Active</option>
                        </select>
                      </div>
                    </div>

                    <div className="store-create-margin">
                      <div className="row">
                        <button className="store-create-button">
                          <label className="store-create-button-text">
                            ADD
                          </label>
                        </button>
                      </div>
                    </div>
                    <br />
                  </div>
                  <br />
                  <div className="store-col-2">
                    <br />
                    <div className="row">
                      <label className="Create-store-text">BULK UPLOAD</label>
                    </div>
                    <div className="store-create-margin">
                      <div className="row rectangle-upload">
                        <div className="upload-icon-center">
                          <img
                            src={UploadIcon}
                            alt="upload-icon"
                            className="upload-icon"
                          />
                        </div>

                        <div className="row upload-add-text">
                          Add File &nbsp;
                          <span className="upload-add-text1">
                            or Drop File here
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="store-create-margin">
                      <div className="row">
                        <div className="store-create-oval"></div>
                        <div className="store-upload-details-div">
                          <label className="store-upload-details-text">
                            Chat agent user type file.CSV
                          </label>
                          <div className="upload-file-memory">
                            <span>122.6kb</span>
                          </div>
                        </div>
                        <div className="store-upload-details-div-2">
                          <img
                            src={BlackDeleteIcon}
                            alt="delete-icon"
                            className="store-icons-8-delete"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="store-create-oval"></div>
                        <div className="store-upload-details-div">
                          <label className="store-upload-details-text">
                            Supervisor type file.CSV
                          </label>
                          <div className="file-upload-faild-text">
                            <span>Faild</span>
                          </div>
                        </div>
                        <div className="store-upload-details-div-4">
                          <label className="file-upload-retry-text">
                            Retry
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="store-create-oval"></div>
                        <div className="store-upload-details-div">
                          <label className="store-upload-details-text">
                            Chat agent 25 Oct type file.CSV
                          </label>
                          <div className="file-upload-progress">
                            <div className="file-upload-progress-status"></div>
                          </div>
                        </div>
                        <div className="store-upload-details-div-3">
                          <img
                            src={CrossIcon}
                            alt="cross-icon"
                            className="store-create-cross-icon"
                          />
                        </div>
                      </div>
                      <br />
                      <div className="store-create-margin">
                        <div className="row">
                          <button className="store-create-button">
                            <label className="store-create-button-text">
                              ADD
                            </label>
                          </button>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }

}

export default CreateCRMRoles;
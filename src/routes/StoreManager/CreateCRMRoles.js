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
                  className="store-col-1 category-master-table crm-pagi"
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
                          />
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                          />
                        </td>

                        <td>
                          <label className="table-data-text">Active</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <img
                                src={RedDeleteIcon}
                                alt="delete-icon"
                                className="red-delete-icon-size"
                                id="Popover-1"
                              />
                              <UncontrolledPopover
                                placement="bottom"
                                target="Popover-1"
                              >
                                <PopoverBody>
                                  <div className="row">
                                    <div className="oval-delete popver-delete-mar">
                                      <img
                                        src={BlackDeleteIcon}
                                        alt="delete-icon"
                                        className="oval-delete-icons"
                                      />
                                    </div>
                                    <div className="popver-delete-mar">
                                      <label className="delete-file-popover">
                                        Delete file?
                                      </label>
                                      <p className="delete-details-popovel">
                                        Are you sure you want to delete this
                                        file?
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row mrg-can-del-row">
                                    <label className="popover-delete-cancel">
                                      CANCEL
                                    </label>
                                    <button className="popover-delete-btn">
                                      <label className="popover-delete-btn-text">
                                        DELETE
                                      </label>
                                    </button>
                                  </div>

                                  <br />
                                  <br />
                                  <br />
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-1"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
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
                          />
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                          />
                        </td>

                        <td>
                          <label className="table-data-text">Inactive</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <img
                                src={RedDeleteIcon}
                                alt="delete-icon"
                                className="red-delete-icon-size"
                                id="Popover-1"
                              />
                              <UncontrolledPopover
                                placement="bottom"
                                target="Popover-1"
                              >
                                <PopoverBody>
                                  <div className="row">
                                    <div className="oval-delete popver-delete-mar">
                                      <img
                                        src={BlackDeleteIcon}
                                        alt="delete-icon"
                                        className="oval-delete-icons"
                                      />
                                    </div>
                                    <div className="popver-delete-mar">
                                      <label className="delete-file-popover">
                                        Delete file?
                                      </label>
                                      <p className="delete-details-popovel">
                                        Are you sure you want to delete this
                                        file?
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row mrg-can-del-row">
                                    <label className="popover-delete-cancel">
                                      CANCEL
                                    </label>
                                    <button className="popover-delete-btn">
                                      <label className="popover-delete-btn-text">
                                        DELETE
                                      </label>
                                    </button>
                                  </div>

                                  <br />
                                  <br />
                                  <br />
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-1"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
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
                          />
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                          />
                        </td>

                        <td>
                          <label className="table-data-text">Active</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <img
                                src={RedDeleteIcon}
                                alt="delete-icon"
                                className="red-delete-icon-size"
                                id="Popover-1"
                              />
                              <UncontrolledPopover
                                placement="bottom"
                                target="Popover-1"
                              >
                                <PopoverBody>
                                  <div className="row">
                                    <div className="oval-delete popver-delete-mar">
                                      <img
                                        src={BlackDeleteIcon}
                                        alt="delete-icon"
                                        className="oval-delete-icons"
                                      />
                                    </div>
                                    <div className="popver-delete-mar">
                                      <label className="delete-file-popover">
                                        Delete file?
                                      </label>
                                      <p className="delete-details-popovel">
                                        Are you sure you want to delete this
                                        file?
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row mrg-can-del-row">
                                    <label className="popover-delete-cancel">
                                      CANCEL
                                    </label>
                                    <button className="popover-delete-btn">
                                      <label className="popover-delete-btn-text">
                                        DELETE
                                      </label>
                                    </button>
                                  </div>

                                  <br />
                                  <br />
                                  <br />
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-1"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
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
                          />
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                          />
                        </td>

                        <td>
                          <label className="table-data-text">Inactive</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <img
                                src={RedDeleteIcon}
                                alt="delete-icon"
                                className="red-delete-icon-size"
                                id="Popover-1"
                              />
                              <UncontrolledPopover
                                placement="bottom"
                                target="Popover-1"
                              >
                                <PopoverBody>
                                  <div className="row">
                                    <div className="oval-delete popver-delete-mar">
                                      <img
                                        src={BlackDeleteIcon}
                                        alt="delete-icon"
                                        className="oval-delete-icons"
                                      />
                                    </div>
                                    <div className="popver-delete-mar">
                                      <label className="delete-file-popover">
                                        Delete file?
                                      </label>
                                      <p className="delete-details-popovel">
                                        Are you sure you want to delete this
                                        file?
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row mrg-can-del-row">
                                    <label className="popover-delete-cancel">
                                      CANCEL
                                    </label>
                                    <button className="popover-delete-btn">
                                      <label className="popover-delete-btn-text">
                                        DELETE
                                      </label>
                                    </button>
                                  </div>

                                  <br />
                                  <br />
                                  <br />
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-1"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
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
                          />
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                          />
                        </td>

                        <td>
                          <label className="table-data-text">Active</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <img
                                src={RedDeleteIcon}
                                alt="delete-icon"
                                className="red-delete-icon-size"
                                id="Popover-1"
                              />
                              <UncontrolledPopover
                                placement="bottom"
                                target="Popover-1"
                              >
                                <PopoverBody>
                                  <div className="row">
                                    <div className="oval-delete popver-delete-mar">
                                      <img
                                        src={BlackDeleteIcon}
                                        alt="delete-icon"
                                        className="oval-delete-icons"
                                      />
                                    </div>
                                    <div className="popver-delete-mar">
                                      <label className="delete-file-popover">
                                        Delete file?
                                      </label>
                                      <p className="delete-details-popovel">
                                        Are you sure you want to delete this
                                        file?
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row mrg-can-del-row">
                                    <label className="popover-delete-cancel">
                                      CANCEL
                                    </label>
                                    <button className="popover-delete-btn">
                                      <label className="popover-delete-btn-text">
                                        DELETE
                                      </label>
                                    </button>
                                  </div>

                                  <br />
                                  <br />
                                  <br />
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-1"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
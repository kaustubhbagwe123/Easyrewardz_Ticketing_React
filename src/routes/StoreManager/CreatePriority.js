import React, { Component } from "react";
import TableArr from "./../../assets/Images/table-arr.png";
import RedDeleteIcon from "./../../assets/Images/red-delete-icon.png";
import BlackDeleteIcon from "./../../assets/Images/delete.svg";
 
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import BlackInfoIcon from "./../../assets/Images/Info-black.png";
import Demo from "../../store/Hashtag.js"

class CreatePriority extends Component {
  render() {
    return (
      <>
        <div className="breadcrumbs-row">
          <div className="breadcrumbs-row-padding">
            <label className="settings-ticketing">Settings > Ticketing ></label>
            <label className="storemaster-text">&nbsp;Priority</label>
          </div>
        </div>
        <br />
        <div className="bottom-margin-class">
          <div className="row">
            <div className="store-col-1-1 category-master-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      Priority Name <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Created By <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Created Date <img src={TableArr} alt="table-arr" />
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
                      <label className="table-data-text">High</label>
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
                      <label className="table-data-text">23-May-19</label>
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
                                    Are you sure you want to delete this file?
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
                      <label className="table-data-text">Medium</label>
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
                      <label className="table-data-text">23-May-19</label>
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
                            id="Popover-2"
                          />
                          <UncontrolledPopover
                            placement="bottom"
                            target="Popover-2"
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
                                    Are you sure you want to delete this file?
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
                      <label className="table-data-text">Low</label>
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
                      <label className="table-data-text">23-May-19</label>
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
                            id="Popover-3"
                          />
                          <UncontrolledPopover
                            placement="bottom"
                            target="Popover-3"
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
                                    Are you sure you want to delete this file?
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
                      <label className="table-data-text">6</label>
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
                      <label className="table-data-text">23-May-19</label>
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
                            id="Popover-4"
                          />
                          <UncontrolledPopover
                            placement="bottom"
                            target="Popover-4"
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
                                    Are you sure you want to delete this file?
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
                      <label className="table-data-text">8</label>
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
                      <label className="table-data-text">23-May-19</label>
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
                            id="Popover-5"
                          />
                          <UncontrolledPopover
                            placement="bottom"
                            target="Popover-5"
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
                                    Are you sure you want to delete this file?
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
                  <label className="Create-store-text">CREATE PRORITY</label>
                </div>

                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">Priority Name</label>
                  </div>
                  <div className="row">
                    <input
                      type="text"
                      className="cp-textbox"
                      placeholder="High"
                    />
                  </div>
                </div>

                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">Status</label>
                  </div>
                  <div className="row">
                    <select className="store-create-select">
                      <option>Active</option>
                    </select>
                  </div>
                </div>
                <br />
                <div className="store-create-margin">
                  <div className="row">
                    <button className="store-create-button">
                      <label className="store-create-button-text">ADD</label>
                    </button>
                  </div>
                </div>
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CreatePriority;

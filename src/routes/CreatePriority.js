import React, { Component } from "react";
import TableArr from "./../assets/Images/table-arr.png";
import RedDeleteIcon from "./../assets/Images/red-delete-icon.png";
import BlackDeleteIcon from "./../assets/Images/del-big.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import BlackInfoIcon from "./../assets/Images/Info-black.png";
import Demo from "./../store/Hashtag";
import Braille from "./../assets/Images/braille.svg";

class CreatePriority extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    }
  }
  
  // state = {
  //   // index: this.props.index,
  //   // targetbox: null
  // };
  // cssGrid = {
  //   1: "one",
  //   2: "two",
  //   3: "three",
  //   4: "four",
  //   5: "five",
  //   6: "six"
  // };

  // dragEnd = event => {
  //   this.setState({ targetbox: null });
  // };
  // dragStart = event => {
  //   event.dataTransfer.setData("text", event.target.id);
  //   this.setState({ targetbox: true });
  // };
  // drop = event => {
  //   if (event.target.id) {
  //     this.props.swap(event.dataTransfer.getData("text"), event.target.id);
  //     event.dataTransfer.clearData();
  //   }
  // };
  render() {
    // const tooltipDelay = { show: 100, hide: 100 };
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <a href="settings">Settings</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK}>Ticketing</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="active">
            Priority
          </a>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height table-priority">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
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
                      <tr
                      // id="abc1"
                      // className={this.cssGrid[this.state.index]}
                      // draggable="true"
                      // onDrop={this.drop}
                      // onDragStart={this.dragStart}
                      // onDragOver={event => event.preventDefault()}
                      // onDragEnd={this.dragEnd}
                      >
                        <td>
                          <img src={Braille} alt="braille-icon" />
                        </td>
                        <td>
                          <label className="table-data-text">High</label>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created1"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created1"
                            className="general-popover created-popover"
                            // delay={tooltipDelay}
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
                          <label className="table-data-text">23-May-19</label>
                        </td>
                        <td>
                          <label className="table-data-text">Active</label>
                        </td>

                        <td>
                            <div className="del-btn" id="del1">
                              <img src={RedDeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del1"
                              className="general-popover delete-popover"
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
                              <button
                                className="btnEditAction"
                                id="p-edit-pop-1"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="p-edit-pop-1"
                                className="general-popover delete-popover"
                                // delay={tooltipDelay}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT PRORITY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Priority Name
                                      </label>
                                      <input
                                        type="text"
                                        className="pop-over-text"
                                        placeholder="High"
                                      />
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
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
                        </td>
                      </tr>
                      <tr
                      // id="abc2"
                      // className={this.cssGrid[this.state.index]}
                      // draggable="true"
                      // onDrop={this.drop}
                      // onDragStart={this.dragStart}
                      // onDragOver={event => event.preventDefault()}
                      // onDragEnd={this.dragEnd}
                      >
                        <td>
                          <img src={Braille} alt="braille-icon" />
                        </td>
                        <td>
                          <label className="table-data-text">Medium</label>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created2"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created2"
                            className="general-popover created-popover"
                            // delay={tooltipDelay}
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
                          <label className="table-data-text">23-May-19</label>
                        </td>
                        <td>
                          <label className="table-data-text">Inactive</label>
                        </td>
                        <td>
                            <div className="del-btn" id="del2">
                              <img src={RedDeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del2"
                              className="general-popover delete-popover"
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
                              <button
                                className="btnEditAction"
                                id="p-edit-pop-2"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="p-edit-pop-2"
                                className="general-popover delete-popover"
                                // delay={tooltipDelay}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT PRORITY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Priority Name
                                      </label>
                                      <input
                                        type="text"
                                        className="pop-over-text"
                                        placeholder="Medium"
                                      />
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
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
                        </td>
                      </tr>
                      <tr
                      // id="abc3"
                      // className={this.cssGrid[this.state.index]}
                      // draggable="true"
                      // onDrop={this.drop}
                      // onDragStart={this.dragStart}
                      // onDragOver={event => event.preventDefault()}
                      // onDragEnd={this.dragEnd}
                      >
                        <td>
                          <img src={Braille} alt="braille-icon" />
                        </td>
                        <td>
                          <label className="table-data-text">Low</label>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created3"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created3"
                            className="general-popover created-popover"
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
                          <label className="table-data-text">23-May-19</label>
                        </td>
                        <td>
                          <label className="table-data-text">Active</label>
                        </td>
                        <td>
                            <div className="del-btn" id="del3">
                              <img src={RedDeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del3"
                              className="general-popover delete-popover"
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
                              <button
                                className="btnEditAction"
                                id="p-edit-pop-3"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="p-edit-pop-3"
                                className="general-popover delete-popover"
                                // delay={tooltipDelay}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT PRORITY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Priority Name
                                      </label>
                                      <input
                                        type="text"
                                        className="pop-over-text"
                                        placeholder="Low"
                                      />
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
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
                        </td>
                      </tr>
                      <tr
                      // id="abc4"
                      // className={this.cssGrid[this.state.index]}
                      // draggable="true"
                      // onDrop={this.drop}
                      // onDragStart={this.dragStart}
                      // onDragOver={event => event.preventDefault()}
                      // onDragEnd={this.dragEnd}
                      >
                        <td>
                          <img src={Braille} alt="braille-icon" />
                        </td>
                        <td>
                          <label className="table-data-text">6</label>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created4"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created4"
                            className="general-popover created-popover"
                            // delay={tooltipDelay}
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
                          <label className="table-data-text">23-May-19</label>
                        </td>
                        <td>
                          <label className="table-data-text">Inactive</label>
                        </td>
                        <td>
                            <div className="del-btn" id="del4">
                              <img src={RedDeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del4"
                              className="general-popover delete-popover"
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
                              <button
                                className="btnEditAction"
                                id="p-edit-pop-4"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="p-edit-pop-4"
                                className="general-popover delete-popover"
                                // delay={tooltipDelay}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT PRORITY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Priority Name
                                      </label>
                                      <input
                                        type="text"
                                        className="pop-over-text"
                                        placeholder="6"
                                      />
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
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
                        </td>
                      </tr>
                      <tr
                      // id="abc5"
                      // className={this.cssGrid[this.state.index]}
                      // draggable="true"
                      // onDrop={this.drop}
                      // onDragStart={this.dragStart}
                      // onDragOver={event => event.preventDefault()}
                      // onDragEnd={this.dragEnd}
                      >
                        <td>
                          <img src={Braille} alt="braille-icon" />
                        </td>
                        <td>
                          <label className="table-data-text">8</label>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created5"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created5"
                            className="general-popover created-popover"
                            // delay={tooltipDelay}
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
                          <label className="table-data-text">23-May-19</label>
                        </td>
                        <td>
                          <label className="table-data-text">Active</label>
                        </td>
                        <td>
                            <div className="del-btn" id="del5">
                              <img src={RedDeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del5"
                              className="general-popover delete-popover"
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
                              <button
                                className="btnEditAction"
                                id="p-edit-pop-5"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="p-edit-pop-5"
                                className="general-popover delete-popover"
                                // delay={tooltipDelay}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT PRORITY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Priority Name
                                      </label>
                                      <input
                                        type="text"
                                        className="pop-over-text"
                                        placeholder="8"
                                      />
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
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
              </div>
              <div className="col-md-4">
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="create-department">CREATE PRORITY</label>
                    <div className="div-padding-1">
                      <label className="designation-name">Priority Name</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Priority Name"
                      />
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">Status</label>
                      <select
                        id="inputState"
                        className="form-control dropdown-setting"
                      >
                        <option>select</option>
                        <option>Active</option>
                        <option>Deactive</option>
                      </select>
                    </div>
                    <div className="btnSpace">
                      <button className="CreateADDBtn">
                        <label className="addLable">ADD</label>
                      </button>
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

export default CreatePriority;
import React, { Component } from "react";
import Demo from "../../../store/Hashtag";
import TableArr from "./../../../assets/Images/table-arr.png";
import InfoImg from "./../../../assets/Images/icons8-info.svg";
import DeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
// import DeleteUpld from "./../../../assets/Images/delete-upl.png";
// import ClipIcon from "./../../../assets/Images/clip.png";
// import CancelIcon from "./../../../assets/Images/cancel.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";

class Brands extends Component {
  render() {
    const editbool = false;
    const tooltipDelay = { show: 50, hide: 100 };
    return (
      <React.Fragment>
          <div className="container-fluid setting-title setting-breadcrumb">
            <a href={Demo.BLANK_LINK}>Settings</a>
            <span>&gt;</span>
            <a href={Demo.BLANK_LINK}>Ticketing</a>
            <span>&gt;</span>
            <a href={Demo.BLANK_LINK} className="active">
              Brands
            </a>
          </div>
          <div className="container-fluid">
            <div className="store-settings-cntr">
              <div className="row">
                <div className="col-md-8">
                  <div className="table-cntr table-height">
                    <table>
                      <thead>
                        <tr>
                          <th>
                            Brand Code
                            <img src={TableArr} alt="table-arr" />
                          </th>
                          <th>
                            Brand Name <img src={TableArr} alt="table-arr" />
                          </th>
                          <th>
                            Brand Added By
                            <img src={TableArr} alt="table-arr" />
                          </th>
                          <th>
                            Status <img src={TableArr} alt="table-arr" />
                          </th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1234</td>
                          <td>Bata1</td>
                          <td>
                            Admin
                            <img
                              src={InfoImg}
                              className="info-icon"
                              alt="Info"
                              id="Hod"
                            />
                            <UncontrolledPopover
                              trigger="hover"
                              placement="bottom"
                              target="Hod"
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
                          <td>Active</td>
                          <td>
                            <div className="del-btn" id="del1">
                              <img src={DeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del1"
                              className="general-popover delete-popover"
                            >
                              <PopoverBody className="d-flex">
                                <div className="del-big-icon">
                                  <img src={DelBigIcon} alt="del-icon" />
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
                            <button className="btnEditAction" id="edit-pop-1">
                              <label className="edit">EDIT</label>
                            </button>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="edit-pop-1"
                              className="general-popover delete-popover"
                              delay={tooltipDelay}
                              flip={editbool}
                            >
                              <PopoverBody className="d-flex">
                                <div>
                                  <div className="">
                                    <label className="popover-header-text">
                                      EDIT USER
                                    </label>
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Designation Name
                                    </label>
                                    <input
                                      type="text"
                                      className="txt-edit-popover"
                                      placeholder="Designation Name"
                                    />
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Brand Name
                                    </label>
                                    <input
                                      type="text"
                                      className="txt-edit-popover"
                                      placeholder="Brand Name"
                                    />
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Status
                                    </label>
                                    <select
                                      id="inputStatus"
                                      className="edit-dropDwon dropdown-setting"
                                    >
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
                        <tr>
                          <td>3243</td>
                          <td>Bata2</td>
                          <td>
                            Admin
                            <img
                              src={InfoImg}
                              className="info-icon"
                              alt="Info"
                              id="Manager"
                            />
                            <UncontrolledPopover
                              trigger="hover"
                              placement="bottom"
                              target="Manager"
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
                          <td>Inative</td>
                          <td>
                            {/* <img src={DeleteIcon} alt="Delete" className="deleteImg" /> */}
                            <div className="del-btn" id="del2">
                              <img src={DeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del2"
                              className="general-popover delete-popover"
                            >
                              <PopoverBody className="d-flex">
                                <div className="del-big-icon">
                                  <img src={DelBigIcon} alt="del-icon" />
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
                            <button className="btnEditAction" id="edit-pop-2">
                              <label className="edit">EDIT</label>
                            </button>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="edit-pop-2"
                              className="general-popover delete-popover"
                              delay={tooltipDelay}
                              flip={editbool}
                            >
                              <PopoverBody className="d-flex">
                                <div>
                                  <div className="">
                                    <label className="popover-header-text">
                                      EDIT USER
                                    </label>
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Designation Name
                                    </label>
                                    <input
                                      type="text"
                                      className="txt-edit-popover"
                                      placeholder="Designation Name"
                                    />
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Brand Name
                                    </label>
                                    <input
                                      type="text"
                                      className="txt-edit-popover"
                                      placeholder="Brand Name"
                                    />
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Status
                                    </label>
                                    <select
                                      id="inputStatus"
                                      className="edit-dropDwon dropdown-setting"
                                    >
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
                        <tr>
                          <td>3242</td>
                          <td>Bata3</td>
                          <td>
                            Admin
                            <img
                              src={InfoImg}
                              className="info-icon"
                              alt="Info"
                              id="TeamLeader"
                            />
                            <UncontrolledPopover
                              trigger="hover"
                              placement="bottom"
                              target="TeamLeader"
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
                          <td>Active</td>
                          <td>
                            {/* <img src={DeleteIcon} alt="Delete" className="deleteImg" /> */}
                            <div className="del-btn" id="del3">
                              <img src={DeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del3"
                              className="general-popover delete-popover"
                            >
                              <PopoverBody className="d-flex">
                                <div className="del-big-icon">
                                  <img src={DelBigIcon} alt="del-icon" />
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
                            <button className="btnEditAction" id="edit-pop-3">
                              <label className="edit">EDIT</label>
                            </button>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="edit-pop-3"
                              className="general-popover delete-popover"
                              delay={tooltipDelay}
                              flip={editbool}
                            >
                              <PopoverBody className="d-flex">
                                <div>
                                  <div className="">
                                    <label className="popover-header-text">
                                      EDIT USER
                                    </label>
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Designation Name
                                    </label>
                                    <input
                                      type="text"
                                      className="txt-edit-popover"
                                      placeholder="Designation Name"
                                    />
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Brand Name
                                    </label>
                                    <input
                                      type="text"
                                      className="txt-edit-popover"
                                      placeholder="Brand Name"
                                    />
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Status
                                    </label>
                                    <select
                                      id="inputStatus"
                                      className="edit-dropDwon dropdown-setting"
                                    >
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
                        <tr>
                          <td>2342</td>
                          <td>Bata4</td>
                          <td>
                            Admin
                            <img
                              src={InfoImg}
                              className="info-icon"
                              alt="Info"
                              id="Supervisor"
                            />
                            <UncontrolledPopover
                              trigger="hover"
                              placement="bottom"
                              target="Supervisor"
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
                          <td>Inative</td>
                          <td>
                            {/* <img src={DeleteIcon} alt="Delete" className="deleteImg" /> */}
                            <div className="del-btn" id="del4">
                              <img src={DeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del4"
                              className="general-popover delete-popover"
                            >
                              <PopoverBody className="d-flex">
                                <div className="del-big-icon">
                                  <img src={DelBigIcon} alt="del-icon" />
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
                            <button className="btnEditAction" id="edit-pop-4">
                              <label className="edit">EDIT</label>
                            </button>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="edit-pop-4"
                              className="general-popover delete-popover"
                              delay={tooltipDelay}
                              flip={editbool}
                            >
                              <PopoverBody className="d-flex">
                                <div>
                                  <div className="">
                                    <label className="popover-header-text">
                                      EDIT USER
                                    </label>
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Designation Name
                                    </label>
                                    <input
                                      type="text"
                                      className="txt-edit-popover"
                                      placeholder="Designation Name"
                                    />
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Brand Name
                                    </label>
                                    <input
                                      type="text"
                                      className="txt-edit-popover"
                                      placeholder="Brand Name"
                                    />
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Status
                                    </label>
                                    <select
                                      id="inputStatus"
                                      className="edit-dropDwon dropdown-setting"
                                    >
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
                        <tr>
                          <td>4334</td>
                          <td>Bata5</td>
                          <td>
                            Admin
                            <img
                              src={InfoImg}
                              className="info-icon"
                              alt="Info"
                              id="Executive"
                            />
                            <UncontrolledPopover
                              trigger="hover"
                              placement="bottom"
                              target="Executive"
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
                          <td>Active</td>
                          <td>
                            {/* <img src={DeleteIcon} alt="Delete" className="deleteImg" /> */}
                            <div className="del-btn" id="del5">
                              <img src={DeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del5"
                              className="general-popover delete-popover"
                            >
                              <PopoverBody className="d-flex">
                                <div className="del-big-icon">
                                  <img src={DelBigIcon} alt="del-icon" />
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
                            <button className="btnEditAction" id="edit-pop-5">
                              <label className="edit">EDIT</label>
                            </button>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="edit-pop-5"
                              className="general-popover delete-popover"
                              delay={tooltipDelay}
                              flip={editbool}
                            >
                              <PopoverBody className="d-flex">
                                <div>
                                  <div className="">
                                    <label className="popover-header-text">
                                      EDIT USER
                                    </label>
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Designation Name
                                    </label>
                                    <input
                                      type="text"
                                      className="txt-edit-popover"
                                      placeholder="Designation Name"
                                    />
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Brand Name
                                    </label>
                                    <input
                                      type="text"
                                      className="txt-edit-popover"
                                      placeholder="Brand Name"
                                    />
                                  </div>
                                  <div className="pop-over-div">
                                    <label className="edit-label-1">
                                      Status
                                    </label>
                                    <select
                                      id="inputStatus"
                                      className="edit-dropDwon dropdown-setting"
                                    >
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
                    <div className="position-relative1">
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
                        <label className="create-department">
                          CREATE BRAND
                        </label>
                        <div className="div-padding-1">
                          <label className="designation-name">Brand Code</label>
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Enter Brand Code"
                          />
                        </div>
                        <div className="divSpace">
                          <div className="dropDrownSpace">
                            <label className="reports-to">Brand Name</label>
                            <input
                              type="text"
                              className="txt-1"
                              placeholder="Enter Brand Name"
                            />
                          </div>
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

export default Brands;

import React, { Component, Fragment } from 'react';
import TableArr from './../assets/Images/table-arr.png';
import RedDeleteIcon from "./../assets/Images/red-delete-icon.png";
import BlackDeleteIcon from "./../assets/Images/del-big.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import Demo from './../store/Hashtag';
import BlackInfoIcon from "./../assets/Images/Info-black.png";
import DelBigIcon from "./../assets/Images/del-big.png";
import FileUpload from "./../assets/Images/file.png";
import DelBlack from "./../assets/Images/del-black.png";
import UploadCancel from "./../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import { Link} from 'react-router-dom';

class SLATemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: ""
    };
  }

  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };
  render() {
    const editbool = false;
    const tooltipDelay = { show: 50, hide: 100 };
    return (
      <Fragment>
        <div className="breadcrumbs-row">
          <div className="container-fluid setting-title setting-breadcrumb">
            <Link to="settings">Settings</Link>
            <span>&gt;</span>
            <Link to={Demo.BLANK_LINK}>Ticketing</Link>
            <span>&gt;</span>
            <Link to={Demo.BLANK_LINK} className="active">
              SlaTemplate
          </Link>
          </div>
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
                          Function Name <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Priority Type <img src={TableArr} alt="table-arr" />
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
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            High,Medium,Low
                        </label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="sla-priority-1"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="sla-priority-1"
                            className="general-popover created-popover"
                            flip={true}
                          >
                            <PopoverBody>
                              <div>
                                <label className="slatargettext-1">
                                  SLA TARGETS
                              </label>
                              </div>
                              <div>
                                <label className="createhead-text-1">
                                  Priority
                              </label>
                                <label className="createhead-text-1">
                                  %SLA Breach
                              </label>
                                <label className="createhead-text-1">
                                  Respond
                              </label>
                                <label className="createhead-text-1">
                                  Resolve
                              </label>
                              </div>
                              <div>
                                <label className="createhead-text-2">High</label>
                                <label className="createhead-text-2">30%</label>
                                <label className="createhead-text-2">30M</label>
                                <label className="createhead-text-2">12H</label>
                              </div>
                              <div>
                                <label className="createhead-text-2">Low</label>
                                <label className="createhead-text-2">30%</label>
                                <label className="createhead-text-2">24H</label>
                                <label className="createhead-text-2">12H</label>
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
                            id="created-info-1"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created-info-1"
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
                              <div className="del-btn" id="del1">
                                <img src={RedDeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="del1"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
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
                                id="edit-pop-1"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                              </label>
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
                                        EDIT SLA
                                    </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Function name
                                    </label>
                                      <select className="pop-over-select">
                                        <option>Bata</option>
                                      </select>
                                    </div>

                                    <div className="pop-over-div">
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
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">
                            Bata
                        </label>
                        </td>
                        <td>
                          <label className="table-data-text">High,Medium,Low</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="sla-priority-2"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="sla-priority-2"
                            className="general-popover created-popover"
                            flip={true}
                          >
                            <PopoverBody>
                              <div>
                                <label className="slatargettext-1">
                                  SLA TARGETS
                              </label>
                              </div>
                              <div>
                                <label className="createhead-text-1">
                                  Priority
                              </label>
                                <label className="createhead-text-1">
                                  %SLA Breach
                              </label>
                                <label className="createhead-text-1">
                                  Respond
                              </label>
                                <label className="createhead-text-1">
                                  Resolve
                              </label>
                              </div>
                              <div>
                                <label className="createhead-text-2">High</label>
                                <label className="createhead-text-2">30%</label>
                                <label className="createhead-text-2">30M</label>
                                <label className="createhead-text-2">12H</label>
                              </div>
                              <div>
                                <label className="createhead-text-2">Low</label>
                                <label className="createhead-text-2">30%</label>
                                <label className="createhead-text-2">24H</label>
                                <label className="createhead-text-2">12H</label>
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
                            id="created-info-2"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created-info-2"
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
                              <div className="del-btn" id="sla-del2">
                                <img src={RedDeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="sla-del2"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
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
                                id="edit-pop-2"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                              </label>
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
                                        EDIT SLA
                                    </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Function name
                                    </label>
                                      <select className="pop-over-select">
                                        <option>Bata</option>
                                      </select>
                                    </div>

                                    <div className="pop-over-div">
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
              </div>
              <div className="col-md-4">
                <div className="store-col-2">
                  <div className="createSpace">
                    <label className="Create-store-text">CREATE SLA</label>
                    <div className="store-create-margin">
                      <div className="ro">
                        <label className="admin-create-lable-text">
                          Function Name
                      </label>
                      </div>
                      <div className="ro">
                        <select className="store-SLATemplate-select">
                          <option>Bata</option>
                          <option>Bata</option>
                        </select>
                      </div>
                    </div>

                    <div className="slatargetRow-3 ma">
                      <label className="createhead-text-new-1">Priority</label>
                      <label className="createhead-text-5">% SLA</label>
                      <label className="createhead-text-6">Resolve</label>
                    </div>
                    <div className="slatargetRow-3 ma">
                      <div className="sla-div">
                        <label className="createhead-text-1">High</label>
                      </div>
                      <div className="sla-div-4">
                        <div className="inner-div">
                          <input
                            type="text"
                            placeholder="30"
                            className="text-box-crt-sla"
                          />
                        </div>
                        <div className="inner-div-2-1">
                          <label className="pers-lable">%</label>
                        </div>
                      </div>
                      <div className="sla-div-5">
                        <div className="inner-div">
                          <input
                            type="text"
                            placeholder="30"
                            className="text-box-crt-sla"
                          />
                        </div>
                        <div className="inner-div-2">
                          {/* <label className="pers-lable">%</label> */}
                          <select className="pers-lable-select">
                            <option>M</option>
                            <option>H</option>
                            <option>D</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="slatargetRow-3 ma">
                      <div className="sla-div">
                        <label className="createhead-text-1">Medium</label>
                      </div>
                      <div className="sla-div-4">
                        <div className="inner-div">
                          <input
                            type="text"
                            placeholder="30"
                            className="text-box-crt-sla"
                          />
                        </div>
                        <div className="inner-div-2-1">
                          <label className="pers-lable">%</label>
                        </div>
                      </div>

                      <div className="sla-div-5">
                        <div className="inner-div">
                          <input
                            type="text"
                            placeholder="30"
                            className="text-box-crt-sla"
                          />
                        </div>
                        <div className="inner-div-2">
                          {/* <label className="pers-lable">%</label> */}
                          <select className="pers-lable-select">
                            <option>M</option>
                            <option>H</option>
                            <option>D</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="slatargetRow-3 ma">
                      <div className="sla-div">
                        <label className="createhead-text-1">Low</label>
                      </div>
                      <div className="sla-div-4">
                        <div className="inner-div">
                          <input
                            type="text"
                            placeholder="30"
                            className="text-box-crt-sla"
                          />
                        </div>
                        <div className="inner-div-2-1">
                          <label className="pers-lable">%</label>
                        </div>
                      </div>

                      <div className="sla-div-5">
                        <div className="inner-div">
                          <input
                            type="text"
                            placeholder="30"
                            className="text-box-crt-sla"
                          />
                        </div>
                        <div className="inner-div-2">
                          {/* <label className="pers-lable">%</label> */}
                          <select className="pers-lable-select">
                            <option>M</option>
                            <option>H</option>
                            <option>D</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="store-create-margin">
                      <div className="ro">
                        <label
                          className="admin-create-lable-text"
                          style={{ paddingTop: "20px" }}
                        >
                          Status
                      </label>
                      </div>
                      <div className="ro">
                        <select className="store-SLATemplate-select">
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>
                    <br />
                    <div className="store-create-margin">
                      <div className="ro">
                        <button className="store-create-button1">
                          <label className="store-create-button1-text">ADD</label>
                        </button>
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                </div>
                <br />
                <div className="store-col-2">
                  <div className="right-sect-div">
                    <br />
                    <h3>Bulk Upload</h3>
                    <input
                      id="file-upload"
                      className="file-upload d-none"
                      type="file"
                      onChange={this.fileUpload.bind(this)}
                    />
                    <label htmlFor="file-upload">
                      <div className="file-icon">
                        <img src={FileUpload} alt="file-upload" />
                      </div>
                      <span>Add File</span> or Drop File here
                    </label>
                    {this.state.fileName && (
                      <div className="file-info">
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name">{this.state.fileName}</p>
                            <div className="del-file" id="del-file-1">
                              <img src={DelBlack} alt="delete-black" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="auto"
                              target="del-file-1"
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
                          </div>
                          <div>
                            <span className="file-size">122.6kb</span>
                          </div>
                        </div>
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name">{this.state.fileName}</p>
                            <a className="file-retry" href={Demo.BLANK_LINK}>
                              Retry
                            </a>
                          </div>
                          <div>
                            <span className="file-failed">Failed</span>
                          </div>
                        </div>
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name pr-0">
                              {this.state.fileName}
                            </p>
                          </div>
                          <div>
                            <div className="d-flex align-items-center mt-2">
                              <ProgressBar className="file-progress" now={60} />
                              <div className="cancel-upload">
                                <img src={UploadCancel} alt="upload cancel" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <button className="butn">ADD</button>
                    <br />
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

export default SLATemplate;

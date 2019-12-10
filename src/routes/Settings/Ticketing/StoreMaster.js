import React, { Component } from "react";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";

import { UncontrolledPopover, PopoverBody } from "reactstrap";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import DownExcel from "./../../../assets/Images/csv.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import Demo from "./../../../store/Hashtag.js";
import { Link } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";

class StoreMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: ""
    };
  }

  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };
  fileDrop = e => {
    this.setState({ fileName: e.dataTransfer.files[0].name });
    e.preventDefault();
  };
  fileDragOver = e => {
    e.preventDefault();
  };
  fileDragEnter = e => {
    e.preventDefault();
  };

  render() {
    const dataTickStore = [
      {
        id: "S1"
      },
      {
        id: "S2"
      },
      {
        id: "S3"
      },
      {
        id: "S4"
      },
      {
        id: "S5"
      }
    ];

    const columnsTickStore = [
      {
        Header: (
          <span>
            Store Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "storeName",
        Cell: row => <span>Bata Store</span>
      },
      {
        Header: (
          <span>
            Store Code
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "storeCode",
        Cell: row => <span>12345</span>
      },
      {
        Header: (
          <span>
            Brand Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "brandName",
        Cell: row => <span>Bata</span>
      },
      {
        Header: (
          <span>
            City
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "city",
        Cell: row => <span>Gurgaon</span>
      },
      {
        Header: (
          <span>
            State
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "state",
        Cell: row => <span>Haryana</span>
      },
      {
        Header: (
          <span>
            Pincode
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "Pincode",
        Cell: row => <span>122007</span>
      },
      {
        Header: <span>Actions</span>,
        accessor: "actiondept",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <>
              <span>
                <Popover
                  content={ActionDelete}
                  placement="bottom"
                  trigger="click"
                >
                  <img
                    src={RedDeleteIcon}
                    alt="del-icon"
                    className="del-btn"
                    id={ids}
                  />
                </Popover>
                <Popover
                  content={ActionEditBtn}
                  placement="bottom"
                  trigger="click"
                >
                  <button className="react-tabel-button" id="p-edit-pop-2">
                    <label className="Table-action-edit-button-text">
                      EDIT
                    </label>
                  </button>
                </Popover>
              </span>
            </>
          );
        }
      }
    ];
    const ActionDelete = (
      <div className="d-flex general-popover popover-body">
        <div className="del-big-icon">
          <img src={DelBigIcon} alt="del-icon" />
        </div>
        <div>
          <p className="font-weight-bold blak-clr">Delete file?</p>
          <p className="mt-1 fs-12">
            Are you sure you want to delete this file?
          </p>
          <div className="del-can">
            <a href={Demo.BLANK_LINK}>CANCEL</a>
            <button className="butn">Delete</button>
          </div>
        </div>
      </div>
    );
    const ActionEditBtn = (
      <div className="edtpadding">
        <label className="Create-store-text">CREATE STORE</label>
        <div className="div-padding-1">
          <label className="designation-name">Brand</label>
          <select className="store-create-select">
            <option>Bata</option>
          </select>
        </div>
        <div className="div-padding-1">
          <label className="designation-name">Store Code</label>
          <input type="text" className="txt-1" placeholder="Enter Store Code" />
        </div>
        <div className="div-padding-1">
          <label className="designation-name">Store Name</label>
          <input type="text" className="txt-1" placeholder="Enter Bata Code" />
        </div>
        <div className="div-padding-1">
          <label className="designation-name">State</label>
          <select className="store-create-select">
            <option>Delhi</option>
          </select>
        </div>
        <div className="div-padding-1">
          <label className="designation-name">City</label>
          <select className="store-create-select">
            <option>Delhi</option>
          </select>
        </div>
        <div className="div-padding-1">
          <label className="designation-name">Pin Code</label>
          <input type="text" className="txt-1" placeholder="Enter Pin Code" />
        </div>
        <div className="div-padding-1">
          <label className="designation-name">Address</label>
          <textarea
            cols="31"
            rows="3"
            className="store-create-textarea"
            placeholder="Near Palm Court Bulilding,Sector 14 Gurgaon,Haryan"
          ></textarea>
        </div>
        <div className="div-padding-1">
          <label className="designation-name">Region</label>
          <select className="store-create-select">
            <option>Delhi</option>
          </select>
        </div>
        <div className="div-padding-1">
          <label className="designation-name">Zone</label>
          <select className="store-create-select">
            <option>North</option>
          </select>
        </div>
        <div className="div-padding-1">
          <label className="designation-name">Store Type</label>
          <select className="store-create-select">
            <option>Retail</option>
          </select>
        </div>
        <div className="div-padding-1">
          <label className="designation-name">Contact Details:Email</label>
          <input type="text" className="txt-1" placeholder="Enter Email Id" />
        </div>
        <div className="div-padding-1">
          <label className="designation-name">Contact Details:Phone</label>
          <input type="text" className="txt-1" placeholder="Enter Phone no" />
        </div>
        <div className="div-padding-1">
          <label className="designation-name">Status</label>
          <select className="store-create-select">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div>
          <label className="pop-over-cancle">CANCEL</label>
          <button className="pop-over-button">
            <label className="pop-over-btnsave-text">SAVE</label>
          </button>
        </div>
      </div>
    );

    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings">Settings</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK}>Ticketing</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active">
            Store Master
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketStoreReact">
                  <ReactTable
                    data={dataTickStore}
                    columns={columnsTickStore}
                    // resizable={false}
                    defaultPageSize={5}
                    showPagination={true}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="Create-store-text">CREATE STORE</label>
                    <div className="div-padding-1">
                      <label className="designation-name">Brand</label>
                      <select className="store-create-select">
                        <option>Bata</option>
                      </select>
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Store Code</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Store Code"
                      />
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Store Name</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Bata Code"
                      />
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">State</label>
                      <select className="store-create-select">
                        <option>Delhi</option>
                      </select>
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">City</label>
                      <select className="store-create-select">
                        <option>Delhi</option>
                      </select>
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Pin Code</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Pin Code"
                      />
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Address</label>
                      <textarea
                        cols="31"
                        rows="3"
                        className="store-create-textarea"
                        placeholder="Near Palm Court Bulilding,Sector 14 Gurgaon,Haryan"
                      ></textarea>
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Region</label>
                      <select className="store-create-select">
                        <option>Delhi</option>
                      </select>
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Zone</label>
                      <select className="store-create-select">
                        <option>North</option>
                      </select>
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Store Type</label>
                      <select className="store-create-select">
                        <option>Retail</option>
                      </select>
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        Contact Details:Email
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Email Id"
                      />
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        Contact Details:Phone
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Phone no"
                      />
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Status</label>
                      <select className="store-create-select">
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                    <div className="btnSpace">
                      <button className="addBtn-ticket-hierarchy">
                        <label className="addLable">ADD</label>
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="right-sect-div">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <h3 className="pb-0">Bulk Upload</h3>
                    <div className="down-excel">
                      <p>Template</p>
                      <a href={Demo.BLANK_LINK}>
                        <img src={DownExcel} alt="download icon" />
                      </a>
                    </div>
                  </div>
                  <input
                    id="file-upload"
                    className="file-upload d-none"
                    type="file"
                    onChange={this.fileUpload}
                  />
                  <label
                    htmlFor="file-upload"
                    onDrop={this.fileDrop}
                    onDragOver={this.fileDragOver}
                    onDragEnter={this.fileDragEnter}
                  >
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StoreMaster;

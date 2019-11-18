import React, { Component } from "react";
import TableArr from "./../../assets/Images/table-arr.png";
import InfoIcon from "./../../assets/Images/Info-black.png";
import Demo from "./../../store/Hashtag.js";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
class FileUploadLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="mainDivPadding">
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
            Ticketing
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            File Upload Logs
          </Link>
        </div>
        <br />
        <div className="fileUploadTable">
          <table>
            <thead>
              <tr>
                <th className="thRowSpace">
                  Type
                  <img src={TableArr} alt="table-arr" />
                </th>
                <th>
                  File Name
                  <img src={TableArr} alt="table-arr" />
                </th>
                <th className="thRowSpace">
                  Date
                  <img src={TableArr} alt="table-arr" />
                </th>
                <th>
                  Status
                  <img src={TableArr} alt="table-arr" />
                </th>
                <th>Error File</th>
                <th style={{ width: "10%" }}>Success File</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Users</td>
                <td>Users.xls</td>
                <td>
                  02-09-2019
                  <img
                    className="info-icon"
                    src={InfoIcon}
                    alt="info-icon"
                    id="Users"
                  />
                  <UncontrolledPopover
                    trigger="hover"
                    placement="bottom"
                    target="Users"
                    className="general-popover created-popover"
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 02-09-2019</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 02-09-2019</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                </td>
                <td>Inprogress</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>SLA</td>
                <td>SLA.csv</td>
                <td>
                  02-09-2019
                  <img
                    className="info-icon"
                    src={InfoIcon}
                    alt="info-icon"
                    id="SLA"
                  />
                  <UncontrolledPopover
                    trigger="hover"
                    placement="bottom"
                    target="SLA"
                    className="general-popover created-popover"
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 02-09-2019</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 02-09-2019</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                </td>
                <td>Completed</td>
                <td>
                  <button className="downloadBtn">
                    <label className="lblDownloadbtn">DOWNLOAD</label>
                  </button>
                </td>
                <td>
                  <button className="downloadBtn">
                    <label className="lblDownloadbtn">DOWNLOAD</label>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Category</td>
                <td>Category.xls</td>
                <td>
                  02-09-2019
                  <img
                    className="info-icon"
                    src={InfoIcon}
                    alt="info-icon"
                    id="Category"
                  />
                  <UncontrolledPopover
                    trigger="hover"
                    placement="bottom"
                    target="Category"
                    className="general-popover created-popover"
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 02-09-2019</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 02-09-2019</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                </td>
                <td>Completed</td>
                <td>
                  <button className="downloadBtn">
                    <label className="lblDownloadbtn">DOWNLOAD</label>
                  </button>
                </td>
                <td>
                  <button className="downloadBtn">
                    <label className="lblDownloadbtn">DOWNLOAD</label>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Store</td>
                <td>Store.xls</td>
                <td>
                  02-09-2019
                  <img
                    className="info-icon"
                    src={InfoIcon}
                    alt="info-icon"
                    id="Store"
                  />
                  <UncontrolledPopover
                    trigger="hover"
                    placement="bottom"
                    target="Store"
                    className="general-popover created-popover"
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 02-09-2019</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 02-09-2019</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                </td>
                <td>Completed</td>
                <td>
                  <button className="downloadBtn">
                    <label className="lblDownloadbtn">DOWNLOAD</label>
                  </button>
                </td>
                <td>
                  <button className="downloadBtn">
                    <label className="lblDownloadbtn">DOWNLOAD</label>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Item Master</td>
                <td>Item Master.xls</td>
                <td>
                  02-09-2019
                  <img
                    className="info-icon"
                    src={InfoIcon}
                    alt="info-icon"
                    id="ItemMaster"
                  />
                  <UncontrolledPopover
                    trigger="hover"
                    placement="bottom"
                    target="ItemMaster"
                    className="general-popover created-popover"
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 02-09-2019</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 02-09-2019</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                </td>
                <td>Completed</td>
                <td>
                  <button className="downloadBtn">
                    <label className="lblDownloadbtn">DOWNLOAD</label>
                  </button>
                </td>
                <td>
                  <button className="downloadBtn">
                    <label className="lblDownloadbtn">DOWNLOAD</label>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FileUploadLogs;

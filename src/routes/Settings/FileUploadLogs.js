import React, { Component } from "react";
import TableArr from "./../../assets/Images/table-arr.png";
import InfoIcon from "./../../assets/Images/Info-black.png";
class FileUploadLogs extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return (
      <div className="mainDivPadding">
        <div className="breadcrumbs-row">
          <div className="breadcrumbs-row-padding">
            <label className="settings-ticketing">Settings > Ticketing ></label>
            <label className="lblFileUpload"> &nbsp;File Upload Logs</label>
          </div>
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
                <th>Success File</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Users</td>
                <td>Users.xls</td>
                <td>
                  02-09-2019
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
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
                      />
                   
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
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
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
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
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
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
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

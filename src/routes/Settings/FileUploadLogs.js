import React, { Component } from "react";
import Demo from "./../../store/Hashtag.js";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import BlackInfoIcon from "./../../assets/Images/Info-black.png";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";

class FileUploadLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUploadLog: [],

    };

    this.handleGetFileUploadLog = this.handleGetFileUploadLog.bind(this);

  }

  componentDidMount() {
    this.handleGetFileUploadLog();
  }

  handleGetFileUploadLog() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/File/GetFileUploadLogs",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let fileUploadLog = res.data.responseData;
      if (fileUploadLog !== null && fileUploadLog !== undefined) {
        self.setState({ fileUploadLog });
      }
    });
  }

  render() {

    const columnsTickFileUpload = [
      {
        Header: (
          <span>
            Type
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "fileType"
      },
      {
        Header: (
          <span>
            File Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "fileName"
      },
      {
        Header: (
          <span>
            Date
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "date",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                {row.original.date}
                <Popover content={
                  <>
                  <div>
                    <b>
                      <p className="title">Created By: {row.original.createdBy}</p>
                    </b>
                    <p className="sub-title">Created Date: {row.original.createdDate}</p>
                  </div>
                  <div>
                    <b>
                      <p className="title">Updated By: {row.original.modifiedBy}</p>
                    </b>
                    <p className="sub-title">Updated Date: {row.original.modifiedDate}</p>
                  </div>
                </>
                } placement="bottom">
                  <img
                    className="info-icon-cp"
                    src={BlackInfoIcon}
                    alt="info-icon"
                    id={ids}
                  />
                </Popover>
              </span>
            </div>
          );
        }
      },
      {
        Header: (
          <span>
            Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "fileUploadStatus"
      },
      {
        Header: (
          <span>Error File</span>
        ),
        accessor: "Erroor",
        Cell: row => (
          <div>
            <button className="downloadBtn">
            DOWNLOAD
              {/* <label className="lblDownloadbtn">DOWNLOAD</label> */}
            </button>
          </div>
        ),
      },
      {
        Header: (
          <span>Success File</span>
        ),
        accessor: "success",
        Cell: row => (
          <div>
            <button className="downloadBtn">
            DOWNLOAD
              {/* <label className="lblDownloadbtn">DOWNLOAD</label> */}
            </button>
          </div>
        ),
      },
    ];
   

    return (
      <div className="mainDivPadding">
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            Ticketing
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            File Upload Logs
          </Link>
        </div>
        <br />
        <div className="fileUploadTable TicketFileUploadReact">
                  <ReactTable
                    data={this.state.fileUploadLog}
                    columns={columnsTickFileUpload}
                    // resizable={false}
                    defaultPageSize={5}
                    showPagination={false}
                  />
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
    );
  }
}

export default FileUploadLogs;

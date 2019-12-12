import React, { Component } from "react";
import Demo from "./../../store/Hashtag.js";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import BlackInfoIcon from "./../../assets/Images/Info-black.png";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
class FileUploadLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const dataTickFileUpload = [
      {
        id: "FU1",
        Type: (
          <span>User</span>
        ),
        fileName: (
          <span>User.xls</span>
        ),
        status: (
          <span>Inprogress</span>
        ),
      },
      {
        id: "FU2",
        Type: (
          <span>SLA</span>
        ),
        fileName: (
          <span>SLA.xls</span>
        ),
        status: (
          <span>Completed</span>
        ),
      },
      {
        id: "FU3",
        Type: (
          <span>Category</span>
        ),
        fileName: (
          <span>Category.xls</span>
        ),
        status: (
          <span>Completed</span>
        ),
      },
      {
        id: "FU4",
        Type: (
          <span>Store</span>
        ),
        fileName: (
          <span>Store.xls</span>
        ),
        status: (
          <span>Completed</span>
        ),
      },
      {
        id: "FU5",
        Type: (
          <span>ItemMaster</span>
        ),
        fileName: (
          <span>Item Master.xls</span>
        ),
        status: (
          <span>Completed</span>
        ),
      }
    ];

    const columnsTickFileUpload = [
      {
        Header: (
          <span>
            Type
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "Type"
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
        accessor: "Date",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                02-09-2019
                <Popover content={popoverData} placement="bottom">
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
        accessor: "status"
      },
      {
        Header: (
          <span>Error File</span>
        ),
        accessor: "Erroor",
        Cell: row => (
          <div>
            <button className="downloadBtn">
              <label className="lblDownloadbtn">DOWNLOAD</label>
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
              <label className="lblDownloadbtn">DOWNLOAD</label>
            </button>
          </div>
        ),
      },
    ];

    const popoverData = (
      <>
        <div>
          <b>
            <p className="title">Created By: Admin</p>
          </b>
          <p className="sub-title">Created Date: 12 March 2018</p>
        </div>
        <div>
          <b>
            <p className="title">Updated By: Manager</p>
          </b>
          <p className="sub-title">Updated Date: 12 March 2018</p>
        </div>
      </>
    );
   

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
        <div className="fileUploadTable TicketFileUploadReact">
                  <ReactTable
                    data={dataTickFileUpload}
                    columns={columnsTickFileUpload}
                    // resizable={false}
                    defaultPageSize={5}
                    showPagination={true}
                  />
        </div>
      </div>
    );
  }
}

export default FileUploadLogs;

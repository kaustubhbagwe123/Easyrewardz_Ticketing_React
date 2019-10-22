import React, { Component } from "react";
import ReactTable from "react-table";
import Demo from "../../../store/Hashtag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import InfoImg from "./../../../assets/Images/icons8-info.svg";
// import DeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
import BlackInfoIcon from './../../../assets/Images/Info-black.png';
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";


class Templates extends Component {
  render() {
    // const editbool = false;
    // const tooltipDelay = { show: 50, hide: 100 };
    const data = [
        {
          alertType: "Complaint Status",
          communicationMode: 12,
          createdBy: (
            <span>
              Admin
              <img
                className="info-icon-cp"
                src={BlackInfoIcon}
                alt="info-icon"
                id="created1"
              />
            </span>
          ),
          status: "Active",
          action: (
            <span>
              <img
                src={RedDeleteIcon}
                alt="del-icon"
                className="del-btn"
                id="TemplateDel1"
              />
              <button className="react-tabel-button" id="p-edit-pop-2">
                <label className="Table-action-edit-button-text">EDIT</label>
              </button>
            </span>
          )
        },
        {
          alertType: "Complaint Status",
          communicationMode: 10,
          createdBy: (
            <span>
              Admin
              <img
                className="info-icon-cp"
                src={BlackInfoIcon}
                alt="info-icon"
                id="created2"
              />
            </span>
          ),
          status: "Inactive",
          action: (
            <span>
              <img
                src={RedDeleteIcon}
                alt="del-icon"
                className="del-btn"
                id="TemplateDel2"
              />
              <button className="react-tabel-button" id="p-edit-pop-2">
                <label className="Table-action-edit-button-text">EDIT</label>
              </button>
            </span>
          )
        },
        {
          alertType: "Complaint Status",
          communicationMode: 12,
          createdBy: (
            <span>
              Admin
              <img
                className="info-icon-cp"
                src={BlackInfoIcon}
                alt="info-icon"
                id="created3"
              />
            </span>
          ),
          status: "Active",
          action: (
            <span>
              <img
                src={RedDeleteIcon}
                alt="del-icon"
                className="del-btn"
                id="TemplateDel3"
              />
              <button className="react-tabel-button" id="p-edit-pop-2">
                <label className="Table-action-edit-button-text">EDIT</label>
              </button>
            </span>
          )
        },
        {
          alertType: "Complaint Status",
          communicationMode: 10,
          createdBy: (
            <span>
              Admin
              <img
                className="info-icon-cp"
                src={BlackInfoIcon}
                alt="info-icon"
                id="Template4"
              />
            </span>
          ),
          status: "Inactive",
          action: (
            <span>
              <img
                src={RedDeleteIcon}
                alt="del-icon"
                className="del-btn"
                id="TemplateDel4"
              />
              <button className="react-tabel-button" id="p-edit-pop-2">
                <label className="Table-action-edit-button-text">EDIT</label>
              </button>
            </span>
          )
        },
        {
          alertType: "Complaint Status",
          communicationMode: 12,
          createdBy: (
            <span>
              Admin
              <img
                className="info-icon-cp"
                src={BlackInfoIcon}
                alt="info-icon"
                id="created5"
              />
            </span>
          ),
          status: "Active",
          action: (
            <span>
              <img
                src={RedDeleteIcon}
                alt="del-icon"
                className="del-btn"
                id="TemplateDel5"
              />
              <button className="react-tabel-button" id="p-edit-pop-2">
                <label className="Table-action-edit-button-text">EDIT</label>
              </button>
            </span>
          )
        }
      ];
  
      const columns = [
        {
          Header: (
            <span>
              Name
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
          ),
          accessor: "alertType"
        },
        {
          Header: (
            <span>
                Issue Type
                <FontAwesomeIcon icon={faCaretDown} />
            </span>
          ),
          accessor: "communicationMode",
          Cell: props => <span className="number">{props.value}</span>
        },
        {
          id: "createdBy",
          Header: (
            <span>
              Created by
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
          ),
          accessor: "createdBy"
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
          Header: "Actions",
          accessor: "action",
          sortable: false
        //   className:"action-template"
        }
      ];
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings">Settings</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK}>Ticketing</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active">
            Templates
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height template-table">
                  <ReactTable
                    data={data}
                    columns={columns}
                    resizable={false}
                    defaultPageSize={5}
                    showPagination={true}
                  />
                  <UncontrolledPopover
                    trigger="hover"
                    placement="bottom"
                    target="created1"
                    className="general-popover created-popover"
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 12 March 2018</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 12 March 2018</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="hover"
                    placement="auto"
                    target="created2"
                    className="general-popover created-popover"
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 12 March 2018</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 12 March 2018</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="hover"
                    placement="auto"
                    target="created3"
                    className="general-popover created-popover"
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 12 March 2018</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 12 March 2018</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="hover"
                    placement="bottom"
                    target="Template4"
                    className="general-popover created-popover"
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 12 March 2018</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 12 March 2018</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="hover"
                    placement="auto"
                    target="created5"
                    className="general-popover created-popover"
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 12 March 2018</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 12 March 2018</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="bottom"
                    target="TemplateDel1"
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
                      CREATE TEMPLATES
                    </label>
                    <div className="div-padding-1">
                      <label className="designation-name">Name</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Issue Type</label>
                        <select
                          id="inputState"
                          className="form-control dropdown-setting"
                        >
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Status</label>
                        <select
                          id="inputState"
                          className="form-control dropdown-setting"
                        >
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="btnSpace">
                      <button className="CreateADDBtn">
                        <label className="addLable">CONFIGURE TEMPLATE</label>
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

export default Templates;

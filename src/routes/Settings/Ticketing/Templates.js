import React, { Component } from "react";
import ReactTable from "react-table";
import Demo from "../../../store/Hashtag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoImg from "./../../../assets/Images/icons8-info.svg";
// import DeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
// import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Popover } from "antd";
import { Link } from "react-router-dom";
// import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import DeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import CancelImg from "./../../../assets/Images/Circle-cancel.png";
import CKEditor from "react-ckeditor-component";
import Modal from "react-bootstrap/Modal";

class Templates extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      ConfigTabsModal: false
    }
  }
  handleConfigureTabsOpen(){
    this.setState({ConfigTabsModal:true})
  }
  handleConfigureTabsClose(){
    this.setState({ConfigTabsModal:false})
  }
  render() {
    const data = [
      {
        id: "A1",
        alertType: "Complaint Status",
        communicationMode: 12,
        status: "Active"
      },
      {
        id: "B1",
        alertType: "Complaint Status",
        communicationMode: 10,
        status: "Inactive"
      },
      {
        id: "C1",
        alertType: "Complaint Status",
        communicationMode: 12,
        status: "Active"
      },
      {
        id: "D1",
        alertType: "Complaint Status",
        communicationMode: 10,
        status: "Inactive"
      },
      {
        id: "E1",
        alertType: "Complaint Status",
        communicationMode: 12,
        status: "Active"
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
        Cell: row => {
          var ids = row.original["id"];
          return (
            <>
              <span>
                Admin
                <Popover content={popoverData} placement="bottom">
                  <img
                    src={InfoImg}
                    className="info-icon"
                    alt="Info"
                    id={ids}
                  />
                </Popover>
              </span>
            </>
          );
        }
        // accessor: "createdBy"
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
        Cell: row => {
          var ids = row.original["id"];
          return (
            <>
              <span>
                <Popover content={ActionDelete} placement="bottom" trigger="click">
                  <img
                    src={DeleteIcon}
                    alt="del-icon"
                    className="del-btn"
                    id={ids}
                  />
                </Popover>
                <Popover content={ActionEditBtn} placement="bottom" trigger="click">
                  <button className="react-tabel-button" id="p-edit-pop-2">
                    <label className="Table-action-edit-button-text">
                      EDIT
                    </label>
                  </button>
                </Popover>
              </span>
            </>
          );
        },
        Header: "Actions",
        sortable: false
        //   className:"action-template",
      }
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
        <div className="">
          <label className="popover-header-text">EDIT TEMPLATES</label>
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Name</label>
          <input
            type="text"
            className="txt-edit-popover"
            placeholder="Enter Name"
            maxLength={25}
          />
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Issue Type</label>
          <select id="inputStatus" className="edit-dropDwon dropdown-setting">
            <option>Select</option>
            <option>Admin</option>
          </select>
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Status</label>
          <select id="inputStatus" className="edit-dropDwon dropdown-setting">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <br />
        <div>
        <a className="pop-over-cancle" href={Demo.BLANK_LINK}>CANCEL</a>
          <button className="pop-over-button">
            <label className="pop-over-btnsave-text">SAVE</label>
          </button>
        </div>
      </div>
    );
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">Settings</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">Ticketing</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path active">
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
                    // resizable={false}
                    defaultPageSize={5}
                    showPagination={false}
                  />
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
                        maxLength={25}
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
                      <button className="CreateADDBtn" 
                      onClick={this.handleConfigureTabsOpen.bind(this)}
                      >
                        <label className="addLable">CONFIGURE TEMPLATE</label>
                      </button>
                      <Modal
                          size="lg"
                          show={this.state.ConfigTabsModal}
                          onHide={this.handleConfigureTabsClose.bind(this)}
                      >
                    <Modal.Header>
                      <div className="row config-tab">
                      <div className="col-md-9 templateName">
                        <label className="template-text">TEMPLATE NAME : COMPLAINT STATUS</label>
                      </div>
                      <div className="col-md-3">
                          <img src={CancelImg} alt="CancelImg" className="cancelImg-config"
                          onClick={this.handleConfigureTabsClose.bind(this)}/> 
                      </div>
                      </div>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="template-editor">
                        <CKEditor
                                
                                content={this.state.content}
                                events={{
                                  // "blur": this.onBlur,
                                  // "afterPaste": this.afterPaste,
                                  change: this.onChange,
                                  items: this.fileUpload
                                }}
                        />
                      </div>
                      <div className="config-button">
                              <button className="config-buttontext" type="submit">
                                SAVE & NEXT
                              </button>
                      </div>
                    </Modal.Body>
                  </Modal>

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

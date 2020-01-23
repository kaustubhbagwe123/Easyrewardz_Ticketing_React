import React, { Component } from "react";
import { Link } from "react-router-dom";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import Demo from "../../../store/Hashtag.js";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";

class CreateSLA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      sla: [],
    };

    this.handleGetSLA = this.handleGetSLA.bind(this);
  }

  componentDidMount() {
    this.handleGetSLA();
  }

  handleGetSLA() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/GetSLA",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let sla = res.data.responseData;
      if (sla !== null && sla !== undefined) {
        self.setState({ sla });
      }
    });
  }

  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };
  render() {
    const dataTickSla = [
      {
        id: "Sl1",
        IssueType: <span>Broken Shoes</span>,

        status: <span>Active</span>
      },
      {
        id: "Sl2",
        IssueType: <span>Delay in Delivery</span>,

        status: <span>Inactive</span>
      }
    ];

    const columnsTickSla = [
      {
        Header: (
          <span>
            Issue Type
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "issueTpeName"
      },
      {
        Header: (
          <span>
            SLA by Priority
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "slaTarget",
        Cell: row => {
          debugger;
          var ids = row.original["id"];
          let slaTarget = row.original.slaTarget, priorityNameComma = '', priorityName = '';
          for (let i = 0; i < slaTarget.length; i++) {
            priorityNameComma += slaTarget[i].priorityName + ',';
          }
          priorityName = priorityNameComma.substring(0, priorityNameComma.length-1);
          return (
            <div>
              <span>
                <label>{priorityName}</label>
                {priorityName.length > 0 ? <Popover content={
                  <div className="general-popover created-popover">
                  <div>
                    <label className="slatargettext-1">SLA TARGETS</label>
                  </div>
                  <div>
                    <label className="createhead-text-1">Priority</label>
                    <label className="createhead-text-1">%SLA</label>
                    <label className="createhead-text-1">Respond</label>
                    <label className="createhead-text-1">Resolve</label>
                  </div>
                  {slaTarget !== null &&
                    slaTarget.map((item, i) => (
                      <div key={i}>
                        <label className="slatemp-textpopup-1">{item.priorityName}</label>
                        <label className="slatemp-textpopup-1">{item.slaBreachPercent}</label>
                        <label className="slatemp-textpopup-1">{item.priorityRespond}</label>
                        <label className="slatemp-textpopup-1">{item.priorityResolution}</label>
                      </div>
                    ))}
                </div>
                } placement="bottom">
                  <img
                    className="info-icon"
                    src={BlackInfoIcon}
                    alt="info-icon"
                    id={ids}
                  />
                </Popover> : ''}
              </span>
            </div>
          );
        }
      },
      {
        Header: (
          <span>
            Created By
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "createdBy",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
              {row.original.createdBy}
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
        accessor: "isSLAActive"
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
    const SlaType = (
      <div className="general-popover created-popover">
        <div>
          <label className="slatargettext-1">SLA TARGETS</label>
        </div>
        <div>
          <label className="createhead-text-1">Priority</label>
          <label className="createhead-text-1">%SLA</label>
          <label className="createhead-text-1">Respond</label>
          <label className="createhead-text-1">Resolve</label>
        </div>
        <div>
          <label className="slatemp-textpopup-1">High</label>
          <label className="slatemp-textpopup-1">30%</label>
          <label className="slatemp-textpopup-1">30M</label>
          <label className="slatemp-textpopup-1">30M</label>
        </div>
        <div>
          <label className="slatemp-textpopup-1">Medium</label>
          <label className="slatemp-textpopup-1">30%</label>
          <label className="slatemp-textpopup-1">30M</label>
          <label className="slatemp-textpopup-1">30M</label>
        </div>
        <div>
          <label className="slatemp-textpopup-1">Low</label>
          <label className="slatemp-textpopup-1">30%</label>
          <label className="slatemp-textpopup-1">30M</label>
          <label className="slatemp-textpopup-1">30M</label>
        </div>
      </div>
    );

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
          <label className="popover-header-text">EDIT SLA</label>
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Issue Type</label>
          <select id="inputStatus" className="edit-dropDwon dropdown-setting">
            <option>Broken Shoes</option>
            <option>Delay in Delivery</option>
            <option>Broken Shoes</option>
          </select>
        </div>

        <div className="pop-over-div m-t-10">
          <div>
            <label className="slatargettext-1">SLA TARGETS</label>
          </div>
          <div>
            <label className="createhead-text-1">Priority</label>
            <label className="createhead-text-1">%SLA</label>
            <label className="createhead-text-1">Respond</label>
            <label className="createhead-text-1">Resolve</label>
          </div>
          <div>
            <label className="slatemp-textpopup-1">High</label>
            <label className="slatemp-textpopup-1">30%</label>
            <label className="slatemp-textpopup-1">30M</label>
            <label className="slatemp-textpopup-1">30M</label>
          </div>
          <div>
            <label className="slatemp-textpopup-1">Medium</label>
            <label className="slatemp-textpopup-1">30%</label>
            <label className="slatemp-textpopup-1">30M</label>
            <label className="slatemp-textpopup-1">30M</label>
          </div>
          <div>
            <label className="slatemp-textpopup-1">Low</label>
            <label className="slatemp-textpopup-1">30%</label>
            <label className="slatemp-textpopup-1">30M</label>
            <label className="slatemp-textpopup-1">30M</label>
          </div>
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
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
            Ticketing
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            SLA
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketSlaReact">
                  <ReactTable
                    data={this.state.sla}
                    columns={columnsTickSla}
                    // resizable={false}
                    defaultPageSize={10}
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
              <div className="col-md-4">
                <div className="store-col-2">
                  <div className="createSpace">
                    <label className="Create-store-text">CREATE SLA</label>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Issue Type</label>
                        <select id="inputState" className="store-create-select">
                          <option>Broken Shoe</option>
                          <option>Delay in Delivery</option>
                        </select>
                      </div>
                    </div>
                    <div className="slatargetRow">
                      <label className="slatargettext">SLA Targets</label>
                    </div>
                    <div className="slatargetRow-1">
                      <label className="createhead-text-new">Priority</label>
                      <label className="createhead-text">
                        %SLA <br /> Breach
                      </label>
                      <label className="createhead-text">Rerspond</label>
                      <label className="createhead-text">Resolve</label>
                    </div>
                    <div className="slatargetRow-1">
                      <div className="sla-div">
                        <label className="createhead-text-1">High</label>
                      </div>
                      <div className="sla-div-1">
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
                      <div className="sla-div-1">
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
                      <div className="sla-div-1">
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
                    <div className="slatargetRow-1">
                      <div className="sla-div">
                        <label className="createhead-text-1">Medium</label>
                      </div>
                      <div className="sla-div-1">
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
                      <div className="sla-div-1">
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
                      <div className="sla-div-1">
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
                    <div className="slatargetRow-1">
                      <div className="sla-div">
                        <label className="createhead-text-1">Low</label>
                      </div>
                      <div className="sla-div-1">
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
                      <div className="sla-div-1">
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
                      <div className="sla-div-1">
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
                    <div className="divSpace-3">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Status</label>
                        <select className="store-create-select">
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="btnSpace">
                      <button className="addBtn-ticket-hierarchy">
                        <label className="addLable">ADD</label>
                      </button>
                    </div>
                  </div>
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
      </React.Fragment>
    );
  }
}
export default CreateSLA;

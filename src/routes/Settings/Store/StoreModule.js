import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { Popover } from "antd";
import ReactTable from "react-table";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DelBlack from "./../../../assets/Images/del-black.png";
import DownExcel from "./../../../assets/Images/csv.png";
import FileUpload from "./../../../assets/Images/file.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import { NotificationManager } from "react-notifications";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

class StoreModule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      maxAttachSize: [],
      fileFormat: [],
      selectedMaxAttachSize: "0",
      selectedFileFormat: "0",
      maxAttachSizeCompulsion: "",
      fileFormatCompulsion: "",
      claimTabLoading: false,
      campaignScriptData: [],
    };

    this.handleClaimTabData = this.handleClaimTabData.bind(this);
    this.handleCampaignScriptGridData = this.handleCampaignScriptGridData.bind(
      this
    );
  }
  fileUpload = (e) => {
    this.setState({ fileName: e.target.files[0].name });
  };
  fileDrop = (e) => {
    this.setState({ fileName: e.dataTransfer.files[0].name });
    e.preventDefault();
  };
  fileDragOver = (e) => {
    e.preventDefault();
  };
  fileDragEnter = (e) => {
    e.preventDefault();
  };

  componentDidMount() {
    this.handleClaimTabData();
    this.handleCampaignScriptGridData();
  }

  setClaimTabData = (e) => {
    debugger;
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleClaimTabData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/ModuleSetting/GetStoreAttachmentSettings",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success" && data) {
          self.setState({
            maxAttachSize: data.arrachementSizeList,
            fileFormat: data.storeAttachmentFileFormatList,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleCampaignScriptGridData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/ModuleSetting/GetCampaignScript",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success" && data) {
          self.setState({
            campaignScriptData: data,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAttachmentSave() {
    debugger;
    if (
      parseInt(this.state.selectedMaxAttachSize) != 0 &&
      parseInt(this.state.selectedFileFormat) != 0
    ) {
      let self = this;
      this.setState({
        claimTabLoading: true,
      });

      // save attachment settings
      axios({
        method: "post",
        url: config.apiUrl + "/ModuleSetting/ModifyStoreAttachmentSettings",
        headers: authHeader(),
        data: {
          AttachmentSize: this.state.selectedMaxAttachSize,
          FileFomatID: this.state.selectedFileFormat,
        },
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success("Attachment saved successfully.");
            self.setState({
              selectedMaxAttachSize: "0",
              selectedFileFormat: "0",
              maxAttachSizeCompulsion: "",
              fileFormatCompulsion: "",
              claimTabLoading: false,
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        maxAttachSizeCompulsion: "Please select max attachment size",
        fileFormatCompulsion: "Please select file format",
      });
    }
  }

  render() {
    const data = [
      {
        id: "A1",
        campaignName: "Birthday",
        status: "Active",
      },
      {
        id: "A2",
        campaignName: "Anniversary",
        status: "Inactive",
      },
      {
        id: "A3",
        campaignName: "EOSS",
        status: "Active",
      },
      {
        id: "A4",
        campaignName: "SOSS",
        status: "Inactive",
      },
    ];

    const columns = [
      {
        Header: (
          <span className="table-column">
            Campaign Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "campaignName",
      },
      {
        Header: "Campaign Script",
        // accessor: "campaignScript",
        className: "communication-labelHeader",
        sortable: false,
        Cell: (row) => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                Dear Mr./Mrs. We wish you...
                <Popover content={CampaignWish} placement="bottom">
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
        },
      },
      {
        id: "createdBy",
        Header: (
          <span className="table-column">
            Created by
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        Cell: (row) => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                Admin
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
        },
        // accessor: "createdBy"
      },
      {
        Header: (
          <span className="table-column">
            Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "status",
      },
      {
        Header: "Actions",
        // accessor: "action",
        sortable: false,
        Cell: (row) => {
          var ids = row.original["id"];
          return (
            <>
              <span>
                <Popover content={ActionDelete} placement="bottom">
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
                  <button
                    className="react-tabel-button editre"
                    id="p-edit-pop-2"
                  >
                    EDIT
                  </button>
                </Popover>
              </span>
            </>
          );
        },
      },
    ];

    const CampaignWish = (
      <div className="store-popDiv">
        <label className="storePop-lbl">
          Dear Mr./Mrs. We wish you <br /> Happy Birthday!
        </label>
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
          <label className="popover-header-text">EDIT CAMPAIGN SCRIPT</label>
        </div>
        <div className=" pop-over-div">
          <label className="pop-over-lbl-text"> Campaign Name</label>
          <select className="pop-over-select">
            <option>Birthday</option>
            <option>Anniversary</option>
          </select>
        </div>
        <div className="div-cntr">
          <label className="pop-over-lbl-text">Script Details</label>
          <textarea className="stort-textArea" rows="4"></textarea>
        </div>

        <br />
        <div>
          <a className="pop-over-cancle" href={Demo.BLANK_LINK}>
            CANCEL
          </a>
          <button className="pop-over-button">SAVE</button>
        </div>
      </div>
    );
    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/admin/settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/admin/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            Store
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            Modules
          </Link>
        </div>

        <div className="Store-paddmodule storeModule">
          <div className="module-tabs">
            <section>
              <Tabs>
                <Tab label="Claim">
                  <div style={{ height: "100vh" }} className="chatallowedStore">
                    <div className="row">
                      <div className="col-md-4 chatallowed">
                        <label className="claimtab-lbl">
                          Attachment Settings
                        </label>
                        <label className="claimTab-DDl">
                          Maximum Attachment Size
                        </label>
                        <select
                          name="selectedMaxAttachSize"
                          value={this.state.selectedMaxAttachSize}
                          onChange={this.setClaimTabData}
                        >
                          <option value={0}>Select Size</option>
                          {this.state.maxAttachSize !== null &&
                            this.state.maxAttachSize.map((item, i) => (
                              <option key={i} value={item.numb}>
                                {item.numbMB}
                              </option>
                            ))}
                        </select>
                        {parseInt(this.state.selectedMaxAttachSize) == 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.maxAttachSizeCompulsion}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row claim-mgn">
                      <div className="col-md-3 chatallowed">
                        <label className="claimTab-DDl">File Format</label>
                        <select
                          name="selectedFileFormat"
                          value={this.state.selectedFileFormat}
                          onChange={this.setClaimTabData}
                        >
                          <option value={0}>Select File Format</option>
                          {this.state.fileFormat !== null &&
                            this.state.fileFormat.map((item, i) => (
                              <option key={i} value={item.formatID}>
                                {item.fileFormaName}
                              </option>
                            ))}
                        </select>
                        {parseInt(this.state.selectedFileFormat) == 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.fileFormatCompulsion}
                          </p>
                        )}
                        <div className="btn-store mt-4">
                          <button
                            className="Schedulenext1"
                            onClick={this.handleAttachmentSave.bind(this)}
                            disabled={this.state.claimTabLoading}
                          >
                            {this.state.claimTabLoading ? (
                              <FontAwesomeIcon
                                className="circular-loader"
                                icon={faCircleNotch}
                                spin
                              />
                            ) : (
                              ""
                            )}
                            SAVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab label="Campaign Script">
                  {/* <div className="container-fluid"> */}
                  <div className="store-mdl backNone">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="table-cntr table-height alertsTable">
                          <ReactTable
                            data={this.state.campaignScriptData}
                            columns={[
                              {
                                Header: (
                                  <span className="table-column">
                                    Campaign Name
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "campaignName",
                              },
                              {
                                Header: "Campaign Script",
                                accessor: "campaignScriptLess",
                                className: "communication-labelHeader",
                                sortable: false,
                                Cell: (row) => {
                                  var ids = row.original["id"];
                                  return (
                                    <div>
                                      <span>
                                        {row.original.campaignScriptLess}
                                        <Popover
                                          content={
                                            <div className="store-popDiv">
                                              <label className="storePop-lbl">
                                                {row.original.campaignScript}
                                              </label>
                                            </div>
                                          }
                                          placement="bottom"
                                        >
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
                                },
                              },
                              {
                                id: "createdBy",
                                Header: (
                                  <span className="table-column">
                                    Created by
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                Cell: (row) => {
                                  var ids = row.original["id"];
                                  return (
                                    <div>
                                      <span>
                                        {row.original.createdBy}
                                        <Popover
                                          content={
                                            <>
                                              <div>
                                                <b>
                                                  <p className="title">
                                                    Created By:{" "}
                                                    {row.original.createdBy}
                                                  </p>
                                                </b>
                                                <p className="sub-title">
                                                  Created Date:{" "}
                                                  {row.original.createdOn}
                                                </p>
                                              </div>
                                              <div>
                                                <b>
                                                  <p className="title">
                                                    Updated By:{" "}
                                                    {row.original.modifiedBy}
                                                  </p>
                                                </b>
                                                <p className="sub-title">
                                                  Updated Date:{" "}
                                                  {row.original.modifiedOn}
                                                </p>
                                              </div>
                                            </>
                                          }
                                          placement="bottom"
                                        >
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
                                },
                                // accessor: "createdBy"
                              },
                              {
                                Header: (
                                  <span className="table-column">
                                    Status
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "status",
                                Cell: (row) => {
                                  return row.original.status
                                    ? "Active"
                                    : "Inactive";
                                },
                              },
                              {
                                Header: "Actions",
                                // accessor: "action",
                                sortable: false,
                                Cell: (row) => {
                                  var ids = row.original["id"];
                                  return (
                                    <>
                                      <span>
                                        <Popover
                                          content={
                                            <div className="d-flex general-popover popover-body">
                                              <div className="del-big-icon">
                                                <img
                                                  src={DelBigIcon}
                                                  alt="del-icon"
                                                />
                                              </div>
                                              <div>
                                                <p className="font-weight-bold blak-clr">
                                                  Delete file?
                                                </p>
                                                <p className="mt-1 fs-12">
                                                  Are you sure you want to
                                                  delete this file?
                                                </p>
                                                <div className="del-can">
                                                  <a href={Demo.BLANK_LINK}>
                                                    CANCEL
                                                  </a>
                                                  <button className="butn">
                                                    Delete
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          }
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
                                          content={
                                            <div className="edtpadding">
                                              <div className="">
                                                <label className="popover-header-text">
                                                  EDIT CAMPAIGN SCRIPT
                                                </label>
                                              </div>
                                              <div className=" pop-over-div">
                                                <label className="pop-over-lbl-text">
                                                  {" "}
                                                  Campaign Name
                                                </label>
                                                <select className="pop-over-select">
                                                  <option>Birthday</option>
                                                  <option>Anniversary</option>
                                                </select>
                                              </div>
                                              <div className="div-cntr">
                                                <label className="pop-over-lbl-text">
                                                  Script Details
                                                </label>
                                                <textarea
                                                  className="stort-textArea"
                                                  rows="4"
                                                ></textarea>
                                              </div>

                                              <br />
                                              <div>
                                                <a
                                                  className="pop-over-cancle"
                                                  href={Demo.BLANK_LINK}
                                                >
                                                  CANCEL
                                                </a>
                                                <button className="pop-over-button">
                                                  SAVE
                                                </button>
                                              </div>
                                            </div>
                                          }
                                          placement="bottom"
                                          trigger="click"
                                        >
                                          <button
                                            className="react-tabel-button editre"
                                            id="p-edit-pop-2"
                                          >
                                            EDIT
                                          </button>
                                        </Popover>
                                      </span>
                                    </>
                                  );
                                },
                              },
                            ]}
                            // resizable={false}
                            defaultPageSize={5}
                            showPagination={true}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="right-sect-div">
                          <h3>Create CAMPAIGN SCRIPT</h3>
                          <div className="div-cntr">
                            <label>Campaign Name</label>
                            <select>
                              <option>Birthday</option>
                              <option>Anniversary</option>
                            </select>
                          </div>

                          <div className="div-cntr">
                            <label>Script Details</label>
                            <textarea
                              className="stort-textArea"
                              rows="7"
                            ></textarea>
                          </div>
                          <button className="butn">ADD</button>
                        </div>
                        <div className="right-sect-div">
                          <div className="d-flex justify-content-between align-items-center pb-2">
                            <h3 className="pb-0">Bulk Upload</h3>
                            <div className="down-excel">
                              <p>Template</p>
                              <a href={Demo.BLANK_LINK}>
                                <img
                                  src={DownExcel}
                                  alt="download icon"
                                  className="storeImg-dwn"
                                />
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
                                  <p className="file-name">
                                    {this.state.fileName}
                                  </p>
                                  <div className="del-file" id="del-file-1">
                                    <img src={DelBlack} alt="delete-black" />
                                  </div>
                                </div>
                                <div>
                                  <span className="file-size">122.6kb</span>
                                </div>
                              </div>
                              <div className="file-cntr">
                                <div className="file-dtls">
                                  <p className="file-name">
                                    {this.state.fileName}
                                  </p>
                                  <a
                                    className="file-retry"
                                    href={Demo.BLANK_LINK}
                                  >
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
                              </div>
                            </div>
                          )}
                          <button className="butn">ADD</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </Tab>
              </Tabs>
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default StoreModule;

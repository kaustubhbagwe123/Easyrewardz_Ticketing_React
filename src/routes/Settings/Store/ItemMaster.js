import Demo from "./../../../store/Hashtag.js";
import React, { Component } from "react";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import DownExcel from "./../../../assets/Images/csv.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import Dropzone from "react-dropzone";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import axios from "axios";
import config from "./../../../helpers/config";
import { authHeader } from "../../../helpers/authHeader";

class ItemMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      itemData: [],
      file: {},
      fileValidation: "",
      isErrorBulkUpload: false,
      isShowProgress: false
    };

    this.handleGetItem = this.handleGetItem.bind(this);
  }

  componentDidMount() {
    this.handleGetItem();
  }
  fileUpload = file => {
    debugger;
    if (file) {
      var fileName = file[0].name;
      var fileSize = formatSizeUnits(file[0].size);
      this.setState({
        fileName,
        fileSize,
        file: file[0],
        fileValidation: ""
      });
    }
  };

  fileDragOver = e => {
    e.preventDefault();
  };
  fileDragEnter = e => {
    e.preventDefault();
  };
  ////handel get item data
  handleGetItem() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Item/GetItem",
      headers: authHeader()
    })
      .then(response => {
        var status = response.data.status;
        var itemData = response.data.responseData;

        if (status && itemData.lenght > 0) {
          self.setState(itemData);
        } else {
        }
      })
      .catch(response => {
        console.log(response);
      });
  }
  handleBulkUpload() {
    let self = this;
    if (this.state.file) {
      const formData = new FormData();
      formData.append("file", this.state.file);
      axios({
        method: "post",
        url: config.apiUrl + "/Item/BulkUploadItem",
        headers: authHeader(),
        data: formData
      })
        .then(response => {
          var status = response.data.status;
          var itemData = response.data.responseData;
          if (status && itemData.lenght > 0) {
            self.setState(itemData);
            self.setState({ isErrorBulkUpload: false });
          } else {
            self.setState({ isErrorBulkUpload: true });
          }
        })
        .catch(response => {
          self.setState({ isErrorBulkUpload: true });
          console.log(response);
        });
    } else {
      this.setState({ fileValidation: "Please Select File." });
    }
  }
  DeleteBulkUploadFile = () => {
    debugger;
    this.setState({
      file: {},
      fileName: "",
      fileSize: "",
      isErrorBulkUpload: false,
      isShowProgress: false
    });
    NotificationManager.success("File deleted successfully.");
  };
  render() {
   
    return (
      <React.Fragment>
        <NotificationContainer />
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/admin/settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
            Store
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            Item Master
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr item-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height StoreItemMasterReact">
                  <ReactTable
                    data={this.state.itemData}
                    columns={[
                      {
                        Header: (
                          <span>
                            Brand Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "brandName"
                      },
                      {
                        Header: (
                          <span>
                            Item Code
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "itemCode"
                      },
                      {
                        Header: (
                          <span>
                            Item Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "itemName"
                      },
                      {
                        Header: (
                          <span>
                            Department Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "depatName"
                      },
                      {
                        Header: (
                          <span>
                            Item Cat
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "itemCat"
                      },
                      {
                        Header: (
                          <span>
                            Item Sub Cat
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "itemSubCat"
                      },
                      {
                        Header: (
                          <span>
                            Item Group
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "itemGroup"
                      }
                    ]}
                    defaultPageSize={10}
                    minRows={2}
                    showPagination={true}
                  />
                </div>
              </div>
              <div className="col-md-4">
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
                  <div className="mainfileUpload">
                    <Dropzone onDrop={this.fileUpload}>
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input
                            {...getInputProps()}
                            className="file-upload d-none"
                          />
                          <div className="file-icon">
                            <img src={FileUpload} alt="file-upload" />
                          </div>
                          <span className={"fileupload-span"}>Add File</span> or
                          Drop File here
                        </div>
                      )}
                    </Dropzone>
                  </div>

                  {this.state.fileValidation ? (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.fileValidation}
                    </p>
                  ) : null}
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
                                  <button
                                    className="butn"
                                    onClick={this.DeleteBulkUploadFile}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                        <div>
                          <span className="file-size">
                            {this.state.fileSize}
                          </span>
                        </div>
                      </div>
                      {this.state.isErrorBulkUpload ? (
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name">{this.state.fileName}</p>
                            <span
                              className="file-retry"
                              onClick={this.handleBulkUpload.bind(this)}
                            >
                              Retry
                            </span>
                          </div>
                          <div>
                            <span className="file-failed">Failed</span>
                          </div>
                        </div>
                      ) : null}
                      {this.state.isShowProgress ? (
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
                      ) : null}
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

export default ItemMaster;
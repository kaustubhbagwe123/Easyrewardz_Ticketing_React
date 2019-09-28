import Demo from "./../../../store/Hashtag.js";
import TableArr from "./../../../assets/Images/table-arr.png";
import React, { Component } from "react";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import DownExcel from "./../../../assets/Images/csv.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import { UncontrolledPopover, PopoverBody } from "reactstrap";

class ItemMaster extends Component {
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
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <a href={Demo.BLANK_LINK}>Settings</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK}>Store</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="active">
            Item Master
          </a>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr item-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height">
                  <div className="scroll-table">
                    <table>
                      <thead>
                        <tr>
                          <th>
                            Brand Name <img src={TableArr} alt="table-arr" />
                          </th>
                          <th>
                            Item Code <img src={TableArr} alt="table-arr" />
                          </th>
                          <th>
                            Item Name <img src={TableArr} alt="table-arr" />
                          </th>
                          <th>
                            Department Name{" "}
                            <img src={TableArr} alt="table-arr" />
                          </th>
                          <th>
                            Item Cat <img src={TableArr} alt="table-arr" />
                          </th>
                          <th>
                            Item Sub Cat <img src={TableArr} alt="table-arr" />
                          </th>
                          <th>
                            Item Group <img src={TableArr} alt="table-arr" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Bata</td>
                          <td>12345</td>
                          <td>White Sneakers</td>
                          <td>Casual Shoes</td>
                          <td>Shoes</td>
                          <td>Casual Shoes</td>
                          <td>Shoes</td>
                        </tr>
                        <tr>
                          <td>Bata</td>
                          <td>12345</td>
                          <td>White Sneakers</td>
                          <td>Casual Shoes</td>
                          <td>Shoes</td>
                          <td>Casual Shoes</td>
                          <td>Shoes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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

export default ItemMaster;
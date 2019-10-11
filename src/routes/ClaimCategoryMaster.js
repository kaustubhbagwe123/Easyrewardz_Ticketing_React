import React,{Component} from 'react';
import TableArr from "./../assets/Images/table-arr.png"
import RedDeleteIcon from "./../assets/Images/red-delete-icon.png";
import BlackDeleteIcon from "./../assets/Images/del-big.png";
// import UploadIcon from "./../../assets/Images/clip.png";
import BlackInfoIcon from "./../assets/Images/Info-black.png";
import { UncontrolledPopover , PopoverBody } from "reactstrap";
import Demo from './../store/Hashtag';
import DelBigIcon from "./../assets/Images/del-big.png";
import FileUpload from "./../assets/Images/file.png";
import DelBlack from "./../assets/Images/del-black.png";
import UploadCancel from "./../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";

class ClaimCategoryMaster extends Component{
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      catmulti:false
    };
  }

  HandleMultiSelect(){
    this.setState({ catmulti: true });
  }
  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };

  render() {
    const editbool = false;
    const tooltipDelay = { show: 50, hide: 100 };
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <a href="settings">Settings</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK}>Store</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="active">
            Claim Category Master
          </a>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height claim-tableData">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          Brand Name <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Claim Category <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Claim Sub Cat <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Claim Issue type{" "}
                          <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Status <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Exchange</label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Defective article
                          </label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Broken Shoes
                          </label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created-info-1"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created-info-1"
                            className="general-popover created-popover"
                            flip={true}
                          >
                            <PopoverBody>
                              <div>
                                <p className="title">
                                  Claim Issue type: Active
                                </p>
                                <p className="sub-title">Broken Shoes</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <label className="table-data-text">Active</label>
                        </td>
                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="del1">
                                <img src={RedDeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="del1"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                              >
                                <PopoverBody className="d-flex">
                                  <div className="del-big-icon">
                                    <img src={BlackDeleteIcon} alt="del-icon" />
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
                            <div className="list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-1"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="edit-pop-1"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT CLAIM CATEGORY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Brand Name
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Bata</option>
                                      </select>
                                    </div>
                                    <div className="pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Refund</option>
                                      </select>
                                    </div>
                                    <div className="pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Sub Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Defective Article</option>
                                      </select>
                                    </div>
                                    <div className="pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Issue Type
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Broken Shoes</option>
                                      </select>
                                    </div>

                                    <div className="pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Refund</label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Defective article
                          </label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Broken Shoes
                          </label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="claimIssue-2"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="claimIssue-2"
                            className="general-popover created-popover"
                            flip={true}
                          >
                            <PopoverBody>
                              <div>
                                <p className="title">
                                  Claim Issue type: Inactive
                                </p>
                                <p className="sub-title">Broken Shoes</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>

                        <td>
                          <label className="table-data-text">Inactive</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="del2">
                                <img src={RedDeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="del2"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                              >
                                <PopoverBody className="d-flex">
                                  <div className="del-big-icon">
                                    <img src={BlackDeleteIcon} alt="del-icon" />
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
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-2"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="edit-pop-2"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT Claim CATEGORY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Brand Name
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Bata</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Exchange</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Sub Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Defective Article</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Issue Type
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Broken Shoes</option>
                                      </select>
                                    </div>

                                    <div className="pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Exchange</label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Defective article
                          </label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Broken Shoes
                          </label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="claimIssue-3"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="claimIssue-3"
                            className="general-popover created-popover"
                            flip={true}
                          >
                            <PopoverBody>
                              <div>
                                <p className="title">
                                  Claim Issue type: Active
                                </p>
                                <p className="sub-title">Broken Shoes</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>

                        <td>
                          <label className="table-data-text">Active</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="del3">
                                <img src={RedDeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="del3"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                              >
                                <PopoverBody className="d-flex">
                                  <div className="del-big-icon">
                                    <img src={BlackDeleteIcon} alt="del-icon" />
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
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-3"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="edit-pop-3"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT Claim CATEGORY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Brand Name
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Bata</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Exchange</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Sub Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Defective Article</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Issue Type
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Broken Shoes</option>
                                      </select>
                                    </div>

                                    <div className="pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Exchange</label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Defective article
                          </label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Broken Shoes
                          </label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="claimIssue-4"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="claimIssue-4"
                            className="general-popover created-popover"
                            flip={true}
                          >
                            <PopoverBody>
                              <div>
                                <p className="title">
                                  Claim Issue type: Inactive
                                </p>
                                <p className="sub-title">Broken Shoes</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>

                        <td>
                          <label className="table-data-text">Inactive</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="del4">
                                <img src={RedDeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="del4"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                              >
                                <PopoverBody className="d-flex">
                                  <div className="del-big-icon">
                                    <img src={BlackDeleteIcon} alt="del-icon" />
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
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-4"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="edit-pop-4"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT Claim CATEGORY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Brand Name
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Bata</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Exchange</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Sub Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Defective Article</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Issue Type
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Broken Shoes</option>
                                      </select>
                                    </div>

                                    <div className="pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Exchange</label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Defective article
                          </label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Broken Shoes
                          </label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="claimIssue-5"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="claimIssue-5"
                            className="general-popover created-popover"
                            flip={true}
                          >
                            <PopoverBody>
                              <div>
                                <p className="title">
                                  Claim Issue type: Active
                                </p>
                                <p className="sub-title">Broken Shoes</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>

                        <td>
                          <label className="table-data-text">Active</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="del5">
                                <img src={RedDeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="del5"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                              >
                                <PopoverBody className="d-flex">
                                  <div className="del-big-icon">
                                    <img src={BlackDeleteIcon} alt="del-icon" />
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
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-5"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="edit-pop-5"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT Claim CATEGORY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Brand Name
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Bata</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Exchange</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Sub Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Defective Article</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Claim Issue Type
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Broken Shoes</option>
                                      </select>
                                    </div>

                                    <div className="pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                    <label className="Create-store-text">
                      CREATE CLAIM CATEGORY
                    </label>
                    <div className="dropDrownSpace">
                      <label className="reports-to">Brand Name</label>
                      <select id="inputState" className="store-create-select">
                        <option>Bata</option>
                      </select>
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">Claim Category</label>
                      <select id="inputState" className="store-create-select">
                      <option>Complaint</option>
                        <option>Complaint</option>
                        <option>Complaint</option>
                      </select>
                    </div>

                     <div className="dropDrownSpace">
                      <label className="reports-to">Claim Sub Category</label>
                      <select id="inputState" className="store-create-select">
                        <option>Defective Article</option>
                      </select>
                    </div>
                     <div className="dropDrownSpace">
                      <label className="reports-to">Claim Issue Type</label>
                      <select id="inputState" className="store-create-select">
                        <option>Broken Shoes</option>
                      </select>
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

export default ClaimCategoryMaster;
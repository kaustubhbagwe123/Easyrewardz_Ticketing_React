import React, { Component } from "react";
import TableArr from "./../../assets/Images/table-arr.png";
import RedDeleteIcon from "./../../assets/Images/red-delete-icon.png";
import BlackDeleteIcon from "./../../assets/Images/del-big.png";
// import UploadIcon from "./../../assets/Images/clip.png";
// import CrossIcon from "./../../assets/Images/cross-icon.png";
import { UncontrolledPopover , PopoverBody } from "reactstrap";
import Demo from "../../store/Hashtag.js";
import DelBigIcon from "./../../assets/Images/del-big.png";
import FileUpload from "./../../assets/Images/file.png";
import DelBlack from "./../../assets/Images/del-black.png";
import UploadCancel from "./../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
 
 

 
 

 
class CategoryMaster extends Component {
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
      <>
        <div className="breadcrumbs-row">
          <div className="breadcrumbs-row-padding">
            <label className="settings-ticketing">Settings > Ticketing ></label>
            <label className="storemaster-text">&nbsp;Category Master</label>
          </div>
        </div>
        <br />
        <div className="bottom-margin-class">
          <div className="row">
            <div className="store-col-1 category-master-table ctr-mst">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      Brand Name <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Category <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Sub Category <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Issue Type <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Status <img src={TableArr} alt="table-arr" />
                    </th>

                    {/* <th></th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label className="table-data-text">Bata</label>
                    </td>
                    <td>
                      <label className="table-data-text">Complaint</label>
                    </td>
                    <td>
                      <label className="table-data-text">
                        Defective article
                      </label>
                    </td>
                    <td>
                      <label className="table-data-text">Broken Shoes</label>
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
                        <div className=" list-edit-button-margin btn-del-pop">
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
                                    EDIT CATEGORY
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
                                    Category
                                  </label>
                                  <select className="pop-over-select">
                                    <option>Complaint</option>
                                  </select>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Sub Category
                                  </label>
                                  <select className="pop-over-select">
                                    <option>Defective Article</option>
                                  </select>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Issue Type
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
                      <label className="table-data-text">Complaint</label>
                    </td>
                    <td>
                      <label className="table-data-text">
                        Defective article
                      </label>
                    </td>
                    <td>
                      <label className="table-data-text">Broken Shoes</label>
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
                                    EDIT CATEGORY
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
                                    Category
                                  </label>
                                  <select className="pop-over-select">
                                    <option>Complaint</option>
                                  </select>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Sub Category
                                  </label>
                                  <select className="pop-over-select">
                                    <option>Defective Article</option>
                                  </select>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Issue Type
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
                      <label className="table-data-text">Complaint</label>
                    </td>
                    <td>
                      <label className="table-data-text">
                        Defective article
                      </label>
                    </td>
                    <td>
                      <label className="table-data-text">Broken Shoes</label>
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
                                    EDIT CATEGORY
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
                                    Category
                                  </label>
                                  <select className="pop-over-select">
                                    <option>Complaint</option>
                                  </select>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Sub Category
                                  </label>
                                  <select className="pop-over-select">
                                    <option>Defective Article</option>
                                  </select>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Issue Type
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
                      <label className="table-data-text">Complaint</label>
                    </td>
                    <td>
                      <label className="table-data-text">
                        Defective article
                      </label>
                    </td>
                    <td>
                      <label className="table-data-text">Broken Shoes</label>
                    </td>

                    <td>
                      <label className="table-data-text">Inative</label>
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
                                    EDIT CATEGORY
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
                                    Category
                                  </label>
                                  <select className="pop-over-select">
                                    <option>Complaint</option>
                                  </select>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Sub Category
                                  </label>
                                  <select className="pop-over-select">
                                    <option>Defective Article</option>
                                  </select>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Issue Type
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
                      <label className="table-data-text">Complaint</label>
                    </td>
                    <td>
                      <label className="table-data-text">
                        Defective article
                      </label>
                    </td>
                    <td>
                      <label className="table-data-text">Broken Shoes</label>
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
                                    EDIT CATEGORY
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
                                    Category
                                  </label>
                                  <select className="pop-over-select">
                                    <option>Complaint</option>
                                  </select>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Sub Category
                                  </label>
                                  <select className="pop-over-select">
                                    <option>Defective Article</option>
                                  </select>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Issue Type
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
            <div>
              <div className="store-col-2">
                <br />
                <div className="row">
                  <label className="Create-store-text">CREATE CATEGORY</label>
                </div>
                <br />
                <div className="row">
                  <label className="store-create-lable-text">Brand Name</label>
                </div>
                <div className="row">
                  <select className="store-create-select">
                    <option>Bata</option>
                  </select>
                </div>
                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">Category</label>
                  </div>
                  <div className="row">
                    <select className="store-create-select" >
                      <option>Complaint</option>
                      <option>Complaint</option>
                      <option>Complaint</option>
                    </select>
                    {/* <div className="category-multiple-cm">
                      <div className="searchbox-cat-cm">
                        <input type="text" className="searchtext-cm" placeholder="Search"/>
                        <label className="search-add">+Add</label>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">
                      Sub Category
                    </label>
                  </div>
                  <div className="row">
                    <select className="store-create-select">
                      <option>Defective Article</option>
                    </select>
                  </div>
                </div>
                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">
                      Issue Type
                    </label>
                  </div>
                  <div className="row">
                    <select className="store-create-select">
                      <option>Broken Shoes</option>
                    </select>
                  </div>
                </div>
                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">Status</label>
                  </div>
                  <div className="row">
                    <select className="store-create-select">
                      <option>Active</option>
                    </select>
                  </div>
                </div>

                <br />
                <div className="store-create-margin">
                  <div className="row">
                    <button className="store-create-button">
                      <label className="store-create-button-text">ADD</label>
                    </button>
                  </div>
                </div>
                <br />
                <br />
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
      </>
    );
  }
}

export default CategoryMaster;

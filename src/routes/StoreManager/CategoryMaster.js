import React, { Component } from "react";
import TableArr from "./../../assets/Images/table-arr.png";
import RedDeleteIcon from "./../../assets/Images/red-delete-icon.png";
import BlackDeleteIcon from "./../../assets/Images/del-big.png";
import UploadIcon from "./../../assets/Images/clip.png";
import CrossIcon from "./../../assets/Images/cross-icon.png";
import { UncontrolledPopover , PopoverBody } from "reactstrap";
import Demo from "../../store/Hashtag.js";
 
 

 
class CategoryMaster extends Component {

  constructor(props) {
    super(props);

    this.DeleteToggle = this.DeleteToggle.bind(this);
    this.state = {
      deletePopoverOpen: false
    };
  }

  DeleteToggle() {
    this.setState({
      deletePopoverOpen: !this.state.deletePopoverOpen
    });
  }

  render() {
    const editbool=false;
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
                    <select className="store-create-select">
                      <option>Complaint</option>
                    </select>
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
                <br />
                <div className="row">
                  <label className="Create-store-text">BULK UPLOAD</label>
                </div>
                <div className="store-create-margin">
                  <div className="row rectangle-upload">
                    <div className="upload-icon-center">
                      <img
                        src={UploadIcon}
                        alt="upload-icon"
                        className="upload-icon"
                      />
                    </div>

                    <div className="row upload-add-text">
                      Add File &nbsp;
                      <span className="upload-add-text1">
                        or Drop File here
                      </span>
                    </div>
                  </div>
                </div>
                <div className="store-create-margin">
                  <div className="row">
                    <div className="store-create-oval"></div>
                    <div className="store-upload-details-div">
                      <label className="store-upload-details-text">
                        Chat agent user type file.CSV
                      </label>
                      <div className="upload-file-memory">
                        <span>122.6kb</span>
                      </div>
                    </div>
                    <div className="store-upload-details-div-2">
                      <img
                        src={BlackDeleteIcon}
                        alt="delete-icon"
                        className="store-icons-8-delete"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="store-create-oval"></div>
                    <div className="store-upload-details-div">
                      <label className="store-upload-details-text">
                        Supervisor type file.CSV
                      </label>
                      <div className="file-upload-faild-text">
                        <span>Faild</span>
                      </div>
                    </div>
                    <div className="store-upload-details-div-4">
                      <label className="file-upload-retry-text">Retry</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="store-create-oval"></div>
                    <div className="store-upload-details-div">
                      <label className="store-upload-details-text">
                        Chat agent 25 Oct type file.CSV
                      </label>
                      <div className="file-upload-progress">
                        <div className="file-upload-progress-status"></div>
                      </div>
                    </div>
                    <div className="store-upload-details-div-3">
                      <img
                        src={CrossIcon}
                        alt="cross-icon"
                        className="store-create-cross-icon"
                      />
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
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CategoryMaster;

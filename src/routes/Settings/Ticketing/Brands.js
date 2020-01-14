import React, { Component } from "react";
import Demo from "../../../store/Hashtag";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { Link } from "react-router-dom";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";

class Brands extends Component {
  
  render() {
    const dataTickBrand = [
      {
        id: "U1",
        BrandCode: <span>1234</span>,
        BrandName: <span>Bata1</span>,
        status: <span>Active</span>
      },
      {
        id: "U2",
        BrandCode: <span>3243</span>,
        BrandName: <span>Bata2</span>,
        status: <span>Inactive</span>
      },
      {
        id: "U3",
        BrandCode: <span>3242</span>,
        BrandName: <span>Bata3</span>,
        status: <span>Active</span>
      },
      {
        id: "U4",
        BrandCode: <span>2342</span>,
        BrandName: <span>Bata4</span>,
        status: <span>Inactive</span>
      },
      {
        id: "U5",
        BrandCode: <span>4334</span>,
        BrandName: <span>Bata5</span>,
        status: <span>Active</span>
      }
    ];

    const columnsTickBrand = [
      {
        Header: (
          <span>
            Brand Code
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "BrandCode"
      },
      {
        Header: (
          <span>
            Brand Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "BrandName"
      },
      {
        Header: (
          <span>
            Brand Added By
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "BrandAd",
        Cell: row => {
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
          <label className="popover-header-text">EDIT BRAND</label>
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Brand Code</label>
          <input
            type="text"
            className="txt-edit-popover"
            placeholder="Enter Brand Code"
            maxLength={10}
           
          />
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Brand Name</label>
          <input
            type="text"
            className="txt-edit-popover"
            placeholder="Enter Brand Name"
            maxLength={25}
          
          />
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
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
            Ticketing
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            Brands
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketBrandReact">
                  <ReactTable
                    data={dataTickBrand}
                    columns={columnsTickBrand}
                    // resizable={false}
                    defaultPageSize={5}
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
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="create-department">CREATE BRAND</label>
                    <div className="div-padding-1">
                      <label className="designation-name">Brand Code</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Brand Code"
                        maxLength={10}
                  
                      />
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Brand Name</label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enter Brand Name"
                          maxLength={25}
                     
                        />
                      </div>
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">Status</label>
                      <select id="inputState"
                        className="form-control dropdown-setting">
                    
                    
                        <option>select</option>
                        <option>Active</option>
                        <option>Deactive</option>
                      </select>
                    </div>
                    <div className="btnSpace">
                   
                      <button className="CreateADDBtn">
                        <label className="addLable">ADD</label>
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

export default Brands;

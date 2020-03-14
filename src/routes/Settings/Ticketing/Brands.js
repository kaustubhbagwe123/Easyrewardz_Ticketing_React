import React, { Component, useState } from "react";
import Demo from "../../../store/Hashtag";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { Link } from "react-router-dom";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import config from "../../../helpers/config";
import axios from "axios";
import { authHeader } from "../../../helpers/authHeader";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import ActiveStatus from "../../activeStatus";
import Modal from "react-responsive-modal";
import Sorting from "./../../../assets/Images/sorting.png";
//import useForm from "./useForm";

// const stateSchema = {
//   brandCode: { value: '', error: '' },
//   brandName: { value: '', error: '' },
//   status: { value: '', error: '' },
// };

// const validationStateSchema = {
//   brandCode: {
//     required: true,
//     validator: {
//       regEx: /^[a-zA-Z]+$/,
//       error: 'Invalid first name format.',
//     },
//   },
//   brandName: {
//     required: true,
//     validator: {
//       regEx: /^[a-zA-Z]+$/,
//       error: 'Invalid last name format.',
//     },
//   },
//   status: {
//     required: true,
//     validator: {
//       regEx: /^(,?\w{3,})+$/,
//       error: 'Invalid tag format.',
//     },
//   },
// };
// function onSubmitForm(state) {
//   alert(JSON.stringify(state, null, 2));
// }
// const { state, handleOnChange, handleOnSubmit, disable } = useForm(
//   stateSchema,
//   validationStateSchema,
//   onSubmitForm
// );

const MyButton = props => {
  const { children } = props;
  return (
    <div style={{ cursor: "pointer" }} {...props}>
      <button className="react-tabel-button" id="p-edit-pop-2">
        <label className="Table-action-edit-button-text">{children}</label>
      </button>
    </div>
  );
};

const Content = props => {
  debugger;
  const { rowData } = props;
  const [brandCode, setbrandCodeValue] = useState(rowData.brandCode);
  const [brandName, setbrandNameValue] = useState(rowData.brandName);
  const [status, setStatusValue] = useState(rowData.status);
  const [brandID] = useState(rowData.brandID);

  props.callBackEdit(brandCode, brandName, status, rowData);
  return (
    <div className="edtpadding">
      <label className="popover-header-text">EDIT BRAND</label>
      <div className="pop-over-div">
        <label className="edit-label-1">Brand Code</label>
        <input
          type="text"
          className="txt-edit-popover"
          placeholder="Enter Brand Code"
          maxLength={10}
          name="brand_Code"
          value={brandCode}
          onChange={e => setbrandCodeValue(e.target.value)}
        />
        {brandCode === "" && (
          <p style={{ color: "red", marginBottom: "0px" }}>
            {props.editbrandcodeCompulsion}
          </p>
        )}
        {/* {state.brandCode.error && <p style={{ color: "red", marginBottom: "0px" }}>{state.brandCode.error}</p>} */}
      </div>
      <div className="pop-over-div">
        <label className="edit-label-1">Brand Name</label>
        <input
          type="text"
          className="txt-edit-popover"
          placeholder="Enter Brand Name"
          maxLength={25}
          name="brand_name"
          value={brandName}
          onChange={e => setbrandNameValue(e.target.value)}
        />
        {brandName === "" && (
          <p style={{ color: "red", marginBottom: "0px" }}>
            {props.editbrandnameCompulsion}
          </p>
        )}
      </div>
      <div className="pop-over-div">
        <label className="edit-label-1">Status</label>
        <select
          className="edit-dropDwon dropdown-setting"
          name="brand_status"
          value={status}
          onChange={e => setStatusValue(e.target.value)}
        >
          <option>select</option>
          {props.activeData !== null &&
            props.activeData.map((item, j) => (
              <option key={j} value={item.ActiveID}>
                {item.ActiveName}
              </option>
            ))}
        </select>
        {status === "select" && (
          <p style={{ color: "red", marginBottom: "0px" }}>
            {props.editstatusCompulsion}
          </p>
        )}
      </div>
      <br />
      <div>
        <a className="pop-over-cancle" href={Demo.BLANK_LINK}>
          CANCEL
        </a>
        <button
          className="pop-over-button"
          //type="button"
          // onClick={this.handleUpdateData.bind(
          //   this

          // )}
          onClick={e => {
            props.handleUpdateData(e, brandID);
          }}
        >
          SAVE
          {/* <label className="pop-over-btnsave-text" onClick={(e) => { props.handleUpdateData(e, brandID) }}>SAVE</label> */}
        </button>
      </div>
    </div>
  );
};
class Brands extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brandData: [],
      brandEditData: {},
      brand_Code: "",
      brand_name: "",
      selectedStatus: 0,
      loading: false,
      activeData: ActiveStatus(),
      brandcodeCompulsion: "",
      brandnameCompulsion: "",
      statusCompulsion: "",
      StatusModel: false,
      sortColumn: "",
      sortAllData: [],
      sortBrandCode: [],
      sortBrandName: [],
      updateBrandCode: "",
      updateBrandName: "",
      updateStatus: "",
      rowData: {},
      editbrandcodeCompulsion: "Please enter brand code.",
      editbrandnameCompulsion: "Please enter brand name.",
      editstatusCompulsion: "Please select status.",
      brandcodeColor:"",
      brandnameColor:""
    };
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
  }
  hide(e, id) {
    debugger;
    // document.getElementById(id).style.display="none";
    document.getElementById(
      id
    ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
      "none";
  }
  show(e, id) {
    debugger;
    if (document.getElementById(id))
      // document.getElementById(id).style.display="block";
      document.getElementById(
        id
      ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
        "block";
  }
  componentDidMount() {
    this.handleGetBrandList();
  }

  callBackEdit = (brandCode, brandName, status, rowData) => {
    debugger;
    // this.setState({RoleName,updateRoleisActive:Status})
    this.state.updateBrandCode = brandCode;
    this.state.updateBrandName = brandName;
    this.state.updateStatus = status;
    this.state.rowData = rowData;
  };
  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.brandData;

    itemsArray.sort(function(a, b) {
      return a.ticketStatus > b.ticketStatus ? 1 : -1;
    });

    this.setState({
      brandData: itemsArray
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.brandData;
    itemsArray.sort((a, b) => {
      return a.ticketStatus < b.ticketStatus;
    });
    this.setState({
      brandData: itemsArray
    });
    this.StatusCloseModel();
  }

  StatusOpenModel(data) {
    debugger;

    this.setState({ StatusModel: true, sortColumn: data });
  }
  StatusCloseModel() {
    this.setState({ StatusModel: false });
  }

  setSortCheckStatus = (column, e) => {
    debugger;

    var itemsArray = [];
    var data = e.currentTarget.value;
    this.setState({
      brandcodeColor:"",
      brandnameColor:""
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "brandCode") {
      this.state.brandData = this.state.sortAllData;
      itemsArray = this.state.brandData.filter(a => a.brandCode === data);
      this.setState({
        brandcodeColor:"sort-column"
      
      });
    } else if (column === "brandName") {
      this.state.brandData = this.state.sortAllData;
      itemsArray = this.state.brandData.filter(a => a.brandName === data);
      this.setState({
        brandnameColor:"sort-column"
      
      });
    }

    this.setState({
      brandData: itemsArray
    });
    this.StatusCloseModel();
  };
  handleBrandOnchange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleActiveStatus = e => {
    let value = e.target.value;
    this.setState({ selectedStatus: value });
  };
  handleOnChangeData = e => {
    debugger;
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.brandEditData;
    data[name] = value;

    this.setState({
      brandEditTemp: data
    });
  };

  handleGetBrandList() {
    debugger;
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/BrandList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;

      if (status === "Success") {
        self.setState({
          brandData: data,
          loading: false
        });
      } else {
        self.setState({
          brandData: [],
          loading: false
        });
      }

      if (data !== null) {
        self.state.sortAllData = data;
        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].brandCode] && data[i].brandCode !== "") {
            distinct.push(data[i].brandCode);
            unique[data[i].brandCode] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortBrandCode.push({ brandCode: distinct[i] });
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].brandName] && data[i].brandName !== "") {
            distinct.push(data[i].brandName);
            unique[data[i].brandName] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortBrandName.push({ brandName: distinct[i] });
        }
      }

      
    }).catch(data => {
      console.log(data);
      });
  }
  handleSubmitData() {
    debugger;
    if (
      this.state.brand_Code.length > 0 &&
      this.state.brand_name.length > 0 &&
      this.state.selectedStatus !== 0
    ) {
      let self = this;
      var activeStatus = 0;
      var status = this.state.selectedStatus;
      if (status === "Active") {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }
      axios({
        method: "post",
        url: config.apiUrl + "/Brand/AddBrand",
        headers: authHeader(),
        data: {
          BrandCode: this.state.brand_Code.trim(),
          BrandName: this.state.brand_name.trim(),
          IsActive: activeStatus
        }
      }).then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetBrandList();
          NotificationManager.success("Brand Added successfully.");
          self.setState({
            brand_Code: "",
            brand_name: "",
            selectedStatus: 0,
            brandcodeCompulsion: "",
            brandnameCompulsion: "",
            statusCompulsion: ""
          });
        }
      }).catch(data => {
        console.log(data);
        });
    } else {
      this.setState({
        brandcodeCompulsion: "Please Enter Brand Code",
        brandnameCompulsion: "Please Enter Brand Name",
        statusCompulsion: "Please Select Status"
      });
    }
  }
  handleDeleteBrandData(brand_Id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/DeleteBrand",
      headers: authHeader(),
      params: {
        BrandID: brand_Id
      }
    }).then(function(res) {
      debugger;
      let status = res.data.statusCode;
      if (status === 1010) {
        self.handleGetBrandList();
        NotificationManager.success("Brand delete successfully.");
      } else {
        NotificationManager.error(res.data.message);
      }
    }).catch(data => {
      console.log(data);
      });
  }
  handleUpdateData(e, brandID) {
    debugger;
    if (
      this.state.updateBrandCode.length > 0 &&
      this.state.updateBrandCode.length > 0 &&
      this.state.updateStatus !== "select"
    ) {
      let self = this;
      var activeStatus = 0;

      if (self.state.updateStatus === "Active") {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }
      axios({
        method: "post",
        url: config.apiUrl + "/Brand/UpdateBrand",
        headers: authHeader(),
        data: {
          BrandID: brandID,
          BrandCode: this.state.updateBrandCode.trim(),
          BrandName: this.state.updateBrandName.trim(),
          IsActive: activeStatus
        }
      }).then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetBrandList();
          NotificationManager.success("Brand updated successfully.");
        }
      }).catch(data => {
        console.log(data);
        });
    } else {
      NotificationManager.error("Brand not updated .");
      this.setState({
        editbrandcodeCompulsion: "Please enter brand code.",
        editbrandnameCompulsion: "Please enter brand name.",
        editstatusCompulsion: "Please select status."
      });
    }
  }
  handleGetDataForEdit(e) {
    debugger;
    var brandEditData = e;
    brandEditData.brand_Code = brandEditData.brandCode;
    brandEditData.brand_name = brandEditData.brandName;
    brandEditData.brand_status = brandEditData.status;

    this.setState({
      brandEditData
    });
  }

  render() {
    const { brandData } = this.state;
    return (
      <React.Fragment>
        <NotificationContainer />
        <div className="position-relative d-inline-block">
          <Modal
            onClose={this.StatusCloseModel}
            open={this.state.StatusModel}
            modalId="Status-popup"
            overlayId="logout-ovrly"
          >
            <div className="status-drop-down">
              <div className="sort-sctn">
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusAtoZ.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>SORT BY A TO Z</p>
                </div>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusZtoA.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>SORT BY Z TO A</p>
                </div>
              </div>
              <div className="filter-type">
                <p>FILTER BY TYPE</p>
                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    name="filter-type"
                    id={"fil-open"}
                    value="all"
                    onChange={this.setSortCheckStatus.bind(this, "all")}
                  />
                  <label htmlFor={"fil-open"}>
                    <span className="table-btn table-blue-btn">ALL</span>
                  </label>
                </div>
                {this.state.sortColumn === "brandCode"
                  ? this.state.sortBrandCode !== null &&
                    this.state.sortBrandCode.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.brandCode}
                          value={item.brandCode}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "brandCode"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.brandCode}>
                          <span className="table-btn table-blue-btn">
                            {item.brandCode}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "brandName"
                  ? this.state.sortBrandName !== null &&
                    this.state.sortBrandName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.brandName}
                          value={item.brandName}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "brandName"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.brandName}>
                          <span className="table-btn table-blue-btn">
                            {item.brandName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </Modal>
        </div>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
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
                {this.state.loading === true ? (
                  <div className="loader-icon"></div>
                ) : (
                  <div className="table-cntr table-height TicketBrandReact">
                    <ReactTable
                      data={brandData}
                      minRows={2}
                      columns={[
                        {
                          Header: (
                            <span className={this.state.brandcodeColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "brandCode"
                              )}
                            >
                              Brand Code
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "brandCode"
                        },
                        {
                          Header: (
                            <span className={this.state.brandnameColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "brandName"
                              )}
                            >
                              Brand Name
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "brandName"
                        },
                        {
                          Header: (
                            <span>
                              Brand Added By
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "created_By",
                          Cell: row => {
                            debugger;
                            return (
                              <div>
                                <span>
                                  {row.original["created_By"]}
                                  <Popover
                                    content={
                                      <div>
                                        <div>
                                          <b>
                                            <p className="title">
                                              Created By:{" "}
                                              {row.original["created_By"]}
                                            </p>
                                          </b>
                                          <p className="sub-title">
                                            Created Date:{" "}
                                            {row.original["createdDateFormat"]}
                                          </p>
                                        </div>
                                        <div>
                                          <b>
                                            <p className="title">
                                              Updated By:{" "}
                                              {row.original["modify_By"]}
                                            </p>
                                          </b>
                                          <p className="sub-title">
                                            Updated Date:{" "}
                                            {row.original["modifyDateFormat"]}
                                          </p>
                                        </div>
                                      </div>
                                    }
                                    placement="bottom"
                                  >
                                    <img
                                      className="info-icon-cp"
                                      src={BlackInfoIcon}
                                      alt="info-icon"
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
                            var brand_ID = row.original["brandID"];
                            debugger;
                            return (
                              <>
                                <span>
                                  <Popover
                                    content={
                                      <div
                                        className="samdel d-flex general-popover popover-body"
                                        id={"samdel" + brand_ID}
                                      >
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
                                            Are you sure you want to delete this
                                            file?
                                          </p>
                                          <div className="del-can">
                                            <a
                                              href="#!"
                                              className="canblue"
                                              onClick={() =>
                                                this.hide(
                                                  this,
                                                  "samdel" + brand_ID
                                                )
                                              }
                                            >
                                              CANCEL
                                            </a>
                                            <button
                                              className="butn"
                                              type="button"
                                              onClick={this.handleDeleteBrandData.bind(
                                                this,
                                                brand_ID
                                              )}
                                            >
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
                                      onClick={() =>
                                        this.show(this, "samdel" + brand_ID)
                                      }
                                    />
                                  </Popover>
                                  <Popover
                                    content={
                                      <Content
                                        rowData={row.original}
                                        callBackEdit={this.callBackEdit}
                                        editbrandcodeCompulsion={
                                          this.state.editbrandcodeCompulsion
                                        }
                                        editbrandnameCompulsion={
                                          this.state.editbrandnameCompulsion
                                        }
                                        editstatusCompulsion={
                                          this.state.editstatusCompulsion
                                        }
                                        activeData={this.state.activeData}
                                        handleUpdateData={this.handleUpdateData.bind(
                                          this
                                        )}
                                      />
                                    }
                                    placement="bottom"
                                    trigger="click"
                                  >
                                    {/* <button
                                    className="react-tabel-button"
                                    // type="button"
                                    onClick={this.handleGetDataForEdit.bind(
                                      this,
                                      row.original
                                    )}
                                  >
                                    EDIT
                                  </button> */}
                                    <label className="Table-action-edit-button-text">
                                      <MyButton>EDIT</MyButton>
                                    </label>
                                  </Popover>
                                </span>
                              </>
                            );
                          }
                        }
                      ]}
                      // resizable={false}
                      defaultPageSize={5}
                      showPagination={true}
                    />
                    {/* <div className="position-relative">
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
                  </div> */}
                  </div>
                )}
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
                        name="brand_Code"
                        value={this.state.brand_Code}
                        onChange={this.handleBrandOnchange}
                      />
                      {this.state.brand_Code.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.brandcodeCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Brand Name</label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enter Brand Name"
                          maxLength={25}
                          name="brand_name"
                          value={this.state.brand_name}
                          onChange={this.handleBrandOnchange}
                        />
                        {this.state.brand_name.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.brandnameCompulsion}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">Status</label>
                      <select
                        className="form-control dropdown-setting"
                        name="selectedStatus"
                        value={this.state.selectedStatus}
                        onChange={this.handleActiveStatus}
                      >
                        <option>select</option>
                        {this.state.activeData !== null &&
                          this.state.activeData.map((item, j) => (
                            <option key={j} value={item.ActiveID}>
                              {item.ActiveName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectedStatus === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.statusCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="btnSpace">
                      <button
                        className="CreateADDBtn"
                        type="button"
                        onClick={this.handleSubmitData.bind(this)}
                      >
                        ADD
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

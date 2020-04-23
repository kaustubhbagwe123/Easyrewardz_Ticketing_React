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
import { MyContext } from '../../../context'
import {
  // NotificationContainer,
  NotificationManager
} from "react-notifications";
import ActiveStatus from "../../activeStatus";
import Modal from "react-responsive-modal";
import Sorting from "./../../../assets/Images/sorting.png";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import matchSorter from "match-sorter";

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
          onClick={e => {
            props.handleUpdateData(e, brandID);
          }}
        >
          SAVE
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
      sortAddedBy: [],
      sortStatus: [],
      updateBrandCode: "",
      updateBrandName: "",
      updateStatus: "",
      rowData: {},
      editbrandcodeCompulsion: "Please enter brand code.",
      editbrandnameCompulsion: "Please enter brand name.",
      editstatusCompulsion: "Please select status.",
      brandcodeColor: "",
      brandnameColor: "",
      addSaveLoading: false,
      brandcodeColor: "",
      brandnameColor: "",
      addedColor: "",
      statusColor: "",
      sortHeader: "",
      sortFilterBrandCode: [],
      sortFilterBrandName: [],
      sortFilterAddedBy: [],
      sortFilterStatus: [],
      tempbrandData: [],
      filterTxtValue: "",
      sFilterCheckbox: "",
      sbrandCodeFilterCheckbox: "",
      sbrandNameFilterCheckbox: "",
      screated_ByFilterCheckbox: "",
      sstatusFilterCheckbox: "",
      isortA: false
    };
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
  }
  hide(e, id) {
    document.getElementById(
      id
    ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
      "none";
  }
  show(e, id) {
    if (document.getElementById(id))
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
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.brandData;


    if (this.state.sortColumn === "brandCode") {
      itemsArray.sort((a, b) => {
        if (a.brandCode < b.brandCode) return 1;
        if (a.brandCode > b.brandCode) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "brandName") {
      itemsArray.sort((a, b) => {
        if (a.brandName < b.brandName) return 1;
        if (a.brandName > b.brandName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "created_By") {
      itemsArray.sort((a, b) => {
        if (a.created_By < b.created_By) return 1;
        if (a.created_By > b.created_By) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "status") {
      itemsArray.sort((a, b) => {
        if (a.status < b.status) return 1;
        if (a.status > b.status) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      brandData: itemsArray
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.brandData;


    if (this.state.sortColumn === "brandCode") {
      itemsArray.sort((a, b) => {
        if (a.brandCode < b.brandCode) return -1;
        if (a.brandCode > b.brandCode) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "brandName") {
      itemsArray.sort((a, b) => {
        if (a.brandName < b.brandName) return -1;
        if (a.brandName > b.brandName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "created_By") {
      itemsArray.sort((a, b) => {
        if (a.created_By < b.created_By) return -1;
        if (a.created_By > b.created_By) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "status") {
      itemsArray.sort((a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      brandData: itemsArray
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  StatusOpenModel(data, header) {
    debugger;

    // this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });

    if (
      this.state.sortFilterBrandCode.length === 0 ||
      this.state.sortFilterBrandName.length === 0 ||
      this.state.sortFilterAddedBy.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    // this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });
    if (data === "brandCode") {
      if (
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.screated_ByFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          sbrandNameFilterCheckbox: "",
          screated_ByFilterCheckbox: "",
          sstatusFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
    if (data === "brandName") {
      if (
        this.state.sbrandCodeFilterCheckbox !== "" ||
        this.state.screated_ByFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          sbrandCodeFilterCheckbox: "",
          screated_ByFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
    if (data === "created_By") {
      if (
        this.state.sbrandCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          sbrandCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
    if (data === "status") {
      if (
        this.state.sbrandCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.screated_ByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          sbrandCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          screated_ByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
  }
  StatusCloseModel() {
    if (this.state.tempbrandData.length > 0) {
      this.setState({
        StatusModel: false,
        brandData: this.state.tempbrandData,
        filterTxtValue: ""
      });
      if (this.state.sortColumn === "brandCode") {
        if (this.state.sbrandCodeFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandNameFilterCheckbox: "",
            screated_ByFilterCheckbox: "",
            sstatusFilterCheckbox: ""
          });
        }
      }
      if (this.state.sortColumn === "brandName") {
        if (this.state.sbrandNameFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandCodeFilterCheckbox: "",
            screated_ByFilterCheckbox: "",
            sstatusFilterCheckbox: ""
          });
        }
      }
      if (this.state.sortColumn === "created_By") {
        if (this.state.screated_ByFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            sstatusFilterCheckbox: ""
          });
        }
      }
      if (this.state.sortColumn === "status") {
        if (this.state.sstatusFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            screated_ByFilterCheckbox: ""
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        brandData: this.state.isortA
          ? this.state.brandData
          : this.state.sortAllData,
        filterTxtValue: ""
      });
    }
  }

  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var sbrandCodeFilterCheckbox = this.state.sbrandCodeFilterCheckbox;
    var sbrandNameFilterCheckbox = this.state.sbrandNameFilterCheckbox;
    var screated_ByFilterCheckbox = this.state.screated_ByFilterCheckbox;
    var sstatusFilterCheckbox = this.state.sstatusFilterCheckbox;

    if (column === "brandCode" || column === "all") {
      if (type === "value" && type !== "All") {
        sbrandCodeFilterCheckbox = sbrandCodeFilterCheckbox.replace("all", "");
        sbrandCodeFilterCheckbox = sbrandCodeFilterCheckbox.replace("all,", "");
        if (sbrandCodeFilterCheckbox.includes(e.currentTarget.value)) {
          sbrandCodeFilterCheckbox = sbrandCodeFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sbrandCodeFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sbrandCodeFilterCheckbox.includes("all")) {
          sbrandCodeFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "brandCode") {
            for (let i = 0; i < this.state.sortBrandCode.length; i++) {
              sbrandCodeFilterCheckbox +=
                this.state.sortBrandCode[i].brandCode + ",";
            }
            sbrandCodeFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "brandName" || column === "all") {
      if (type === "value" && type !== "All") {
        sbrandNameFilterCheckbox = sbrandNameFilterCheckbox.replace("all", "");
        sbrandNameFilterCheckbox = sbrandNameFilterCheckbox.replace("all,", "");
        if (sbrandNameFilterCheckbox.includes(e.currentTarget.value)) {
          sbrandNameFilterCheckbox = sbrandNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sbrandNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sbrandNameFilterCheckbox.includes("all")) {
          sbrandNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "brandName") {
            for (let i = 0; i < this.state.sortBrandName.length; i++) {
              sbrandNameFilterCheckbox +=
                this.state.sortBrandName[i].brandName + ",";
            }
            sbrandNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "created_By" || column === "all") {
      if (type === "value" && type !== "All") {
        screated_ByFilterCheckbox = screated_ByFilterCheckbox.replace(
          "all",
          ""
        );
        screated_ByFilterCheckbox = screated_ByFilterCheckbox.replace(
          "all,",
          ""
        );
        if (screated_ByFilterCheckbox.includes(e.currentTarget.value)) {
          screated_ByFilterCheckbox = screated_ByFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          screated_ByFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screated_ByFilterCheckbox.includes("all")) {
          screated_ByFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "created_By") {
            for (let i = 0; i < this.state.sortAddedBy.length; i++) {
              screated_ByFilterCheckbox +=
                this.state.sortAddedBy[i].created_By + ",";
            }
            screated_ByFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "status" || column === "all") {
      if (type === "value" && type !== "All") {
        sstatusFilterCheckbox = sstatusFilterCheckbox.replace("all", "");
        sstatusFilterCheckbox = sstatusFilterCheckbox.replace("all,", "");
        if (sstatusFilterCheckbox.includes(e.currentTarget.value)) {
          sstatusFilterCheckbox = sstatusFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sstatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sstatusFilterCheckbox.includes("all")) {
          sstatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "status") {
            for (let i = 0; i < this.state.sortState.length; i++) {
              sstatusFilterCheckbox += this.state.sortState[i].status + ",";
            }
            sstatusFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      brandcodeColor: "",
      brandnameColor: "",
      brandcodeColor: "",
      brandnameColor: "",
      addedColor: "",
      statusColor: "",
      sbrandCodeFilterCheckbox,
      sbrandNameFilterCheckbox,
      screated_ByFilterCheckbox,
      sstatusFilterCheckbox
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "brandCode") {
      var sItems = sbrandCodeFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.brandCode === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        brandcodeColor: "sort-column"
      });
    } else if (column === "brandName") {
      var sItems = sbrandNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.brandName === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        brandnameColor: "sort-column"
      });
    } else if (column === "created_By") {
      var sItems = screated_ByFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              a => a.created_By === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        addedColor: "sort-column"
      });
    } else if (column === "status") {
      var sItems = sstatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.status === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        statusColor: "sort-column"
      });
    }

    this.setState({
      tempbrandData: itemsArray
    });
    // this.StatusCloseModel();
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
    })
      .then(function(res) {
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
            self.state.sortFilterBrandCode.push({ brandCode: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].brandName] && data[i].brandName !== "") {
              distinct.push(data[i].brandName);
              unique[data[i].brandName] = 1;
            }
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortBrandName.push({ brandName: distinct[i] });
          self.state.sortFilterBrandName.push({ brandName: distinct[i] });
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].created_By] && data[i].created_By !== "") {
            distinct.push(data[i].created_By);
            unique[data[i].created_By] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortAddedBy.push({ created_By: distinct[i] });
          self.state.sortFilterAddedBy.push({ created_By: distinct[i] });
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].status] && data[i].status !== "") {
            distinct.push(data[i].status);
            unique[data[i].status] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortStatus.push({ status: distinct[i] });
          self.state.sortFilterStatus.push({ status: distinct[i] });
        }
      })
      .catch(data => {
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
      this.setState({ addSaveLoading: true });
      axios({
        method: "post",
        url: config.apiUrl + "/Brand/AddBrand",
        headers: authHeader(),
        data: {
          BrandCode: this.state.brand_Code.trim(),
          BrandName: this.state.brand_name.trim(),
          IsActive: activeStatus
        }
      })
        .then(function(res) {
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
              statusCompulsion: "",
              addSaveLoading: false
            });
          } else if (status === "Record Already Exists ") {
            self.setState({ addSaveLoading: false });
            NotificationManager.error(status);
          }
        })
        .catch(data => {
          self.setState({ addSaveLoading: false });
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
    })
      .then(function(res) {
        debugger;
        let status = res.data.statusCode;
        if (status === 1010) {
          self.handleGetBrandList();
          NotificationManager.success("Brand delete successfully.");
        } else {
          NotificationManager.error(res.data.message);
        }
      })
      .catch(data => {
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
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          if (status === "Success") {
            self.handleGetBrandList();
            NotificationManager.success("Brand updated successfully.");
          }
        })
        .catch(data => {
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

  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "brandCode") {
      var sortFilterBrandCode = matchSorter(
        this.state.sortBrandCode,
        e.target.value,
        { keys: ["brandCode"] }
      );
      if (sortFilterBrandCode.length > 0) {
        this.setState({ sortFilterBrandCode });
      } else {
        this.setState({
          sortFilterBrandCode: this.state.sortBrandCode
        });
      }
    }
    if (this.state.sortColumn === "brandName") {
      var sortFilterBrandName = matchSorter(
        this.state.sortBrandName,
        e.target.value,
        { keys: ["brandName"] }
      );
      if (sortFilterBrandName.length > 0) {
        this.setState({ sortFilterBrandName });
      } else {
        this.setState({
          sortFilterBrandName: this.state.sortBrandName
        });
      }
    }
    if (this.state.sortColumn === "created_By") {
      var sortFilterAddedBy = matchSorter(
        this.state.sortAddedBy,
        e.target.value,
        {
          keys: ["created_By"]
        }
      );
      if (sortFilterAddedBy.length > 0) {
        this.setState({ sortFilterAddedBy });
      } else {
        this.setState({
          sortFilterAddedBy: this.state.sortAddedBy
        });
      }
    }
    if (this.state.sortColumn === "status") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        {
          keys: ["status"]
        }
      );
      if (sortFilterStatus.length > 0) {
        this.setState({ sortFilterStatus });
      } else {
        this.setState({
          sortFilterStatus: this.state.sortStatus
        });
      }
    }
  }

  render() {
       const TranslationContext = this.context.state.translateLanguage.default
    const { brandData } = this.state;
    return (
      <React.Fragment>
        {/* <NotificationContainer /> */}
        <div className="position-relative d-inline-block">
          <Modal
            onClose={this.StatusCloseModel}
            open={this.state.StatusModel}
            modalId="Status-popup"
            overlayId="logout-ovrly"
          >
            <div className="status-drop-down">
              <div className="sort-sctn">
                <label style={{ color: "#0066cc", fontWeight: "bold" }}>
                  {this.state.sortHeader}
                </label>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusAtoZ.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.sortatoz
                      }
                    else{
                      return "SORT BY A TO Z"
                    }
                    })()
                  }</p>
                </div>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusZtoA.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>
                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.sortatoz
                      }
                    else{
                      return "SORT BY Z TO A"
                    }
                    })()
                  }
                  </p>
                </div>
              </div>
              <a
                href=""
                style={{ margin: "0 25px", textDecoration: "underline" }}
                onClick={this.setSortCheckStatus.bind(this, "all")}
              >
                {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.clearsearch
                      }
                    else{
                      return "Clear Search"
                    }
                    })()
                  }   
              </a>
              <div className="filter-type">
                <p>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.filterbytype
                      }
                    else{
                      return "FILTER BY TYPE"
                    }
                    })()
                  }</p>
                <input
                  type="text"
                  style={{ display: "block" }}
                  value={this.state.filterTxtValue}
                  onChange={this.filteTextChange.bind(this)}
                />
                <div className="FTypeScroll">
                  <div className="filter-checkbox">
                    <input
                      type="checkbox"
                      name="filter-type"
                      id={"fil-open"}
                      value="all"
                      checked={
                        this.state.sbrandCodeFilterCheckbox.includes("all") ||
                        this.state.sbrandNameFilterCheckbox.includes("all") ||
                        this.state.screated_ByFilterCheckbox.includes("all") ||
                        this.state.sstatusFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "brandCode"
                    ? this.state.sortFilterBrandCode !== null &&
                      this.state.sortFilterBrandCode.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.brandCode}
                            value={item.brandCode}
                            checked={this.state.sbrandCodeFilterCheckbox.includes(
                              item.brandCode
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "brandCode",
                              "value"
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
                    ? this.state.sortFilterBrandName !== null &&
                      this.state.sortFilterBrandName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.brandName}
                            value={item.brandName}
                            checked={this.state.sbrandNameFilterCheckbox.includes(
                              item.brandName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "brandName",
                              "value"
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

                  {this.state.sortColumn === "created_By"
                    ? this.state.sortFilterAddedBy !== null &&
                      this.state.sortFilterAddedBy.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.created_By}
                            value={item.created_By}
                            checked={this.state.screated_ByFilterCheckbox.includes(
                              item.created_By
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "created_By",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.created_By}>
                            <span className="table-btn table-blue-btn">
                              {item.created_By}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "status"
                    ? this.state.sortFilterStatus !== null &&
                      this.state.sortFilterStatus.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.status}
                            value={item.status}
                            checked={this.state.sstatusFilterCheckbox.includes(
                              item.status
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "status",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.status}>
                            <span className="table-btn table-blue-btn">
                              {item.status}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.link.setting
                      }
                    else{
                      return "Settings"
                    }
                    })()
                  }   
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.link.ticketing
                      }
                    else{
                      return "Ticketing"
                    }
                    })()
                  }  
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.link.brands
                      }
                    else{
                      return "Brands"
                    }
                    })()
                  }  
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr settingtable">
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
                            <span
                              className={this.state.brandcodeColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "brandCode",
                                "Brand Code"
                              )}
                            >
                              
                              {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.brandcode
                      }
                    else{
                      return "Brand Code"
                    }
                    })()
                  }  
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "brandCode"
                        },
                        {
                          Header: (
                            <span
                              className={this.state.brandnameColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "brandName",
                                "Brand Name"
                              )}
                            >
                              
                              {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.brandname
                      }
                    else{
                      return "Brand Name"
                    }
                    })()
                  }  
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "brandName"
                        },
                        {
                          Header: (
                            <span
                              className={this.state.addedColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "created_By",
                                "Created By"
                              )}
                            >
                              
                               {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.brandaddedby
                      }
                    else{
                      return "Brand Added By"
                    }
                    })()
                  }  
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
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
                                              {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.createdby
                      }
                    else{
                      return "Created By"
                    }
                    })()
                  }:{" "}
                                              {row.original["created_By"]}
                                            </p>
                                          </b>
                                          <p className="sub-title">
                                             {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.createddate
                      }
                    else{
                      return "Created Date"
                    }
                    })()
                  }:{" "}
                                            {row.original["createdDateFormat"]}
                                          </p>
                                        </div>
                                        <div>
                                          <b>
                                            <p className="title">
                                              {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.updatedby
                      }
                    else{
                      return "Updated By"
                    }
                    })()
                  }:{" "}
                                              {row.original["modify_By"]}
                                            </p>
                                          </b>
                                          <p className="sub-title">
                                             {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.upadateddate
                      }
                    else{
                      return "Updated Date"
                    }
                    })()
                  }:{" "}
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
                            <span
                              className={this.state.statusColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "status",
                                "Status"
                              )}
                            >
                              {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.status
                      }
                    else{
                      return "Status"
                    }
                    })()
                  }
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "status"
                        },
                        {
                          Header: <span>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.actions
                      }
                    else{
                      return "Actions"
                    }
                    })()
                  }</span>,
                          accessor: "actiondept",
                          sortable: false,
                          Cell: row => {
                            var brand_ID = row.original["brandID"];
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
                                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.deletefile
                      }
                    else{
                      return "Delete file?"
                    }
                    })()
                  }
                                          </p>
                                          <p className="mt-1 fs-12">
                                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.areyousuredeletefile
                      }
                    else{
                      return "Are you sure you want to delete this file?"
                    }
                    })()
                  }
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
                                               {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.cancel
                      }
                    else{
                      return "Cancel"
                    }
                    })()
                  }
                                            </a>
                                            <button
                                              className="butn"
                                              type="button"
                                              onClick={this.handleDeleteBrandData.bind(
                                                this,
                                                brand_ID
                                              )}
                                            >
                                              {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.delete
                      }
                    else{
                      return "Delete"
                    }
                    })()
                  }
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
                                    <label className="Table-action-edit-button-text">
                                      <MyButton> {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.mybutton.edit
                      }
                    else{
                      return "EDIT"
                    }
                    })()
                  }</MyButton>
                                    </label>
                                  </Popover>
                                </span>
                              </>
                            );
                          }
                        }
                      ]}
                      resizable={false}
                      defaultPageSize={5}
                      showPagination={true}
                    />
                  </div>
                )}
              </div>
              <div className="col-md-4">
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="create-department"> {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.createbrand
                      }
                    else{
                      return "CREATE BRAND"
                    }
                    })()
                  }</label>
                    <div className="div-padding-1">
                      <label className="designation-name">
                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.brandcode
                      }
                    else{
                      return "Brand Code"
                    }
                    })()
                  }
                      </label>
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
                        <label className="reports-to">
                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.brandname
                      }
                    else{
                      return "Brand Name"
                    }
                    })()
                  }
                        </label>
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
                      <label className="reports-to">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.status
                      }
                    else{
                      return "Status"
                    }
                    })()
                  }</label>
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
                        onClick={this.handleSubmitData.bind(this)}
                        disabled={this.state.addSaveLoading}
                        type="button"
                      >
                        {this.state.addSaveLoading ? (
                          <FontAwesomeIcon
                            className="circular-loader"
                            icon={faCircleNotch}
                            spin
                          />
                        ) : (
                          ""
                        )}
                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.add
                      }
                    else{
                      return "ADD"
                    }
                    })()
                  }
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

Brands.contextType = MyContext;
export default Brands;

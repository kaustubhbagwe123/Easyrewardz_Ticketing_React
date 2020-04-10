import React, { Component } from "react";
import Demo from "../../../store/Hashtag.js";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { Popover } from "antd";
import ReactTable from "react-table";
import { authHeader } from "../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import Select from "react-select";
import ActiveStatus from "../../activeStatus.js";
import { NotificationManager } from "react-notifications";
import Modal from "react-responsive-modal";
import Sorting from "./../../../assets/Images/sorting.png";
import matchSorter from "match-sorter";
import { Tabs, Tab } from "react-bootstrap-tabs/dist";

class StoreUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      brandData: [],
      storeCodeData: [],
      departmentData: [],
      functionData: [],
      activeData: ActiveStatus(),
      selectBrand: 0,
      selectStore: 0,
      brandCompulsory: "",
      storeCodeCompulsory: "",
      checkPersonalDetailTab: "",
      checkProfileDetailTab: "",
      userName: "",
      mobile_no: "",
      email_Id: "",
      phoneFlag: true,
      emailFlag: true,
      mobilenumberCompulsory: "",
      userNameCompulsory: "",
      departmentCompulsory: "",
      designationCompulsory: "",
      functionCompulsory: "",
      reportDesignationCompulsory: "",
      reportToCompulsory: "",
      emailCompulsory: "",
      mobileValidation: "",
      emailValidation: "",
      selectDepartment: 0,
      selectDesignation: 0,
      selectReportDesignation: 0,
      selectReportTo: 0,
      selectedFunction: [],
      userDesignationData: [],
      reportDesignation: [],
      reportToData: [],
      selectedClaimBrand: [],
      selectedClaimCategory: [],
      selectedClaimSubCategory: [],
      selectedClaimIssueType: [],
      checkMappedClaimCategoryTab: "",
      mappedBrandCompulsory: "",
      mappedCategoryCompulsory: "",
      mappedSubCategoryCompulsory: "",
      mappedIssueTypeCompulsory: "",
      claimCategoryData: [],
      claimSubCategoryData: [],
      claimIssueTypeData: [],
      selectClaimApprover: "",
      ClaimApproverCompulsory: "",
      selectStatus: 0,
      statusCompulsory: "",
      selectCrmRole: 0,
      CrmRoleCompulsory: "",
      CrmRoleData: [],
      StoreReadOnly: false,
      personalReadOnly: false,
      profileReadOnly: false,
      user_ID: 0,
      StoreUserData: [],
      sortAllData: [],
      sbrandNameFilterCheckbox: "",
      sitemCodeFilterCheckbox: "",
      suserNameFilterCheckbox: "",
      sdesignationNameFilterCheckbox: "",
      sreporteeNameFilterCheckbox: "",
      sdepartmentNameFilterCheckbox: "",
      smappedFunctionsFilterCheckbox: "",
      sortFilterbrandName: [],
      sortFilteritemCode: [],
      sortFilteruserName: [],
      sortFilterdesignationName: [],
      sortFilterreporteeName: [],
      sortFilterdepartmentName: [],
      sortFiltermappedFunctions: [],
      sortbrandName: [],
      sortitemCode: [],
      sortuserName: [],
      sortdesignationName: [],
      sortreporteeName: [],
      sortdepartmentName: [],
      sortmappedFunctions: [],
      sortColumn: "",
      sortHeader: "",
      filterTxtValue: "",
      StatusModel: false,
      tempitemData: [],
      isortA: false,
      UserEditmodel: false,
      selTab: "Store Details",
      brandNameColor: "",
      storeCodeColor: "",
      userdesignationColor: "",
      reporteeNameColor: "",
      departmentColor: "",
      functionColor: "",
      userNameColor: "",
      userEditData:{}
    };
    this.handleGetBrandData = this.handleGetBrandData.bind(this);
    this.handleGetstoreCodeData = this.handleGetstoreCodeData.bind(this);
    this.handleGetDepartmentData = this.handleGetDepartmentData.bind(this);
    this.handleGetFunctionData = this.handleGetFunctionData.bind(this);
    this.handleGetUserDesignationData = this.handleGetUserDesignationData.bind(
      this
    );
    this.handleGetRepoteeDesignationData = this.handleGetRepoteeDesignationData.bind(
      this
    );
    this.handleGetReportToData = this.handleGetReportToData.bind(this);
    this.handleGetClaimCategoryData = this.handleGetClaimCategoryData.bind(
      this
    );
    this.handleGetClaimSubCategoryData = this.handleGetClaimSubCategoryData.bind(
      this
    );
    this.handleGetClaimIssueType = this.handleGetClaimIssueType.bind(this);
    this.handleGetCRMRole = this.handleGetCRMRole.bind(this);
    this.handleGetStoreUserGridData = this.handleGetStoreUserGridData.bind(
      this
    );
    this.closeEditModals = this.closeEditModals.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
  }

  opneUserEditModal = () => {
    this.setState({ UserEditmodel: true });
  };
  closeEditModals() {
    this.setState({ UserEditmodel: false, selTab: "Personal Details" });
  }

  componentDidMount() {
    this.handleGetBrandData();
    this.handleGetstoreCodeData();
    this.handleGetUserDesignationData();
    this.handleGetCRMRole();
    this.handleGetStoreUserGridData();
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

  /// drop down on change
  handleBrandAndStoreChange = (e) => {
    debugger;
    let value = e.target.value;
    let name = e.target.name;
    if (name === "brandName") {
      this.setState({
        selectBrand: value,
        departmentData: [],
        functionData: [],
        selectedFunction: [],
      });
    } else if (name === "storeCode") {
      this.setState({
        selectStore: value,
        departmentData: [],
        functionData: [],
        selectedFunction: [],
      });
    }
    setTimeout(() => {
      if (this.state.selectBrand && this.state.selectStore) {
        var brandId = this.state.selectBrand;
        var storeId = this.state.selectStore;
        this.handleGetDepartmentData(brandId, storeId);
      }
    }, 1);
  };
  /// Department drop down OnChange
  handleDepartmentOnChange = (e) => {
    let value = e.target.value;
    this.setState({
      selectDepartment: value,
      functionData: [],
      selectedFunction: [],
    });
    setTimeout(() => {
      if (this.state.selectDepartment) {
        this.handleGetFunctionData();
      }
    }, 1);
  };
  /// handle onchange for drop down
  handleDropDownOnChange = (e) => {
    debugger;
    let name = e.target.name;
    let value = e.target.value;
    if (name === "selectDesignation") {
      this.setState({
        selectDesignation: value,
        reportDesignation: [],
        reportToData: [],
      });
      setTimeout(() => {
        if (this.state.selectDesignation) {
          this.handleGetRepoteeDesignationData();
        }
      }, 1);
    } else if (name === "selectReportDesignation") {
      this.setState({
        selectReportDesignation: value,
        reportToData: [],
      });
      setTimeout(() => {
        if (this.state.selectReportDesignation) {
          this.handleGetReportToData();
        }
      }, 1);
    } else if (name === "selectReportTo") {
      this.setState({
        selectReportTo: value,
      });
    } else if (name === "selectClaimApprover") {
      this.setState({
        selectClaimApprover: value,
      });
    } else if (name === "selectStatus") {
      this.setState({ selectStatus: value });
    } else if (name === "selectCrmRole") {
      this.setState({ selectCrmRole: value });
    }
  };
  /// Onchange for Mobile no
  hanldeMobileNoChange = (e) => {
    debugger;
    var name = e.target.name;
    var reg = /^[0-9\b]+$/;
    if (name === "mobile_no") {
      if (e.target.value === "" || reg.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      } else {
        e.target.value = "";
      }
      if (e.target.value.length === 10 || e.target.value.length === 0) {
        this.setState({
          phoneFlag: true,
        });
      } else {
        this.setState({
          phoneFlag: false,
        });
      }
    }
  };
  /// Onchange function
  handleOnChangeUserData = (e) => {
    debugger;
    var name = e.target.name;
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (name === "email_Id") {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (e.target.value === "") {
        this.setState({
          emailFlag: true,
        });
      } else if (reg.test(e.target.value) === false) {
        this.setState({
          emailFlag: false,
        });
      } else {
        this.setState({
          emailFlag: true,
        });
      }
    }
  };
  /// handle Function Onchange for drop down
  handleFunctionOnChange(e) {
    debugger;
    if (e === null) {
      e = [];
      this.setState({ selectedFunction: e });
    } else {
      this.setState({ selectedFunction: e });
    }
  }
  /// handle Mapped Brand  multiselect Onchange
  handleMultiBrandonChange(e) {
    if (e === null) {
      e = [];
      this.setState({
        selectedClaimBrand: e,
        selectedClaimCategory: [],
        selectedClaimSubCategory: [],
        selectedClaimIssueType: [],
      });
    } else {
      this.setState({ selectedClaimBrand: e });
      setTimeout(() => {
        if (this.state.selectedClaimBrand) {
          this.handleGetClaimCategoryData();
        }
      }, 1);
    }
  }
  /// handle Mapped Category  multiselect Onchange
  handleMultiCategoryonChange(e) {
    if (e === null) {
      e = [];
      this.setState({
        selectedClaimCategory: e,
        selectedClaimSubCategory: [],
        selectedClaimIssueType: [],
      });
    } else {
      this.setState({ selectedClaimCategory: e });
      setTimeout(() => {
        if (this.state.selectedClaimCategory) {
          this.handleGetClaimSubCategoryData();
        }
      }, 1);
    }
  }
  /// handle Mapped SubCategory  multiselect Onchange
  handleMultiSubCategoryonChange(e) {
    if (e === null) {
      e = [];
      this.setState({
        selectedClaimSubCategory: e,
        selectedClaimIssueType: [],
      });
    } else {
      this.setState({ selectedClaimSubCategory: e });
      setTimeout(() => {
        if (this.state.selectedClaimSubCategory) {
          this.handleGetClaimIssueType();
        }
      }, 1);
    }
  }
  /// handle Mapped Issue Type  multiselect Onchange
  handleMultiIssueTypeonChange(e) {
    if (e === null) {
      e = [];
      this.setState({ selectedClaimIssueType: e });
    } else {
      this.setState({ selectedClaimIssueType: e });
    }
  }

  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.StoreUserData;

    if (this.state.sortColumn === "storeCode") {
      itemsArray.sort((a, b) => {
        if (a.storeCode < b.storeCode) return 1;
        if (a.storeCode > b.storeCode) return -1;
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
    if (this.state.sortColumn === "userName") {
      itemsArray.sort((a, b) => {
        if (a.userName < b.userName) return 1;
        if (a.userName > b.userName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "designationName") {
      itemsArray.sort((a, b) => {
        if (a.designationName < b.designationName) return 1;
        if (a.designationName > b.designationName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "reporteeName") {
      itemsArray.sort((a, b) => {
        if (a.reporteeName < b.reporteeName) return 1;
        if (a.reporteeName > b.reporteeName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "departmentName") {
      itemsArray.sort((a, b) => {
        if (a.departmentName < b.departmentName) return 1;
        if (a.departmentName > b.departmentName) return -1;
        return 0;
      });
    }

    if (this.state.sortColumn === "mappedFunctions") {
      itemsArray.sort((a, b) => {
        if (a.mappedFunctions < b.mappedFunctions) return 1;
        if (a.mappedFunctions > b.mappedFunctions) return -1;
        return 0;
      });
    }
    this.setState({
      isortA: true,
      StoreUserData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.StoreUserData;

    if (this.state.sortColumn === "storeCode") {
      itemsArray.sort((a, b) => {
        if (a.storeCode < b.storeCode) return -1;
        if (a.storeCode > b.storeCode) return 1;
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
    if (this.state.sortColumn === "userName") {
      itemsArray.sort((a, b) => {
        if (a.userName < b.userName) return -1;
        if (a.userName > b.userName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "designationName") {
      itemsArray.sort((a, b) => {
        if (a.designationName < b.designationName) return -1;
        if (a.designationName > b.designationName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "reporteeName") {
      itemsArray.sort((a, b) => {
        if (a.reporteeName < b.reporteeName) return -1;
        if (a.reporteeName > b.reporteeName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "departmentName") {
      itemsArray.sort((a, b) => {
        if (a.departmentName < b.departmentName) return -1;
        if (a.departmentName > b.departmentName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "mappedFunctions") {
      itemsArray.sort((a, b) => {
        if (a.mappedFunctions < b.mappedFunctions) return -1;
        if (a.mappedFunctions > b.mappedFunctions) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      StoreUserData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  StatusOpenModel(data, header) {
    debugger;

    if (
      this.state.sortFilterbrandName.length === 0 ||
      this.state.sortFilteritemCode.length === 0 ||
      this.state.sortFilteruserName.length === 0 ||
      this.state.sortFilterdesignationName.length === 0 ||
      this.state.sortFilterreporteeName.length === 0 ||
      this.state.sortFilterdepartmentName.length === 0 ||
      this.state.sortFiltermappedFunctions.length === 0
    ) {
      return false;
    }

    if (data === "storeCode") {
      if (
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.sreporteeNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.smappedFunctionsFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sbrandNameFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          sreporteeNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          smappedFunctionsFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "brandName") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.sreporteeNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.smappedFunctionsFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          sreporteeNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          smappedFunctionsFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "userName") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.sreporteeNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.smappedFunctionsFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          sreporteeNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          smappedFunctionsFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "designationName") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.sreporteeNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.smappedFunctionsFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          sreporteeNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          smappedFunctionsFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "reporteeName") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.smappedFunctionsFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          smappedFunctionsFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "departmentName") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.sreporteeNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.smappedFunctionsFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          sreporteeNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          smappedFunctionsFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "mappedFunctions") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.sreporteeNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          sreporteeNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    if (this.state.tempitemData.length > 0) {
      this.setState({
        StatusModel: false,
        StoreUserData: this.state.tempitemData,
        filterTxtValue: "",
      });
      if (this.state.sortColumn === "storeCode") {
        if (this.state.sitemCodeFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandNameFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            sdesignationNameFilterCheckbox: "",
            sreporteeNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            smappedFunctionsFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "brandName") {
        if (this.state.sbrandNameFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            sdesignationNameFilterCheckbox: "",
            sreporteeNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            smappedFunctionsFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "userName") {
        if (this.state.suserNameFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            sdesignationNameFilterCheckbox: "",
            sreporteeNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            smappedFunctionsFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "designationName") {
        if (this.state.sdesignationNameFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            sreporteeNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            smappedFunctionsFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "reporteeName") {
        if (this.state.sreporteeNameFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            sdesignationNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            smappedFunctionsFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "departmentName") {
        if (this.state.sdepartmentNameFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            sreporteeNameFilterCheckbox: "",
            sdesignationNameFilterCheckbox: "",
            smappedFunctionsFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "mappedFunctions") {
        if (this.state.smappedFunctionsFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            sreporteeNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            sdesignationNameFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        StoreUserData: this.state.isortA
          ? this.state.StoreUserData
          : this.state.sortAllData,
        filterTxtValue: "",
      });
    }
  }

  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var sbrandNameFilterCheckbox = this.state.sbrandNameFilterCheckbox;
    var sitemCodeFilterCheckbox = this.state.sitemCodeFilterCheckbox;
    var suserNameFilterCheckbox = this.state.suserNameFilterCheckbox;
    var sdesignationNameFilterCheckbox = this.state
      .sdesignationNameFilterCheckbox;
    var sreporteeNameFilterCheckbox = this.state.sreporteeNameFilterCheckbox;
    var sdepartmentNameFilterCheckbox = this.state
      .sdepartmentNameFilterCheckbox;
    var smappedFunctionsFilterCheckbox = this.state
      .smappedFunctionsFilterCheckbox;

    if (column === "storeCode" || column === "all") {
      if (type === "value" && type !== "All") {
        sitemCodeFilterCheckbox = sitemCodeFilterCheckbox.replace("all", "");
        sitemCodeFilterCheckbox = sitemCodeFilterCheckbox.replace("all,", "");
        if (sitemCodeFilterCheckbox.includes(e.currentTarget.value)) {
          sitemCodeFilterCheckbox = sitemCodeFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sitemCodeFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sitemCodeFilterCheckbox.includes("all")) {
          sitemCodeFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "storeCode") {
            for (let i = 0; i < this.state.sortitemCode.length; i++) {
              sitemCodeFilterCheckbox +=
                this.state.sortitemCode[i].storeCode + ",";
            }
            sitemCodeFilterCheckbox += "all";
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
            for (let i = 0; i < this.state.sortbrandName.length; i++) {
              sbrandNameFilterCheckbox +=
                this.state.sortbrandName[i].brandName + ",";
            }
            sbrandNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "userName" || column === "all") {
      if (type === "value" && type !== "All") {
        suserNameFilterCheckbox = suserNameFilterCheckbox.replace("all", "");
        suserNameFilterCheckbox = suserNameFilterCheckbox.replace("all,", "");
        if (suserNameFilterCheckbox.includes(e.currentTarget.value)) {
          suserNameFilterCheckbox = suserNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          suserNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (suserNameFilterCheckbox.includes("all")) {
          suserNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "userName") {
            for (let i = 0; i < this.state.sortuserName.length; i++) {
              suserNameFilterCheckbox +=
                this.state.sortuserName[i].userName + ",";
            }
            suserNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "designationName" || column === "all") {
      if (type === "value" && type !== "All") {
        sdesignationNameFilterCheckbox = sdesignationNameFilterCheckbox.replace(
          "all",
          ""
        );
        sdesignationNameFilterCheckbox = sdesignationNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sdesignationNameFilterCheckbox.includes(e.currentTarget.value)) {
          sdesignationNameFilterCheckbox = sdesignationNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sdesignationNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sdesignationNameFilterCheckbox.includes("all")) {
          sdesignationNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "designationName") {
            for (let i = 0; i < this.state.sortdesignationName.length; i++) {
              sdesignationNameFilterCheckbox +=
                this.state.sortdesignationName[i].designationName + ",";
            }
            sdesignationNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "reporteeName" || column === "all") {
      if (type === "value" && type !== "All") {
        sreporteeNameFilterCheckbox = sreporteeNameFilterCheckbox.replace(
          "all",
          ""
        );
        sreporteeNameFilterCheckbox = sreporteeNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sreporteeNameFilterCheckbox.includes(e.currentTarget.value)) {
          sreporteeNameFilterCheckbox = sreporteeNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sreporteeNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sreporteeNameFilterCheckbox.includes("all")) {
          sreporteeNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "reporteeName") {
            for (let i = 0; i < this.state.sortreporteeName.length; i++) {
              sreporteeNameFilterCheckbox +=
                this.state.sortreporteeName[i].reporteeName + ",";
            }
            sreporteeNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "departmentName" || column === "all") {
      if (type === "value" && type !== "All") {
        sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
          "all",
          ""
        );
        sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sdepartmentNameFilterCheckbox.includes(e.currentTarget.value)) {
          sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sdepartmentNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sdepartmentNameFilterCheckbox.includes("all")) {
          sdepartmentNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "departmentName") {
            for (let i = 0; i < this.state.sortdepartmentName.length; i++) {
              sdepartmentNameFilterCheckbox +=
                this.state.sortdepartmentName[i].departmentName + ",";
            }
            sdepartmentNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "mappedFunctions" || column === "all") {
      if (type === "value" && type !== "All") {
        smappedFunctionsFilterCheckbox = smappedFunctionsFilterCheckbox.replace(
          "all",
          ""
        );
        smappedFunctionsFilterCheckbox = smappedFunctionsFilterCheckbox.replace(
          "all,",
          ""
        );
        if (smappedFunctionsFilterCheckbox.includes(e.currentTarget.value)) {
          smappedFunctionsFilterCheckbox = smappedFunctionsFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          smappedFunctionsFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (smappedFunctionsFilterCheckbox.includes("all")) {
          smappedFunctionsFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "mappedFunctions") {
            for (let i = 0; i < this.state.sortmappedFunctions.length; i++) {
              smappedFunctionsFilterCheckbox +=
                this.state.sortmappedFunctions[i].mappedFunctions + ",";
            }
            smappedFunctionsFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      sbrandNameFilterCheckbox,
      sitemCodeFilterCheckbox,
      suserNameFilterCheckbox,
      sdesignationNameFilterCheckbox,
      sreporteeNameFilterCheckbox,
      sdepartmentNameFilterCheckbox,
      smappedFunctionsFilterCheckbox,
      brandNameColor: "",
      storeCodeColor: "",
      userdesignationColor: "",
      reporteeNameColor: "",
      departmentColor: "",
      functionColor: "",
      userNameColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "storeCode") {
      var sItems = sitemCodeFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.storeCode === sItems[i]
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
        storeCodeColor: "sort-column",
      });
    } else if (column === "brandName") {
      var sItems = sbrandNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.brandName === sItems[i]
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
        brandNameColor: "sort-column",
      });
    } else if (column === "userName") {
      var sItems = suserNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.userName === sItems[i]
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
        userNameColor: "sort-column",
      });
    } else if (column === "designationName") {
      var sItems = sdesignationNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.designationName === sItems[i]
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
        userdesignationColor: "sort-column",
      });
    } else if (column === "reporteeName") {
      var sItems = sreporteeNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.reporteeName === sItems[i]
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
        reporteeNameColor: "sort-column",
      });
    } else if (column === "departmentName") {
      var sItems = sdepartmentNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.departmentName === sItems[i]
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
        departmentColor: "sort-column",
      });
    } else if (column === "mappedFunctions") {
      var sItems = smappedFunctionsFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.mappedFunctions === sItems[i]
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
        functionColor: "sort-column",
      });
    }

    this.setState({
      tempitemData: itemsArray,
    });
  };

  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "storeCode") {
      var sortFilteritemCode = matchSorter(
        this.state.sortitemCode,
        e.target.value,
        { keys: ["storeCode"] }
      );
      if (sortFilteritemCode.length > 0) {
        this.setState({ sortFilteritemCode });
      } else {
        this.setState({
          sortFilteritemCode: this.state.sortitemCode,
        });
      }
    }
    if (this.state.sortColumn === "brandName") {
      var sortFilterbrandName = matchSorter(
        this.state.sortbrandName,
        e.target.value,
        { keys: ["brandName"] }
      );
      if (sortFilterbrandName.length > 0) {
        this.setState({ sortFilterbrandName });
      } else {
        this.setState({
          sortFilterbrandName: this.state.sortbrandName,
        });
      }
    }
    if (this.state.sortColumn === "userName") {
      var sortFilteruserName = matchSorter(
        this.state.sortuserName,
        e.target.value,
        {
          keys: ["userName"],
        }
      );
      if (sortFilteruserName.length > 0) {
        this.setState({ sortFilteruserName });
      } else {
        this.setState({
          sortFilteruserName: this.state.sortuserName,
        });
      }
    }
    if (this.state.sortColumn === "designationName") {
      var sortFilterdesignationName = matchSorter(
        this.state.sortdesignationName,
        e.target.value,
        {
          keys: ["designationName"],
        }
      );
      if (sortFilterdesignationName.length > 0) {
        this.setState({ sortFilterdesignationName });
      } else {
        this.setState({
          sortFilterdesignationName: this.state.sortdesignationName,
        });
      }
    }
    if (this.state.sortColumn === "reporteeName") {
      var sortFilterreporteeName = matchSorter(
        this.state.sortreporteeName,
        e.target.value,
        {
          keys: ["reporteeName"],
        }
      );
      if (sortFilterreporteeName.length > 0) {
        this.setState({ sortFilterreporteeName });
      } else {
        this.setState({
          sortFilterreporteeName: this.state.sortreporteeName,
        });
      }
    }
    if (this.state.sortColumn === "departmentName") {
      var sortFilterdepartmentName = matchSorter(
        this.state.sortdepartmentName,
        e.target.value,
        {
          keys: ["departmentName"],
        }
      );
      if (sortFilterdepartmentName.length > 0) {
        this.setState({ sortFilterdepartmentName });
      } else {
        this.setState({
          sortFilterdepartmentName: this.state.sortdepartmentName,
        });
      }
    }
    if (this.state.sortColumn === "mappedFunctions") {
      var sortFiltermappedFunctions = matchSorter(
        this.state.sortmappedFunctions,
        e.target.value,
        {
          keys: ["mappedFunctions"],
        }
      );
      if (sortFiltermappedFunctions.length > 0) {
        this.setState({ sortFiltermappedFunctions });
      } else {
        this.setState({
          sortFiltermappedFunctions: this.state.sortmappedFunctions,
        });
      }
    }
  }
  EditStoreUserData =(data)=>{

  }
  // -------------------API Start------------------------
  ///Show Store User Grid data
  handleGetStoreUserGridData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreUsers",
      headers: authHeader(),
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ StoreUserData: data });
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].brandName] && data[i].brandName !== "") {
              distinct.push(data[i].brandName);
              unique[data[i].brandName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortbrandName.push({ brandName: distinct[i] });
            self.state.sortFilterbrandName.push({ brandName: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].storeCode] && data[i].storeCode !== "") {
              distinct.push(data[i].storeCode);
              unique[data[i].storeCode] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortitemCode.push({ storeCode: distinct[i] });
            self.state.sortFilteritemCode.push({ storeCode: distinct[i] });
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].userName] && data[i].userName !== "") {
              distinct.push(data[i].userName);
              unique[data[i].userName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortuserName.push({ userName: distinct[i] });
            self.state.sortFilteruserName.push({ userName: distinct[i] });
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (
              !unique[data[i].designationName] &&
              data[i].designationName !== ""
            ) {
              distinct.push(data[i].designationName);
              unique[data[i].designationName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortdesignationName.push({
              designationName: distinct[i],
            });
            self.state.sortFilterdesignationName.push({
              designationName: distinct[i],
            });
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].reporteeName] && data[i].reporteeName !== "") {
              distinct.push(data[i].reporteeName);
              unique[data[i].reporteeName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortreporteeName.push({ reporteeName: distinct[i] });
            self.state.sortFilterreporteeName.push({
              reporteeName: distinct[i],
            });
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (
              !unique[data[i].departmentName] &&
              data[i].departmentName !== ""
            ) {
              distinct.push(data[i].departmentName);
              unique[data[i].departmentName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortdepartmentName.push({
              departmentName: distinct[i],
            });
            self.state.sortFilterdepartmentName.push({
              departmentName: distinct[i],
            });
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (
              !unique[data[i].mappedFunctions] &&
              data[i].mappedFunctions !== ""
            ) {
              distinct.push(data[i].mappedFunctions);
              unique[data[i].mappedFunctions] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortmappedFunctions.push({
              mappedFunctions: distinct[i],
            });
            self.state.sortFiltermappedFunctions.push({
              mappedFunctions: distinct[i],
            });
          }
        } else {
          self.setState({ StoreUserData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  ////get Brand data for dropdown
  handleGetBrandData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ brandData: data });
        } else {
          self.setState({ brandData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  ////get Store Code for dropdown
  handleGetstoreCodeData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Store/StoreList",
      headers: authHeader(),
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ storeCodeData: data });
        } else {
          self.setState({ storeCodeData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  /// handle Get Department Data by Brand and store id  for dropdown list
  handleGetDepartmentData(brand_id, store_id) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindDepartmentByBrandAndStore",
      headers: authHeader(),
      params: {
        BrandID: brand_id,
        storeID: store_id,
      },
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ departmentData: data });
        } else {
          self.setState({ departmentData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  /// handle Get Function data by department id for drop down list
  handleGetFunctionData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: {
        DepartmentId: this.state.selectDepartment,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ functionData: data });
        } else {
          self.setState({ functionData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  ////get User Designation data for dropdown
  handleGetUserDesignationData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreHierarchy/GetStoreDesignationList",
      headers: authHeader(),
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ userDesignationData: data });
        } else {
          self.setState({ userDesignationData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  /// handle get Repotee designation by Designation id for dropdown
  handleGetRepoteeDesignationData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreReporteeDesignation",
      headers: authHeader(),
      params: {
        DesignationID: this.state.selectDesignation,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ reportDesignation: data });
        } else {
          self.setState({ reportDesignation: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle get Report to data by designation id and isStoreUser for dropdown list
  handleGetReportToData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreReportToUser",
      headers: authHeader(),
      params: {
        DesignationID: this.state.selectReportDesignation,
        IsStoreUser: true,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ reportToData: data });
        } else {
          self.setState({ reportToData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  //// handle get Claim category data by BrandIds for dropdown
  handleGetClaimCategoryData() {
    debugger;
    let self = this;
    let finalBrandIds = "";
    if (this.state.selectedClaimBrand !== null) {
      for (let i = 0; i < this.state.selectedClaimBrand.length; i++) {
        finalBrandIds += this.state.selectedClaimBrand[i].brandID + ",";
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimCategory",
      headers: authHeader(),
      params: {
        BrandIds: finalBrandIds.substring(",", finalBrandIds.length - 1),
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ claimCategoryData: data });
        } else {
          self.setState({ claimCategoryData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  //// handle get claim Sub category data for dropdown
  handleGetClaimSubCategoryData() {
    debugger;
    let self = this;
    let finalCategoryIds = "";
    if (this.state.selectedClaimCategory !== null) {
      for (let i = 0; i < this.state.selectedClaimCategory.length; i++) {
        finalCategoryIds +=
          this.state.selectedClaimCategory[i].categoryID + ",";
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimSubCategory",
      headers: authHeader(),
      params: {
        CategoryIDs: finalCategoryIds.substring(
          ",",
          finalCategoryIds.length - 1
        ),
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ claimSubCategoryData: data });
        } else {
          self.setState({ claimSubCategoryData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle get claim Issue Type data for dropdown
  handleGetClaimIssueType() {
    debugger;
    let self = this;
    let finalSubCategoryIds = "";
    if (this.state.selectedClaimSubCategory !== null) {
      for (let i = 0; i < this.state.selectedClaimSubCategory.length; i++) {
        finalSubCategoryIds +=
          this.state.selectedClaimSubCategory[i].subCategoryID + ",";
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimIssueType",
      headers: authHeader(),
      params: {
        subCategoryIDs: finalSubCategoryIds.substring(
          ",",
          finalSubCategoryIds.length - 1
        ),
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ claimIssueTypeData: data });
        } else {
          self.setState({ claimIssueTypeData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ////get Crm Role data for dropdown
  handleGetCRMRole() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCRMRole/GetStoreCRMRoleDropdown",
      headers: authHeader(),
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ CrmRoleData: data });
        } else {
          self.setState({ CrmRoleData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  /// Delete store user by user id
  handleDeleteStoreUser(Id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/DeleteStoreUser",
      headers: authHeader(),
      params: {
        UserId: Id,
        IsStoreUser: true,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetStoreUserGridData();
          NotificationManager.success("User Deleted Successfully.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
/// get data for Store User by User id
  handleGetUserListByID(user_Id){
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreUserDetailsByUserID",
      headers: authHeader(),
      params: {
        UserID: user_Id
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ userEditData: data });
          self.EditStoreUserData(data);
        } else {
          self.setState({ userEditData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  //// handle Save Store Details
  handleSaveStoreDetails() {
    debugger;
    if (this.state.selectBrand > 0 && this.state.selectStore > 0) {
      alert("Store Details");
      this.setState({
        checkPersonalDetailTab: "#personal-details",
      });
    } else {
      this.setState({
        brandCompulsory: "Please Select Brand.",
        storeCodeCompulsory: "Please Select Store Code.",
      });
    }
  }
  //// handle Save Personal Details
  handleSavePersonalDetails() {
    debugger;
    let self = this;
    if (
      this.state.userName.length > 0 &&
      this.state.mobile_no.length > 0 &&
      this.state.email_Id.length > 0 &&
      this.state.emailFlag === true &&
      this.state.phoneFlag === true
    ) {
      axios({
        method: "post",
        url: config.apiUrl + "/StoreUser/AddStoreUserPersonalDetail",
        headers: authHeader(),
        data: {
          UserName: this.state.userName.trim(),
          MobileNo: this.state.mobile_no,
          EmailID: this.state.email_Id.trim(),
          FirstName: "",
          LastName: "",
          IsStoreUser: true,
        },
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success") {
            NotificationManager.success("Record Saved Successfully.");
            self.setState({
              user_ID: data,
              personalReadOnly: true,
              checkProfileDetailTab: "#profile-Details",
            });
          } else {
            NotificationManager.error("Record Not Save.");
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        userNameCompulsory: "Please Enter User Name.",
        mobilenumberCompulsory: "Please Enter Mobile No.",
        emailCompulsory: "Please Enter Email Id.",
      });
    }
  }
  //// handle save profile details
  handleSaveProfileDetails() {
    debugger;
    let self = this;
    if (
      this.state.selectDepartment > 0 &&
      this.state.selectedFunction.length > 0 &&
      this.state.selectDesignation > 0 &&
      this.state.selectReportDesignation > 0 &&
      this.state.selectReportTo > 0
    ) {
      if (this.state.user_ID) {
        var function_ids = "";
        if (this.state.selectedFunction !== null) {
          for (let i = 0; i < this.state.selectedFunction.length; i++) {
            function_ids += this.state.selectedFunction[i].functionID + ",";
          }
        }
        axios({
          method: "post",
          url: config.apiUrl + "/StoreUser/AddStoreUserProfileDetail",
          headers: authHeader(),
          params: {
            userID: this.state.user_ID,
            BrandID: this.state.selectBrand,
            storeID: this.state.selectStore,
            departmentId: this.state.selectDepartment,
            functionIDs: function_ids.substring(",", function_ids.length - 1),
            designationID: this.state.selectDesignation,
            reporteeID: this.state.selectReportTo,
          },
        })
          .then(function(res) {
            debugger;
            let status = res.data.message;
            // let data = res.data.responseData;
            if (status === "Success") {
              NotificationManager.success("Record Saved Successfully.");
              self.setState({
                checkMappedClaimCategoryTab: "#mapped-category",
                profileReadOnly: true,
              });
            } else {
              NotificationManager.error("Record Not Saved.");
            }
          })
          .catch((data) => {
            console.log(data);
          });
      } else {
        NotificationManager.error("Please Enter Personal Details.");
      }
    } else {
      this.setState({
        departmentCompulsory: "Please Select Department.",
        functionCompulsory: "Please Select Function.",
        designationCompulsory: "Please Select User Designation.",
        reportDesignationCompulsory: "Please Select Reportee Designation.",
        reportToCompulsory: "Please Select Report To.",
      });
    }
  }
  //// final save User data
  handleFinalSaveUserData() {
    debugger;
    if (
      this.state.selectedClaimBrand.length > 0 &&
      this.state.selectedClaimCategory.length > 0 &&
      this.state.selectedClaimSubCategory.length > 0 &&
      this.state.selectedClaimIssueType.length > 0 &&
      this.state.selectClaimApprover.length > 0 &&
      this.state.selectCrmRole.length > 0 &&
      this.state.selectStatus.length > 0
    ) {
      let self = this;
      if (this.state.user_ID) {
        var brand_ids = "";
        var category_ids = "";
        var SubCat_ids = "";
        var issueType_ids = "";
        var isActive = 0;
        var claimStatus = 0;
        if (this.state.selectedClaimBrand !== null) {
          for (let i = 0; i < this.state.selectedClaimBrand.length; i++) {
            brand_ids += this.state.selectedClaimBrand[i].brandID + ",";
          }
        }
        if (this.state.selectedClaimCategory !== null) {
          for (let i = 0; i < this.state.selectedClaimCategory.length; i++) {
            category_ids +=
              this.state.selectedClaimCategory[i].categoryID + ",";
          }
        }
        if (this.state.selectedClaimSubCategory !== null) {
          for (let i = 0; i < this.state.selectedClaimSubCategory.length; i++) {
            SubCat_ids +=
              this.state.selectedClaimSubCategory[i].subCategoryID + ",";
          }
        }
        if (this.state.selectedClaimIssueType !== null) {
          for (let i = 0; i < this.state.selectedClaimIssueType.length; i++) {
            issueType_ids +=
              this.state.selectedClaimIssueType[i].issueTypeID + ",";
          }
        }
        if (this.state.selectStatus === "Active") {
          isActive = 1;
        } else {
          isActive = 0;
        }
        if (this.state.selectClaimApprover === "yes") {
          claimStatus = 1;
        } else {
          claimStatus = 0;
        }
        axios({
          method: "post",
          url: config.apiUrl + "/StoreUser/AddStoreUserMappingCategory",
          headers: authHeader(),
          data: {
            UserID: this.state.user_ID,
            BrandIDs: brand_ids.substring(",", brand_ids.length - 1),
            CategoryIds: category_ids.substring(",", category_ids.length - 1),
            SubCategoryIds: SubCat_ids.substring(",", SubCat_ids.length - 1),
            IssuetypeIds: issueType_ids.substring(
              ",",
              issueType_ids.length - 1
            ),
            isClaimApprover: claimStatus,
            CRMRoleID: this.state.selectCrmRole,
            isActive: isActive,
            IsStoreUser: true,
          },
        })
          .then(function(res) {
            debugger;
            let status = res.data.message;
            if (status === "Success") {
              NotificationManager.success("Record Saved Successfully.");
              self.setState({
                profileReadOnly: true,
              });
            } else {
              NotificationManager.error("Record Not Saved.");
            }
          })
          .catch((data) => {
            console.log(data);
          });
      } else {
        NotificationManager.error("Please Enter Personal Details.");
      }
    } else {
      this.setState({
        mappedBrandCompulsory: "Please Select Brand.",
        mappedCategoryCompulsory: "Please Select Category.",
        mappedSubCategoryCompulsory: "Please Select Sub Category.",
        mappedIssueTypeCompulsory: "Please Select Issue Type.",
        ClaimApproverCompulsory: "Please Select Claim Approver.",
        CrmRoleCompulsory: "Please Select Crm Role.",
        statusCompulsory: "Please Select Status.",
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
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
              <a
                href=""
                style={{ margin: "0 25px", textDecoration: "underline" }}
                onClick={this.setSortCheckStatus.bind(this, "all")}
              >
                clear search
              </a>
              <div className="filter-type">
                <p>FILTER BY TYPE</p>
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
                        this.state.sitemCodeFilterCheckbox.includes("all") ||
                        this.state.sbrandNameFilterCheckbox.includes("all") ||
                        this.state.suserNameFilterCheckbox.includes("all") ||
                        this.state.sdesignationNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.sreporteeNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.sdepartmentNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.smappedFunctionsFilterCheckbox.includes(
                          "all"
                        )
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "storeCode"
                    ? this.state.sortFilteritemCode !== null &&
                      this.state.sortFilteritemCode.map((item, i) => (
                        <div className="filter-checkbox" key={i}>
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.storeCode}
                            value={item.storeCode}
                            checked={this.state.sitemCodeFilterCheckbox.includes(
                              item.storeCode
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "storeCode",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.storeCode}>
                            <span className="table-btn table-blue-btn">
                              {item.storeCode}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "brandName"
                    ? this.state.sortFilterbrandName !== null &&
                      this.state.sortFilterbrandName.map((item, b) => (
                        <div className="filter-checkbox" key={b}>
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

                  {this.state.sortColumn === "userName"
                    ? this.state.sortFilteruserName !== null &&
                      this.state.sortFilteruserName.map((item, u) => (
                        <div className="filter-checkbox" key={u}>
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.userName}
                            value={item.userName}
                            checked={this.state.suserNameFilterCheckbox.includes(
                              item.userName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "userName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.userName}>
                            <span className="table-btn table-blue-btn">
                              {item.userName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "designationName"
                    ? this.state.sortFilterdesignationName !== null &&
                      this.state.sortFilterdesignationName.map((item, d) => (
                        <div className="filter-checkbox" key={d}>
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.designationName}
                            value={item.designationName}
                            checked={this.state.sdesignationNameFilterCheckbox.includes(
                              item.designationName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "designationName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.designationName}>
                            <span className="table-btn table-blue-btn">
                              {item.designationName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {this.state.sortColumn === "reporteeName"
                    ? this.state.sortFilterreporteeName !== null &&
                      this.state.sortFilterreporteeName.map((item, r) => (
                        <div className="filter-checkbox" key={r}>
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.reporteeName}
                            value={item.reporteeName}
                            checked={this.state.sreporteeNameFilterCheckbox.includes(
                              item.reporteeName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "reporteeName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.reporteeName}>
                            <span className="table-btn table-blue-btn">
                              {item.reporteeName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {this.state.sortColumn === "departmentName"
                    ? this.state.sortFilterdepartmentName !== null &&
                      this.state.sortFilterdepartmentName.map((item, j) => (
                        <div className="filter-checkbox" key={j}>
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.departmentName}
                            value={item.departmentName}
                            checked={this.state.sdepartmentNameFilterCheckbox.includes(
                              item.departmentName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "departmentName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.departmentName}>
                            <span className="table-btn table-blue-btn">
                              {item.departmentName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {this.state.sortColumn === "mappedFunctions"
                    ? this.state.sortFiltermappedFunctions !== null &&
                      this.state.sortFiltermappedFunctions.map((item, i) => (
                        <div className="filter-checkbox" key={i}>
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.mappedFunctions}
                            value={item.mappedFunctions}
                            checked={this.state.smappedFunctionsFilterCheckbox.includes(
                              item.mappedFunctions
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "mappedFunctions",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.mappedFunctions}>
                            <span className="table-btn table-blue-btn">
                              {item.mappedFunctions}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </Modal>
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
            User Master
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height StoreUserReact">
                  <ReactTable
                    data={this.state.StoreUserData}
                    columns={[
                      {
                        Header: (
                          <span
                            className={this.state.brandNameColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "brandName",
                              "Brand Name"
                            )}
                          >
                            Brand Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "brandName",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.storeCodeColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "storeCode",
                              "Store Code"
                            )}
                          >
                            Store Code
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "storeCode",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.userNameColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "userName",
                              "User Name"
                            )}
                          >
                            User Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "userName",
                        Cell: (row) => {
                          var ids = row.original["userID"];
                          return (
                            <div>
                              <span>
                                {row.original.userName}
                                <Popover
                                  content={
                                    <div>
                                      <div>
                                        <p className="title">
                                          <b>Mobile No: </b>
                                          {row.original.mobileNo}
                                        </p>
                                        <p className="title">
                                          <b>Email ID: </b>
                                          {row.original.emailID}
                                        </p>
                                        <p className="title">
                                          <b>CRM Role: </b>
                                          {row.original.roleName}
                                        </p>
                                        <p className="title">
                                          <b>Brand: </b>
                                          {row.original.mappedBrand}
                                        </p>
                                        <p className="title">
                                          <b>Claim Category: </b>
                                          {row.original.categoryCount.length > 0
                                            ? row.original.categoryCount
                                            : row.original.mappedCategory}
                                        </p>
                                        <p className="title">
                                          <b>Claim Sub-Category: </b>
                                          {row.original.subCategoryCount
                                            .length > 0
                                            ? row.original.subCategoryCount
                                            : row.original.mappedSubCategory}
                                        </p>
                                        <p className="title">
                                          <b>Claim Issue Type: </b>
                                          {row.original.issueTypeCount.length >
                                          0
                                            ? row.original.issueTypeCount
                                            : row.original.mappedIssuetype}
                                        </p>
                                        <p className="title">
                                          <b>Created By: </b>
                                          {row.original.createdBy}
                                        </p>
                                        <p className="title">
                                          <b>Create Date: </b>
                                          {row.original.createdDate}
                                        </p>
                                        <p className="title">
                                          <b>Updated By: </b>
                                          {row.original.updatedBy}
                                        </p>
                                        <p className="title">
                                          <b>Updated Date: </b>
                                          {row.original.updatedDate}
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
                                    id={ids}
                                  />
                                </Popover>
                              </span>
                            </div>
                          );
                        },
                      },
                      {
                        Header: (
                          <span
                            className={this.state.userdesignationColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "designationName",
                              "User Designation"
                            )}
                          >
                            User Designation
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "designationName",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.reporteeNameColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "reporteeName",
                              " Reportee Name"
                            )}
                          >
                            Reportee Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "reporteeName",
                        Cell: (row) => {
                          var ids = row.original["userID"];
                          return (
                            <div>
                              <span>
                                Naman
                                <Popover
                                  content={
                                    <div>
                                      <div>
                                        <p className="title">
                                          <b> Reportee Designation:</b>
                                          {row.original.reporteeDesignation}
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
                                    id={ids}
                                  />
                                </Popover>
                              </span>
                            </div>
                          );
                        },
                      },
                      {
                        Header: (
                          <span
                            className={this.state.departmentColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "departmentName",
                              "Department"
                            )}
                          >
                            Department
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "departmentName",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.functionColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "mappedFunctions",
                              "Function"
                            )}
                          >
                            Function
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "mappedFunctions",
                      },
                      {
                        Header: <span>Actions</span>,
                        accessor: "userID",
                        Cell: (row) => {
                          var ids = row.original["userID"];
                          return (
                            <>
                              <span>
                                <Popover
                                  content={
                                    <div
                                      className="samdel d-flex general-popover popover-body"
                                      id={"samdel" + ids}
                                    >
                                      <div className="del-big-icon">
                                        <img src={DelBigIcon} alt="del-icon" />
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
                                          <a href={Demo.BLANK_LINK}>CANCEL</a>
                                          <button
                                            className="butn"
                                            onClick={this.handleDeleteStoreUser.bind(
                                              this,
                                              row.original.userID
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
                                  />
                                </Popover>

                                <button
                                  className="react-tabel-button editre"
                                  onClick={this.handleGetUserListByID.bind(
                                    this,
                                    row.original.userID
                                  )}
                                  // onClick={() => this.opneUserEditModal()}
                                >
                                  EDIT
                                </button>
                              </span>
                            </>
                          );
                        },
                      },
                    ]}
                    defaultPageSize={10}
                    minRows={2}
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
              </div>
              <div className="col-md-4 cus-drp">
                <div className="right-sect-div right-sect-collapse">
                  <h3>Create Users</h3>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#personal-details"
                      role="button"
                      aria-expanded="true"
                      aria-controls="personal-details"
                    >
                      Store Details
                    </a>
                    <div className="multi-collapse show" id="personal-details">
                      <div className="div-cntr">
                        <label>Brand</label>
                        <select
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input store-create-select"
                              : "store-create-select"
                          }
                          disabled={this.state.profileReadOnly}
                          name="brandName"
                          value={this.state.selectBrand}
                          onChange={this.handleBrandAndStoreChange}
                        >
                          <option>Select</option>
                          {this.state.brandData !== null &&
                            this.state.brandData.map((item, i) => (
                              <option
                                key={i}
                                value={item.brandID}
                                className="select-category-placeholder"
                              >
                                {item.brandName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectBrand === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.brandCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Store Code</label>
                        <select
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input store-create-select"
                              : "store-create-select"
                          }
                          disabled={this.state.profileReadOnly}
                          name="storeCode"
                          value={this.state.selectStore}
                          onChange={this.handleBrandAndStoreChange}
                        >
                          <option>Select</option>
                          {this.state.storeCodeData !== null &&
                            this.state.storeCodeData.map((item, s) => (
                              <option
                                key={s}
                                value={item.storeID}
                                className="select-category-placeholder"
                              >
                                {item.storeCode}
                              </option>
                            ))}
                        </select>
                        {this.state.selectStore === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.storeCodeCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="btn-coll">
                        <button
                          data-target={this.state.checkPersonalDetailTab}
                          data-toggle="collapse"
                          className="butn"
                          onClick={this.handleSaveStoreDetails.bind(this)}
                        >
                          SAVE &amp; NEXT
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#personal-details"
                      role="button"
                      aria-expanded="false"
                      aria-controls="personal-details"
                    >
                      Personal Details
                    </a>
                    <div
                      className="collapse multi-collapse"
                      id="personal-details"
                    >
                      <div className="div-cntr">
                        <label>User Name</label>
                        <input
                          type="text"
                          placeholder="Enter User Name"
                          maxLength={25}
                          autoComplete="off"
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="userName"
                          value={this.state.userName}
                          onChange={this.handleOnChangeUserData}
                        />
                        {this.state.userName.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.userNameCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Mobile Number</label>
                        <input
                          type="text"
                          placeholder="Enter Mobile Number"
                          maxLength={10}
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="mobile_no"
                          value={this.state.mobile_no}
                          onChange={this.hanldeMobileNoChange}
                          autoComplete="off"
                        />
                        {this.state.phoneFlag === false && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            Please enter valid Mobile Number.
                          </p>
                        )}
                        {this.state.mobile_no.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.mobilenumberCompulsory}
                          </p>
                        )}
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.mobileValidation}
                        </p>
                      </div>
                      <div className="div-cntr">
                        <label>Email ID</label>
                        <input
                          type="text"
                          placeholder="Enter Email ID"
                          maxLength={100}
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="email_Id"
                          value={this.state.email_Id}
                          onChange={this.handleOnChangeUserData}
                          autoComplete="off"
                        />
                        {this.state.emailFlag === false && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            Please enter valid Email Id.
                          </p>
                        )}
                        {this.state.email_Id.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.emailCompulsory}
                          </p>
                        )}
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.emailValidation}
                        </p>
                      </div>
                      <div className="btn-coll">
                        <button
                          data-target={this.state.checkProfileDetailTab}
                          data-toggle="collapse"
                          className="butn"
                          onClick={this.handleSavePersonalDetails.bind(this)}
                        >
                          SAVE &amp; NEXT
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#profile-Details"
                      role="button"
                      aria-expanded="false"
                      aria-controls="profile-Details"
                    >
                      Profile Details
                    </a>
                    <div
                      className="collapse multi-collapse"
                      id="profile-Details"
                    >
                      <div className="div-cntr">
                        <label>Department</label>
                        <select
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input store-create-select"
                              : "store-create-select"
                          }
                          disabled={this.state.profileReadOnly}
                          name="selectDepartment"
                          value={this.state.selectDepartment}
                          onChange={this.handleDepartmentOnChange}
                        >
                          <option>Select</option>
                          {this.state.departmentData !== null &&
                            this.state.departmentData.map((item, d) => (
                              <option
                                key={d}
                                value={item.departmentID}
                                className="select-category-placeholder"
                              >
                                {item.departmentName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectDepartment === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.departmentCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Function</label>
                        <Select
                          getOptionLabel={(option) => option.funcationName}
                          getOptionValue={(option) => option.functionID}
                          options={this.state.functionData}
                          placeholder="Select"
                          closeMenuOnSelect={false}
                          name="selectedFunction"
                          onChange={this.handleFunctionOnChange.bind(this)}
                          value={this.state.selectedFunction}
                          isMulti
                          isDisabled={this.state.profileReadOnly}
                        />
                        {this.state.selectedFunction.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.functionCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>User Designation</label>
                        <select
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input store-create-select"
                              : "store-create-select"
                          }
                          disabled={this.state.profileReadOnly}
                          name="selectDesignation"
                          value={this.state.selectDesignation}
                          onChange={this.handleDropDownOnChange}
                        >
                          <option>Select</option>
                          {this.state.userDesignationData !== null &&
                            this.state.userDesignationData.map((item, d) => (
                              <option
                                key={d}
                                value={item.designationID}
                                className="select-category-placeholder"
                              >
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectDesignation === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.designationCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Reportee Designation</label>
                        <select
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input store-create-select"
                              : "store-create-select"
                          }
                          disabled={this.state.profileReadOnly}
                          name="selectReportDesignation"
                          value={this.state.selectReportDesignation}
                          onChange={this.handleDropDownOnChange}
                        >
                          <option>Select</option>
                          {this.state.reportDesignation !== null &&
                            this.state.reportDesignation.map((item, d) => (
                              <option
                                key={d}
                                value={item.designationID}
                                className="select-category-placeholder"
                              >
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectReportDesignation === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.reportDesignationCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Report To</label>
                        <select
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input store-create-select"
                              : "store-create-select"
                          }
                          disabled={this.state.profileReadOnly}
                          name="selectReportTo"
                          value={this.state.selectReportTo}
                          onChange={this.handleDropDownOnChange}
                        >
                          <option>Select</option>
                          {this.state.reportToData !== null &&
                            this.state.reportToData.map((item, d) => (
                              <option
                                key={d}
                                value={item.user_ID}
                                className="select-category-placeholder"
                              >
                                {item.agentName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectReportTo === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.reportToCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="btn-coll">
                        <button
                          data-target={this.state.checkMappedClaimCategoryTab}
                          data-toggle="collapse"
                          className="butn"
                          onClick={this.handleSaveProfileDetails.bind(this)}
                        >
                          SAVE &amp; NEXT
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#mapped-category"
                      role="button"
                      aria-expanded="false"
                      aria-controls="mapped-category"
                    >
                      Mapped Claim Category
                    </a>
                    <div
                      className="collapse multi-collapse"
                      id="mapped-category"
                    >
                      <div className="div-cntr">
                        <label>Brand</label>
                        <Select
                          getOptionLabel={(option) => option.brandName}
                          getOptionValue={(option) => option.brandID}
                          options={this.state.brandData}
                          placeholder="Select"
                          closeMenuOnSelect={false}
                          name="selectedClaimBrand"
                          onChange={this.handleMultiBrandonChange.bind(this)}
                          value={this.state.selectedClaimBrand}
                          isMulti
                        />
                        {this.state.selectedClaimBrand.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.mappedBrandCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Categories</label>
                        <Select
                          getOptionLabel={(option) => option.categoryName}
                          getOptionValue={(option) => option.categoryID}
                          options={this.state.claimCategoryData}
                          placeholder="Select"
                          closeMenuOnSelect={false}
                          name="selectedClaimCategory"
                          onChange={this.handleMultiCategoryonChange.bind(this)}
                          value={this.state.selectedClaimCategory}
                          isMulti
                        />
                        {this.state.selectedClaimCategory.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.mappedCategoryCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Sub Categories</label>
                        <Select
                          getOptionLabel={(option) => option.subCategoryName}
                          getOptionValue={(option) => option.subCategoryID}
                          options={this.state.claimSubCategoryData}
                          placeholder="Select"
                          closeMenuOnSelect={false}
                          name="selectedClaimSubCategory"
                          onChange={this.handleMultiSubCategoryonChange.bind(
                            this
                          )}
                          value={this.state.selectedClaimSubCategory}
                          isMulti
                        />
                        {this.state.selectedClaimSubCategory.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.mappedSubCategoryCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Issue Type</label>
                        <Select
                          getOptionLabel={(option) => option.issueTypeName}
                          getOptionValue={(option) => option.issueTypeID}
                          options={this.state.claimIssueTypeData}
                          placeholder="Select"
                          closeMenuOnSelect={false}
                          name="selectedClaimIssueType"
                          onChange={this.handleMultiIssueTypeonChange.bind(
                            this
                          )}
                          value={this.state.selectedClaimIssueType}
                          isMulti
                        />
                        {this.state.selectedClaimIssueType.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.mappedIssueTypeCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Claim Approver</label>
                        <select
                          name="selectClaimApprover"
                          value={this.state.selectClaimApprover}
                          onChange={this.handleDropDownOnChange}
                          className="store-create-select"
                        >
                          <option>Select</option>
                          <option value={"yes"}>Yes</option>
                          <option value={"no"}>No</option>
                        </select>
                        {this.state.selectClaimApprover.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.ClaimApproverCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="mapped-cate-extra">
                        <div className="div-cntr">
                          <label>CRM Role</label>
                          <select
                           className="store-create-select"
                            name="selectCrmRole"
                            value={this.state.selectCrmRole}
                            onChange={this.handleDropDownOnChange}
                          >
                            <option>Select</option>
                            {this.state.CrmRoleData !== null &&
                              this.state.CrmRoleData.map((item, d) => (
                                <option
                                  key={d}
                                  value={item.crmRoleID}
                                  className="select-category-placeholder"
                                >
                                  {item.roleName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectCrmRole === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.CrmRoleCompulsory}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr">
                          <label>Status</label>
                          <select
                            name="selectStatus"
                            value={this.state.selectStatus}
                            onChange={this.handleDropDownOnChange}
                            className="store-create-select"
                          >
                            <option>Select</option>
                            {this.state.activeData !== null &&
                              this.state.activeData.map((item, j) => (
                                <option key={j} value={item.ActiveID}>
                                  {item.ActiveName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectStatus === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.statusCompulsory}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="btn-coll">
                        <button
                          className="butn"
                          type="button"
                          onClick={this.handleFinalSaveUserData.bind(this)}
                        >
                          ADD
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
            <Modal
              open={this.state.UserEditmodel}
              onClose={this.closeEditModals}
              modalId="UsEdit-popup"
            >
              <div>
                <Tabs
                  onSelect={(index, label) => this.setState({ selTab: label })}
                  selected={this.state.selTab}
                >
                  <Tab label="Store Details">
                    <div>
                      <div className="div-cntr">
                        <label>Brand</label>
                        <select className="form-control dropdown-setting">
                          <option>Bata</option>
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Store Code</label>
                        <select className="form-control dropdown-setting">
                          <option>Store</option>
                        </select>
                      </div>
                      <div className="btn-coll">
                        <button
                          data-target="#profile-details"
                          data-toggle="collapse"
                          className="butn"
                        >
                          SAVE &amp; NEXT
                        </button>
                      </div>
                    </div>
                  </Tab>
                  <Tab label="Personal Details">
                    <div>
                      <div className="div-cntr">
                        <label>User Name</label>
                        <input
                          type="text"
                          placeholder="Enter User Name"
                          maxLength={25}
                        />
                      </div>
                      <div className="div-cntr">
                        <label>Mobile Number</label>
                        <input
                          type="text"
                          placeholder="Enter Mobile Number"
                          maxLength={10}
                        />
                      </div>
                      <div className="div-cntr">
                        <label>Email ID</label>
                        <input
                          type="text"
                          placeholder="Enter Email ID"
                          maxLength={100}
                        />
                      </div>
                      <div className="btn-coll">
                        <button
                          data-target="#mapped-category"
                          data-toggle="collapse"
                          className="butn"
                        >
                          SAVE &amp; NEXT
                        </button>
                      </div>
                    </div>
                  </Tab>
                  <Tab label="Profile Details">
                    <div>
                      <div className="div-cntr">
                        <label>Department</label>
                        <select>
                          <option>Admin</option>
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Function</label>
                        <select>
                          <option>Attendence</option>
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>User Designation</label>
                        <select>
                          <option>Manager</option>
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Reportee Designation</label>
                        <select>
                          <option>HOD</option>
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Report To</label>
                        <select>
                          <option>HOD</option>
                        </select>
                      </div>
                      <div className="btn-coll">
                        <button className="butn">SAVE & NEXT</button>
                      </div>
                    </div>
                  </Tab>
                  <Tab label="Mapped Cliam Category">
                    {" "}
                    <div>
                      <div className="div-cntr">
                        <label>Brand</label>
                        <select>
                          <option>Bata, PVR</option>
                          <option>Bata, PVR</option>
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Categories</label>
                        <select>
                          <option>Compliant</option>
                          <option>Compliant</option>
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Sub Categories</label>
                        <select>
                          <option>Payments</option>
                          <option>Payments</option>
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Issue Type</label>
                        <select>
                          <option>Not Processed</option>
                          <option>Not Processed</option>
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Claim Approver</label>
                        <select>
                          <option>No</option>
                        </select>
                      </div>
                      <div className="mapped-cate-extra">
                        <div className="div-cntr">
                          <label>CRM Role</label>
                          <select>
                            <option>Manager</option>
                          </select>
                        </div>
                        <div className="div-cntr">
                          <label>Status</label>
                          <select>
                            <option>Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="btn-coll">
                        <button className="butn">ADD</button>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Modal>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StoreUsers;

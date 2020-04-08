import React, { Component } from "react";
import Demo from "../../../store/Hashtag.js";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
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
      user_ID: 0,
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
  }

  componentDidMount() {
    this.handleGetBrandData();
    this.handleGetstoreCodeData();
    this.handleGetUserDesignationData();
    this.handleGetCRMRole();
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
  // -------------------API Start------------------------
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
      alert("Finale data save");
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
    const dataStorUser = [
      {
        id: "H1",
        Desig: <span>Store Manager</span>,
        Report: <span>Root</span>,
        status: <span>Active</span>,
      },
      {
        id: "H2",
        Desig: <span>Store Executive</span>,
        Report: <span>Store Manager</span>,
        status: <span>Inactive</span>,
      },
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

    return (
      <React.Fragment>
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
            User Master
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height StoreUserReact">
                  <ReactTable
                    data={dataStorUser}
                    columns={[
                      {
                        Header: (
                          <span>
                            Brand Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "brandName",
                        Cell: (row) => <span>Bata1</span>,
                      },
                      {
                        Header: (
                          <span>
                            Store Code
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "storeCode",
                        Cell: (row) => <span>1234</span>,
                      },
                      {
                        Header: (
                          <span>
                            User Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "uName",
                        Cell: (row) => {
                          var ids = row.original["id"];
                          return (
                            <div>
                              <span>
                                Vikas
                                <Popover
                                  content={popoverData}
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
                          <span>
                            Reportee Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "ReporName",
                        Cell: (row) => {
                          var ids = row.original["id"];
                          return (
                            <div>
                              <span>
                                Naman
                                <Popover
                                  content={popoverData}
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
                          <span>
                            Department
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "Dept",
                        Cell: (row) => <span>IT</span>,
                      },
                      {
                        Header: (
                          <span>
                            Function
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "Fun",
                        Cell: (row) => <span>Infra</span>,
                      },
                    ]}
                    minRows={2}
                    defaultPageSize={10}
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
              <div className="col-md-4">
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
                          className="store-create-select"
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
                          className="store-create-select"
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
                          className="store-create-select"
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
                          className="store-create-select"
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
                          className="store-create-select"
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
                          className="store-create-select"
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StoreUsers;

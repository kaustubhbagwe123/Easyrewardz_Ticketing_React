import React, { Component, useState, useEffect } from "react";
import { authHeader } from "./../../helpers/authHeader";
import CancelIcon from "./../../assets/Images/cancel.png";
import BroadCastIcon from "./../../assets/Images/broadCast.png";
import BlackInfoIcon from "./../../assets/Images/Info-black.png";
import Sharevia from "./../../assets/Images/sharevia.png";
import Dropdown3 from "./../../assets/Images/dropdown3.png";
import Tick from "./../../assets/Images/tick.png";
import Whatsapp from "./../../assets/Images/whatsapp.svg";
import Sms1 from "./../../assets/Images/sms1.svg";
import ChatbotS from "./../../assets/Images/sms2.svg";
import collapsedown from "./../../assets/Images/collapsedown.png";
import collapseUp from "./../../assets/Images/collapseUp.png";
import axios from "axios";
import config from "./../../helpers/config";
import { Table, Popover, Radio } from "antd";
import DatePicker from "react-datepicker";
import Shoe from "./../../assets/Images/shoe.jpg";
import { Tabs, Tab } from "react-bootstrap-tabs/dist";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import { Collapse, CardBody, Card } from "reactstrap";
import Modal from "react-responsive-modal";
import Pagination from "./CampaignPagination";
// import ChildTablePagination from "./ChildTablePagination";

// import Demo from "./../../store/Hashtag";

class StoreCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstCollapse: false,
      TwoCollapse: false,
      campaignGridData: [],
      raisedTicketModal: false,
      custNameModal: false,
      ResponsiveCustModal: false,
      brandData: [],
      categoryData: [],
      subCategoryData: [],
      issueTypeData: [],
      CampChildTableData: [],
      modalData: {},
      isName: "",
      isMobile: "",
      isEmail: "",
      isBrand: "",
      isCategory: "",
      isSubCategory: "",
      isIssueType: "",
      isTiketTitle: "",
      isTiketDetails: "",
      loading: false,
      ChildTblLoading: false,
      broadcastChannel: 1,
      responsiveChildTable: false,
      responsiveShareVia: false,
      sortCustName: "",
      customerModalDetails: {},
      currentPage: 1,
      postsPerPage: 5,
      totalGridRecord: [],
      childCurrentPage: 1,
      ChildPostsPerPage: 5,
      childTotalGridRecord: [],
      ResponsiveBroadCast: false,
    };
    this.firstActionOpenClps = this.firstActionOpenClps.bind(this);
    this.twoActionOpenClps = this.twoActionOpenClps.bind(this);
    this.handleGetCampaignGridData = this.handleGetCampaignGridData.bind(this);
    this.handleGetCampaignCustomerData = this.handleGetCampaignCustomerData.bind(
      this
    );
    this.handleRaisedTicketModalClose = this.handleRaisedTicketModalClose.bind(
      this
    );
    this.handleRaisedTicketModalOpen = this.handleRaisedTicketModalOpen.bind(
      this
    );
  }

  componentDidMount() {
    this.handleGetCampaignGridData();
    this.handleGetBrand();
  }

  onResponseChange(campaignCustomerID, item, e) {
    //debugger;
    this.state.CampChildTableData.filter(
      (x) => x.id === campaignCustomerID
    )[0].responseID = parseInt(e.target.value);

    this.setState({ CampChildTableData: this.state.CampChildTableData });
  }

  onDateChange(campaignCustomerID, e) {
    this.state.CampChildTableData.filter(
      (x) => x.id === campaignCustomerID
    )[0].callRescheduledTo = e;
    this.setState({ CampChildTableData: this.state.CampChildTableData });
  }

  handleGetCampaignGridData() {
    let self = this;
    this.setState({
      loading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/GetCampaignDetails",
      headers: authHeader(),
    })
      .then(function(res) {
        //debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          const indexOfLastpost =
            self.state.currentPage * self.state.postsPerPage;
          const indexOfFirstpost = indexOfLastpost - self.state.postsPerPage;
          const currentPosts = data.slice(indexOfFirstpost, indexOfLastpost);
          self.setState({
            campaignGridData: currentPosts,
            loading: false,
            totalGridRecord: data.length,
          });
        } else {
          self.setState({
            campaignGridData: [],
            loading: false,
            totalGridRecord: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ///// Handle Update Campaign data
  handleUpdateCampaignResponse(
    id,
    responseID,
    callRescheduledTo,
    campaignScriptID
  ) {
    //debugger;
    if (responseID !== 0) {
      let self = this,
        calculatedCallReScheduledTo;
      var check = true;
      var Updatecheck = "";
      this.setState({
        loading: true,
      });

      if (responseID === 3) {
        calculatedCallReScheduledTo = moment(callRescheduledTo).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        calculatedCallReScheduledTo = "";
      }
      axios({
        method: "post",
        url: config.apiUrl + "/StoreCampaign/UpdateCampaignStatusResponse",
        headers: authHeader(),
        data: {
          CampaignCustomerID: id,
          ResponseID: responseID,
          CallReScheduledTo: calculatedCallReScheduledTo,
        },
      })
        .then(function(res) {
          //debugger;
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success("Record Updated Successfully.");
            self.handleGetCampaignCustomerData(
              check,
              Updatecheck,
              campaignScriptID
            );
          } else {
            self.setState({
              loading: false,
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      NotificationManager.error("Please Select Response.");
    }
  }

  handleCloseCampaign(campaignTypeID, e) {
    let self = this;
    this.setState({
      loading: true,
    });

    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/CloseCampaign",
      headers: authHeader(),
      params: {
        CampaignTypeID: campaignTypeID,
        IsClosed: 1,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Campaign closed successFully.");
          self.handleGetCampaignGridData();
        } else {
          self.setState({
            loading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  firstActionOpenClps() {
    this.setState((state) => ({ FirstCollapse: !state.FirstCollapse }));
  }
  twoActionOpenClps() {
    this.setState((state) => ({ TwoCollapse: !state.TwoCollapse }));
  }

  handleCreateTicket() {
    if (this.state.modalData.tiketTitle == "") {
      this.setState({ isTiketTitle: "Please Enter Ticket Title." });
    } else {
      this.setState({ isTiketTitle: "" });
    }
    if (this.state.modalData.tiketDetails == "") {
      this.setState({ isTiketDetails: "Please Enter Ticket Details." });
    } else {
      this.setState({ isTiketDetails: "" });
    }
    if (this.state.modalData.brandId == "") {
      this.setState({ isBrand: "Please select Brand." });
    } else {
      this.setState({ isBrand: "" });
    }
    if (this.state.modalData.cateogryId == "") {
      this.setState({ isCategory: "Please select Category." });
    } else {
      this.setState({ isCategory: "" });
    }
    if (this.state.modalData.subCategoryId == "") {
      this.setState({ isSubCategory: "Please select Sub Category." });
    } else {
      this.setState({ isSubCategory: "" });
    }
    if (this.state.modalData.issueTypeId == "") {
      this.setState({ isIssueType: "Please select Issue Type." });
    } else {
      this.setState({ isIssueType: "" });
    }

    setTimeout(() => {
      if (
        this.state.isTiketTitle == "" &&
        this.state.isTiketDetails == "" &&
        this.state.isBrand == "" &&
        this.state.isCategory == "" &&
        this.state.isSubCategory == "" &&
        this.state.isIssueType == ""
      ) {
        let self = this;

        const formData = new FormData();

        var paramData = {
          TicketTitle: this.state.modalData.tiketTitle,
          Ticketdescription: this.state.modalData.tiketDetails,
          CustomerID: this.state.modalData.customerId,
          BrandID: this.state.modalData.brandId,
          CategoryID: this.state.modalData.cateogryId,
          SubCategoryID: this.state.modalData.subCategoryId,
          IssueTypeID: this.state.modalData.issueTypeId,
          PriorityID: 73,
          ChannelOfPurchaseID: 29,
          Ticketnotes: "",
          taskMasters: [],
          StatusID: 101,
          TicketActionID: 201,
          IsInstantEscalateToHighLevel: 0,
          IsWantToAttachOrder: 1,
          TicketTemplateID: 0,
          TicketMailBody: "",
          IsWantToVisitedStore: 0,
          IsAlreadyVisitedStore: 0,
          TicketSourceID: 1,
          OrderItemID: "",
          StoreID: "",
          ticketingMailerQues: [],
        };
        formData.append("ticketingDetails", JSON.stringify(paramData));
        formData.append("Filedata", []);
        formData.append("orderDetails", null);
        formData.append("orderItemDetails", null);
        formData.append("storeDetails", null);

        // create ticket
        axios({
          method: "post",
          url: config.apiUrl + "/Ticketing/createTicket",
          headers: authHeader(),
          data: formData,
        })
          .then(function(res) {
            let Msg = res.data.status;
            // let TID = res.data.responseData;
            if (Msg) {
              NotificationManager.success(res.data.message);
              self.setState({ raisedTicketModal: false });
            } else {
              NotificationManager.error(res.data.message);
            }
          })
          .catch((data) => {
            console.log(data);
          });
      }
    }, 10);
  }

  ////handle raised ticket modal close
  handleRaisedTicketModalClose() {
    this.setState({
      raisedTicketModal: false,
    });
  }
  ////handle raised ticket modal open
  handleRaisedTicketModalOpen(row, item) {
    var modalData = {};
    modalData.name = row.customerName;
    modalData.customerId = row.customerID;
    modalData.mobile = row.customerPhoneNumber;
    modalData.email = row.customerEmailId;
    modalData.dateofbrith = row.dob;
    modalData.brandId = "";
    modalData.cateogryId = "";
    modalData.subCategoryId = "";
    modalData.issueTypeId = "";
    modalData.tiketTitle = "";
    modalData.tiketDetails = "";

    this.setState({
      modalData,
      raisedTicketModal: true,
      categoryData: [],
      subCategoryData: [],
      issueTypeData: [],
      isBrand: "",
      isCategory: "",
      isSubCategory: "",
      isIssueType: "",
      isTiketTitle: "",
      isTiketDetails: "",
    });
  }

  ////handle get brand list
  handleGetBrand() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var brandData = response.data.responseData;
        if (message == "Success" && brandData.length > 0) {
          self.setState({ brandData });
        } else {
          self.setState({ brandData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetBrand");
      });
  }
  ////handle get category by brand id list
  handleGetCateogory() {
    let self = this;

    var brandID = this.state.modalData.brandId;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader(),
      params: { BrandID: Number(brandID) },
    })
      .then(function(response) {
        var categoryData = response.data;
        if (categoryData.length > 0) {
          self.setState({ categoryData });
        } else {
          self.setState({ categoryData: [] });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCateogory");
      });
  }

  ////handle get sub category by category id list
  handleGetSubCateogory() {
    let self = this;
    var categoryID = this.state.modalData.cateogryId;
    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: { CategoryID: categoryID },
    })
      .then(function(response) {
        var message = response.data.message;
        var subCategoryData = response.data.responseData;
        if (message == "Success" && subCategoryData.length > 0) {
          self.setState({ subCategoryData });
        } else {
          self.setState({ subCategoryData: [] });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetSubCateogory");
      });
  }

  ////handle get issue type by sub category list
  handleGetIssueType() {
    let self = this;
    var subCategoryId = this.state.modalData.subCategoryId;
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: { SubCategoryID: subCategoryId },
    })
      .then(function(response) {
        var message = response.data.message;
        var issueTypeData = response.data.responseData;
        if (message == "Success" && issueTypeData.length > 0) {
          self.setState({ issueTypeData });
        } else {
          self.setState({ issueTypeData: [] });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetSubCateogory");
      });
  }

  handleOnchange = (e) => {
    const { name, value } = e.target;
    var modalData = this.state.modalData;
    if (name == "name") {
      if (value !== "") {
        modalData["name"] = value;
        this.setState({ modalData, isName: "" });
      } else {
        modalData["name"] = value;
        this.setState({ modalData, isName: "Please Enter Name." });
      }
    }
    if (name == "mobile") {
      if (value !== "") {
        modalData["mobile"] = value;
        this.setState({ modalData, isMobile: "" });
      } else {
        modalData["mobile"] = value;
        this.setState({ modalData, isMobile: "Please Enter Mobile No." });
      }
    }
    if (name == "email") {
      if (value !== "") {
        modalData["email"] = value;
        this.setState({ modalData, isEmail: "" });
      } else {
        modalData["email"] = value;
        this.setState({ modalData, isEmail: "Please Enter Email." });
      }
    }
    if (name == "dateofbrith") {
      if (value !== 0) {
        this.setState({
          priorityID: value,
          ispriority: "",
        });
      } else {
        this.setState({
          ispriority: "Please Select Priority.",
          priorityID: value,
        });
      }
    }
    if (name == "brand") {
      if (value !== "") {
        modalData["brandId"] = value;
        modalData["cateogryId"] = 0;
        modalData["subCategoryId"] = 0;
        modalData["issueTypeId"] = 0;
        this.setState({
          modalData,
          isBrand: "",
          categoryData: [],
          subCategoryData: [],
          issueTypeData: [],
        });
        setTimeout(() => {
          this.handleGetCateogory();
        }, 10);
      } else {
        modalData["brandId"] = value;
        modalData["cateogryId"] = 0;
        modalData["subCategoryId"] = 0;
        modalData["issueTypeId"] = 0;
        this.setState({
          modalData,
          isBrand: "Please Select Brand.",
          categoryData: [],
          subCategoryData: [],
          issueTypeData: [],
        });
      }
    }
    if (name == "category") {
      if (value !== "") {
        modalData["cateogryId"] = value;
        modalData["subCategoryId"] = 0;
        modalData["issueTypeId"] = 0;
        this.setState({
          modalData,
          isCategory: "",
          subCategoryData: [],
          issueTypeData: [],
        });
        setTimeout(() => {
          this.handleGetSubCateogory();
        }, 10);
      } else {
        modalData["cateogryId"] = value;
        modalData["subCategoryId"] = 0;
        modalData["issueTypeId"] = 0;
        this.setState({
          modalData,
          isCategory: "Please Select Category.",
          subCategoryData: [],
          issueTypeData: [],
        });
      }
    }
    if (name == "subCategory") {
      if (value !== "") {
        modalData["subCategoryId"] = value;
        modalData["issueTypeId"] = 0;
        this.setState({ modalData, isSubCategory: "", issueTypeData: [] });
        setTimeout(() => {
          this.handleGetIssueType();
        }, 10);
      } else {
        modalData["subCategoryId"] = value;
        modalData["issueTypeId"] = 0;
        this.setState({
          modalData,
          isSubCategory: "Please Select Sub Category.",
          issueTypeData: [],
        });
      }
    }
    if (name == "issueType") {
      if (value !== "") {
        modalData["issueTypeId"] = value;
        this.setState({ modalData, isIssueType: "" });
      } else {
        modalData["issueTypeId"] = value;
        this.setState({ modalData, isIssueType: "Please Select issueType." });
      }
    }
    if (name == "tiketTitle") {
      if (value !== "") {
        modalData["tiketTitle"] = value;
        this.setState({ modalData, isTiketTitle: "" });
      } else {
        modalData["tiketTitle"] = value;
        this.setState({
          modalData,
          isTiketTitle: "Please Enter Ticket Title.",
        });
      }
    }
    if (name == "tiketDetails") {
      if (value !== "") {
        modalData["tiketDetails"] = value;
        this.setState({ modalData, isTiketDetails: "" });
      } else {
        modalData["tiketDetails"] = value;
        this.setState({
          modalData,
          isTiketDetails: "Please Enter Tiket Details.",
        });
      }
    }
  };

  handleCustomerNameModalOpen(data) {
    //debugger;
    var strTag = data.customerName.split(" ");
    var sortName = strTag[0].charAt(0).toUpperCase();
    if (strTag.length === 1) {
      sortName = strTag[0].charAt(0).toUpperCase();
    } else {
      sortName += strTag[1].charAt(0).toUpperCase();
    }
    this.setState({
      custNameModal: true,
      customerModalDetails: data,
      sortCustName: sortName,
    });
  }
  handleCustomerNameModalClose() {
    this.setState({
      custNameModal: false,
    });
  }

  responsiveCustModalOpen() {
    this.setState({
      ResponsiveCustModal: true,
    });
  }
  responsiveCustModalClose() {
    this.setState({
      ResponsiveCustModal: false,
    });
  }
  handleShareViaModalOpen() {
    this.setState({
      responsiveShareVia: true,
    });
  }
  handleShareViaModalClose() {
    this.setState({
      responsiveShareVia: false,
    });
  }
  handleBroadCastModalOpen() {
    this.setState({
      ResponsiveBroadCast: true,
    });
  }
  handleBroadCastModalClose() {
    this.setState({
      ResponsiveBroadCast: false,
    });
  }
  handleBroadcastChange = (e) => {
    this.setState({
      broadcastChannel: e.target.value,
    });
  };

  handleToggleChildTable() {
    this.setState({
      responsiveChildTable: !this.state.responsiveChildTable,
    });
  }
  /// Handle Get Campaign customer details
  handleGetCampaignCustomerData(data, row, check) {
    //debugger;
    this.setState({
      ChildTblLoading: true,
      CampChildTableData: [],
    });
    var campaignId = 0;
    if (check !== undefined) {
      campaignId = check;
    } else {
      campaignId = row.campaignID;
    }
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/GetCampaignCustomer",
      headers: authHeader(),
      params: {
        campaignScriptID: campaignId,
        pageNo: 1,
        pageSize: 10,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var data = response.data.responseData;
        if (message == "Success") {
          const indexOfLastpost =
            self.state.childCurrentPage * self.state.ChildPostsPerPage;
          const indexOfFirstpost =
            indexOfLastpost - self.state.ChildPostsPerPage;
          const currentPosts = data.slice(indexOfFirstpost, indexOfLastpost);
          self.setState({
            CampChildTableData: data,
            ChildTblLoading: false,
            loading: false,
          });
        } else {
          self.setState({
            CampChildTableData: [],
            ChildTblLoading: false,
            loading: false,
          });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  /// Send Via Bot data
  handleSendViaBotData(data) {
    //debugger;
    // let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/CampaignShareChatbot",
      headers: authHeader(),
      data: {
        StoreID: data.storecode,
        ProgramCode: data.programcode,
        CustomerID: data.id,
        CustomerMobileNumber: data.customerNumber,
        StoreManagerId: data.storeManagerId,
        CampaignScriptID: data.campaignScriptID,
      },
    })
      .then(function(response) {
        //debugger;
        var message = response.data.message;
        // var data = response.data.responseData;
        if (message == "Success") {
          NotificationManager.success("Success.");
        } else {
          NotificationManager.error("Failed");
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  /// Send Via Messanger data
  handleSendViaMessanger(data) {
    //debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/CampaignShareMassanger",
      headers: authHeader(),
      data: {
        StoreID: data.storecode,
        ProgramCode: data.programcode,
        CustomerID: data.id,
        CustomerMobileNumber: data.customerNumber,
        StoreManagerId: data.storeManagerId,
        CampaignScriptID: data.campaignScriptID,
      },
    })
      .then(function(response) {
        //debugger;
        var message = response.data.message;
        var data = response.data.responseData;
        if (message == "Success") {
          window.open("//" + data, "_blank");
        } else {
          NotificationManager.error("Failed");
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  render() {
    return (
      <div className="custom-tableak">
        <div className="table-cntr store">
          <Table
            className="components-table-demo-nested antd-table-campaign custom-antd-table"
            columns={[
              {
                title: "Campaign Name",
                dataIndex: "campaignName",
                render: (row, item) => {
                  return (
                    <div>
                      <label className="customernamecam">
                        {item.campaignName}
                      </label>
                      <img
                        className="info-icon-cp hidedesk"
                        src={BlackInfoIcon}
                        alt="info-icon"
                        onClick={this.responsiveCustModalOpen.bind(this)}
                      />
                    </div>
                  );
                },
              },
              {
                title: "Customers",
                dataIndex: "customerCount",
              },
              {
                title: "Campaign Script",
                dataIndex: "campaignScript",
                className: "table-coloum-hide",
                render: (row, item) => {
                  return (
                    <div className="chatbotwid">
                      <Popover
                        overlayClassName="antcustom"
                        content={
                          <div className="insertpop1">
                            <div className="dash-creation-popup custompop">
                              <label className="poptitle">Chatbot Script</label>
                              <label className="channelScript">
                                {item.chatbotScript}
                              </label>
                            </div>
                          </div>
                        }
                        placement="bottom"
                      >
                        <a className="button-red">
                          <img
                            className="ico"
                            src={ChatbotS}
                            alt="Chatbot Icon"
                          />
                          Chatbot Script
                        </a>
                      </Popover>
                      <Popover
                        overlayClassName="antcustom"
                        content={
                          <div className="insertpop1">
                            <div className="dash-creation-popup custompop">
                              <label className="poptitle">SMS Script</label>
                              <label className="channelScript">
                                {item.smsScript}
                              </label>
                            </div>
                          </div>
                        }
                        placement="bottom"
                      >
                        <a className="button-blue">
                          <img
                            className="ico"
                            src={ChatbotS}
                            alt="Chatbot Icon"
                          />
                          SMS Script
                        </a>
                      </Popover>
                    </div>
                  );
                },
              },
              {
                title: "Campaign Period",
                dataIndex: "campaingPeriod",
                className: "table-coloum-hide",
              },
              {
                title: "Status",
                dataIndex: "status",
                className: "particular-hide",
                render: (row, item) => {
                  return (
                    <button
                      className="closebtn"
                      type="button"
                      // onClick={this.handleCloseCampaign.bind(
                      //   this,
                      //   row.campaignTypeID
                      // )}
                    >
                      <label className="hdrcloselabel">{item.status}</label>
                    </button>
                  );
                },
              },
              {
                title: "Actions",
                render: (row, item) => {
                  return (
                      <Popover
                      overlayClassName="antcustom antbroadcast"
                      content={
                        <div className="general-popover popover-body broadcastpop">
                          <label className="broadcasttitle">
                           Broadcast to Campaign Customers
                          </label>
                          <label className="broadcastsubtitle">Choose Channel</label>
                          <div>
                            <Radio.Group
                              onChange={this.handleBroadcastChange}
                              value={this.state.broadcastChannel}
                            >
                              <Radio className="broadChannel" value={1}>
                                Email
                              </Radio>
                              <Radio className="broadChannel" value={2}>
                                SMS
                              </Radio>
                              <Radio className="broadChannel" value={3}>
                                Whatsapp
                              </Radio>
                            </Radio.Group>
                          </div>
                          <button type="button" className="executebtn">Execute</button>
                        </div>
                      }
                      placement="bottom"
                      trigger="click"
                    >
                    <div className="broadcast-icon">
                    <img
                      src={BroadCastIcon}
                      alt="cancel-icone"
                      // onClick={this.handleBroadCastModalOpen.bind(this)}
                      className="broadcastimg"
                    />
                  </div>
                      
                    </Popover>
                   
                  );
                },
              },
            ]}
            expandedRowRender={(row, item) => {
              //debugger;
              return (
                <Table
                  dataSource={this.state.CampChildTableData.filter(
                    (x) => x.campaignScriptID === row.campaignID
                  )}
                  columns={[
                    {
                      title: "Customer Name",
                      dataIndex: "id",
                      render: (row, item) => {
                        return (
                          <div>
                            <p
                              className="cust-name"
                              onClick={this.handleCustomerNameModalOpen.bind(
                                this,
                                item
                              )}
                            >
                              {item.customerName}
                              <img
                                className="ico"
                                src={Whatsapp}
                                alt="Whatsapp Icon"
                              />
                            </p>
                            <span className="sml-fnt">
                              {item.customerNumber}
                            </span>
                          </div>
                        );
                      },
                    },
                    {
                      title: "Date",
                      dataIndex: "campaignDate",
                      className: "table-coloum-hide",
                    },
                    {
                      title: "Response",
                      className: "table-coloum-hide",
                      render: (row, item) => {
                        return (
                          <div>
                            <select
                              className="responceDrop-down dropdown-label"
                              value={item.responseID}
                              onChange={this.onResponseChange.bind(
                                this,
                                item.id,
                                item
                              )}
                            >
                              <option hidden>Select Response</option>
                              {item.hsCampaignResponseList !== null &&
                                item.hsCampaignResponseList.map((items, i) => (
                                  <option key={i} value={items.responseID}>
                                    {items.response}
                                  </option>
                                ))}
                            </select>
                          </div>
                        );
                      },
                    },
                    {
                      title: "Status",
                      dataIndex: "statusName",
                      render: (row, item) => {
                        return (
                          <div>
                            {item.statusID === 100 ? (
                              <label className="table-btnlabel contactBtnGreen">
                                {item.statusName}
                              </label>
                            ) : item.statusID === 101 ? (
                              <label className="table-btnlabel notConnectedBtnRed">
                                {item.statusName}
                              </label>
                            ) : item.statusID === 102 ? (
                              <label className="table-btnlabel followUpBtnYellow">
                                {item.statusName}
                              </label>
                            ) : null}
                          </div>
                        );
                      },
                    },
                    {
                      title: "Call Recheduled To",
                      className: "table-coloum-hide",
                      dataIndex: "pricePaid",
                      render: (row, item) => {
                        return (
                          <div
                            className={
                              item.responseID === 3 ? "" : "disabled-input"
                            }
                          >
                            <DatePicker
                              id="startDate"
                              autoComplete="off"
                              showTimeSelect
                              name="startDate"
                              showMonthDropdown
                              showYearDropdown
                              selected={
                                item.callRescheduledTo !== ""
                                  ? new Date(item.callRescheduledTo)
                                  : new Date()
                              }
                              dateFormat="MM/dd/yyyy h:mm aa"
                              value={
                                item.callRescheduledTo !== ""
                                  ? moment(item.callRescheduledTo)
                                  : ""
                              }
                              onChange={this.onDateChange.bind(this, item.id)}
                              className={
                                item.responseID === 3
                                  ? "txtStore dateTimeStore"
                                  : "txtStore dateTimeStore disabled-link"
                              }
                              placeholderText="Select Date &amp; Time"
                            />
                          </div>
                        );
                      },
                    },
                    {
                      title: "Actions",
                      render: (row, item) => {
                        return (
                          <div>
                            <div>
                              {this.state.responsiveChildTable ? (
                                <img
                                  className="info-icon-cp hidedesk"
                                  src={collapseUp}
                                  alt="collapseUp"
                                  onClick={this.handleToggleChildTable.bind(
                                    this
                                  )}
                                />
                              ) : (
                                <img
                                  className="info-icon-cp hidedesk"
                                  src={collapsedown}
                                  alt="collapsedown"
                                  onClick={this.handleToggleChildTable.bind(
                                    this
                                  )}
                                />
                              )}

                              <div className="hidedesk">
                                <Collapse
                                  isOpen={this.state.responsiveChildTable}
                                >
                                  <Card>
                                    <CardBody>
                                      <div className="innertabcollapse">
                                      <table>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <label>Customer Name</label>
                                            </td>
                                            <td>
                                              <label>
                                                {item.customerName}
                                                <span>{item.customerNumber}</span>
                                              </label>
                                            </td>
                                            <td>
                                              
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <label>Date</label>
                                            </td>
                                            <td>
                                              <label>
                                                {item.campaignDate}
                                              </label>
                                            </td>
                                            <td></td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <label>Response</label>
                                            </td>
                                            <td>
                                              <select
                                                className="responceDrop-down dropdown-label"
                                                value={item.responseID}
                                                onChange={this.onResponseChange.bind(
                                                  this,
                                                  item.id,
                                                  item
                                                )}
                                              >
                                                <option hidden>
                                                  Select Response
                                                </option>
                                                {item.hsCampaignResponseList !==
                                                  null &&
                                                  item.hsCampaignResponseList.map(
                                                    (items, i) => (
                                                      <option
                                                        key={i}
                                                        value={items.responseID}
                                                      >
                                                        {items.response}
                                                      </option>
                                                    )
                                                  )}
                                              </select>
                                            </td>
                                            <td></td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <label>Status</label>
                                            </td>
                                            <td>
                                              <label className="table-btnlabel notConnectedBtnRed">
                                                {item.statusName}
                                              </label>
                                            </td>
                                            <td></td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <label>Call Rescheduled to</label>
                                            </td>
                                            <td>
                                                  <div
                                                className={
                                                  item.responseID === 3
                                                    ? ""
                                                    : "disabled-input"
                                                }
                                              >
                                                <DatePicker
                                                  id="startDate"
                                                  autoComplete="off"
                                                  showTimeSelect
                                                  name="startDate"
                                                  showMonthDropdown
                                                  showYearDropdown
                                                  selected={
                                                    item.callRescheduledTo !== ""
                                                      ? new Date(
                                                          item.callRescheduledTo
                                                        )
                                                      : new Date()
                                                  }
                                                  dateFormat="MM/dd/yyyy h:mm aa"
                                                  value={
                                                    item.callRescheduledTo !== ""
                                                      ? moment(
                                                          item.callRescheduledTo
                                                        )
                                                      : ""
                                                  }
                                                  onChange={this.onDateChange.bind(
                                                    this,
                                                    item.id
                                                  )}
                                                  className={
                                                    item.responseID === 3
                                                      ? "txtStore dateTimeStore"
                                                      : "txtStore dateTimeStore disabled-link"
                                                  }
                                                  placeholderText="Select Date &amp; Time"
                                                />
                                              </div>
                                            </td>
                                            <td></td>
                                          </tr>
                                          <tr>
                                            <td>
                                                <button
                                                  className="saveBtn saveLabel"
                                                  type="button"
                                                  onClick={this.handleUpdateCampaignResponse.bind(
                                                    this,
                                                    item.id,
                                                    item.responseID,
                                                    item.callRescheduledTo,
                                                    item.campaignScriptID
                                                  )}
                                                >
                                                  Update
                                                </button>
                                                <button style={{ display: "none" }}>
                                                  Raise Ticket
                                                </button>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      </div>
                                    </CardBody>
                                  </Card>
                                </Collapse>
                              </div>
                            </div>
                            <div className="table-coloum-hide status-btn-camp">
                              <div>
                                <button
                                  className="saveBtn saveLabel"
                                  type="button"
                                  onClick={this.handleUpdateCampaignResponse.bind(
                                    this,
                                    item.id,
                                    item.responseID,
                                    item.callRescheduledTo,
                                    item.campaignScriptID
                                  )}
                                >
                                  Update
                                </button>
                              </div>
                              <div style={{ display: "none" }}>
                                <button
                                  className="raisedticket-Btn"
                                  type="button"
                                  // onClick={this.handleRaisedTicketModalOpen.bind(
                                  //   this,
                                  //   row,
                                  //   item
                                  // )}
                                >
                                  <label className="raise-ticketLbl">
                                    Raise Ticket
                                  </label>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      },
                    },
                  ]}
                  pagination={false}
                  loading={this.state.ChildTblLoading}
                />
              );
            }}
            onExpand={this.handleGetCampaignCustomerData}
            expandIconColumnIndex={5}
            expandIconAsCell={false}
            pagination={false}
            loading={this.state.loading}
            dataSource={this.state.campaignGridData}
          />
        </div>
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalGridData={this.state.totalGridRecord}
        />
        <Modal
          open={this.state.ResponsiveCustModal}
          onClose={this.responsiveCustModalClose.bind(this)}
          center
          modalId="customername-popup"
          overlayId="logout-ovrly"
        >
          <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cust-icon"
            onClick={this.responsiveCustModalClose.bind(this)}
          />
          <div className="customername-popupmob">
            <Tabs>
              <Tab label="Chatbot Script">
                <div className="">
                  <div class="dash-creation-popup custompop">
                    <label class="poptitle">Chatbot Script</label>
                    <label class="channelScript">
                      Dear, I am , your Relationship Manager from Bata, store.
                      Our store is open now as per local government guidelines.
                      Your safety &amp; convenience continue to remain our top
                      priority, and we have introduced new ways Of shopping for
                      you! You can click on wnuw.bata.in/rec to view our new
                      collections in your favorite categories. Enter "Visit" to
                      book an appointment for store visit. Enter "Shop" for
                      assisted shopping via WhatsApp and one of our staff will
                      get in touch with you shortly. Enter "Browse" to explore
                      your favorite categories and continue with your shopping.
                      Enter "Go Back" to Exit Shopping Mode
                    </label>
                  </div>
                  <div className="camperiod">
                    <h4>
                      Campaign Period<span>13 May-20/31 May-20</span>
                    </h4>
                  </div>
                </div>
              </Tab>
              <Tab label="SMS Script">
                <div className="">
                  <div class="dash-creation-popup custompop">
                    <label class="poptitle">SMS Script</label>
                    <label class="channelScript">
                      Dear, I am , your Relationship Manager from Bata, store.
                      Our store is open now as per local government guidelines.
                      Your safety &amp; convenience continue to remain our top
                      priority, and we have introduced new ways Of shopping for
                      you! You can click on wnuw.bata.in/rec to view our new
                      collections in your favorite categories. Enter "Visit" to
                      book an appointment for store visit. Enter "Shop" for
                      assisted shopping via WhatsApp and one of our staff will
                      get in touch with you shortly.
                    </label>
                  </div>
                  <div className="camperiod">
                    <h4>
                      Campaign Period<span>13 May-20/31 May-20</span>
                    </h4>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </Modal>

        <Modal
          open={this.state.custNameModal}
          onClose={this.handleCustomerNameModalClose.bind(this)}
          center
          modalId="customername-popup"
          overlayId="logout-ovrly"
        >
          <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cust-icon"
            onClick={this.handleCustomerNameModalClose.bind(this)}
          />
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="nr-initials">
                <p>{this.state.sortCustName}</p>
              </div>
              <div className="nr-name">
                <h3>{this.state.customerModalDetails.customerName}</h3>
                <p>Elite</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="lifetimevalue">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <h4>Lifetime Value</h4>
                        <label>₹16,347</label>
                      </td>
                      <td>
                        <h4>Visit Count</h4>
                        <label>08</label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="keyinsights">
                <h4>Key Insights</h4>
                <p>Naman has an ATV Rs 500 in last quarter</p>
                <p>Naman's favourite product category is Men Closet</p>
                <p>
                  Naman's basket size is reducing, Recommended Brands are: North
                  Star, Hush Puppies
                </p>
                <img
                  className="keyingsightdrp"
                  src={Dropdown3}
                  alt="Down Arrow"
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="productbox">
                <Tabs>
                  <Tab label="Recommended">
                    <div>
                      <div className="pro-slidercam">
                        <table className="w-100">
                          <tbody>
                            <tr>
                              <td>
                                <div className="imgbox">
                                  <Popover
                                    overlayClassName="antcustom ant-prodesc"
                                    content={
                                      <div className="productdesc">
                                        <h4>Blue Casual Shoes</h4>
                                        <p>Product Code - F808920000</p>
                                        <table>
                                          <tbody>
                                            <tr>
                                              <td>
                                                <label>Colors:</label>
                                              </td>
                                              <td>
                                                <ul>
                                                  <li>
                                                    <a className="colorblue">
                                                      <span>1</span>
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a className="colorblack">
                                                      <span>1</span>
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a className="colorgrey">
                                                      <span>1</span>
                                                    </a>
                                                  </li>
                                                </ul>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <label>Sizes:</label>
                                              </td>
                                              <td>
                                                <ul className="sizes">
                                                  <li>
                                                    <a>6</a>
                                                  </li>
                                                  <li>
                                                    <a className="active">7</a>
                                                  </li>
                                                  <li>
                                                    <a>8</a>
                                                  </li>
                                                  <li>
                                                    <a>9</a>
                                                  </li>
                                                  <li>
                                                    <a>10</a>
                                                  </li>
                                                  <li>
                                                    <a>11</a>
                                                  </li>
                                                </ul>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <h3>INR 3499/-</h3>
                                      </div>
                                    }
                                    placement="left"
                                    trigger="click"
                                  >
                                    <img
                                      className="shoeimg"
                                      src={Shoe}
                                      alt="Product Image"
                                    />
                                  </Popover>
                                  <img
                                    className="whatsappico"
                                    src={Whatsapp}
                                    alt="Whatsapp Icon"
                                  />
                                </div>
                                <h4>Casual Shoe</h4>
                              </td>
                              <td>
                                <div className="imgbox">
                                  <img
                                    className="shoeimg"
                                    src={Shoe}
                                    alt="Product Image"
                                  />
                                  <img
                                    className="whatsappico"
                                    src={Whatsapp}
                                    alt="Whatsapp Icon"
                                  />
                                </div>
                                <h4>Casual Shoe</h4>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="imgbox">
                                  <img
                                    className="shoeimg"
                                    src={Shoe}
                                    alt="Product Image"
                                  />
                                  <img
                                    className="whatsappico"
                                    src={Whatsapp}
                                    alt="Whatsapp Icon"
                                  />
                                </div>
                                <h4>Casual Shoe</h4>
                              </td>
                              <td>
                                <div className="imgbox">
                                  <img
                                    className="shoeimg"
                                    src={Shoe}
                                    alt="Product Image"
                                  />
                                  <img
                                    className="whatsappico"
                                    src={Whatsapp}
                                    alt="Whatsapp Icon"
                                  />
                                </div>
                                <h4>Casual Shoe</h4>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Tab>
                  <Tab label="Last Transaction">
                    <div>
                      <div className="transactionbox">
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <h5>Bill No.</h5>
                                <label>BB332393</label>
                              </td>
                              <td>
                                <h5>Amount</h5>
                                <label>₹1,499</label>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h5>Store</h5>
                                <label>Bata - Rajouri Garden</label>
                              </td>
                              <td>
                                <h5>Date</h5>
                                <label>12 Jan 2020</label>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="trasactablist">
                          <div className="tabscrol">
                            <table>
                              <thead>
                                <tr>
                                  <th>Article</th>
                                  <th>Qty.</th>
                                  <th>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Beige Sports Shoes</td>
                                  <td>x1</td>
                                  <td>₹1,499</td>
                                </tr>
                                <tr>
                                  <td>Black Sandals</td>
                                  <td>x2</td>
                                  <td>₹4,998</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="sharecamp">
                <h4>Share Campaign Via</h4>
                <ul>
                  {this.state.customerModalDetails.smsFlag === true ? (
                    <li>
                      <img className="ico" src={Sms1} alt="SMS Icon" />
                      SMS
                    </li>
                  ) : null}
                  {this.state.customerModalDetails.emailFlag === true ? (
                    <li>
                      <img className="ico" src={Sms1} alt="Email Icon" />
                      Email
                    </li>
                  ) : null}
                  {this.state.customerModalDetails.messengerFlag === true ? (
                    <li
                      onClick={this.handleSendViaMessanger.bind(
                        this,
                        this.state.customerModalDetails
                      )}
                    >
                      <img className="ico" src={Whatsapp} alt="Whatsapp Icon" />
                      Send Via Messanger
                    </li>
                  ) : null}
                  {this.state.customerModalDetails.botFlag === true ? (
                    <li
                      onClick={this.handleSendViaBotData.bind(
                        this,
                        this.state.customerModalDetails
                      )}
                    >
                      <img className="ico" src={Whatsapp} alt="Whatsapp Icon" />
                      Send Via Bot
                    </li>
                  ) : null}
                </ul>
              </div>
              <div className="sharecampmob">
                <label
                  className="shareviabtn"
                  onClick={this.handleShareViaModalOpen.bind(this)}
                >
                  <img className="shareviaimg" src={Sharevia} alt="Share Via" />
                  Share Via
                </label>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.ResponsiveBroadCast}
          onClose={this.handleBroadCastModalClose.bind(this)}
          center
          modalId="sharecamp-popup"
          overlayId="logout-ovrly"
          overlayClassName="sharepopupmob"
        >
           <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cust-icon"
            onClick={this.handleBroadCastModalClose.bind(this)}
          />
          <div className="general-popover popover-body broadcastpop">
            <label>
              <b>Broadcast to Campaign Customers</b>
            </label>
            <label>Choose Channel</label>
            <div>
              <Radio.Group
                onChange={this.handleBroadcastChange}
                value={this.state.broadcastChannel}
              >
                <Radio className="broadChannel" value={1}>
                  Email
                </Radio>
                <Radio className="broadChannel" value={2}>
                  SMS
                </Radio>
                <Radio className="broadChannel" value={3}>
                  Whatsapp
                </Radio>
              </Radio.Group>
            </div>
          </div>
        </Modal>
        {/* ---------------Share via Modal-------------------- */}
        <Modal
          open={this.state.responsiveShareVia}
          onClose={this.handleShareViaModalClose.bind(this)}
          center
          modalId="sharecamp-popup"
          overlayId="logout-ovrly"
        >
          <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cust-icon"
            onClick={this.handleShareViaModalClose.bind(this)}
          />
          <div>
            <h4>Choose Channel</h4>
            <table className="w-100">
              <tbody>
                <tr>
                  <td>
                    <a href="#">
                      <div className="chatbox">
                        <img className="ico" src={Whatsapp} alt="Whatsapp Icon" />
                        <img className="tick" src={Tick} alt="Tick Icon" />
                        Send Via Messanger
                      </div>
                    </a>
                  </td>
                  <td>
                    <a href="#">
                    <div className="chatbox">
                      <img className="ico" src={Whatsapp} alt="Whatsapp Icon" />
                        <img className="tick" src={Tick} alt="Tick Icon" />
                      Send Via Bot
                    </div>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="#">
                    <div className="chatbox">
                      <img className="ico" src={Sms1} alt="SMS Icon" />
                        <img className="tick" src={Tick} alt="Tick Icon" />
                      SMS
                    </div>
                    </a>
                  </td>
                  <td>
                    <a href="#">
                    <div className="chatbox">
                      <img className="ico" src={Sms1} alt="Email Icon" />
                        <img className="tick" src={Tick} alt="Tick Icon" />
                      Email
                    </div>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="sharecampmob">
              <label className="shareviabtn">Share Now</label>
            </div>
          </div>
        </Modal>
        {/* ---------Raised Ticket Modal----------- */}
        <Modal
          open={this.state.raisedTicketModal}
          onClose={this.handleRaisedTicketModalClose.bind(this)}
          center
          modalId="Raised-popup"
          overlayId="logout-ovrly"
        >
          <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cncl-icn"
            onClick={this.handleRaisedTicketModalClose.bind(this)}
          />
          <div className="raise-ticket-popup">
            <div className="d-flex justify-content-between mb-2">
              <p className="blak-clr font-weight-bold m-0">Customer Details</p>
              <p className="m-0">
                Source:<span>Store</span>
              </p>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="mobile_no disabled-input"
                  name="name"
                  value={this.state.modalData["name"]}
                  onChange={this.handleOnchange}
                  disabled
                />
                {this.state.isName !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isName}
                  </p>
                )}
              </div>
              <div className="col-md-4 mb-3">
                <label>Mobile</label>
                <input
                  type="text"
                  className="mobile_no disabled-input"
                  name="mobile"
                  value={this.state.modalData["mobile"]}
                  onChange={this.handleOnchange}
                  disabled
                />
                {this.state.isMobile !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isMobile}
                  </p>
                )}
              </div>
              <div className="col-md-4 mb-3">
                <label>Email</label>
                <input
                  type="text"
                  className="mobile_no disabled-input"
                  name="email"
                  value={this.state.modalData["email"]}
                  onChange={this.handleOnchange}
                  disabled
                />
                {this.state.isEmail !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isEmail}
                  </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Date of birth</label>
                <input
                  type="text"
                  className="mobile_no disabled-input"
                  name="dateofbrith"
                  value={this.state.modalData["dateofbrith"]}
                  onChange={this.handleOnchange}
                  disabled
                />

                <div className="col-md-4 mb-3">
                  <label>Brand</label>
                  <select
                    name="brand"
                    value={this.state.modalData["brand"]}
                    onChange={this.handleOnchange}
                  >
                    <option value="">Select</option>
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
                  {this.state.isBrand !== "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.isBrand}
                    </p>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label>Category</label>
                  <select
                    name="category"
                    value={this.state.modalData["category"]}
                    onChange={this.handleOnchange}
                  >
                    <option value="">Select</option>
                    {this.state.categoryData !== null &&
                      this.state.categoryData.map((item, i) => (
                        <option
                          key={i}
                          value={item.categoryID}
                          className="select-category-placeholder"
                        >
                          {item.categoryName}
                        </option>
                      ))}
                  </select>
                  {this.state.isCategory !== "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.isCategory}
                    </p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label>Sub Category</label>
                  <select
                    name="subCategory"
                    value={this.state.modalData["subCategoryId"]}
                    onChange={this.handleOnchange}
                  >
                    <option value="">Select</option>
                    {this.state.subCategoryData !== null &&
                      this.state.subCategoryData.map((item, i) => (
                        <option
                          key={i}
                          value={item.subCategoryID}
                          className="select-category-placeholder"
                        >
                          {item.subCategoryName}
                        </option>
                      ))}
                  </select>
                  {this.state.isSubCategory !== "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.isSubCategory}
                    </p>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label>Issue Type</label>
                  <select
                    name="issueType"
                    value={this.state.modalData["issueTypeId"]}
                    onChange={this.handleOnchange}
                  >
                    <option value="">Select</option>
                    {this.state.issueTypeData !== null &&
                      this.state.issueTypeData.map((item, i) => (
                        <option
                          key={i}
                          value={item.issueTypeID}
                          className="select-category-placeholder"
                        >
                          {item.issueTypeName}
                        </option>
                      ))}
                  </select>
                  {this.state.isIssueType !== "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.isIssueType}
                    </p>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label>Ticket Title</label>
                  <input
                    type="text"
                    name="tiketTitle"
                    className="email_Id"
                    value={this.state.modalData["tiketTitle"]}
                    onChange={this.handleOnchange}
                  />
                  {this.state.isTiketTitle !== "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.isTiketTitle}
                    </p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label>Ticket Details</label>
                  <textarea
                    name="tiketDetails"
                    className="textarea-store"
                    value={this.state.modalData["tiketDetails"]}
                    onChange={this.handleOnchange}
                  ></textarea>
                  {this.state.isTiketDetails !== "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.isTiketDetails}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <a
                  href="#!"
                  onClick={this.handleRaisedTicketModalClose.bind(this)}
                  className="blue-clr mr-4"
                >
                  CANCEL
                </a>
                <button
                  className="butn"
                  type="button"
                  onClick={this.handleCreateTicket.bind(this)}
                >
                  CREATE TICKET
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default StoreCampaign;

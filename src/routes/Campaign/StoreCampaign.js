import React, { Component } from "react";
import { authHeader } from "./../../helpers/authHeader";
import CancelIcon from "./../../assets/Images/cancel.png";
import BroadCastIcon from "./../../assets/Images/broadCast.png";
import BlackInfoIcon from "./../../assets/Images/Info-black.png";
import Sharevia from "./../../assets/Images/sharevia.png";
import Dropdown3 from "./../../assets/Images/dropdown3.png";
import Tick from "./../../assets/Images/tick.png";
import Whatsapp from "./../../assets/Images/whatsapp.svg";
import Sms1 from "./../../assets/Images/sms1.svg";
import Email from "./../../assets/Images/camp-Email.svg";
import PlusIcon from "./../../assets/Images/pluscircle.png";
import Smsicon from "./../../assets/Images/sms2.svg";
import ChatbotS from "./../../assets/Images/chatbot-icon.svg";
import axios from "axios";
import config from "./../../helpers/config";
import { Table, Popover, Radio } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap-tabs/dist";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import Modal from "react-responsive-modal";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import Demo from "./../../store/Hashtag";
import ReactTable from "react-table";
import ReactHtmlParser from "react-html-parser";
// import Pagination from "./CampaignPagination";
 
class StoreCampaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      responsiveShareVia: false,
      sortCustName: "",
      customerModalDetails: {},
      currentPage: 1,
      postsPerPage: 10,
      totalGridRecord: [],
      childCurrentPage: 1,
      ChildPostsPerPage: 10,
      childTotalGridRecord: 0,
      ResponsiveBroadCast: false,
      collapseModalDetails: {},
      useratvdetails: {},
      campaignkeyinsight: {},
      campaignrecommended: [],
      shareCampaignViaSettingModal: {},
      lasttransactiondetails: {},
      lastTransactionItem: [],
      ResponsiveShareNow: false,
      campaignID: 0,
      ResponsiveChooseChannel: 0,
      Respo_ChannelMessanger: false,
      Respo_ChannelBot: false,
      Respo_ChannelSMS: false,
      Respo_ChannelEmail: false,
      filterDropdownVisible: false,
      filterCustomerNumber: false,
      filterCampaignName: false,
      filterCampaignStatus: false,
      strCampStatus: "",
      strStatusIds: "",
      chatbotScript: "",
      smsScript: "",
      campaingPeriod: "",
      filterCustNO: "",
      filterCampName: "",
      showRecommandedtab: false,
      showLastTransactiondtab: false,
      insightShowImg: false,
      handleArrowImg: false,
      expandedRowKeys: "",
      smsDisable: false,
      msngrDisable: false,
      botDisable: false,
      shareDisable: false,
      custMobileValidation: "",
      CampCustNameValidation: "",
    };
    this.handleGetCampaignGridData = this.handleGetCampaignGridData.bind(this);
    this.handleGetCampaignCustomerData = this.handleGetCampaignCustomerData.bind(
      this
    );
  }

  componentDidMount() {
    this.handleGetCampaignGridData();
    this.handleGetBrand();
  }

  handleArrowImg() {
    let handleArrowImg = this.state.handleArrowImg;
    this.setState({
      handleArrowImg: !handleArrowImg,
    });
  }

  onResponseChange(campaignCustomerID, item, e) {
    debugger;
    this.state.CampChildTableData.filter(
      (x) => x.id === campaignCustomerID
    )[0].responseID = parseInt(e.target.value);
    this.state.CampChildTableData.filter(
      (x) => x.id === campaignCustomerID
    )[0].dateTimeHighlight = true;

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
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        for (let obj of data) obj.key = obj.campaignID;
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
    let self = this,
      calculatedCallReScheduledTo;
    var Updatecheck = "";
    if (responseID === 3) {
      if (callRescheduledTo !== "") {
        this.setState({
          loading: true,
        });

        calculatedCallReScheduledTo = callRescheduledTo;

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
            let status = res.data.message;
            if (status === "Success") {
              NotificationManager.success("Record Updated Successfully.");
              self.handleGetCampaignCustomerData(
                true,
                Updatecheck,
                campaignScriptID,
                ""
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
        NotificationManager.error("Please Select Date and Time.");
      }
    } else {
      if (responseID !== 0) {
        this.setState({
          loading: true,
        });

        axios({
          method: "post",
          url: config.apiUrl + "/StoreCampaign/UpdateCampaignStatusResponse",
          headers: authHeader(),
          data: {
            CampaignCustomerID: id,
            ResponseID: responseID,
            CallReScheduledTo: "",
          },
        })
          .then(function(res) {
            let status = res.data.message;
            if (status === "Success") {
              NotificationManager.success("Record Updated Successfully.");
              self.handleGetCampaignCustomerData(
                true,
                Updatecheck,
                campaignScriptID,
                ""
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

  handleCustomerNameModalClose() {
    this.setState({
      custNameModal: false,
    });
  }

  responsiveCustModalOpen(data) {
    this.setState({
      ResponsiveCustModal: true,
      chatbotScript: data.chatbotScript,
      smsScript: data.smsScript,
      campaingPeriod: data.campaingPeriod,
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

  handleShareNowOpenModal() {
    this.setState({
      shareDisable: true,
    });
    if (this.state.Respo_ChannelMessanger === true) {
      this.handleSendViaMessanger(this.state.customerModalDetails);
    } else if (this.state.Respo_ChannelBot === true) {
      this.handleSendViaBotData(this.state.customerModalDetails);
    } else if (this.state.Respo_ChannelSMS === true) {
      this.handleSendViaSMS(this.state.customerModalDetails);
    } else if (this.state.Respo_ChannelEmail === true) {
      console.log("API not ready");
    }
    // this.setState({
    //   ResponsiveShareNow: true,
    // });
  }
  handleShareNowCloseModal() {
    this.setState({
      ResponsiveShareNow: false,
    });
  }
  handleBroadcastChange = (e) => {
    this.setState({
      broadcastChannel: e.target.value,
    });
  };
  /// handle Per page onchange
  handlePageItemchange = (e) => {
    this.setState({
      ChildPostsPerPage: e.target.value,
    });
    setTimeout(() => {
      this.handleGetCampaignCustomerData(
        true,
        "",
        this.state.campaignID,
        "filter"
      );
    }, 50);
  };
  /// Pagination Onchange
  PaginationOnChange = async (numPage) => {
    debugger;
    await this.setState({
      childCurrentPage: numPage,
    });
    if (this.state.strStatusIds !== "") {
      this.handleGetCampaignCustomer(
        this.state.campaignID,
        this.state.childTotalGridRecord
      );
    } else {
      await setTimeout(() => {
        this.handleGetCampaignCustomerData(true, "", this.state.campaignID, "");
      }, 500);
    }
  };

  /// handle Search Campaign name and status
  handleSearchCampaignNameandStatus() {
    debugger;
    let self = this;
    var filterIds = "";
    if (this.state.strCampStatus !== "") {
      filterIds = this.state.strCampStatus;
    } else {
      filterIds = "All";
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/GetCampaignDetails",
      headers: authHeader(),
      params: {
        campaignName: this.state.filterCampName,
        statusId: filterIds,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            campaignGridData: data,
            CampCustNameValidation: "",
          });
        } else {
          self.setState({
            campaignGridData: [],
            CampCustNameValidation: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// Handle Get Campaign customer details
  handleGetCampaignCustomerData(data, row, check, filter) {
    debugger;
    if (data) {
      this.setState({
        ChildTblLoading: true,
        CampChildTableData: [],
      });
      if (row === "") {
        // this.state.childCurrentPage = 1;
        this.state.filterCustNO = "";
        setTimeout(() => {
          this.setState({
            // childCurrentPage: 1,
            childTotalGridRecord: 0,
            filterCustNO: "",
          });
        }, 50);
      } else {
        var keys = [];
        if (data) {
          keys.push(row.campaignID);
          this.state.childCurrentPage = 1;
          this.state.ChildPostsPerPage = 10;
          this.state.filterCustNO = "";
          setTimeout(() => {
            this.setState({
              childCurrentPage: 1,
              ChildPostsPerPage: 10,
              childTotalGridRecord: 0,
              expandedRowKeys: keys,
              filterCustNO: "",
            });
          }, 50);
        }
      }

      var campaignId = 0;
      if (check !== undefined || check > 0) {
        campaignId = check;
      } else {
        if (row !== "") {
          this.setState({
            campaignID: row.campaignID,
          });
          campaignId = row.campaignID;
        } else {
          campaignId = this.state.campaignID;
        }
      }
      if (row !== "") {
        this.setState({
          childTotalGridRecord: Number(row.customerCount),
        });
      } else {
      }
      var filterIds = "";
      if (this.state.strStatusIds !== "") {
        filterIds = this.state.strStatusIds;
      } else {
        filterIds = "All";
      }
      var pageNumber = this.state.childCurrentPage;
      if (filter === "filter") {
        pageNumber = 1;
      }
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/StoreCampaign/GetCampaignCustomer",
        headers: authHeader(),
        data: {
          campaignScriptID: campaignId,
          pageNo: pageNumber,
          pageSize: this.state.ChildPostsPerPage,
          FilterStatus: filterIds,
          MobileNumber: this.state.filterCustNO,
        },
      })
        .then(function(response) {
          debugger;
          var message = response.data.message;
          var data = response.data.responseData;
          if (message == "Success") {
            for (let obj of data.campaignCustomerModel)
              obj.dateTimeHighlight = false;

            self.setState({
              CampChildTableData: data.campaignCustomerModel,
              ChildTblLoading: false,
              loading: false,
              childTotalGridRecord: data.campaignCustomerCount,
            });
          } else {
            self.setState({
              CampChildTableData: [],
              ChildTblLoading: false,
              loading: false,
              childTotalGridRecord: 0,
            });
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.setState({
        expandedRowKeys: [],
        CampChildTableData: [],
        strStatusIds: "All",
        ChildPostsPerPage: 10,
        childCurrentPage: 1,
      });
    }
  }
  /// Send Via Bot data
  handleSendViaBotData(data) {
    this.setState({
      botDisable: true,
    });
    let self = this;
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
        var message = response.data.message;
        if (self.state.Respo_ChannelBot === true) {
          if (message === "Success") {
            self.setState({
              ResponsiveShareNow: true,
              custNameModal: false,
              Respo_ChannelBot: false,
              responsiveShareVia: false,
            });
            self.handleGetCampaignCustomerData(
              true,
              "",
              self.state.campaignID,
              ""
            );
          } else {
            NotificationManager.error("Server temporarily not available.");
          }
        } else {
          if (message === "Success") {
            NotificationManager.success("Sent Successfully.");
            self.setState({
              custNameModal: false,
            });
            self.handleGetCampaignCustomerData(
              true,
              "",
              self.state.campaignID,
              ""
            );
          } else {
            NotificationManager.error("Failed");
          }
        }
        self.setState({
          botDisable: false,
          shareDisable: false,
        });
      })
      .catch((response) => {
        console.log(response);
      });
  }

  ///handle Send Via SMS
  handleSendViaSMS(data) {
    debugger;
    this.setState({
      smsDisable: true,
    });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/CampaignShareSMS",
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
        debugger;
        var message = response.data.message;
        if (self.state.Respo_ChannelSMS === true) {
          if (message === "Success") {
            self.setState({
              ResponsiveShareNow: true,
              custNameModal: false,
              Respo_ChannelMessanger: false,
              responsiveShareVia: false,
            });
          } else {
            NotificationManager.error("Server temporarily not available.");
          }
        } else {
          if (message === "Success") {
            self.setState({
              custNameModal: false,
            });
            NotificationManager.success("SMS Sent Successfully.");
          } else {
            NotificationManager.error("SMS Send Failed.");
          }
        }
        self.setState({
          smsDisable: false,
          shareDisable: false,
        });
      })
      .catch((response) => {
        console.log(response);
      });
  }

  /// Send Via Messenger data
  handleSendViaMessanger(data) {
    this.setState({
      msngrDisable: true,
    });
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
        var message = response.data.message;
        var data = response.data.responseData;

        if (message === "Success") {
          self.setState({
            custNameModal: false,
          });
          if (self.state.Respo_ChannelMessanger === false) {
            NotificationManager.success("Sent Successfully.");
          }
          window.open("//" + data, "_blank");
          if (self.state.Respo_ChannelMessanger === true) {
            self.setState({
              ResponsiveShareNow: true,
              custNameModal: false,
              Respo_ChannelMessanger: false,
              responsiveShareVia: false,
            });
          }
        } else {
          NotificationManager.error("Server temporarily not available.");
        }
        self.setState({
          msngrDisable: false,
          shareDisable: false,
        });
      })
      .catch((response) => {
        console.log(response);
      });
  }

  /// Handle Get Customer data
  handleGetCustomerDataForModal(rowData) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/GetCustomerpopupDetails",
      headers: authHeader(),
      params: {
        programCode: rowData.programcode,
        mobileNumber: rowData.customerNumber,
        campaignID: rowData.campaignScriptID,
      },
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var data = response.data.responseData;
        if (message == "Success") {
          var strTag = rowData.customerName.split(" ");
          var sortName = strTag[0].charAt(0).toUpperCase();
          if (strTag.length === 1) {
            sortName = strTag[0].charAt(0).toUpperCase();
          } else {
            sortName += strTag[1].charAt(0).toUpperCase();
          }
          if (
            // data.lasttransactiondetails.itemDetails.length > 0 ||
            data.lasttransactiondetails.itemDetails !== null
          ) {
            self.setState({
              lastTransactionItem: data.lasttransactiondetails.itemDetails,
              showLastTransactiondtab: false,
            });
          } else {
            self.setState({
              lastTransactionItem: [],
              showLastTransactiondtab: true,
            });
          }
          if (data.campaignrecommended[0].itemCode !== "") {
            self.setState({
              showRecommandedtab: true,
            });
          } else {
            self.setState({
              showRecommandedtab: false,
            });
          }
          self.setState({
            custNameModal: true,
            customerModalDetails: rowData,
            campaignkeyinsight: data.campaignkeyinsight,
            useratvdetails: data.useratvdetails,
            campaignrecommended: data.campaignrecommended,
            lasttransactiondetails: data.lasttransactiondetails,
            shareCampaignViaSettingModal: data.shareCampaignViaSettingModal,
            sortCustName: sortName,
          });
          if (data.campaignkeyinsight.insightText.length > 0) {
            if (
              document.getElementById("insight-data").offsetWidth <
              document.getElementById("insight-data").scrollWidth
            ) {
              self.setState({ insightShowImg: true });
            }
          }
        } else {
          self.setState({
            custNameModal: true,
            customerModalDetails: {},
            campaignkeyinsight: {},
            useratvdetails: {},
            campaignrecommended: [],
            lasttransactiondetails: {},
            shareCampaignViaSettingModal: {},
            lastTransactionItem: [],
          });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  /// handle Campaign status filter for individual select
  handleCheckCampIndividualStatus() {
    var checkboxes = document.getElementsByName("CampallStatus");
    var strCampStatus = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strCampStatus += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      filterCampaignStatus: false,
      strCampStatus,
    });
    setTimeout(() => {
      this.handleSearchCampaignNameandStatus();
    }, 50);
  }
  /// handle Campaign status filter for all select
  handleCheckCampAllStatus(event) {
    debugger;
    this.setState((state) => ({ CheckBoxAllBrand: !state.CheckBoxAllBrand }));
    var strCampStatus = "";
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("CampallStatus");
    if (allCheckboxChecked) {
      for (var i in checkboxes) {
        if (checkboxes[i].checked === false) {
          checkboxes[i].checked = true;
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strCampStatus = "All";
        }
      }
    } else {
      for (var J in checkboxes) {
        if (checkboxes[J].checked === true) {
          checkboxes[J].checked = false;
        }
      }
      strCampStatus = "";
    }
    this.setState({
      filterCampaignStatus: false,
      strCampStatus,
    });
    setTimeout(() => {
      this.handleSearchCampaignNameandStatus();
    }, 50);
  }

  checkIndividualStatus(campaignScriptID, customerCount, event) {
    debugger;
    var checkboxes = document.getElementsByName("allStatus");
    var strStatusIds = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strStatusIds += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      filterDropdownVisible: false,
      strStatusIds,
    });
    setTimeout(() => {
      this.handleGetCampaignCustomer(campaignScriptID, customerCount, "filter");
    }, 50);
  }

  checkAllStatus(campaignScriptID, customerCount, event) {
    debugger;
    this.setState((state) => ({ CheckBoxAllBrand: !state.CheckBoxAllBrand }));
    var strStatusIds = "";
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("allStatus");
    if (allCheckboxChecked) {
      for (var i in checkboxes) {
        if (checkboxes[i].checked === false) {
          checkboxes[i].checked = true;
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strStatusIds = "All";
        }
      }
    } else {
      for (var J in checkboxes) {
        if (checkboxes[J].checked === true) {
          checkboxes[J].checked = false;
        }
      }
      strStatusIds = "";
    }
    this.setState({
      filterDropdownVisible: false,
      strStatusIds,
    });
    setTimeout(() => {
      this.handleGetCampaignCustomer(campaignScriptID, customerCount, "filter");
    }, 50);
  }

  handleCustomerFilerOnchange(campaignID, customerCount, e) {
    debugger;
    var reg = /^[0-9\b]+$/;

    if (e.target.value === "" || reg.test(e.target.value)) {
      this.setState({
        filterCustNO: e.target.value,
        custMobileValidation: "Please enter altest 3 numbers.",
      });
    } else {
      e.target.value = "";
    }
    // this.setState({
    //   filterCustNO: e.target.value,
    //   custMobileValidation: "Please enter altest 3 numbers.",
    // });

    if (this.state.filterCustNO.length > 2) {
      setTimeout(() => {
        this.handleGetCampaignCustomer(campaignID, customerCount, "filter");
      }, 50);
    }
  }

  handleCampaignNameOnchange(e) {
    this.setState({
      filterCampName: e.target.value,
      CampCustNameValidation: "Please enter altest 5 characters.",
    });
    if (this.state.filterCampName.length > 5) {
      setTimeout(() => {
        this.handleSearchCampaignNameandStatus();
      }, 10);
    }
  }
  handleGetCampaignCustomer = (campaignScriptID, customerCount, check) => {
    debugger;
    let self = this;
    var pageNumber = this.state.childCurrentPage;
    if (check === "filter") {
      pageNumber = 1;
      this.state.childCurrentPage = 1;
    }
    if (customerCount !== "") {
      this.setState({
        childTotalGridRecord: Number(customerCount),
      });
    }
    var filterIds = "";
    if (this.state.strStatusIds !== "") {
      filterIds = this.state.strStatusIds;
    } else {
      filterIds = "All";
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/GetCampaignCustomer",
      headers: authHeader(),
      data: {
        campaignScriptID: campaignScriptID,
        pageNo: pageNumber,
        pageSize: this.state.ChildPostsPerPage,
        FilterStatus: filterIds,
        MobileNumber: this.state.filterCustNO,
      },
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var data = response.data.responseData;
        if (message == "Success") {
          self.setState({
            CampChildTableData: data.campaignCustomerModel,
            childTotalGridRecord: data.campaignCustomerCount,
            // filterCustomerNumber: false,
            custMobileValidation: "",
          });
        } else {
          self.setState({
            CampChildTableData: [],
            childTotalGridRecord: 0,
            // filterCustomerNumber: false,
            custMobileValidation: "",
          });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  handleSelectChannelsOnchange(check) {
    debugger;
    if (check === "Messenger") {
      this.setState({
        Respo_ChannelMessanger: true,
        Respo_ChannelBot: false,
        Respo_ChannelSMS: false,
        Respo_ChannelEmail: false,
      });
    } else if (check === "Bot") {
      this.setState({
        Respo_ChannelMessanger: false,
        Respo_ChannelBot: true,
        Respo_ChannelSMS: false,
        Respo_ChannelEmail: false,
      });
    } else if (check === "SMS") {
      this.setState({
        Respo_ChannelMessanger: false,
        Respo_ChannelBot: false,
        Respo_ChannelSMS: true,
        Respo_ChannelEmail: false,
      });
    } else if (check === "Email") {
      this.setState({
        Respo_ChannelMessanger: false,
        Respo_ChannelBot: false,
        Respo_ChannelSMS: false,
        Respo_ChannelEmail: true,
      });
    }
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
                className: "camp-status-header camp-status-header-cust-name",
                filterDropdown: (dataIndex) => (
                  <div className="cust-name-drpdwn">
                    <label>Campaign Name</label>
                    <input
                      type="text"
                      className="txt-1"
                      autoComplete="off"
                      maxLength={100}
                      placeholder="Enter Campaign Name"
                      value={this.state.filterCampName}
                      onChange={this.handleCampaignNameOnchange.bind(this)}
                    />
                    {this.state.filterCampName.length > 1 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.CampCustNameValidation}
                      </p>
                    )}
                  </div>
                ),
                filterDropdownVisible: this.state.filterCampaignName,
                onFilterDropdownVisibleChange: (visible) =>
                  this.setState({ filterCampaignName: visible }),
                filterIcon: (filtered) => (
                  <span
                    style={{ color: filtered ? "#1890ff" : undefined }}
                  ></span>
                ),
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
                        onClick={this.responsiveCustModalOpen.bind(this, item)}
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
                            src={Smsicon}
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
                className: "camp-status-header camp-status-header-statusFilter",
                filterDropdown: (data, row) => {
                  return (
                    <div className="campaign-status-drpdwn">
                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            id="Campall-status"
                            className="ch1"
                            onChange={this.handleCheckCampAllStatus.bind(this)}
                            checked={this.state.CheckBoxAllStatus}
                            name="CampallStatus"
                          />
                          <label htmlFor="Campall-status">
                            <span className="ch1-text">All</span>
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="New100"
                            className="ch1"
                            onChange={this.handleCheckCampIndividualStatus.bind(
                              this
                            )}
                            name="CampallStatus"
                            attrIds={100}
                          />
                          <label htmlFor="New100">
                            <span className="ch1-text">New</span>
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="Inproress101"
                            className="ch1"
                            onChange={this.handleCheckCampIndividualStatus.bind(
                              this
                            )}
                            name="CampallStatus"
                            attrIds={101}
                          />
                          <label htmlFor="Inproress101">
                            <span className="ch1-text">InProgress</span>
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="Close102"
                            className="ch1"
                            onChange={this.handleCheckCampIndividualStatus.bind(
                              this
                            )}
                            name="CampallStatus"
                            attrIds={102}
                          />
                          <label htmlFor="Close102">
                            <span className="ch1-text">Close</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  );
                },
                filterDropdownVisible: this.state.filterCampaignStatus,
                onFilterDropdownVisibleChange: (visible) =>
                  this.setState({ filterCampaignStatus: visible }),
                filterIcon: (filtered) => (
                  <span
                    style={{ color: filtered ? "#1890ff" : undefined }}
                  ></span>
                ),
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
                            Recent Campaigns
                          </label>
                          <div className="broembox clearfix">
                            <p>
                              <label>Email</label>
                              <span>Executed Date: 24 Aug 2019</span>
                            </p>
                            <img
                              src={PlusIcon}
                              alt="plus-icone"
                              className="plusico"
                            />
                          </div>
                          <label className="broadcasttitle">
                            Broadcast Campaign to Customers
                          </label>
                          <label className="broadcastsubtitle">
                            Choose Channel
                          </label>
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
                          <button type="button" className="executebtn">
                            Execute
                          </button>
                        </div>
                      }
                      placement="bottom"
                      trigger="click"
                    >
                      <div className="broadcast-icon">
                        <img
                          src={BroadCastIcon}
                          alt="cancel-icone"
                          onClick={this.handleBroadCastModalOpen.bind(this)}
                          className="broadcastimg"
                        />
                      </div>
                    </Popover>
                  );
                },
              },
            ]}
            expandedRowRender={(row, item) => {
              return (
                <div>
                  <Table
                    
                    dataSource={this.state.CampChildTableData.filter(
                      (x) => x.campaignScriptID === row.campaignID
                    )}
                    className="midalResponseAction"
                    columns={[
                      {
                        
                        title: "Customer Name",
                        className:
                          "camp-status-header camp-status-header-cust-name",
                        dataIndex: "id",
                        filterDropdown: (dataIndex) => (
                          <div className="cust-name-drpdwn">
                            <label>Customer Number</label>
                            <input
                              type="text"
                              className="txt-1"
                              autoComplete="off"
                              placeholder="Enter Mobile No"
                              maxLength={10}
                              value={this.state.filterCustNO}
                              onChange={this.handleCustomerFilerOnchange.bind(
                                this,
                                row.campaignID,
                                row.customerCount
                              )}
                            />
                            {this.state.filterCustNO.length > 1 && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.custMobileValidation}
                              </p>
                            )}
                          </div>
                        ),
                        filterDropdownVisible: this.state.filterCustomerNumber,
                        onFilterDropdownVisibleChange: (visible) =>
                          this.setState({ filterCustomerNumber: visible }),
                        filterIcon: (filtered) => (
                          <span
                            style={{ color: filtered ? "#1890ff" : undefined }}
                          ></span>
                        ),
                        render: (row, item) => {
                          return (
                            <div>
                              <p
                                className="cust-name"
                                onClick={this.handleGetCustomerDataForModal.bind(
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
                                  item.hsCampaignResponseList.map(
                                    (items, i) => (
                                      <option key={i} value={items.responseID}>
                                        {items.response}
                                      </option>
                                    )
                                  )}
                              </select>
                            </div>
                          );
                        },
                      },
                      {
                        
                        title: "Status",
                        dataIndex: "statusName",
                        className: "camp-status-header",
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
                              ) : item.statusID === 104 ? (
                                <label className="table-btnlabel followUpBtnBlue">
                                  {item.statusName}
                                </label>
                              ) : null}
                            </div>
                          );
                        },
                        filterDropdown: (dataIndex) => (
                          <div className="campaign-status-drpdwn">
                            <ul>
                              <li>
                                <input
                                  type="checkbox"
                                  id="all-status"
                                  className="ch1"
                                  onChange={this.checkAllStatus.bind(
                                    this,
                                    row.campaignID,
                                    row.customerCount
                                  )}
                                  checked={this.state.CheckBoxAllBrand}
                                  name="allStatus"
                                />
                                <label htmlFor="all-status">
                                  <span className="ch1-text">All</span>
                                </label>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  id="status100"
                                  className="ch1"
                                  onChange={this.checkIndividualStatus.bind(
                                    this,
                                    row.campaignID,
                                    row.customerCount
                                  )}
                                  name="allStatus"
                                  attrIds={100}
                                />
                                <label htmlFor="status100">
                                  <span className="ch1-text">Contacted</span>
                                </label>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  id="status101"
                                  className="ch1"
                                  onChange={this.checkIndividualStatus.bind(
                                    this,
                                    row.campaignID,
                                    row.customerCount
                                  )}
                                  name="allStatus"
                                  attrIds={101}
                                />
                                <label htmlFor="status101">
                                  <span className="ch1-text">
                                    Not Contacted
                                  </span>
                                </label>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  id="status102"
                                  className="ch1"
                                  onChange={this.checkIndividualStatus.bind(
                                    this,
                                    row.campaignID,
                                    row.customerCount
                                  )}
                                  name="allStatus"
                                  attrIds={102}
                                />
                                <label htmlFor="status102">
                                  <span className="ch1-text">Follow Up</span>
                                </label>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  id="status103"
                                  className="ch1"
                                  onChange={this.checkIndividualStatus.bind(
                                    this,
                                    row.campaignID,
                                    row.customerCount
                                  )}
                                  name="allStatus"
                                  attrIds={103}
                                />
                                <label htmlFor="status103">
                                  <span className="ch1-text">Converted</span>
                                </label>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  id="status104"
                                  className="ch1"
                                  onChange={this.checkIndividualStatus.bind(
                                    this,
                                    row.campaignID,
                                    row.customerCount
                                  )}
                                  name="allStatus"
                                  attrIds={104}
                                />
                                <label htmlFor="status104">
                                  <span className="ch1-text">Conversation</span>
                                </label>
                              </li>
                            </ul>
                          </div>
                        ),
                        filterDropdownVisible: this.state.filterDropdownVisible,
                        onFilterDropdownVisibleChange: (visible) =>
                          this.setState({ filterDropdownVisible: visible }),
                        filterIcon: (filtered) => (
                          <span
                            style={{ color: filtered ? "#1890ff" : undefined }}
                          ></span>
                        ),
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
                              <div className="date-time-resp">
                                <DatePicker
                                  id="startDate"
                                  autoComplete="off"
                                  showTimeSelect
                                  name="startDate"
                                  // minTime={new Date(
                                  //   item.callRescheduledTo
                                  // ).setTime(
                                  //   new Date(item.callRescheduledTo).getTime()
                                  // )}
                                  // maxTime={new Date().setHours(23)}
                                  minDate={new Date()}
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
                                  onChange={this.onDateChange.bind(
                                    this,
                                    item.id
                                  )}
                                  // className={
                                  //   item.responseID === 3
                                  //     ? "txtStore dateTimeStore"
                                  //     : "txtStore dateTimeStore disabled-link"
                                  // }
                                  className={
                                    item.responseID === 3 &&
                                    item.dateTimeHighlight &&
                                    !item.callRescheduledTo
                                      ? "txtStore dateTimeStore dateTimeStore-highlight"
                                      : item.responseID === 3
                                      ? "txtStore dateTimeStore"
                                      : "txtStore dateTimeStore disabled-link"
                                  }
                                  placeholderText="Select Date &amp; Time"
                                />
                              </div>
                            </div>
                          );
                        },
                      },
                      {
                        title: "Actions",
                        render: (row, item) => {
                          return (
                            <div>
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
                                  <button
                                    className="raisedticket-Btn"
                                    style={{ display: "none" }}
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
                    expandedRowRender={(row, item) => {
                      return (
                        <div className="innertabcollapse">
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <label>Customer Name</label>
                                </td>
                                <td>
                                  <label className="cust-name">
                                    {row.customerName}
                                    <img
                                      className="ico"
                                      src={Whatsapp}
                                      alt="Whatsapp Icon"
                                    />
                                  </label>
                                  <span className="sml-fnt">
                                    {row.customerNumber}
                                  </span>
                                </td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>
                                  <label>Date</label>
                                </td>
                                <td>
                                  <label>{row.campaignDate}</label>
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
                                    value={row.responseID}
                                    onChange={this.onResponseChange.bind(
                                      this,
                                      row.id,
                                      row
                                    )}
                                  >
                                    <option hidden>Select Response</option>
                                    {row.hsCampaignResponseList !== null &&
                                      row.hsCampaignResponseList.map(
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
                                    {row.statusName}
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
                                      row.responseID === 3
                                        ? ""
                                        : "disabled-input"
                                    }
                                  >
                                    <div className="date-time-resp">
                                      <DatePicker
                                        id="startDate"
                                        autoComplete="off"
                                        showTimeSelect
                                        name="startDate"
                                        // minTime={new Date().setTime(
                                        //   new Date().getTime()
                                        // )}
                                        // maxTime={new Date().setHours(23)}
                                        minDate={new Date()}
                                        showMonthDropdown
                                        showYearDropdown
                                        selected={
                                          row.callRescheduledTo !== ""
                                            ? new Date(row.callRescheduledTo)
                                            : new Date()
                                        }
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        value={
                                          row.callRescheduledTo !== ""
                                            ? moment(row.callRescheduledTo)
                                            : ""
                                        }
                                        onChange={this.onDateChange.bind(
                                          this,
                                          row.id
                                        )}
                                        className={
                                          row.responseID === 3 &&
                                          row.dateTimeHighlight &&
                                          !row.callRescheduledTo
                                            ? "txtStore dateTimeStore dateTimeStore-highlight"
                                            : row.responseID === 3
                                            ? "txtStore dateTimeStore"
                                            : "txtStore dateTimeStore disabled-link"
                                        }
                                        placeholderText="Select Date &amp; Time"
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td></td>
                              </tr>
                              <tr>
                                <td colSpan="3">
                                  <div style={{ float: "right" }}>
                                    <button
                                      className="saveBtn saveLabel"
                                      type="button"
                                      onClick={this.handleUpdateCampaignResponse.bind(
                                        this,
                                        row.id,
                                        row.responseID,
                                        row.callRescheduledTo,
                                        row.campaignScriptID
                                      )}
                                    >
                                      Update
                                    </button>
                                    <button
                                      className="raisedticket-Btn saveLabel"
                                      style={{ display: "none" }}
                                    >
                                      Raise Ticket
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      );
                    }}
                    expandIconColumnIndex={5}
                    expandIconAsCell={false}
                    pagination={false}
                    loading={this.state.ChildTblLoading}
                  />
                  <Pagination
                    currentPage={this.state.childCurrentPage}
                    totalSize={this.state.childTotalGridRecord}
                    // totalSize={row.customerCount}
                    sizePerPage={this.state.ChildPostsPerPage}
                    changeCurrentPage={this.PaginationOnChange}
                    theme="bootstrap"
                  />
                  <div className="position-relative">
                    <div className="item-selection Camp-pagination">
                      <select
                        value={this.state.ChildPostsPerPage}
                        onChange={this.handlePageItemchange}
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                      </select>
                      <p>Items per page</p>
                    </div>
                  </div>
                </div>
              );
            }}
            onExpand={this.handleGetCampaignCustomerData}
            expandedRowKeys={this.state.expandedRowKeys}
            expandIconColumnIndex={5}
            expandIconAsCell={false}
            pagination={false}
            loading={this.state.loading}
            dataSource={this.state.campaignGridData}
          />
        </div>

        {/* <Pagination
          postsPerPage={this.state.postsPerPage}
          totalGridData={this.state.totalGridRecord}
        /> */}

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
                      {this.state.chatbotScript}
                    </label>
                  </div>
                  <div className="camperiod">
                    <h4>
                      Campaign Period<span>{this.state.campaingPeriod}</span>
                    </h4>
                  </div>
                </div>
              </Tab>
              <Tab label="SMS Script">
                <div className="">
                  <div class="dash-creation-popup custompop">
                    <label class="poptitle">SMS Script</label>
                    <label class="channelScript">{this.state.smsScript}</label>
                  </div>
                  <div className="camperiod">
                    <h4>
                      Campaign Period<span>{this.state.campaingPeriod}</span>
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
                <h3>
                  {this.state.shareCampaignViaSettingModal.customerName}{" "}
                  <span>
                    {this.state.shareCampaignViaSettingModal.customerNumber}
                  </span>
                </h3>
                <p>{this.state.useratvdetails.tiername}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              {this.state.campaignkeyinsight.insightText === "" ? (
                <div className="lifetimevalue lt-single">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <h4>Lifetime Value</h4>
                          <label>
                            {this.state.useratvdetails.lifeTimeValue !==
                            null ? (
                              <> ₹{this.state.useratvdetails.lifeTimeValue}</>
                            ) : (
                              "₹0"
                            )}
                          </label>
                        </td>
                        <td>
                          <h4>Visit Count</h4>
                          <label>
                            {this.state.useratvdetails.visitCount !== null ? (
                              <>
                                {this.state.useratvdetails.visitCount < 9
                                  ? "0" + this.state.useratvdetails.visitCount
                                  : this.state.useratvdetails.visitCount}
                              </>
                            ) : (
                              "0"
                            )}
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="lifetimevalue">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <h4>Lifetime Value</h4>
                          <label>
                            {this.state.useratvdetails.lifeTimeValue !==
                            null ? (
                              <> ₹{this.state.useratvdetails.lifeTimeValue}</>
                            ) : (
                              "₹0"
                            )}
                          </label>
                        </td>
                        <td>
                          <h4>Visit Count</h4>
                          <label>
                            {this.state.useratvdetails.visitCount !== null ? (
                              <>
                                {this.state.useratvdetails.visitCount < 9
                                  ? "0" + this.state.useratvdetails.visitCount
                                  : this.state.useratvdetails.visitCount}
                              </>
                            ) : (
                              "0"
                            )}
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {this.state.campaignkeyinsight.insightText !== "" ? (
                <div
                  className={
                    this.state.campaignkeyinsight.showKeyInsights
                      ? "keyinsights"
                      : "keyinsights keyinsights-big"
                  }
                >
                  {this.state.campaignkeyinsight.showKeyInsights && (
                    <h4>Key Insights</h4>
                  )}
                  <p
                    id="insight-data"
                    className={
                      this.state.handleArrowImg ? "full-data-insight" : ""
                    }
                  >
                    {this.state.campaignkeyinsight.insightText}
                  </p>
                  {this.state.insightShowImg && (
                    <img
                      className={
                        this.state.handleArrowImg
                          ? "keyingsightdrp keyingsightdrp-invert"
                          : "keyingsightdrp"
                      }
                      src={Dropdown3}
                      alt="Down Arrow"
                      onClick={this.handleArrowImg.bind(this)}
                    />
                  )}
                </div>
              ) : null}
            </div>
            <div className="col-12 col-md-6">
              <div className="productbox">
                <div>
                  <ul
                    className={
                      this.state.showRecommandedtab === false ||
                      this.state.showLastTransactiondtab === true
                        ? "nav alert-nav-tabs3 store-nav-tabs tab-single"
                        : "nav alert-nav-tabs3 store-nav-tabs"
                    }
                    // className="nav alert-nav-tabs3 store-nav-tabs tab-single"
                    role="tablist"
                  >
                    {this.state.showRecommandedtab ? (
                      <li className="nav-item fo">
                        <a
                          className={
                            this.state.showRecommandedtab
                              ? "nav-link active"
                              : "nav-link"
                          }
                          // className="nav-link active"
                          data-toggle="tab"
                          href="#recommended-tab"
                          role="tab"
                          aria-controls="recommended-tab"
                          aria-selected="true"
                        >
                          Recommended
                        </a>
                      </li>
                    ) : null}

                    {this.state.lastTransactionItem.length > 0 ? (
                      <li className="nav-item fo">
                        <a
                          className={
                            this.state.showRecommandedtab === false
                              ? "nav-link active"
                              : "nav-link"
                          }
                          data-toggle="tab"
                          href="#lastTransaction-tab"
                          role="tab"
                          aria-controls="lastTransaction-tab"
                          aria-selected="false"
                        >
                          Last Transaction
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </div>
                <div className="tab-content p-0">
                  <div
                    className={
                      this.state.showRecommandedtab
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                    // className="tab-pane fade show active"
                    id="recommended-tab"
                    role="tabpanel"
                    aria-labelledby="recommended-tab"
                  >
                    <div className="prodscro">
                      <div className="pro-slidercam">
                        <table className="w-100">
                          <tbody>
                            <tr>
                              {this.state.campaignrecommended !== null &&
                                this.state.campaignrecommended.map(
                                  (item, j) => {
                                    var FullProductName = `${item.color}  ${item.subCategory}  ${item.category}`;
                                    var FinalSize = item.size;
                                    return (
                                      <td key={j}>
                                        {item.imageURL !== "" ? (
                                          <div className="imgbox">
                                            <Popover
                                              overlayClassName="antcustom ant-prodesc"
                                              content={
                                                <div className="productdesc">
                                                  <h4>{FullProductName}</h4>
                                                  <p>
                                                    Product Code -
                                                    {item.itemCode}
                                                  </p>
                                                  <table>
                                                    <tbody>
                                                      {item.color !== "" ? (
                                                        <>
                                                          <tr>
                                                            <td
                                                              style={{
                                                                width: "50px",
                                                              }}
                                                            >
                                                              <label>
                                                                Colors:
                                                              </label>
                                                            </td>
                                                            <td>
                                                              <ul>
                                                                {item.color ===
                                                                "Blue" ? (
                                                                  <li>
                                                                    <a className="colorblue">
                                                                      <span>
                                                                        1
                                                                      </span>
                                                                    </a>
                                                                  </li>
                                                                ) : null}

                                                                {item.color ===
                                                                "Black" ? (
                                                                  <li>
                                                                    <a className="colorblack">
                                                                      <span>
                                                                        1
                                                                      </span>
                                                                    </a>
                                                                  </li>
                                                                ) : null}

                                                                {item.color ===
                                                                "Grey" ? (
                                                                  <li>
                                                                    <a className="colorgrey">
                                                                      <span>
                                                                        1
                                                                      </span>
                                                                    </a>
                                                                  </li>
                                                                ) : null}

                                                                {item.color ===
                                                                "Red" ? (
                                                                  <li>
                                                                    <a className="colorRed">
                                                                      <span>
                                                                        1
                                                                      </span>
                                                                    </a>
                                                                  </li>
                                                                ) : null}
                                                                {item.color ===
                                                                "Yellow" ? (
                                                                  <li>
                                                                    <a className="colorYellow">
                                                                      <span>
                                                                        1
                                                                      </span>
                                                                    </a>
                                                                  </li>
                                                                ) : null}
                                                                {item.color ===
                                                                "Green" ? (
                                                                  <li>
                                                                    <a className="colorGreen">
                                                                      <span>
                                                                        1
                                                                      </span>
                                                                    </a>
                                                                  </li>
                                                                ) : null}
                                                              </ul>
                                                            </td>
                                                          </tr>
                                                        </>
                                                      ) : null}

                                                      {item.size !== "" ? (
                                                        <>
                                                          <tr>
                                                            <td>
                                                              <label>
                                                                Sizes:
                                                              </label>
                                                            </td>
                                                            <td>
                                                              {isNaN(
                                                                parseInt(
                                                                  FinalSize
                                                                )
                                                              ) === false ? (
                                                                <ul className="sizes">
                                                                  <li>
                                                                    <a>
                                                                      {
                                                                        item.size
                                                                      }
                                                                    </a>
                                                                  </li>
                                                                  {/* <li>
                                                                    <a
                                                                      className={
                                                                        item.size ===
                                                                        "7"
                                                                          ? ""
                                                                          : "active"
                                                                      }
                                                                    >
                                                                      7
                                                                    </a>
                                                                  </li>
                                                                  <li>
                                                                    <a
                                                                      className={
                                                                        item.size ===
                                                                        "8"
                                                                          ? ""
                                                                          : "active"
                                                                      }
                                                                    >
                                                                      8
                                                                    </a>
                                                                  </li>
                                                                  <li>
                                                                    <a
                                                                      className={
                                                                        item.size ===
                                                                        "9"
                                                                          ? ""
                                                                          : "active"
                                                                      }
                                                                    >
                                                                      9
                                                                    </a>
                                                                  </li>
                                                                  <li>
                                                                    <a
                                                                      className={
                                                                        item.size ===
                                                                        "10"
                                                                          ? ""
                                                                          : "active"
                                                                      }
                                                                    >
                                                                      10
                                                                    </a>
                                                                  </li>
                                                                  <li>
                                                                    <a
                                                                      className={
                                                                        item.size ===
                                                                        "11"
                                                                          ? ""
                                                                          : "active"
                                                                      }
                                                                    >
                                                                      11
                                                                    </a>
                                                                  </li> */}
                                                                </ul>
                                                              ) : (
                                                                <ul>
                                                                  <li>
                                                                    <a>
                                                                      {
                                                                        item.size
                                                                      }
                                                                    </a>
                                                                  </li>
                                                                </ul>
                                                              )}
                                                            </td>
                                                          </tr>
                                                        </>
                                                      ) : null}
                                                    </tbody>
                                                  </table>
                                                  <h3>INR {item.price}/-</h3>
                                                </div>
                                              }
                                              placement="left"
                                            >
                                              <img
                                                className="shoeimg"
                                                src={item.imageURL}
                                                alt="Product Image"
                                              />
                                            </Popover>
                                            <Link
                                              to={`//${item.url}`}
                                              target="_blank"
                                            >
                                              <img
                                                className="whatsappico"
                                                src={Whatsapp}
                                                alt="Whatsapp Icon"
                                              />
                                            </Link>
                                          </div>
                                        ) : null}

                                        <h4>{item.subCategory}</h4>
                                      </td>
                                    );
                                  }
                                )}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      this.state.showRecommandedtab === false
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                    id="lastTransaction-tab"
                    role="tabpanel"
                    aria-labelledby="lastTransaction-tab"
                  >
                    <div>
                      {this.state.lasttransactiondetails.amount !== "" ? (
                        <div className="transactionbox">
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <h5>Bill No.</h5>
                                  <label>
                                    {this.state.lasttransactiondetails.billNo}
                                  </label>
                                </td>
                                <td>
                                  <h5>Amount</h5>
                                  <label>
                                    {this.state.lasttransactiondetails.amount}
                                  </label>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5>Store</h5>
                                  <label>
                                    {
                                      this.state.lasttransactiondetails
                                        .storeName
                                    }
                                  </label>
                                </td>
                                <td>
                                  <h5>Date</h5>
                                  <label>
                                    {this.state.lasttransactiondetails.billDate}
                                  </label>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="trasactablist">
                            <div className="myTicket-table remov agentlist last-trans-table">
                              <ReactTable
                                className="limit-react-table-body tabscrol"
                                data={this.state.lastTransactionItem}
                                columns={[
                                  {
                                    Header: <span>Article</span>,
                                    accessor: "article",
                                  },
                                  {
                                    Header: <span>Qty.</span>,
                                    accessor: "quantity",
                                    width: 60,
                                  },
                                  {
                                    Header: <span>Amount</span>,
                                    accessor: "amount",
                                    width: 80,
                                  },
                                ]}
                                minRows={2}
                                // defaultPageSize={5}
                                showPagination={false}
                                resizable={false}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <label className="ChecknoDataCamp">
                          No Record Found
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="sharecamp">
                <h4>Share Campaign Via</h4>
                <ul>
                  {this.state.shareCampaignViaSettingModal.smsFlag === true ? (
                    <li
                      onClick={this.handleSendViaSMS.bind(
                        this,
                        this.state.customerModalDetails
                      )}
                      className={
                        this.state.shareCampaignViaSettingModal.smsClickable
                          ? ""
                          : "dis-btns"
                      }
                      id={this.state.smsDisable ? "dis-sms" : ""}
                    >
                      <img className="ico" src={Sms1} alt="SMS Icon" />
                      SMS
                    </li>
                  ) : null}
                  {this.state.shareCampaignViaSettingModal.emailFlag ===
                  true ? (
                    <li
                      className={
                        this.state.shareCampaignViaSettingModal.emailClickable
                          ? ""
                          : "dis-btns"
                      }
                    >
                      <img className="emailico" src={Email} alt="Email Icon" />
                      Email
                    </li>
                  ) : null}
                  {this.state.shareCampaignViaSettingModal.messengerFlag ===
                  true ? (
                    <li
                      onClick={this.handleSendViaMessanger.bind(
                        this,
                        this.state.customerModalDetails
                      )}
                      className={
                        this.state.shareCampaignViaSettingModal
                          .messengerClickable
                          ? ""
                          : "dis-btns"
                      }
                      id={this.state.msngrDisable ? "dis-msngr" : ""}
                    >
                      <img className="ico" src={Whatsapp} alt="Whatsapp Icon" />
                      Send Via Messenger
                    </li>
                  ) : null}
                  {this.state.shareCampaignViaSettingModal.botFlag === true ? (
                    <li
                      onClick={this.handleSendViaBotData.bind(
                        this,
                        this.state.customerModalDetails
                      )}
                      className={
                        this.state.shareCampaignViaSettingModal.botClickable
                          ? ""
                          : "dis-btns"
                      }
                      id={this.state.botDisable ? "dis-bot" : ""}
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
          open={this.state.ResponsiveShareNow}
          onClose={this.handleShareNowCloseModal.bind(this)}
          center
          modalId="sharesuccesfullpopup"
          overlayId=""
        >
          <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cust-icon"
            onClick={this.handleShareNowCloseModal.bind(this)}
          />
          <div>
            <img className="tick" src={Tick} alt="Tick Icon" />
            <h3>Shared Successfully!</h3>
            <p>Your Message has been shared successfully</p>
          </div>
        </Modal>
        <Modal
          open={this.state.ResponsiveBroadCast}
          onClose={this.handleBroadCastModalClose.bind(this)}
          center
          modalId="sharecamp-popupmob"
          overlayId="logout-ovrly-none"
        >
          <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cust-icon"
            onClick={this.handleBroadCastModalClose.bind(this)}
          />
          <div className="general-popover popover-body broadcastpop">
            <label className="broadcasttitle">Recent Campaigns</label>
            <div className="broembox clearfix">
              <p>
                <label>Email</label>
                <span>Executed Date: 24 Aug 2019</span>
              </p>
              <img src={PlusIcon} alt="plus-icone" className="plusico" />
            </div>
            <label className="broadcasttitle">
              Broadcast Campaign to Customers
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
                  {this.state.shareCampaignViaSettingModal.messengerFlag ===
                  true ? (
                    <td>
                      <a
                        href={Demo.BLANK_LINK}
                        className={
                          this.state.shareCampaignViaSettingModal
                            .messengerClickable
                            ? ""
                            : "dis-btns"
                        }
                      >
                        <div
                          className="chatbox"
                          onClick={this.handleSelectChannelsOnchange.bind(
                            this,
                            "Messenger"
                          )}
                        >
                          <img
                            className="ico"
                            src={Whatsapp}
                            alt="Whatsapp Icon"
                          />
                          {this.state.Respo_ChannelMessanger === true ? (
                            <img className="tick" src={Tick} alt="Tick Icon" />
                          ) : null}
                          Send Via Messenger
                        </div>
                      </a>
                    </td>
                  ) : null}
                  {this.state.shareCampaignViaSettingModal.botFlag === true ? (
                    <td>
                      <a
                        href={Demo.BLANK_LINK}
                        className={
                          this.state.shareCampaignViaSettingModal.botClickable
                            ? ""
                            : "dis-btns"
                        }
                      >
                        <div
                          className="chatbox"
                          onClick={this.handleSelectChannelsOnchange.bind(
                            this,
                            "Bot"
                          )}
                        >
                          <img
                            className="ico"
                            src={Whatsapp}
                            alt="Whatsapp Icon"
                          />
                          {this.state.Respo_ChannelBot === true ? (
                            <img className="tick" src={Tick} alt="Tick Icon" />
                          ) : null}
                          Send Via Bot
                        </div>
                      </a>
                    </td>
                  ) : null}
                </tr>
                <tr>
                  {this.state.shareCampaignViaSettingModal.smsFlag === true ? (
                    <td>
                      <a
                        href={Demo.BLANK_LINK}
                        className={
                          this.state.shareCampaignViaSettingModal.smsClickable
                            ? ""
                            : "dis-btns"
                        }
                      >
                        <div
                          className="chatbox"
                          onClick={this.handleSelectChannelsOnchange.bind(
                            this,
                            "SMS"
                          )}
                        >
                          <img className="ico" src={Sms1} alt="SMS Icon" />
                          {this.state.Respo_ChannelSMS === true ? (
                            <img className="tick" src={Tick} alt="Tick Icon" />
                          ) : null}
                          SMS
                        </div>
                      </a>
                    </td>
                  ) : null}
                  {this.state.shareCampaignViaSettingModal.emailFlag ===
                  true ? (
                    <td>
                      <a
                        href={Demo.BLANK_LINK}
                        className={
                          this.state.shareCampaignViaSettingModal.emailClickable
                            ? ""
                            : "dis-btns"
                        }
                      >
                        <div
                          className="chatbox"
                          onClick={this.handleSelectChannelsOnchange.bind(
                            this,
                            "Email"
                          )}
                        >
                          <img className="ico" src={Email} alt="Email Icon" />
                          {this.state.Respo_ChannelEmail === true ? (
                            <img className="tick" src={Tick} alt="Tick Icon" />
                          ) : null}
                          Email
                        </div>
                      </a>
                    </td>
                  ) : null}
                </tr>
              </tbody>
            </table>
            <div className="sharecampmob">
              <label
                className="shareviabtn"
                onClick={this.handleShareNowOpenModal.bind(this)}
                id={this.state.shareDisable ? "dis-share" : ""}
              >
                Share Now
              </label>
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

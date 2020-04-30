import React, { Component } from "react";
import { authHeader } from "./../../helpers/authHeader";
import CancelIcon from "./../../assets/Images/cancel.png";
import BroadCastIcon from "./../../assets/Images/broadCast.png";
import BlackInfoIcon from "./../../assets/Images/Info-black.png";
import axios from "axios";
import config from "./../../helpers/config";
import { Table, Popover, Radio } from "antd";
import DatePicker from "react-datepicker";
import { Tabs, Tab } from "react-bootstrap-tabs/dist";
import moment from "moment";
import { NotificationManager } from "react-notifications";
// import { Collapse, CardBody, Card } from "reactstrap";
// import CampaignTable1 from "./Tables/Campaign-row1";
import Modal from "react-responsive-modal";

class StoreCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstCollapse: false,
      TwoCollapse: false,
      campaignGridData: [],
      rowExpandedCount: 0,
      raisedTicketModal: false,
      custNameModal: false,
      brandData: [],
      categoryData: [],
      subCategoryData: [],
      issueTypeData: [],
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
      broadcastChannel: 1,
    };
    this.firstActionOpenClps = this.firstActionOpenClps.bind(this);
    this.twoActionOpenClps = this.twoActionOpenClps.bind(this);
    this.handleCampaignGridData = this.handleCampaignGridData.bind(this);
    this.onRowExpand = this.onRowExpand.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.handleRaisedTicketModalClose = this.handleRaisedTicketModalClose.bind(
      this
    );
    this.handleRaisedTicketModalOpen = this.handleRaisedTicketModalOpen.bind(
      this
    );
  }

  componentDidMount() {
    this.handleCampaignGridData();
    this.handleGetBrand();
  }

  onRowExpand(expanded, record) {
    let rowExpandedCount;
    if (expanded) {
      rowExpandedCount = this.state.rowExpandedCount + 1;
      this.setState({
        rowExpandedCount,
      });
    } else {
      rowExpandedCount = this.state.rowExpandedCount - 1;
      this.setState({
        rowExpandedCount,
      });
    }
  }

  onStatusChange(campaignTypeID, campaignCustomerID, e) {
    this.state.campaignGridData
      .filter((x) => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        (x) => x.campaignCustomerID == campaignCustomerID
      )[0].campaignStatus = parseInt(e.target.value);
    this.state.campaignGridData
      .filter((x) => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        (x) => x.campaignCustomerID == campaignCustomerID
      )[0].response = 0;
    this.state.campaignGridData
      .filter((x) => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        (x) => x.campaignCustomerID == campaignCustomerID
      )[0].callReScheduledTo = "";
    this.setState({ campaignGridData: this.state.campaignGridData });
  }

  onResponseChange(campaignTypeID, campaignCustomerID, e) {
    this.state.campaignGridData
      .filter((x) => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        (x) => x.campaignCustomerID == campaignCustomerID
      )[0].response = parseInt(e.target.value);
    this.setState({ campaignGridData: this.state.campaignGridData });
  }

  onDateChange(campaignTypeID, campaignCustomerID, e) {
    this.state.campaignGridData
      .filter((x) => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        (x) => x.campaignCustomerID == campaignCustomerID
      )[0].callReScheduledTo = e;
    this.setState({ campaignGridData: this.state.campaignGridData });
  }

  handleCampaignGridData() {
    let self = this;
    this.setState({
      loading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreCampaignCustomer",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success" && data) {
          self.setState({
            campaignGridData: data,
          });
        }
        self.setState({
          loading: false,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateCampaignStatusResponse(
    campaignCustomerID,
    campaignStatus,
    response,
    callReScheduledTo,
    e
  ) {
    let self = this,
      calculatedCallReScheduledTo;

    this.setState({
      loading: true,
    });

    if (campaignStatus === 102) {
      calculatedCallReScheduledTo = callReScheduledTo;
    } else {
      calculatedCallReScheduledTo = "";
    }

    // update campaign
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/UpdateCampaignStatusResponse",
      headers: authHeader(),
      data: {
        CampaignCustomerID: campaignCustomerID,
        StatusNameID: campaignStatus,
        ResponseID: response,
        CallReScheduledTo: calculatedCallReScheduledTo,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Record saved successFully.");
          self.handleCampaignGridData();
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
          self.handleCampaignGridData();
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

  handleCustomerNameModalOpen() {
    this.setState({
      custNameModal: true,
    });
  }
  handleCustomerNameModalClose() {
    this.setState({
      custNameModal: false,
    });
  }
  handleBroadcastChange = (e) => {
    this.setState({
      broadcastChannel: e.target.value,
    });
  };
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
                    <div className="table-black-icon">
                      {item.campaignName}
                      <Popover
                        content={
                          <div className="general-popover popover-body broadcastpop">
                            <label>
                              <b>SMS Script</b>
                            </label>
                          </div>
                        }
                        placement="bottom"
                        trigger="click"
                      >
                        <img
                          className="info-icon-cp hidedesk"
                          src={BlackInfoIcon}
                          alt="info-icon"
                        />
                      </Popover>
                    </div>
                  );
                },
              },
              {
                title: "Customers",
                dataIndex: "contactCount",
              },
              {
                title: "Campaign Script",
                dataIndex: "campaignScript",
                className: "table-coloum-hide",
                render: (row, item) => {
                  return (
                    <div>
                      <Popover
                        content={
                          <div className="insertpop1">
                            <div className="dash-creation-popup custompop">
                              <label className="poptitle">Chatbot Script</label>
                              <label>
                                A wonderful serenity has taken possession of my
                                entire soul, like these sweet mornings of spring
                                which I enjoy with my whole heart. I am alone
                              </label>
                            </div>
                          </div>
                        }
                        placement="bottom"
                      >
                        <a className="button-red">Chatbot Script</a>
                      </Popover>
                      <Popover
                        content={
                          <div className="insertpop1">
                            <div className="dash-creation-popup custompop">
                              <label className="poptitle">SMS Script</label>
                              <label>
                                A wonderful serenity has taken possession of my
                                entire soul, like these sweet mornings of
                                spring.
                              </label>
                            </div>
                          </div>
                        }
                        placement="bottom"
                      >
                        <a className="button-blue">SMS Script</a>
                      </Popover>
                    </div>
                  );
                },
              },
              {
                title: "Campaign Period",
                dataIndex: "campaignEndDate",
                className: "table-coloum-hide",
              },
              {
                title: "Status",
                className:"particular-hide",
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
                      <label className="hdrcloselabel">Close</label>
                    </button>
                  );
                },
                // className:
                //   this.state.rowExpandedCount === 0 ? "d-block" : "d-none",
              },
              {
                title: "Actions",
                render: (row, item) => {
                  return (
                    <Popover
                      content={
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
                      }
                      placement="bottom"
                      trigger="click"
                    >
                      <div className="broadcast-icon">
                        <img src={BroadCastIcon} alt="cancel-icone" />
                      </div>
                    </Popover>
                  );
                },
              },
            ]}
            expandedRowRender={(row) => {
              return (
                <Table
                  dataSource={row.storeCampaignCustomerList}
                  columns={[
                    {
                      title: "Customer Name",
                      // dataIndex: "orderMasterID",
                      render: (row, item) => {
                        return (
                          <>
                            <p
                              className="cust-name"
                              onClick={this.handleCustomerNameModalOpen.bind(
                                this
                              )}
                            >
                              {item.customerName}
                            </p>
                            <span className="sml-fnt">
                              {item.customerPhoneNumber}
                            </span>
                          </>
                        );
                      },
                    },
                    {
                      title: "Date",
                      dataIndex: "campaignTypeDate",
                    },
                    {
                      title: "Response",
                      render: (row, item) => {
                        return (
                          <div
                            className={
                              item.campaignStatus === 0 ? "disabled-input" : ""
                            }
                          >
                            <select
                              className={
                                item.campaignStatus === 0
                                  ? "responceDrop-down dropdown-label disabled-link"
                                  : "responceDrop-down dropdown-label"
                              }
                              value={item.response}
                              onChange={this.onResponseChange.bind(
                                this,
                                item.campaignTypeID,
                                item.campaignCustomerID
                              )}
                            >
                              <option hidden>Select Response</option>
                              {item.campaignResponseList !== null &&
                                item.campaignResponseList
                                  .filter(
                                    (x) =>
                                      x.statusNameID === item.campaignStatus
                                  )
                                  .map((items, i) => (
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
                      // dataIndex: "articleName"
                      render: (row, item) => {
                        return (
                          <div className="d-flex">
                            {/* <div className="position-relative">
                              {item.noOfTimesNotContacted !== 0 &&
                                item.campaignStatus === 101 && (
                                  <div className="not-contacted-count">
                                    {item.noOfTimesNotContacted}
                                  </div>
                                )}
                              <input
                                type="radio"
                                name={
                                  "campaign-status-" + item.campaignCustomerID
                                }
                                className="campaign-status-btn"
                                id={
                                  "notConnectedBtnRed" + item.campaignCustomerID
                                }
                                onChange={this.onStatusChange.bind(
                                  this,
                                  item.campaignTypeID,
                                  item.campaignCustomerID
                                )}
                                value="101"
                                checked={item.campaignStatus === 101}
                              />
                              <label
                                className="table-btnlabel notConnectedBtnRed"
                                htmlFor={
                                  "notConnectedBtnRed" + item.campaignCustomerID
                                }
                              >
                                Not Contacted
                              </label>
                            </div> */}
                            <label className="table-btnlabel notConnectedBtnRed">
                              Not Contacted
                            </label>
                            <label className="table-btnlabel contactBtnGreen">
                              Contacted
                            </label>
                            <label className="table-btnlabel followUpBtnYellow">
                              Follow Up
                            </label>
                          </div>
                        );
                      },
                    },
                    {
                      title: "Call Recheduled To",
                      // dataIndex: "pricePaid"
                      render: (row, item) => {
                        return (
                          <div
                            className={
                              item.campaignStatus === 102 && item.response === 3
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
                                item.callReScheduledTo !== ""
                                  ? new Date(item.callReScheduledTo)
                                  : new Date()
                              }
                              dateFormat="MM/dd/yyyy h:mm aa"
                              value={
                                item.callReScheduledTo !== ""
                                  ? moment(item.callReScheduledTo)
                                  : ""
                              }
                              onChange={this.onDateChange.bind(
                                this,
                                item.campaignTypeID,
                                item.campaignCustomerID
                              )}
                              className={
                                item.campaignStatus === 102 &&
                                item.response === 3
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
                          <div className="d-flex">
                            <div
                              className={
                                (item.campaignStatus === 100 &&
                                  item.response !== 0) ||
                                (item.campaignStatus === 101 &&
                                  item.response !== 0) ||
                                (item.campaignStatus === 102 &&
                                  item.response !== 0 &&
                                  item.callReScheduledTo !== "")
                                  ? ""
                                  : "disabled-input"
                              }
                            >
                              <button
                                className={
                                  (item.campaignStatus === 100 &&
                                    item.response !== 0) ||
                                  (item.campaignStatus === 101 &&
                                    item.response !== 0) ||
                                  (item.campaignStatus === 102 &&
                                    item.response !== 0 &&
                                    item.callReScheduledTo !== "")
                                    ? "saveBtn"
                                    : "saveBtn disabled-link"
                                }
                                type="button"
                                style={{ minWidth: "5px", marginRight: "10px" }}
                                onClick={this.handleUpdateCampaignStatusResponse.bind(
                                  this,
                                  item.campaignCustomerID,
                                  item.campaignStatus,
                                  item.response,
                                  item.callReScheduledTo
                                )}
                              >
                                <label className="saveLabel">Update</label>
                              </button>
                            </div>
                            <div
                              className={
                                item.campaignStatus === 100 &&
                                item.response !== 0
                                  ? ""
                                  : "disabled-input"
                              }
                            >
                              <button
                                className={
                                  item.campaignStatus === 100 &&
                                  item.response !== 0
                                    ? "raisedticket-Btn"
                                    : "raisedticket-Btn disabled-link"
                                }
                                type="button"
                                onClick={this.handleRaisedTicketModalOpen.bind(
                                  this,
                                  row,
                                  item
                                )}
                              >
                                <label className="raise-ticketLbl">
                                  Raise Ticket
                                </label>
                              </button>
                            </div>
                          </div>
                        );
                      },
                    },
                  ]}
                  pagination={false}
                />
              );
            }}
            onExpand={this.onRowExpand}
            expandIconColumnIndex={5}
            expandIconAsCell={false}
            pagination={false}
            loading={this.state.loading}
            dataSource={this.state.campaignGridData}
          />
        </div>
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
                <p>NR</p>
              </div>
              <div className="nr-name">
                <h3>Naman Rampal</h3>
                <p>Elite</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="lifetimevalue">
                <table>
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
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="productbox">
                <Tabs>
                  <Tab label="Recommended">
                    <div>
                      <h4 style={{ textAlign: "center" }}></h4>
                      <div className="right-sect-div right-sect-div-edit"></div>
                    </div>
                  </Tab>
                  <Tab label="Last Transaction">
                    <div>
                      <h4 style={{ textAlign: "center" }}></h4>
                      <div className="right-sect-div right-sect-div-edit"></div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </Modal>
        {/* ---------Raised Ticket Modal----------- */}
        {/* <Modal
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
                class="blue-clr mr-4"
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
        </Modal> */}
      </div>
    );
  }
}

export default StoreCampaign;

import React, { Component } from "react";
import down from "./../../assets/Images/collapsedown.png";
import collapseUp from "./../../assets/Images/collapseUp.png";
import { authHeader } from "./../../helpers/authHeader";
import CancelIcon from "./../../assets/Images/cancel.png";
import axios from "axios";
import config from "./../../helpers/config";
import { Table } from "antd";
import DatePicker from "react-datepicker";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import { Collapse, CardBody, Card } from "reactstrap";
import CampaignTable1 from "./Tables/Campaign-row1";
import Modal from "react-responsive-modal";

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstCollapse: false,
      TwoCollapse: false,
      campaignGridData: [],
      rowExpandedCount: 0,
      raisedTicketModal: false,
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
      loading: false
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
    debugger;
    let rowExpandedCount;
    if (expanded) {
      rowExpandedCount = this.state.rowExpandedCount + 1;
      this.setState({
        rowExpandedCount
      });
    } else {
      rowExpandedCount = this.state.rowExpandedCount - 1;
      this.setState({
        rowExpandedCount
      });
    }
  }

  onStatusChange(campaignTypeID, campaignCustomerID, e) {
    debugger;
    this.state.campaignGridData
      .filter(x => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        x => x.campaignCustomerID == campaignCustomerID
      )[0].campaignStatus = parseInt(e.target.value);
    this.state.campaignGridData
      .filter(x => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        x => x.campaignCustomerID == campaignCustomerID
      )[0].response = 0;
    this.state.campaignGridData
      .filter(x => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        x => x.campaignCustomerID == campaignCustomerID
      )[0].callReScheduledTo = "";
    this.setState({ campaignGridData: this.state.campaignGridData });
  }

  onResponseChange(campaignTypeID, campaignCustomerID, e) {
    debugger;
    this.state.campaignGridData
      .filter(x => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        x => x.campaignCustomerID == campaignCustomerID
      )[0].response = parseInt(e.target.value);
    this.setState({ campaignGridData: this.state.campaignGridData });
  }

  onDateChange(campaignTypeID, campaignCustomerID, e) {
    debugger;
    this.state.campaignGridData
      .filter(x => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        x => x.campaignCustomerID == campaignCustomerID
      )[0].callReScheduledTo = e;
    this.setState({ campaignGridData: this.state.campaignGridData });
  }

  handleCampaignGridData() {
    debugger;
    let self = this;
    this.setState({
      loading: true
    });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreCampaignCustomer",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success" && data) {
          self.setState({
            campaignGridData: data
          });
        }
        self.setState({
          loading: false
        });
      })
      .catch(data => {
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
    debugger;
    let self = this,
      calculatedCallReScheduledTo;

    this.setState({
      loading: true
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
        CallReScheduledTo: calculatedCallReScheduledTo
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Record saved successFully.");
          self.handleCampaignGridData();
        } else {
          self.setState({
            loading: false
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleCloseCampaign(campaignTypeID, e) {
    debugger;
    let self = this;
    this.setState({
      loading: true
    });

    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/CloseCampaign",
      headers: authHeader(),
      params: {
        CampaignTypeID: campaignTypeID,
        IsClosed: 1
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Campaign closed successFully.");
          self.handleCampaignGridData();
        } else {
          self.setState({
            loading: false
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  firstActionOpenClps() {
    this.setState(state => ({ FirstCollapse: !state.FirstCollapse }));
  }
  twoActionOpenClps() {
    this.setState(state => ({ TwoCollapse: !state.TwoCollapse }));
  }

  handleCreateTicket() {
    debugger;
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
    // if (
    //   this.state.modalData.tiketTitle !== "" &&
    //   this.state.modalData.tiketDetails.length > 0 &&
    //   this.state.modalData.brandId.length > 0 &&
    //   this.state.modalData.cateogryId.length > 0 &&
    //   this.state.modalData.subCategoryId.length > 0 &&
    //   this.state.modalData.issueTypeId.length > 0
    // ) {
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
          ticketingMailerQues: []
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
          data: formData
        })
          .then(function(res) {
            debugger;
            let Msg = res.data.status;
            let TID = res.data.responseData;
            if (Msg) {
              NotificationManager.success(res.data.message);
            } else {
              NotificationManager.error(res.data.message);
            }
          })
          .catch(data => {
            console.log(data);
          });
      }
    }, 10);

    // } else {
    //   this.setState({
    //     isTiketTitle: "Ticket Title field is compulsory.",
    //     isTiketDetails: "Ticket Details field is compulsory.",
    //     isBrand: "Brand field is compulsory.",
    //     isCategory: "Category field is compulsory.",
    //     isSubCategory: "Sub Category field is compulsory.",
    //     isIssueType: "Issue Type field is compulsory."
    //   });
    // }

    // Don't remove this function
  }

  ////handle raised ticket modal close
  handleRaisedTicketModalClose() {
    this.setState({
      raisedTicketModal: false
    });
  }
  ////handle raised ticket modal open
  handleRaisedTicketModalOpen(row, item) {
    debugger;
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
      isTiketDetails: ""
    });
  }

  ////handle get brand list
  handleGetBrand() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var brandData = response.data.responseData;
        if (message == "Success" && brandData.length > 0) {
          self.setState({ brandData });
        } else {
          self.setState({ brandData });
        }
      })
      .catch(response => {
        console.log(response, "---handleGetBrand");
      });
  }
  ////handle get category by brand id list
  handleGetCateogory() {
    let self = this;
    debugger;
    var brandID = this.state.modalData.brandId;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader(),
      params: { BrandID: Number(brandID) }
    })
      .then(function(response) {
        debugger;
        var categoryData = response.data;
        if (categoryData.length > 0) {
          self.setState({ categoryData });
        } else {
          self.setState({ categoryData: [] });
        }
      })
      .catch(response => {
        console.log(response, "---handleGetCateogory");
      });
  }

  ////handle get sub category by category id list
  handleGetSubCateogory() {
    debugger;
    let self = this;
    var categoryID = this.state.modalData.cateogryId;
    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: { CategoryID: categoryID }
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var subCategoryData = response.data.responseData;
        if (message == "Success" && subCategoryData.length > 0) {
          self.setState({ subCategoryData });
        } else {
          self.setState({ subCategoryData: [] });
        }
      })
      .catch(response => {
        console.log(response, "---handleGetSubCateogory");
      });
  }

  ////handle get issue type by sub category list
  handleGetIssueType() {
    debugger;
    let self = this;
    var subCategoryId = this.state.modalData.subCategoryId;
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: { SubCategoryID: subCategoryId }
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var issueTypeData = response.data.responseData;
        if (message == "Success" && issueTypeData.length > 0) {
          self.setState({ issueTypeData });
        } else {
          self.setState({ issueTypeData: [] });
        }
      })
      .catch(response => {
        console.log(response, "---handleGetSubCateogory");
      });
  }

  handleOnchange = e => {
    debugger;
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
          ispriority: ""
        });
      } else {
        this.setState({
          ispriority: "Please Select Priority.",
          priorityID: value
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
          issueTypeData: []
        });
        setTimeout(() => {
          this.handleGetCateogory();
        }, 10);
      } else {
        modalData["brandId"] = value;
        this.setState({ modalData, isBrand: "Please Select Brand." });
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
          issueTypeData: []
        });
        setTimeout(() => {
          this.handleGetSubCateogory();
        }, 10);
      } else {
        modalData["cateogryId"] = value;
        this.setState({ modalData, isCategory: "Please Select Category." });
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
        this.setState({
          modalData,
          isSubCategory: "Please Select Sub Category."
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
          isTiketTitle: "Please Enter Ticket Title."
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
          isTiketDetails: "Please Enter Tiket Details."
        });
      }
    }
  };
  render() {
    return (
      <div>
        <div className="table-cntr store">
          <Table
            className="components-table-demo-nested antd-table-campaign custom-antd-table"
            columns={[
              {
                title: "Campaign Name",
                dataIndex: "campaignName"
              },
              {
                title: "Contacts",
                dataIndex: "contactCount"
              },
              {
                title: "Campaign Script",
                dataIndex: "campaignScript"
              },
              {
                title: "Campaign End Date",
                dataIndex: "campaignEndDate"
              },
              {
                title: "Campaign Status",
                render: row => {
                  return (
                    <button
                      className="closebtn"
                      type="button"
                      onClick={this.handleCloseCampaign.bind(
                        this,
                        row.campaignTypeID
                      )}
                    >
                      <label className="hdrcloselabel">Close</label>
                    </button>
                  );
                },
                className:
                  this.state.rowExpandedCount === 0 ? "d-block" : "d-none"
              },
              {
                title: "Actions"
                // dataIndex: "orderPricePaid"
              }
            ]}
            expandedRowRender={row => {
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
                            {item.customerName}
                            <span className="sml-fnt">
                              {item.customerPhoneNumber}
                            </span>
                          </>
                        );
                      }
                    },
                    {
                      title: "Date",
                      dataIndex: "campaignTypeDate"
                    },
                    {
                      title: "Status",
                      // dataIndex: "articleName"
                      render: (row, item) => {
                        return (
                          <div className="d-flex">
                            <div>
                              <input
                                type="radio"
                                name={
                                  "campaign-status-" + item.campaignCustomerID
                                }
                                className="campaign-status-btn"
                                id={"contactBtnGreen" + item.campaignCustomerID}
                                onChange={this.onStatusChange.bind(
                                  this,
                                  item.campaignTypeID,
                                  item.campaignCustomerID
                                )}
                                value="100"
                                checked={item.campaignStatus === 100}
                              />
                              <label
                                className="table-btnlabel contactBtnGreen"
                                htmlFor={
                                  "contactBtnGreen" + item.campaignCustomerID
                                }
                              >
                                Contacted
                              </label>
                            </div>
                            <div className="position-relative">
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
                            </div>
                            <div>
                              <input
                                type="radio"
                                name={
                                  "campaign-status-" + item.campaignCustomerID
                                }
                                className="campaign-status-btn"
                                id={
                                  "followUpBtnYellow" + item.campaignCustomerID
                                }
                                onChange={this.onStatusChange.bind(
                                  this,
                                  item.campaignTypeID,
                                  item.campaignCustomerID
                                )}
                                value="102"
                                checked={item.campaignStatus === 102}
                              />
                              <label
                                className="table-btnlabel followUpBtnYellow"
                                htmlFor={
                                  "followUpBtnYellow" + item.campaignCustomerID
                                }
                              >
                                Follow Up
                              </label>
                            </div>
                          </div>
                        );
                      }
                    },
                    {
                      title: "Responce",
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
                              <option hidden>Select</option>
                              {item.campaignResponseList !== null &&
                                item.campaignResponseList
                                  .filter(
                                    x => x.statusNameID === item.campaignStatus
                                  )
                                  .map((items, i) => (
                                    <option key={i} value={items.responseID}>
                                      {items.response}
                                    </option>
                                  ))}
                            </select>
                          </div>
                        );
                      }
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
                      }
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
                                style={{ minWidth: "5px", marginRight: "3px" }}
                                onClick={this.handleUpdateCampaignStatusResponse.bind(
                                  this,
                                  item.campaignCustomerID,
                                  item.campaignStatus,
                                  item.response,
                                  item.callReScheduledTo
                                )}
                              >
                                <label className="saveLabel">Save</label>
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
                      }
                    }
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
                {/* {this.state.isBrand !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isBrand}
                  </p>
                )} */}
              </div>
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
        </Modal>
      </div>
    );
  }
}

export default Campaign;

import React, { Component } from "react";
import down from "./../../assets/Images/collapsedown.png";
import collapseUp from "./../../assets/Images/collapseUp.png";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";
import { Table } from "antd";
import DatePicker from "react-datepicker";
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
      rowExpanded: false,
      statusData: [],
      responseData: [],
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
      isTiketDetails: ""
    };
    this.firstActionOpenClps = this.firstActionOpenClps.bind(this);
    this.twoActionOpenClps = this.twoActionOpenClps.bind(this);
    this.handleCampaignGridData = this.handleCampaignGridData.bind(this);
    this.handleCampaignStatusResponseList = this.handleCampaignStatusResponseList.bind(
      this
    );
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
    this.handleCampaignStatusResponseList();
    this.handleGetBrand();
  }

  onRowExpand(expanded, record) {
    debugger;
    if (expanded) {
      this.setState({
        rowExpanded: true
      });
    } else {
      this.setState({
        rowExpanded: false
      });
    }
  }

  onStatusChange(e) {
    debugger;
    let responseData = this.state.responseData;
    let statusId = parseInt(e.target.value);
    responseData.filter(x => x.statusNameID === statusId);
  }

  handleCampaignGridData() {
    debugger;
    let self = this;
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
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleCampaignStatusResponseList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetCampaignStatusResponse",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let statusData = res.data.responseData.campaignStatusList;
        let responseData = res.data.responseData.campaignResponseList;
        if (status === "Success" && statusData && responseData) {
          self.setState({
            statusData,
            responseData
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
    modalData.mobile = row.customerPhoneNumber;
    modalData.email = row.customerEmailId;
    modalData.dateofbirth = "";
    modalData.brandId = 0;
    modalData.cateogryId = 0;
    modalData.subCategoryId = 0;
    modalData.issueTypeId = 0;
    modalData.ticketTitle = "";
    modalData.ticketDetails = "";

    this.setState({
      modalData,
      raisedTicketModal: true
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
    var brandID = this.state.modalData.brandID;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader(),
      params: { BrandID: Number(brandID) }
    })
      .then(function(response) {
        var message = response.data.message;
        var categoryData = response.data.responseData;
        if (message == "Success" && categoryData.length > 0) {
          self.setState({ categoryData });
        } else {
          self.setState({ categoryData });
        }
      })
      .catch(response => {
        console.log(response, "---handleGetCateogory");
      });
  }

  ////handle get sub category by category id list
  handleGetSubCateogory() {
    let self = this;
    var categoryID = this.state.categoryID;
    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: { CategoryID: categoryID }
    })
      .then(function(response) {
        var message = response.data.message;
        var subCategoryData = response.data.responseData;
        if (message == "Success" && subCategoryData.length > 0) {
          self.setState({ subCategoryData });
        } else {
          self.setState({ subCategoryData });
        }
      })
      .catch(response => {
        console.log(response, "---handleGetSubCateogory");
      });
  }

  ////handle get issue type by sub category list
  handleGetIssueType() {
    let self = this;
    var subCategoryId = this.state.subCategoryId;
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: { SubCategoryID: subCategoryId }
    })
      .then(function(response) {
        var message = response.data.message;
        var issueTypeData = response.data.responseData;
        if (message == "Success" && issueTypeData.length > 0) {
          self.setState({ issueTypeData });
        } else {
          self.setState({ issueTypeData });
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
      if (value !== 0) {
        modalData["brandId"] = value;
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
      if (value !== 0) {
        modalData["cateogryId"] = value;
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
      if (value !== 0) {
        modalData["subCategoryId"] = value;
        this.setState({ modalData, isSubCategory: "", issueTypeData: [] });
      } else {
        modalData["subCategoryId"] = value;
        this.setState({
          modalData,
          isSubCategory: "Please Select Sub Category."
        });
      }
    }
    if (name == "issueType") {
      if (value !== 0) {
        modalData["issueTypeId"] = value;
        this.setState({ modalData, isIssueType: "" });
        setTimeout(() => {
          this.handleGetIssueType();
        }, 10);
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
    const ImgChange = this.state.FirstCollapse ? (
      <img src={collapseUp} alt="collapseUp" />
    ) : (
      <img src={down} alt="collapse down" />
    );
    const ImgChangeTwo = this.state.TwoCollapse ? (
      <img src={collapseUp} alt="collapseUp" />
    ) : (
      <img src={down} alt="collapse down" />
    );
    /**Header Name change**/

    const HeaderNameChange = this.state.FirstCollapse
      ? "Campaign Type"
      : "Customer Name";

    /**Hide clode button with header**/

    const HideHeaderChange = this.state.FirstCollapse ? "" : "Campaign Status";
    const HideCloseButton = this.state.FirstCollapse ? (
      ""
    ) : (
      <button className="closebtn" type="button">
        <label className="hdrcloselabel">Close</label>
      </button>
    );
    return (
      <div>
        <div className="table-cntr store">
          {/* <table>
            <thead>
              <tr>
                <th>{HeaderNameChange}</th>
                <th>Contacts</th>
                <th>Campaign Script</th>
                <th>Campaign End Date</th>
                <th>{HideHeaderChange}</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Aniversery</td>
                <td>10</td>
                <td>Hello Mr/Mrs ......, Greetings for the day........</td>
                <td>12-Aug-19</td>
                <td>{HideCloseButton}</td>
                <td>
                  <div onClick={this.firstActionOpenClps}>{ImgChange}</div>
                </td>
              </tr>
              <tr className="table-cntr-card">
                <td colSpan="6" style={{ padding: "0", paddingLeft: "7px" }}>
                  <Collapse isOpen={this.state.FirstCollapse}>
                    <Card>
                      <CardBody>
                        <CampaignTable1 />
                      </CardBody>
                    </Card>
                  </Collapse>
                </td>
              </tr>
              <tr>
                <td>Birthday</td>
                <td>13</td>
                <td>Hello Mr/Mrs ......, Greetings for the day........</td>
                <td>13-Aug-19</td>
                <td>
                  <button className="closebtn" type="button">
                    <label className="hdrcloselabel">Close</label>
                  </button>
                </td>
                <td>
                  <div onClick={this.twoActionOpenClps}>{ImgChangeTwo}</div>
                </td>
              </tr>
              <tr className="table-cntr-card">
                <td colSpan="6" style={{ padding: "0", paddingLeft: "7px" }}>
                  <Collapse isOpen={this.state.TwoCollapse}>
                    <Card>
                      <CardBody>
                        <CampaignTable1 />
                      </CardBody>
                    </Card>
                  </Collapse>
                </td>
              </tr>
              <tr>
                <td>EOSS</td>
                <td>20</td>
                <td>Hello Mr/Mrs ......, Greetings for the day........</td>
                <td>13-Aug-19</td>
                <td>
                  <button className="closebtn" type="button">
                    <label className="hdrcloselabel">Close</label>
                  </button>
                </td>
                <td>
                  <img src={down} alt="collapse down" />
                </td>
              </tr>
            </tbody>
          </table>
         */}
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
                render: () => {
                  return (
                    <button className="closebtn" type="button">
                      <label className="hdrcloselabel">Close</label>
                    </button>
                  );
                },
                className: this.state.rowExpanded ? "d-none" : "d-block"
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
                                onChange={this.onStatusChange}
                                value="100"
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
                            <div>
                              <input
                                type="radio"
                                name={
                                  "campaign-status-" + item.campaignCustomerID
                                }
                                className="campaign-status-btn"
                                id={
                                  "notConnectedBtnRed" + item.campaignCustomerID
                                }
                                onChange={this.onStatusChange}
                                value="101"
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
                                onChange={this.onStatusChange}
                                value="102"
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
                      // dataIndex: "itemPrice"
                      render: (row, item) => {
                        return (
                          <select className="responceDrop-down dropdown-label">
                            <option>Ringing No Response</option>
                            <option>Call Back Later</option>
                            <option>Mobile No Not Reachable</option>
                            <option>No Switched Off</option>
                            <option>Call Disconnected</option>
                            <option>Mobile No Does Not Exist</option>
                            <option>Mobile No Does Not Exist</option>
                            <option>Wrong Mobile Number</option>
                            <option>Customer Was Happy</option>
                            <option>Customer Was Not Happy</option>
                          </select>
                        );
                      }
                    },
                    {
                      title: "Call Recheduled To",
                      // dataIndex: "pricePaid"
                      render: (row, item) => {
                        return (
                          <DatePicker
                            id="startDate"
                            name="startDate"
                            showMonthDropdown
                            showYearDropdown
                            selected={this.state.startDate}
                            onChange={this.DateChange}
                            className="txtStore dateTimeStore"
                            placeholderText="Select Date & Time"
                          />
                        );
                      }
                    },
                    {
                      title: "Actions",
                      // dataIndex: "discount"
                      render: (row, item) => {
                        return (
                          <div className="d-flex">
                            <button
                              className="saveBtn"
                              type="button"
                              style={{ minWidth: "5px", marginRight: "3px" }}
                            >
                              <label className="saveLabel">Save</label>
                            </button>
                            <button
                              className="raisedticket-Btn"
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
          <div>
            <div className="row">
              <label>Customer Details</label>
              <label>
                Source:<span>Store</span>{" "}
              </label>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label>Name</label>
                <input
                  type="text"
                  className="mobile_no"
                  name="name"
                  value={this.state.modalData["name"]}
                  onChange={this.handleOnchange}
                />
                {this.state.isName !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isName}
                  </p>
                )}
              </div>
              <div className="col-md-4">
                <label>Mobile</label>
                <input
                  type="text"
                  className="mobile_no"
                  name="mobile"
                  value={this.state.modalData["mobile"]}
                  onChange={this.handleOnchange}
                />
                {this.state.isMobile !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isMobile}
                  </p>
                )}
              </div>
              <div className="col-md-4">
                <label>Email</label>
                <input
                  type="text"
                  className="mobile_no"
                  name="email"
                  value={this.state.modalData["email"]}
                  onChange={this.handleOnchange}
                />
                {this.state.isEmail !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isEmail}
                  </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label>Date of birth</label>
                <input
                  type="text"
                  name="dateofbrith"
                  value={this.state.modalData["dateofbrith"]}
                  onChange={this.handleOnchange}
                />
                {/* {this.state.isBrand !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isBrand}
                  </p>
                )} */}
              </div>
              <div className="col-md-4">
                <label>Brand</label>
                <select
                  className="store-create-select"
                  name="brand"
                  value={this.state.modalData["brand"]}
                  onChange={this.handleOnchange}
                >
                  <option value={0}>Select</option>
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
              <div className="col-md-4">
                <label>Category</label>
                <select
                  className="store-create-select"
                  name="category"
                  value={this.state.modalData["category"]}
                  onChange={this.handleOnchange}
                >
                  <option value={0}>Select</option>
                  {this.state.categoryData !== null &&
                    this.state.categoryData.map((item, i) => (
                      <option
                        key={i}
                        value={item.cateogryId}
                        className="select-category-placeholder"
                      >
                        {item.cateogryName}
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
              <div className="col-md-4">
                <label>Sub Category</label>
                <select
                  className="store-create-select"
                  name="subCategory"
                  value={this.state.modalData["subCategoryId"]}
                  onChange={this.handleOnchange}
                >
                  <option value={0}>Select</option>
                  {this.state.subCategoryData !== null &&
                    this.state.subCategoryData.map((item, i) => (
                      <option
                        key={i}
                        value={item.subCategoryId}
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
              <div className="col-md-4">
                <label>Issue Type</label>
                <select
                  className="store-create-select"
                  name="issueType"
                  value={this.state.modalData["issueTypeId"]}
                  onChange={this.handleOnchange}
                >
                  <option value={0}>Select</option>
                  {this.state.issueTypeData !== null &&
                    this.state.issueTypeData.map((item, i) => (
                      <option
                        key={i}
                        value={item.issueTypeId}
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
              <div className="col-md-4">
                <label>Ticket Title</label>
                <input
                  type="text"
                  name="ticketTitle"
                  className="email_Id"
                  value={this.state.modalData["ticketTitle"]}
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
              <div>
                <label>Ticket Details</label>
                <textarea
                  name="ticketDetails"
                  className="textarea-store"
                  value={this.state.modalData["ticketDetails"]}
                  onChange={this.handleOnchange}
                ></textarea>
                {this.state.isTiketDetails !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isTiketDetails}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Campaign;

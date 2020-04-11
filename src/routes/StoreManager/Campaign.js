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

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstCollapse: false,
      TwoCollapse: false,
      campaignGridData: [],
      rowExpanded: false,
      statusData: [],
      responseData: []
    };
    this.firstActionOpenClps = this.firstActionOpenClps.bind(this);
    this.twoActionOpenClps = this.twoActionOpenClps.bind(this);
    this.handleCampaignGridData = this.handleCampaignGridData.bind(this);
    this.handleCampaignStatusResponseList = this.handleCampaignStatusResponseList.bind(
      this
    );
    this.onRowExpand = this.onRowExpand.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  componentDidMount() {
    this.handleCampaignGridData();
    this.handleCampaignStatusResponseList();
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
                            <button className="raisedticket-Btn" type="button">
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
      </div>
    );
  }
}

export default Campaign;

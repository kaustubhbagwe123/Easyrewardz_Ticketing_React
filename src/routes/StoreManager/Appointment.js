import React, { Component, Fragment } from "react";
import { Table } from "antd";
import axios from "axios";
import config from "./../../helpers/config";
import { authHeader } from "./../../helpers/authHeader";

class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          // appointmentGridData: [{id:1, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
          //                       subAppointmentData: [{id:1, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: "Visited"},
          //                       {id:2, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
          //                       {id:3, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
          //                       {id:2, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
          //                       subAppointmentData: [{id:4, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
          //                       {id:5, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
          //                       {id:3, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
          //                       subAppointmentData: [{id:6, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
          //                       {id:7, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
          //                       {id:4, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
          //                       subAppointmentData: [{id:8, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
          //                       {id:9, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
          //                       {id:5, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
          //                       subAppointmentData: [{id:10, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
          //                       {id:11, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
          //                       {id:6, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
          //                       subAppointmentData: [{id:12, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
          //                       {id:13, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
          //                       {id:7, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
          //                       subAppointmentData: [{id:14, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
          //                       {id:15, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
          //                       {id:8, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
          //                       subAppointmentData: [{id:16, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
          //                       {id:17, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
          //                       {id:9, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
          //                       subAppointmentData: [{id:18, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
          //                       {id:19, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
          //                       {id:10, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
          //                       subAppointmentData: [{id:20, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
          //                       {id:21, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]}],
          appointmentGridData:[],
          rowExpandedCount: 0               
        }
        this.onRowExpand = this.onRowExpand.bind(this);
    }

    componentDidMount() {
        this.handleAppointmentGridData();
    }

    handleAppointmentGridData() {
        debugger;
        let self = this;
        this.setState({
          loading: true,
        });
        axios({
            method: "post",
            url: config.apiUrl + "/Appointment/GetAppointmentList",
            headers: authHeader(),
        }).then(function(res) {
            debugger;
            let status = res.data.message;
            let data = res.data.responseData;
            if (status === "Success" && data) {
              self.setState({
                appointmentGridData: data,
              });
            }
            self.setState({
               loading: false,
            });
        }).catch((data) => {
            console.log(data);
        });
    }

    onRowExpand(expanded, record) {
        debugger;
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

    render() {
        return(
            <div className="custom-tableak">
              <div className="custom-tabs">
                <div className="custom-tabcount">
                  <p className="tab-title">Today</p>
                  <span className="tab-count">30</span>
                </div>
                <div className="custom-tabcount1">
                  <p className="tab-title1">21st</p>
                  <span className="tab-count1">46</span>
                </div>
                <div className="custom-tabcount1">
                  <p className="tab-title1">22nd</p>
                  <span className="tab-count1">44</span>
                </div>
              </div>
              <div className="table-cntr store">
                <Table
                  className="components-table-demo-nested antd-table-campaign custom-antd-table"
                  columns={[
                    {
                      title: "Date",
                      dataIndex: "apointmentDate",
                    },
                    {
                      title: "Time",
                      dataIndex: "timeSlot",
                    },
                    {
                      title: "Appointments",
                      dataIndex: "noOfPeople",

                      
                      },
                      {
                        title: "Actions",
                        // dataIndex: "orderPricePaid"
                      },
                  ]}
                  expandedRowRender={(row) => {
                    return (
                      <Table
                        dataSource={row.appointmentCustomerList}
                        columns={[
                          {
                            title: "Customer Name",
                            dataIndex: "customerName"
                          },
                          {
                            title: "Mobile No.",
                            dataIndex: "mobileNo",
                          },
                          {
                              title: "No. of People",
                              dataIndex: "noOfPeople",
                          },
                          {
                            title: "Status",
                            render: (row, item) => {
                              if(item.status !== 1){
                              return (
                                <div className="d-flex">
                                  <div>
                                    <button className="statusBtn" type="button"  style={{ minWidth: "5px", marginRight: "10px" }}
                                    disabled
                                    >
                                    <label className="statusLabel">Visited</label>
                                    </button>
                                  </div>
                                </div>
                                );
                              }else{
                                return (
                                <div className="d-flex">
                                  <div>
                                    <select>
                                      <option>Select Status</option>
                                      <option>Cancel</option>
                                      <option>Visited</option>
                                    </select>
                                  </div>
                              </div>);
                              }
                            }
                          //   render: (row, item) => {
                          //     return (
                          //       <div className="d-flex">
                          //         <div>
                          //           <input
                          //             type="radio"
                          //             name={
                          //               "campaign-status-" + item.campaignCustomerID
                          //             }
                          //             className="campaign-status-btn"
                          //             id={"contactBtnGreen" + item.campaignCustomerID}
                          //             onChange={this.onStatusChange.bind(
                          //               this,
                          //               item.campaignTypeID,
                          //               item.campaignCustomerID
                          //             )}
                          //             value="100"
                          //             checked={item.campaignStatus === 100}
                          //           />
                          //           <label
                          //             className="table-btnlabel contactBtnGreen"
                          //             htmlFor={
                          //               "contactBtnGreen" + item.campaignCustomerID
                          //             }
                          //           >
                          //             Contacted
                          //           </label>
                          //         </div>
                          //         <div className="position-relative">
                          //           {item.noOfTimesNotContacted !== 0 &&
                          //             item.campaignStatus === 101 && (
                          //               <div className="not-contacted-count">
                          //                 {item.noOfTimesNotContacted}
                          //               </div>
                          //             )}
                          //           <input
                          //             type="radio"
                          //             name={
                          //               "campaign-status-" + item.campaignCustomerID
                          //             }
                          //             className="campaign-status-btn"
                          //             id={
                          //               "notConnectedBtnRed" + item.campaignCustomerID
                          //             }
                          //             onChange={this.onStatusChange.bind(
                          //               this,
                          //               item.campaignTypeID,
                          //               item.campaignCustomerID
                          //             )}
                          //             value="101"
                          //             checked={item.campaignStatus === 101}
                          //           />
                          //           <label
                          //             className="table-btnlabel notConnectedBtnRed"
                          //             htmlFor={
                          //               "notConnectedBtnRed" + item.campaignCustomerID
                          //             }
                          //           >
                          //             Not Contacted
                          //           </label>
                          //         </div>
                          //         <div>
                          //           <input
                          //             type="radio"
                          //             name={
                          //               "campaign-status-" + item.campaignCustomerID
                          //             }
                          //             className="campaign-status-btn"
                          //             id={
                          //               "followUpBtnYellow" + item.campaignCustomerID
                          //             }
                          //             onChange={this.onStatusChange.bind(
                          //               this,
                          //               item.campaignTypeID,
                          //               item.campaignCustomerID
                          //             )}
                          //             value="102"
                          //             checked={item.campaignStatus === 102}
                          //           />
                          //           <label
                          //             className="table-btnlabel followUpBtnYellow"
                          //             htmlFor={
                          //               "followUpBtnYellow" + item.campaignCustomerID
                          //             }
                          //           >
                          //             Follow Up
                          //           </label>
                          //         </div>
                          //       </div>
                          //     );
                          //   },
                          },
                          {
                            title: "Actions",
                            render: (row, item) => {
                              if(item.status === 0 ){
                              return (
                                <div className="d-flex">
                                  <div>
                                    <button className="saveBtn" type="button"  style={{ minWidth: "5px", marginRight: "10px" }}>
                                      <label className="saveLabel">Update</label>
                                    </button>
                                  </div>
                                </div>
                                );
                              }
                            }
                          }
                        ]}
                        pagination={false}
                      />
                    );
                  }}
                  onExpand={this.onRowExpand}
                  expandIconColumnIndex={3}
                  expandIconAsCell={false}
                  pagination={false}
                  loading={this.state.loading}
                  dataSource={this.state.appointmentGridData}
                />
              </div>
            </div>
        );
    }
}
export default Appointment;
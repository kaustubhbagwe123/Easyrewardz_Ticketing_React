import React, { Component, Fragment } from "react";
import { Table } from "antd";
import axios from "axios";
import config from "./../../helpers/config";
import { authHeader } from "./../../helpers/authHeader";
import moment from "moment";
import { NotificationManager } from "react-notifications";

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
          rowExpandedCount: 0,
          todayCount: 0,
          tomorrowCount: 0,
          dayAfterTomorrowCount: 0,
          tomorrowDay: "",
          dayAfterTomorrowDay: "",
          status: "",
          tabFor: 1       
        }
        this.onRowExpand = this.onRowExpand.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount() {
        this.handleAppointmentGridData(1);
        this.handleAppointmentCount();
    }

    handleAppointmentGridData(tabFor) {
        debugger;
        let self = this;
        var date = "";
        this.setState({
          loading: true,
          tabFor: tabFor
        });
        if(tabFor === 1){
          date = moment(new Date()).format('YYYY-MM-DD');
        }
        if(tabFor === 2){
          var todayDate = new Date();
          date = moment(todayDate.setDate(todayDate.getDate() + 1)).format('YYYY-MM-DD');
        }
        if(tabFor === 3){
          var todayDate = new Date();
          date = moment(todayDate.setDate(todayDate.getDate() + 2)).format('YYYY-MM-DD');
        }
        
        axios({
            method: "post",
            url: config.apiUrl + "/Appointment/GetAppointmentList",
            params: {AppDate : date},
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

    handleAppointmentCount() {
      debugger;
      let self = this;
      var todayDate = new Date();
      var tomorrowDate = moment(todayDate.setDate(todayDate.getDate() + 1)).format('Do');
      var dayAterTomorrowDate = moment(todayDate.setDate(todayDate.getDate() + 1)).format('Do');
      self.setState({
        tomorrowDay: tomorrowDate,
        dayAfterTomorrowDay: dayAterTomorrowDate
      });
      
      axios({
          method: "post",
          url: config.apiUrl + "/Appointment/GetAppointmentCount",
          headers: authHeader(),
      }).then(function(res) {
          debugger;
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success" && data) {
            self.setState({
              todayCount: data[0].today,
              tomorrowCount: data[0].tomorrow,
              dayAfterTomorrowCount: data[0].dayAfterTomorrow
            });
          }
          
      }).catch((data) => {
          console.log(data);
      });
  }

    handleUpdateAppointment(appointmentID) {
      debugger;
      let self = this;
      if(this.state.status!=="")
      {
        axios({
            method: "post",
            url: config.apiUrl + "/Appointment/UpdateAppointmentStatus",
            data:{
              AppointmentID: appointmentID,
              Status: parseInt(this.state.status)
            },
            headers: authHeader(),
        }).then(function(res) {
            debugger;
            let status = res.data.message;
            if (status === "Success") {
              NotificationManager.success("Record updated successFully.");
            }else{
              NotificationManager.error(status);
            }
            self.handleAppointmentGridData();
        }).catch((data) => {
            console.log(data);
        });
      }else{
        NotificationManager.error("Please select status.");
      }
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

      handleOnChange(e){
        debugger;
        this.setState({
          [e.target.name]: e.target.value
        });
      }

    render() {
        return(
            <div className="custom-tableak">
              <div className="custom-tabs">
                <div className={this.state.tabFor === 1? "custom-tabcount":"custom-tabcount1"} onClick={this.handleAppointmentGridData.bind(this,1)}>
                  <p className={this.state.tabFor === 1? "tab-title":"tab-title1"}>Today</p>
                  <span className={this.state.tabFor === 1? "tab-count":"tab-count1"}>{this.state.todayCount}</span>
                </div>
                <div className={this.state.tabFor === 2? "custom-tabcount":"custom-tabcount1"} onClick={this.handleAppointmentGridData.bind(this,2)}>
                  <p className={this.state.tabFor === 2? "tab-title":"tab-title1"}>{this.state.tomorrowDay}</p>
                  <span className={this.state.tabFor === 2? "tab-count":"tab-count1"}>{this.state.tomorrowCount}</span>
                </div>
                <div className={this.state.tabFor === 3? "custom-tabcount":"custom-tabcount1"} onClick={this.handleAppointmentGridData.bind(this,3)}>
                  <p className={this.state.tabFor === 3? "tab-title":"tab-title1"}>{this.state.dayAfterTomorrowDay}</p>
                  <span className={this.state.tabFor === 3? "tab-count":"tab-count1"}>{this.state.dayAfterTomorrowCount}</span>
                </div>
              </div>
              <div className="table-cntr store">
                <Table
                  className="components-table-demo-nested antd-table-campaign custom-antd-table"
                  columns={[
                    {
                      title: "Date",
                      dataIndex: "appointmentDate",
                    },
                    {
                      title: "Time",
                      dataIndex: "timeSlot",
                    },
                    {
                      title: "Appointments",
                      dataIndex: "nOofPeople",

                    },
                    {
                      title: "Max Capacity",
                      dataIndex: "maxCapacity",

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
                            dataIndex: "customerNumber",
                          },
                          {
                              title: "No. of People",
                              dataIndex: "nOofPeople",
                          },
                          {
                            title: "Status",
                            render: (row, item) => {
                              if(item.status !== ""){
                              return (
                                <div className="d-flex">
                                  <div>
                                    <button className="statusBtn" type="button"  style={{ minWidth: "5px", marginRight: "10px" }}
                                    disabled
                                    >
                                    <label className="statusLabel">{item.status}</label>
                                    </button>
                                  </div>
                                </div>
                                );
                              }else{
                                return (
                                <div className="d-flex">
                                  <div>
                                    <select name="status" value={this.state.status}
                                     onChange={this.handleOnChange}
                                    >
                                      <option value="">Select Status</option>
                                      <option value="0">Cancel</option>
                                      <option value="1">Visited</option>
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
                              if(item.status === "" ){
                              return (
                                <div className="d-flex">
                                  <div>
                                    <button className="saveBtn" type="button"  style={{ minWidth: "5px", marginRight: "10px" }}
                                    onClick={this.handleUpdateAppointment.bind(this,item.appointmentID)}
                                    >
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
                  expandIconColumnIndex={4}
                  expandIconAsCell={false}
                  pagination={{defaultPageSize:5}}
                  loading={this.state.loading}
                  dataSource={this.state.appointmentGridData}
                />
              </div>
            </div>
        );
    }
}
export default Appointment;
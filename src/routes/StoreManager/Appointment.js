import React, { Component, Fragment } from "react";
import { Table } from "antd";
import DatePicker from "react-datepicker";
import moment from "moment";

class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          appointmentGridData: [{id:1, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
                                subAppointmentData: [{id:1, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: "Visited"},
                                {id:2, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                                {id:3, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
                                {id:2, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
                                subAppointmentData: [{id:4, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                                {id:5, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
                                {id:3, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
                                subAppointmentData: [{id:6, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                                {id:7, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
                                {id:4, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
                                subAppointmentData: [{id:8, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                                {id:9, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
                                {id:5, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
                                subAppointmentData: [{id:10, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                                {id:11, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
                                {id:6, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
                                subAppointmentData: [{id:12, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                                {id:13, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
                                {id:7, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
                                subAppointmentData: [{id:14, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                                {id:15, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
                                {id:8, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
                                subAppointmentData: [{id:16, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                                {id:17, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
                                {id:9, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
                                subAppointmentData: [{id:18, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                                {id:19, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]},
                                {id:10, date:"12 Feb, 2020", time:"09-10PM", appointments:"12",
                                subAppointmentData: [{id:20, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                                {id:21, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}]}],

          subAppointmentData: [{id:1, appointmentId:1, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: "Visited"},
                               {id:2, appointmentId:1, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                               {id:3, appointmentId:1, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                               {id:4, appointmentId:2, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                               {id:5, appointmentId:2, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                               {id:6, appointmentId:3, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                               {id:7, appointmentId:4, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""},
                               {id:8, appointmentId:5, customerName: "Vipin Sattar", mobileNo: "+91 9876543210", noOfPeople: "2", status: ""}
                              ],
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
        // this.setState({
        //   loading: true,
        // });
        // axios({
        //     method: "post",
        //     url: config.apiUrl + "/StoreTask/GetStoreCampaignCustomer",
        //     headers: authHeader(),
        // }).then(function(res) {
        //     debugger;
        //     let status = res.data.message;
        //     let data = res.data.responseData;
        //     if (status === "Success" && data) {
        //       self.setState({
        //         campaignGridData: data,
        //       });
        //     }
        //     self.setState({
        //        loading: false,
        //     });
        // }).catch((data) => {
        //     console.log(data);
        // });
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
            <div>
            <div className="table-cntr store">
              <Table
                className="components-table-demo-nested antd-table-campaign custom-antd-table"
                columns={[
                  {
                    title: "Date",
                    dataIndex: "date",
                  },
                  {
                    title: "Time",
                    dataIndex: "time",
                  },
                  {
                    title: "Appointments",
                    dataIndex: "appointments",

                    
                    },
                  {
                    title: "Actions",
                    // dataIndex: "orderPricePaid"
                  },
                ]}
                expandedRowRender={(row) => {
                  return (
                    <Table
                      dataSource={row.subAppointmentData}
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
                          dataIndex: "status",
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
                            return (
                              
                              <div className="d-flex">
                                <div>
                                </div>
                              </div>);
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
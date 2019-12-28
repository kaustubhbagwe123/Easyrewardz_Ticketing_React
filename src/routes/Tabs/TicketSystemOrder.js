import React, { Component } from "react";
import ArrowImg from "./../../assets/Images/arrow.png";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";
import NotFoundImg from "./../../assets/Images/notFound.png";
import Modal from "react-responsive-modal";
import ReactTable from "react-table";
import MinusImg from "./../../assets/Images/minus.png";
import DatePicker from "react-datepicker";
import axios from "axios";
import config from "./../../helpers/config";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class TicketSystemOrder extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      SearchOrderDetails: false,
      AddManualOrderHideShow: false,
      OrderTable: false,
      AddManuallyData: false,
      AddManualSaveTbl: false,
      OrderCreatDate: "",
      orderId:0,
      tenantID: 1,
      billId:'',
      productBarCode:'',
      sources:'',
      orderMRP:'',
      pricePaid:'',
      discount:'',
      size:0,
      requiredSize:0,
      purchaseFrmStorName:'',
      purchaseFrmStorAddress:'',
      modeOfPayment:[],
      customerdetails:{},
      modeData:{},
    };
    this.handleOrderTableOpen = this.handleOrderTableOpen.bind(this);
    this.handleOrderTableClose = this.handleOrderTableClose.bind(this);
    this.handleModeOfPaymentDropDown = this.handleModeOfPaymentDropDown.bind(this);
    this.handleGetManuallyTableData=this.handleGetManuallyTableData.bind(this);
  }
  handleOrderTableOpen() {
    this.setState({ OrderTable: true });
  }
  handleOrderTableClose() {
    this.setState({ OrderTable: false });
  }
  handleByDateCreate(date) {
    this.setState({ OrderCreatDate: date });
  }
  // handleShowAddManualOrder() {
  //   this.setState({
  //     AddManualOrderHideShow: !this.state.AddManualOrderHideShow
  //   });
  // }
  handleShowSearchOrderDetails() {
    this.setState({
      SearchOrderDetails: !this.state.SearchOrederDetails
    });
  }
  setModePaymentValue = e => {
    let dataValue = e.currentTarget.value;
    this.setState({ modeOfPayment: dataValue });
  }
  handleChangeToggle() {
    this.setState({
      AddManuallyData: !this.state.AddManuallyData
    });
  }
  handleChangeSaveManualTbl() {
    this.setState({
      AddManualSaveTbl: !this.state.AddManualSaveTbl
    });
  }
  handleManuallyOnchange = e =>{
    this.setState({[e.currentTarget.name]:e.currentTarget.value});
  }
  handleGetManuallyTableData(){
    debugger
    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Master/getPaymentMode"
      // params: {
      //   TenantID: this.state.tenantID
      // }
    }).then(function(res) {
      debugger
      let finalData = res.data.data;
      self.setState({ finalData: finalData });
    });
  }
  hadleAddManuallyOrderData(){
    debugger
    let self=this;
    var CustID=this.props.custDetails;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Order/createOrder",
      data: {
        TenantID: this.state.tenantID,
        ProductBarCode: this.state.productBarCode,
        OrderNumber: this.state.orderId,
        BillID: this.state.billId,
        TicketSourceID: this.state.sources,
        ModeOfPaymentID: this.state.modeOfPayment,
        TransactionDate: this.state.OrderCreatDate,
        InvoiceNumber: "Inv123",
        InvoiceDate: this.state.OrderCreatDate,
        OrderPrice: this.state.orderMRP,
        PricePaid: this.state.pricePaid,
        CustomerID: CustID,
        PurchaseFromStoreId:this.state.PurchaseFromStoreId,
        Discount:this.state.discount,
        Size:this.state.size,
        RequireSize:this.state.requiredSize,
        CreatedBy:6
      }
    }).then(function(res) {
      debugger;
      let responseMessage = res.data.message;
     
      if (responseMessage === "Success") {
        NotificationManager.success("New Order add successfully.");
        self.handleGetManuallyTableData()
        self.handleChangeSaveManualTbl();
      }
    });

  }
  handleModeOfPaymentDropDown(){
    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Master/getPaymentMode"
      // params: {
      //   TenantID: this.state.tenantID
      // }
    }).then(function(res) {
      let modeData = res.data.responseData;
      self.setState({ modeData: modeData });
    });
  }

  componentDidMount(){
    this.handleModeOfPaymentDropDown();
  }

  render() {
    const dataOrder = [
      {
        taskTitle: "Store door are not working",
        assignTo: "G.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "G.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      }
    ];

    // const columnsOrder = [
    //   {
    //     Header: <span>Invoice Number</span>,
    //     accessor: "invoiceNumber",
    //     Cell: row => (
    //       <div className="filter-checkbox" style={{ marginLeft: "15px" }}>
    //         <input
    //           type="checkbox"
    //           id="fil-number1"
    //           name="filter-type"
    //           style={{ display: "none" }}
    //           //   onChange={() => this.showAddNoteFuncation()}
    //         />
    //         <label htmlFor="fil-number1" style={{ paddingLeft: "25px" }}>
    //           <span className="add-note">BB332398</span>
    //         </label>
    //       </div>
    //     )
    //   },
    //   {
    //     Header: <span>Invoice Date</span>,
    //     accessor: "invoiceDate",
    //     Cell: row => <label>12 Jan 2019</label>
    //   },
    //   {
    //     Header: <span>Item Count</span>,
    //     accessor: "itemCount",
    //     Cell: row => <label>02</label>
    //   },
    //   {
    //     Header: <span>Item Price</span>,
    //     accessor: "itemPrice",
    //     Cell: row => <label>2999</label>
    //   },
    //   {
    //     Header: <span>Price Paid</span>,
    //     accessor: "pricePaid",
    //     Cell: row => <label>2999</label>
    //   },
    //   {
    //     Header: <span>Store Code</span>,
    //     accessor: "storeCode",
    //     Cell: row => <label>SB221</label>
    //   },
    //   {
    //     Header: <span>Store Addres</span>,
    //     accessor: "storeAddres",
    //     Cell: row => <label>UNIT D-338,| SECOND FLOOR SECTOR 14</label>
    //   },
    //   {
    //     Header: <span>Discount</span>,
    //     accessor: "discount",
    //     Cell: row => <label>25%</label>
    //   }
    // ];
    const dataOrder1 = [
      {
        taskTitle: "Store door are not working",
        assignTo: "G.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "G.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      }
    ];

    const columnsOrder1 = [
      {
        Header: <span>Article Number</span>,
        accessor: "articleNum",
        Cell: row => (
          <div className="filter-checkbox" style={{ marginLeft: "15px" }}>
            <input
              type="checkbox"
              id="fil-number12"
              name="filter-type"
              style={{ display: "none" }}
              //   onChange={() => this.showAddNoteFuncation()}
            />
            <label htmlFor="fil-number12" style={{ paddingLeft: "25px" }}>
              <span className="add-note">BB332398</span>
            </label>
          </div>
        )
      },
      {
        Header: <span>Article Size</span>,
        accessor: "articleSize",
        Cell: row => <label>Paper Bag Big</label>
      },
      {
        Header: <span>Article MRP</span>,
        accessor: "articleMrp",
        Cell: row => <label>2999</label>
      },
      {
        Header: <span>Price Paid</span>,
        accessor: "pricePa1",
        Cell: row => <label>2999</label>
      },
      {
        Header: <span>Discount</span>,
        accessor: "dis1",
        Cell: row => <label>0.00</label>
      },
      {
        Header: <span>Required Size</span>,
        accessor: "reqSiz",
        Cell: row => <label>SB221</label>
      }
    ];
    console.log(this.props.custDetails,"done-----------");
    
    return (
      <div className="ticketSycard">
        <div className="ticketSycard1">
          <div className="row storemainrow">
            <div className="col-12 col-lg-7 col-xl-8">
              <label className="systemstordercustomer">
                Customer Want to attach order
              </label>
            </div>
            <div className="col-12 col-lg-3 col-xl-3">
              <div style={{ display: "flex", marginTop: "7px" }}>
                <label className="orderdetailpopup">Yes</label>
                <div className="switchmargin">
                  <div className="switch switch-primary d-inline m-r-10">
                    <input type="checkbox" id="editDashboard-p-1" />
                    <label htmlFor="editDashboard-p-1" className="cr"></label>
                  </div>
                </div>
                <label className="orderdetailpopup">No</label>
              </div>
            </div>
            <div className="col-12 col-lg-2 col-xl-1">
              <div className="storeplusline">
                <span className="plusline1"></span>
                <img
                  src={ArrowImg}
                  alt="Arrow"
                  className="arrow-imgtask-1"
                  onClick={this.handleOrderTableOpen}
                />
              </div>
            </div>
          </div>
          <Modal
            onClose={this.handleOrderTableClose}
            open={this.state.OrderTable}
            modalId="addOrderTableModal"
            overlayId="logout-ovrly"
          >
            <div
              className="row"
              style={{ marginLeft: "0px", marginRight: "0px" }}
            >
              <div className="col-md-12 claim-status-card">
                <label>
                  <b>Customer Want to attach order</b>
                </label>
                <div className="claimplus">
                  <span className="plusline1"></span>
                  <img src={ArrowImg} alt="Arrow" className="arrow-imgtask-1" />
                  <span className="plusline1"></span>
                  <img
                    src={MinusImg}
                    alt="Minus"
                    className="minus-imgorder"
                    onClick={this.handleOrderTableClose.bind(this)}
                  />
                </div>
              </div>
            </div>
            <div
              className="row m-t-10 m-b-10"
              style={{ marginLeft: "0", marginRight: "0" }}
            >
              <div className="col-md-6">
                <label className="orderdetailpopup">Order Details</label>
              </div>
              <div className="col-md-3">
                <div style={{ float: "right", display: "flex" }}>
                  <label className="orderdetailpopup">Order</label>
                  <div className="orderswitch orderswitchitem">
                    <div className="switch switch-primary d-inline">
                      <input type="checkbox" id="editTasks-p-2" />
                      <label htmlFor="editTasks-p-2" className="cr ord"></label>
                    </div>
                  </div>
                  <label className="orderdetailpopup">Item</label>
                </div>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="searchtextpopup"
                  placeholder="Search Order"
                />
                <img
                  src={SearchBlackImg}
                  alt="Search"
                  className="searchtextimgpopup"
                />
              </div>
            </div>
            <div className="reacttableordermodal">
              <ReactTable
                data={dataOrder}
                // columns={columnsOrder}
                columns={[
                  {
                    Header: <span>Invoice Number</span>,
                    accessor: "invoiceNumber",
                    Cell: row => (
                      <div className="filter-checkbox" style={{ marginLeft: "15px" }}>
                        <input
                          type="checkbox"
                          id="fil-number1"
                          name="filter-type"
                          style={{ display: "none" }}
                          //   onChange={() => this.showAddNoteFuncation()}
                        />
                        <label htmlFor="fil-number1" style={{ paddingLeft: "25px" }}>
                          <span className="add-note">BB332398</span>
                        </label>
                      </div>
                    )
                  },
                  {
                    Header: <span>Invoice Date</span>,
                    accessor: "invoiceDate",
                    Cell: row => <label>12 Jan 2019</label>
                  },
                  {
                    Header: <span>Item Count</span>,
                    accessor: "itemCount",
                    Cell: row => <label>02</label>
                  },
                  {
                    Header: <span>Item Price</span>,
                    accessor: "itemPrice",
                    Cell: row => <label>2999</label>
                  },
                  {
                    Header: <span>Price Paid</span>,
                    accessor: "pricePaid",
                    Cell: row => <label>2999</label>
                  },
                  {
                    Header: <span>Store Code</span>,
                    accessor: "storeCode",
                    Cell: row => <label>SB221</label>
                  },
                  {
                    Header: <span>Store Addres</span>,
                    accessor: "storeAddres",
                    Cell: row => <label>UNIT D-338,| SECOND FLOOR SECTOR 14</label>
                  },
                  {
                    Header: <span>Discount</span>,
                    accessor: "discount",
                    Cell: row => <label>25%</label>
                  }
                ]}
                //resizable={false}
                defaultPageSize={3}
                showPagination={false}
                SubComponent={row => {
                  return (
                    <div style={{ padding: "20px" }}>
                      <ReactTable
                        data={dataOrder1}
                        columns={columnsOrder1}
                        defaultPageSize={2}
                        showPagination={false}
                      />
                    </div>
                  );
                }}
              />
            </div>
          </Modal>
          {this.state.AddManuallyData === false ? (
            <div>
              <div className="row">
                <div
                  className="col-md-11"
                  style={{ marginLeft: "25px", marginTop: "20px" }}
                >
                  <input
                    type="text"
                    className="systemordersearch"
                    placeholder="BB3736289940"
                  />
                  <img
                    src={SearchBlackImg}
                    alt="Search"
                    className="systemorder-imgsearch"
                    onClick={this.handleShowSearchOrderDetails.bind(this)}
                  />
                </div>
              </div>

              {this.state.SearchOrderDetails ? (
                <div>
                  <div className="div-notFound">
                    <img
                      src={NotFoundImg}
                      alt="Not Found"
                      className="notFound-addSrch"
                    />
                    <br />
                    <label className="lbl-count-foundData">
                      We couldn't find the order details with
                      <br /> <span> this order Id</span>
                    </label>
                  </div>
                  <div className="addmanualbtn">
                    <button
                      type="button"
                      className="addmanual"
                      onClick={this.handleChangeToggle.bind(this)}
                    >
                      Add Manually
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          {this.state.AddManuallyData ? (
            <div>
              {this.state.AddManualSaveTbl === false ? (
                <div>
                  <div className="row m-b-10 m-l-10 m-r-10 m-t-10">
                    <div className="col-md-6">
                      <label className="addmanuallytext">Add Manually</label>
                    </div>
                  </div>
                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="Order ID"
                        name="orderId"
                        value={this.state.orderId}
                        onChange={this.handleManuallyOnchange}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="Bill ID"
                        name="billId"
                        value={this.state.billId}
                        onChange={this.handleManuallyOnchange}
                      />
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="Product Bar Code"
                        name="productBarCode"
                        value={this.state.productBarCode}
                        onChange={this.handleManuallyOnchange}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="Sources"
                        name="sources"
                        value={this.state.sources}
                        onChange={this.handleManuallyOnchange}
                      />
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                     
                      <select
                        className="category-select-system dropdown-label"
                        value={this.state.modeOfPayment}
                        onChange={this.setModePaymentValue}
                      >
                        <option className="select-sub-category-placeholder">
                        Mode Of Payment
                        </option>
                        {this.state.modeData !== null &&
                            this.state.modeData.map((item, i) => (
                              <option
                                key={i}
                                value={item.paymentModeID}
                                className="select-category-placeholder"
                              >
                                {item.paymentModename}
                              </option>
                            ))}
                      </select>
                    </div>
                    <div className="col-md-6 dapic">
                      <DatePicker
                        selected={this.state.OrderCreatDate}
                        onChange={this.handleByDateCreate.bind(this)}
                        placeholderText="Date"
                        showMonthDropdown
                        showYearDropdown
                        className="addmanuallytext1"
                        // className="form-control"
                      />
                    
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="MRP"
                        name="orderMRP"
                        value={this.state.orderMRP}
                        onChange={this.handleManuallyOnchange}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="Price Paid"
                        name="pricePaid"
                        value={this.state.pricePaid}
                        onChange={this.handleManuallyOnchange}
                      />
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="Discount"
                        name="discount"
                        value={this.state.discount}
                        onChange={this.handleManuallyOnchange}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="Size"
                        name="size"
                        value={this.state.size}
                        onChange={this.handleManuallyOnchange}
                      />
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="Required Size"
                        name="requiredSize"
                        value={this.state.requiredSize}
                        onChange={this.handleManuallyOnchange}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="Purchase from Store name"
                        name="purchaseFrmStorName"
                        value={this.state.purchaseFrmStorName}
                        onChange={this.handleManuallyOnchange}
                      />
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="Purchase from Store Addres"
                        name="purchaseFrmStorAddress"
                        value={this.state.purchaseFrmStorAddress}
                        onChange={this.handleManuallyOnchange}
                      />
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <button
                        type="button"
                        className="addmanual m-t-15"
                        onClick={this.hadleAddManuallyOrderData.bind(this)}
                      >
                        SAVE
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="reacttableordermodal">
                  <div className="row m-b-10">
                    <div
                      className="col-md-11"
                      style={{ marginLeft: "25px", marginTop: "20px" }}
                    >
                      <input
                        type="text"
                        className="systemordersearch"
                        placeholder="BB3736289940"
                      />
                      <img
                        src={SearchBlackImg}
                        alt="Search"
                        className="systemorder-imgsearch"
                      />
                    </div>
                  </div>
                  <span className="linestore2"></span>
                  <div
                    className="row m-t-10 m-b-10"
                    style={{ marginLeft: "0", marginRight: "0" }}
                  >
                    <div className="col-md-9">
                      <label
                        className="orderdetailpopup"
                        style={{ marginTop: "3px" }}
                      >
                        Order Details
                      </label>
                    </div>
                    <div className="col-md-3">
                      <div style={{ float: "right", display: "flex" }}>
                        <label
                          className="orderdetailpopup "
                          style={{ marginTop: "3px" }}
                        >
                          Order
                        </label>
                        <div className="orderswitch orderswitchitem">
                          <div className="switch switch-primary d-inline">
                            <input type="checkbox" id="editTasks-p-2" />
                            <label
                              htmlFor="editTasks-p-2"
                              className="cr ord"
                            ></label>
                          </div>
                        </div>
                        <label
                          className="orderdetailpopup"
                          style={{ marginTop: "3px" }}
                        >
                          Item
                        </label>
                      </div>
                    </div>
                  </div>
                  <span className="linestore2"></span>
                  <ReactTable
                    data={dataOrder}
                    // columns={columnsOrder}
                    columns={[
                      {
                        Header: <span>Invoice Number</span>,
                        accessor: "invoiceNumber",
                        Cell: row => (
                          <div className="filter-checkbox" style={{ marginLeft: "15px" }}>
                            <input
                              type="checkbox"
                              id="fil-number1"
                              name="filter-type"
                              style={{ display: "none" }}
                              //   onChange={() => this.showAddNoteFuncation()}
                            />
                            <label htmlFor="fil-number1" style={{ paddingLeft: "25px" }}>
                              <span className="add-note">BB332398</span>
                            </label>
                          </div>
                        )
                      },
                      {
                        Header: <span>Invoice Date</span>,
                        accessor: "invoiceDate",
                        Cell: row => <label>12 Jan 2019</label>
                      },
                      {
                        Header: <span>Item Count</span>,
                        accessor: "itemCount",
                        Cell: row => <label>02</label>
                      },
                      {
                        Header: <span>Item Price</span>,
                        accessor: "itemPrice",
                        Cell: row => <label>2999</label>
                      },
                      {
                        Header: <span>Price Paid</span>,
                        accessor: "pricePaid",
                        Cell: row => <label>2999</label>
                      },
                      {
                        Header: <span>Store Code</span>,
                        accessor: "storeCode",
                        Cell: row => <label>SB221</label>
                      },
                      {
                        Header: <span>Store Addres</span>,
                        accessor: "storeAddres",
                        Cell: row => <label>UNIT D-338,| SECOND FLOOR SECTOR 14</label>
                      },
                      {
                        Header: <span>Discount</span>,
                        accessor: "discount",
                        Cell: row => <label>25%</label>
                      }
                    ]}
                    //resizable={false}
                    defaultPageSize={3}
                    showPagination={false}
                    SubComponent={row => {
                      return (
                        <div style={{ padding: "20px" }}>
                          <ReactTable
                            data={dataOrder1}
                            columns={columnsOrder1}
                            defaultPageSize={2}
                            showPagination={false}
                          />
                        </div>
                      );
                    }}
                  />
                </div>
              )}
            </div>
          ) : null}
          {/* {this.state.AddManualSaveTbl === false ? (
          
        ):( null )} */}
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default TicketSystemOrder;

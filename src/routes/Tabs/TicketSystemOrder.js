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
import ReactAutocomplete from "react-autocomplete";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import matchSorter from "match-sorter";
import { authHeader } from "../../helpers/authHeader";
import SimpleReactValidator from "simple-react-validator";

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
      orderId: "",
      billId: "",
      productBarCode: "",
      orderMRP: "",
      pricePaid: "",
      discount: "",
      orderNumber: "",
      message: "",
      size: "",
      requiredSize: "",
      selectedTicketSource: 0,
      custAttachOrder: 1,
      purchaseFrmStorAddress: "",
      TicketSourceData: [],
      modeOfPayment: [],
      SearchItem: [],
      orderDetailsData: [],
      OrderSubComponent: [],
      selectedDataRow: [],
      CheckOrderID: {},
      StorAddress: {},
      purchaseFrmStorName: {},
      customerdetails: {},
      modeData: {},
      orderMasterID: false,
      filterAll: "",
      filtered: []
    };
    this.validator = new SimpleReactValidator();
    this.onFilteredChange = this.onFilteredChange.bind(this);
    this.filterAll = this.filterAll.bind(this);
    this.handleOrderTableOpen = this.handleOrderTableOpen.bind(this);
    this.handleOrderTableClose = this.handleOrderTableClose.bind(this);
    this.handleGetTicketSourceList = this.handleGetTicketSourceList.bind(this);
    this.handleModeOfPaymentDropDown = this.handleModeOfPaymentDropDown.bind(
      this
    );
    this.handleGetManuallyTableData = this.handleGetManuallyTableData.bind(
      this
    );
  }

  componentDidMount() {
    this.handleModeOfPaymentDropDown();
    this.handleGetTicketSourceList();
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

  handleShowSearchOrderDetails() {
    this.setState({
      SearchOrderDetails: !this.state.SearchOrederDetails
    });
  }
  handleOrderChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  setModePaymentValue = e => {
    let dataValue = e.currentTarget.value;
    this.setState({ modeOfPayment: dataValue });
  };
  handleChangeToggle() {
    this.setState({
      AddManuallyData: !this.state.AddManuallyData
    });
  }
  handelCheckBoxCheckedChange = () => {
    this.setState({
      CheckBoxChecked: !this.state.CheckBoxChecked
    });
  };
  handleChangeSaveManualTbl() {
    this.setState({
      AddManualSaveTbl: !this.state.AddManualSaveTbl
    });
  }
  handleManuallyOnchange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  setTicketSourceValue = e => {
    let ticketSourceValue = e.currentTarget.value;
    this.setState({ selectedTicketSource: ticketSourceValue });
  };
  handleCheckOrderID(orderMasterID, rowData) {
    debugger;

    const newSelected = Object.assign({}, this.state.CheckOrderID);
    newSelected[orderMasterID] = !this.state.CheckOrderID[orderMasterID];
    this.setState({
      CheckOrderID: orderMasterID ? newSelected : false
    });
    var selectedRow = [];
    if (this.state.selectedDataRow.length === 0) {
      selectedRow.push(rowData.orderMasterID);
      this.setState({
        selectedDataRow: selectedRow
      });
    } else {
      if (newSelected[orderMasterID] === true) {
        for (var i = 0; i < this.state.selectedDataRow.length; i++) {
          if (this.state.selectedDataRow[i] === rowData.orderMasterID) {
            selectedRow.splice(i, 1);

            break;
          } else {
            selectedRow = this.state.selectedDataRow;
            selectedRow.push(rowData.orderMasterID);
            break;
          }
        }
      } else {
        for (var j = 0; j < this.state.selectedDataRow.length; j++) {
          if (this.state.selectedDataRow[j] === rowData.orderMasterID) {
            selectedRow = this.state.selectedDataRow;
            selectedRow.splice(j, 1);
            break;
          }
        }
      }
    }
   
    this.setState({
      selectedDataRow: selectedRow
    });

    // console.log(this.state.selectedDataRow,"--------final data-------");

    {
      this.props.getOrderId(selectedRow);
    }
  }

  handleCheckOrder = () => {
    this.setState({
      custAttachOrder: 0
    });
    {
      this.props.AttachOrder(
        this.state.custAttachOrder,
        this.state.selectedDataRow
      );
    }
  };
  handleGetTicketSourceList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getTicketSources",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({
          TicketSourceData: data
        });
      } else {
        self.setState({
          TicketSourceData: []
        });
      }
    });
  }
  handleGetManuallyTableData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      headers: authHeader(),
      url: config.apiUrl + "/Master/getPaymentMode"
    }).then(function(res) {
      debugger;
      let finalData = res.data.data;
      self.setState({ finalData: finalData });
    });
  }
  handleOrderSearchData() {
    debugger;
    let self = this;
    var CustID = this.props.custDetails;
    axios({
      method: "post",
      url: config.apiUrl + "/Order/getOrderListWithItemDetails",
      headers: authHeader(),
      params: {
        OrderNumber: this.state.orderNumber,
        CustomerID: CustID
      }
    }).then(function(res) {
      debugger;
      let Msg = res.data.message;
      let mainData = res.data.responseData;
      // let subData = res.data.responseData[0].orderItems;
      self.setState({
        message: Msg,
        orderDetailsData: mainData
        // OrderSubComponent: subData
      });
    });
  }
  hadleAddManuallyOrderData() {
    debugger;
    if (this.validator.allValid()) {
      let self = this;
      var CustID = this.props.custDetails;
      axios({
        method: "post",
        url: config.apiUrl + "/Order/createOrder",
        headers: authHeader(),
        data: {
          ProductBarCode: this.state.productBarCode,
          OrderNumber: this.state.orderId,
          BillID: this.state.billId,
          TicketSourceID: this.state.selectedTicketSource,
          ModeOfPaymentID: this.state.modeOfPayment,
          TransactionDate: this.state.OrderCreatDate,
          InvoiceNumber: "Inv123",
          InvoiceDate: this.state.OrderCreatDate,
          OrderPrice: this.state.orderMRP,
          PricePaid: this.state.pricePaid,
          CustomerID: CustID,
          PurchaseFromStoreId: this.state.PurchaseFromStoreId,
          Discount: this.state.discount,
          Size: this.state.size,
          RequireSize: this.state.requiredSize
        }
      }).then(function(res) {
        debugger;
        let responseMessage = res.data.message;

        if (responseMessage === "Success") {
          NotificationManager.success("New Order added successfully.");
          self.handleChangeSaveManualTbl();
        }
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  handlePurchaseStoreName(field, e) {
    debugger;
    let self = this;
    let SearchData = this.state.purchaseFrmStorName;
    SearchData[field] = e.target.value;

    if (SearchData[field].length > 3) {
      axios({
        method: "post",
        url: config.apiUrl + "/Store/getStores",
        headers: authHeader(),
        params: {
          SearchText: SearchData[field]
        }
      }).then(function(res) {
        debugger;

        var SearchItem = res.data.responseData;
        if (SearchItem.length > 0) {
          self.setState({
            SearchItem
          });
        } else {
          self.setState({ SearchItem: [] });
        }
      });
    } else {
      self.setState({
        SearchData
      });
    }
  }
  HandleSelectdata(e, field, value, id) {
    debugger;
    let SearchData = this.state.SearchData;
    SearchData[field] = value;

    var StorAddress = this.state.StorAddress;
    StorAddress["address"] = id.address;

    this.setState({
      SearchData,
      StorAddress
    });
  }
  handleModeOfPaymentDropDown() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getPaymentMode",
      headers: authHeader()
    }).then(function(res) {
      let modeData = res.data.responseData;
      self.setState({ modeData: modeData });
    });
  }
  onFilteredChange(filtered) {
    debugger;
    if (filtered.length > 1 && this.state.filterAll.length) {
      // NOTE: this removes any FILTER ALL filter
      const filterAll = "";
      this.setState({
        filtered: filtered.filter(item => item.id !== "all"),
        filterAll
      });
    } else this.setState({ filtered });
  }

  filterAll(e) {
    debugger;
    const { value } = e.target;
    const filterAll = value;
    const filtered = [{ id: "all", value: filterAll }];

    this.setState({ filterAll, filtered });
  }

  render() {
    const { orderDetailsData } = this.state;

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
              <div style={{ display: "flex", marginTop: "4px" }}>
                <label className="orderdetailpopup">Yes</label>
                <div className="switchmargin">
                  <div className="switch switch-primary d-inline m-r-10">
                    <input
                      type="checkbox"
                      id="editDashboard-p-1"
                      value={this.state.custAttachOrder}
                      onChange={this.handleCheckOrder}
                    />
                    <label htmlFor="editDashboard-p-1" className="cr"></label>
                  </div>
                </div>
                <label className="orderdetailpopup">No</label>
              </div>
            </div>
            <div className="col-12 col-lg-2 col-xl-1">
              <div
                className="storeplusline"
                onClick={this.handleOrderTableOpen}
              >
                <span className="plusline1"></span>

                <img src={ArrowImg} alt="Arrow" className="arrow-imgtask-1" />
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
              <div
                className="col-md-12 claim-status-card"
                style={{ height: "54px" }}
              >
                <label style={{ marginTop: "7px" }}>
                  <b>Customer Want to attach order</b>
                </label>
                <div
                  className="claimplus"
                  onClick={this.handleOrderTableClose.bind(this)}
                >
                  <span className="plusline12"></span>
                  <span>
                    <img
                      src={MinusImg}
                      alt="Minus"
                      className="minus-imgorder"
                    />
                  </span>
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
                      <input type="checkbox" id="item-11" />
                      <label htmlFor="item-11" className="cr ord"></label>
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
                  value={this.state.filterAll}
                  onChange={this.filterAll}
                />
                <img
                  src={SearchBlackImg}
                  alt="Search"
                  className="searchtextimgpopup"
                />
              </div>
            </div>
            <div className="reacttableordermodal ordermainrow">
            <ReactTable
                data={orderDetailsData}
                // noDataText=""
                onFilteredChange={this.onFilteredChange.bind(this)}
                filtered={this.state.filtered}
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value
                }
                columns={[
                  {
                    columns: [
                      {
                        Header: <span>Invoice Number</span>,
                        accessor: "invoiceNumber",
                        sortable: false,
                        Cell: row => (
                          <div
                            className="filter-checkbox"
                            style={{ marginLeft: "15px" }}
                          >
                            <input
                              type="checkbox"
                              id={"i" + row.original.orderMasterID}
                              style={{ display: "none" }}
                              name="ticket-order"
                              checked={
                                this.state.CheckOrderID[
                                  row.original.orderMasterID
                                ] === true
                              }
                              onChange={this.handleCheckOrderID.bind(
                                this,
                                row.original.orderMasterID,
                                row.original
                              )}
                            />
                            <label htmlFor={"i" + row.original.orderMasterID}>
                              {row.original.invoiceNumber}
                            </label>
                          </div>
                        )
                      },
                      {
                        Header: <span>Invoice Date</span>,
                        accessor: "dateFormat"
                      },
                      {
                        Header: <span>Item Count</span>,
                        accessor: "itemCount",
                      },
                      {
                        Header: <span>Item Price</span>,
                        accessor: "itemPrice",
                      },
                      {
                        Header: <span>Price Paid</span>,
                        accessor: "pricePaid",
                      },
                      {
                        Header: <span>Store Code</span>,
                        accessor: "storeCode"
                      },
                      {
                        Header: <span>Store Addres</span>,
                        accessor: "storeAddress"
                      },
                      {
                        Header: <span>Discount</span>,
                        accessor: "discount"
                      }
                    ]
                  },
                  {
                    show: false,
                    Header: "All",
                    id: "all",
                    width: 0,
                    resizable: false,
                    sortable: false,
                    Filter: () => {},
                    getProps: () => {
                      return {
                        // style: { padding: "0px"}
                      };
                    },
                    filterMethod: (filter, rows) => {
                      debugger;
                      var result = matchSorter(rows, filter.value, {
                        keys: [
                          "invoiceNumber",
                          "dateFormat",
                          "itemCount",
                          "itemPrice",
                          "pricePaid",
                          "storeCode",
                          "storeAddress",
                          "discount"
                        ],
                        threshold: matchSorter.rankings.WORD_STARTS_WITH
                      });
                      if (result.length > 0) {
                        debugger;
                        return result;
                      } else {
                        debugger;
                        result = [{ itemPrice: "No Record Found" }];
                        return result;
                      }
                    },
                    filterAll: true
                  }
                ]}
                //resizable={false}
                defaultPageSize={3}
                showPagination={false}
                SubComponent={row => {
                  return (
                    <div style={{ padding: "20px" }}>
                      <ReactTable
                        data={row.original.orderItems}
                        columns={[
                          {
                            Header: <span>Article Number</span>,
                            accessor: "invoiceNo",
                            Cell: row => (
                              <div
                                className="filter-checkbox"
                                style={{ marginLeft: "15px" }}
                              >
                                <input
                                  type="checkbox"
                                  id={"order" + row.original.orderItemID}
                                  style={{ display: "none" }}
                                  name="ticket-order"
                                  checked={
                                    this.state.CheckOrderID[
                                      row.original.orderItemID
                                    ] === true
                                  }
                                  onChange={this.handleCheckOrderID.bind(
                                    this,
                                    row.original.orderItemID,
                                    row.original
                                  )}
                                />
                                <label
                                  htmlFor={"order" + row.original.orderItemID}
                                >
                                  {row.original.orderItemID}
                                </label>
                              </div>
                            )
                          },
                          {
                            Header: <span>Article Size</span>,
                            accessor: "size",
                          },
                          {
                            Header: <span>Article MRP</span>,
                            accessor: "itemPrice",
                          },
                          {
                            Header: <span>Price Paid</span>,
                            accessor: "pricePaid"
                          
                          },
                          {
                            Header: <span>Discount</span>,
                            accessor: "discount",
                            sortable: true
                          },
                          {
                            Header: <span>Required Size</span>,
                            accessor: "requireSize"
                          }
                        ]}
                        defaultPageSize={2}
                        showPagination={false}
                      />
                    </div>
                  );
                }}
              />
            </div>
          </Modal>
          {this.state.AddManuallyData === true ? null : (
            <div>
              <div className="row m-b-10">
                <div
                  className="col-md-11"
                  style={{ marginLeft: "25px", marginTop: "20px" }}
                >
                  <input
                    type="text"
                    className="systemordersearch"
                    placeholder="Search Order By Order Number"
                    name="orderNumber"
                    value={this.state.orderNumber}
                    onChange={this.handleOrderChange.bind(this)}
                  />
                  <img
                    src={SearchBlackImg}
                    alt="Search"
                    className="systemorder-imgsearch"
                    onClick={this.handleOrderSearchData.bind(this)}
                  />
                </div>
              </div>
              {this.state.message === "Record Not Found" ? (
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
          )}

          {this.state.AddManuallyData === true ? (
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
                  {this.validator.message(
                    "OrderId",
                    this.state.orderId,
                    "required"
                  )}
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
                  {this.validator.message(
                    "BillId",
                    this.state.billId,
                    "required"
                  )}
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
                  {this.validator.message(
                    "ProductBarCode",
                    this.state.productBarCode,
                    "required"
                  )}
                </div>
                <div className="col-md-6">
                  <select
                    value={this.state.selectedTicketSource}
                    onChange={this.setTicketSourceValue}
                    className="category-select-system dropdown-label"
                  >
                    <option>Sources</option>
                    {this.state.TicketSourceData !== null &&
                      this.state.TicketSourceData.map((item, i) => (
                        <option key={i} value={item.ticketSourceId}>
                          {item.ticketSourceName}
                        </option>
                      ))}
                  </select>
                  {this.validator.message(
                    "Source",
                    this.state.selectedTicketSource,
                    "required"
                  )}
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
                  {this.validator.message(
                    "ModeOfPayment",
                    this.state.modeOfPayment,
                    "required"
                  )}
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
                  {this.validator.message(
                    "mrp",
                    this.state.orderMRP,
                    "required"
                  )}
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
                  {this.validator.message(
                    "PricePaid",
                    this.state.pricePaid,
                    "required"
                  )}
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
                  {this.validator.message(
                    "Discount",
                    this.state.discount,
                    "required"
                  )}
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
                  {this.validator.message(
                    "RequiredSize",
                    this.state.requiredSize,
                    "required"
                  )}
                </div>
                <div className="col-md-6 autocomp">
                  {/* <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="Purchase from Store name"
                        name="purchaseFrmStorName"
                        value={this.state.purchaseFrmStorName}
                        onChange={this.handleManuallyOnchange}
                      /> */}
                  <ReactAutocomplete
                    wrapperStyle={{ display: "block" }}
                    getItemValue={item => item.storeName}
                    items={this.state.SearchItem}
                    renderItem={(item, isHighlighted) => (
                      <div
                        style={{
                          background: isHighlighted ? "lightgray" : "white"
                        }}
                        value={item.storeID}
                      >
                        {item.storeName}
                      </div>
                    )}
                    renderInput={function(props) {
                      return (
                        <input
                          placeholder="Purchase from Store name"
                          className="addmanuallytext1"
                          type="text"
                          {...props}
                        />
                      );
                    }}
                    onChange={this.handlePurchaseStoreName.bind(this, "store")}
                    onSelect={this.HandleSelectdata.bind(
                      this,
                      item => item.storeID,
                      "store"
                    )}
                    value={this.state.purchaseFrmStorName["store"]}
                  />
                  {this.validator.message(
                    "PurchaseFrmStorAddress",
                    this.state.purchaseFrmStorName["store"],
                    "required"
                  )}
                </div>
              </div>

              <div className="row m-b-10 m-l-10 m-r-10">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder="Purchase from Store Addres"
                    name="purchaseFrmStorAddress"
                    value={this.state.StorAddress.address}
                    // onChange={this.handleManuallyOnchange}
                    readOnly
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
          ) : null}
          {this.state.message === "Success" ? (
            <div className="reacttableordermodal ordermainrow">
              {/* <div className="row m-b-10">
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
              </div> */}
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
                          style={{ top: "5px" }}
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
                data={orderDetailsData}
                columns={[
                  {
                    Header: <span>Invoice Numberr</span>,
                    accessor: "invoiceNumber",
                    Cell: row => (
                      <div
                        className="filter-checkbox"
                        style={{ marginLeft: "15px" }}
                      >
                        <input
                          type="checkbox"
                          id={"i" + row.original.orderMasterID}
                          style={{ display: "none" }}
                          name="ticket-order"
                          checked={
                            this.state.CheckOrderID[
                              row.original.orderMasterID
                            ] === true
                          }
                          onChange={this.handleCheckOrderID.bind(
                            this,
                            row.original.orderMasterID,
                            row.original
                          )}
                        />
                        <label htmlFor={"i" + row.original.orderMasterID}>
                          {row.original.invoiceNumber}
                        </label>
                      </div>
                    )
                  },
                  {
                    Header: <span>Invoice Date</span>,
                    accessor: "dateFormat"
                  },
                  {
                    Header: <span>Item Count</span>,
                    accessor: "itemCount"
                  },
                  {
                    Header: <span>Item Price</span>,
                    accessor: "itemPrice"
                  },
                  {
                    Header: <span>Price Paid</span>,
                    accessor: "pricePaid"
                  },
                  {
                    Header: <span>Store Code</span>,
                    accessor: "storeCode"
                  },
                  {
                    Header: <span>Store Addres</span>,
                    accessor: "storeAddress"
                  },
                  {
                    Header: <span>Discount</span>,
                    accessor: "discount"
                  }
                ]}
                // resizable={false}
                defaultPageSize={3}
                showPagination={false}
                SubComponent={row => {
                  return (
                    <div style={{ padding: "20px" }}>
                      <ReactTable
                        data={row.original.orderItems}
                        columns={[
                          {
                            Header: <span>Article Number</span>,
                            accessor: "invoiceNo",
                            Cell: row => (
                              <div
                                className="filter-checkbox"
                                style={{ marginLeft: "15px" }}
                              >
                                <input
                                  type="checkbox"
                                  id={"order" + row.original.orderItemID}
                                  style={{ display: "none" }}
                                  name="ticket-order"
                                  checked={
                                    this.state.CheckOrderID[
                                      row.original.orderItemID
                                    ] === true
                                  }
                                  onChange={this.handleCheckOrderID.bind(
                                    this,
                                    row.original.orderItemID,
                                    row.original
                                  )}
                                />
                                <label
                                  htmlFor={"order" + row.original.orderItemID}
                                >
                                  {row.original.invoiceNo}
                                </label>
                              </div>
                            )
                          },
                          {
                            Header: <span>Article Size</span>,
                            accessor: "size"
                          },
                          {
                            Header: <span>Article MRP</span>,
                            accessor: "itemPrice"
                          },
                          {
                            Header: <span>Price Paid</span>,
                            accessor: "pricePaid"
                          },
                          {
                            Header: <span>Discount</span>,
                            accessor: "discount"
                          },
                          {
                            Header: <span>Required Size</span>,
                            accessor: "requireSize"
                          }
                        ]}
                        defaultPageSize={2}
                        showPagination={false}
                      />
                    </div>
                  );
                }}
              />
            </div>
          ) : null}
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default TicketSystemOrder;

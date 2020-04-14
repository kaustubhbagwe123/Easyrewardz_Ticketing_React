import React, { Component, Fragment } from "react";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";
import ArrowImg from "./../../assets/Images/arrow.png";
import NotFoundImg from "./../../assets/Images/notFound.png";
import Modal from "react-responsive-modal";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import MinusImg from "./../../assets/Images/minus.png";
import DatePicker from "react-datepicker";
import { Table } from "antd";
import { MyContext } from './../../context'

class TicketSystemStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // SearchStoreDetails: false,
      OrderStoreTable: false,
      AddSelectDetail: false,
      SrchStoreNameCode: "",
      SearchData: [],
      message: "",
      WantVisit: 0,
      AlreadyCustomerVisit: 0,
      SwitchBtnStatus: false,
      CheckStoreID: {},
      selectedStoreData: [],
      filterAll: "",
      filtered: [],
      byVisitDate: "",
      byValideStoreData: "",
      modifiedDate: "",
      CustStoreStatusDrop: "0"
    };
    this.handleOrderStoreTableOpen = this.handleOrderStoreTableOpen.bind(this);
    this.handleCheckStoreID = this.handleCheckStoreID.bind(this);
    this.handleOrderStoreTableClose = this.handleOrderStoreTableClose.bind(
      this
    );
    this.onFilteredChange = this.onFilteredChange.bind(this);
    this.filterAll = this.filterAll.bind(this);
    this.handleGetStoreData = this.handleGetStoreData.bind(this);
  }

  componentDidUpdate() {
    var storeDat = this.props.showStore_Date;
    if (storeDat === true) {
      var ticket_Id = this.props.ticket_IDS;
      if (ticket_Id) {
        this.handleGetStoreData(ticket_Id);
      }
    }
  }

  ////handle Get Store Details
  handleGetStoreData(ID) {
    //
    this.props.parentCallBackFuncation("store");
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Store/getSelectedStores",
      headers: authHeader(),
      params: {
        TicketID: ID
      }
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          const newSelected = Object.assign({}, self.state.CheckStoreID);
          var selectedRow = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].storeID) {
              newSelected[data[i].storeID] = !self.state.CheckStoreID[
                data[i].storeID
              ];
              selectedRow.push(data[i]);
              self.setState({
                CheckStoreID: data[i].storeID ? newSelected : false
              });
            }
          }

          self.setState({
            selectedStoreData: selectedRow,
            selectedStore: data,
            AddSelectDetail: true,
            message: "Success"
          });
        } else {
          self.props.parentCallBackFuncation("store");
          self.setState({
            selectedStore: []
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleOrderStoreTableOpen() {
    this.setState({ OrderStoreTable: true });
  }
  handleOrderStoreTableClose() {
    this.setState({ OrderStoreTable: false });
  }
  handleByvisitDate(e, rowData) {
    //
    var id = e.storeID;
    var index = this.state.selectedStoreData.findIndex(x => x.storeID === id);
    this.state.selectedStoreData["VisitedDate"] = rowData;
    var selectedStoreData = this.state.selectedStoreData;
    selectedStoreData[index].VisitedDate = rowData;

    this.setState({ selectedStoreData });
  }
  handleStoreStatus = e => {
    //
    this.setState({
      SwitchBtnStatus: e.target.checked,
      SearchData: [],
      SrchStoreNameCode: ""
    });
    {
      this.props.CustStoreStatus(
        this.state.WantVisit,
        this.state.AlreadyCustomerVisit
      );
    }
  };
  handleSearchStoreDetails(e) {
    //
    e.preventDefault();
    if (this.state.SwitchBtnStatus === false) {
      let self = this;
      if (this.state.SrchStoreNameCode.length > 0) {
        axios({
          method: "post",
          url: config.apiUrl + "/Store/searchStoreDetail",
          headers: authHeader(),
          params: {
            SearchText: this.state.SrchStoreNameCode.trim()
          }
        })
          .then(function(res) {
            //
            let data = res.data.responseData;
            let Msg = res.data.message;
            if (Msg === "Success") {
              self.setState({ SearchData: data, message: Msg });
              self.handleCheckStoreID = self.handleCheckStoreID.bind(self);
            } else {
              self.setState({
                message: res.data.message,
                SearchData: []
              });
            }
          })
          .catch(data => {
            console.log(data);
          });
      } else {
        self.setState({
          byValideStoreData: "Please Enter Store Details."
        });
      }
    }
  }
  hanldeStatusChange(e) {
    //
    var SelectValue = e.target.value;
    if (SelectValue === "1") {
      this.setState({
        CustStoreStatusDrop: SelectValue,
        WantVisit: 1,
        AlreadyCustomerVisit: 0
      });
    } else {
      this.setState({
        WantVisit: 0,
        AlreadyCustomerVisit: 1,
        CustStoreStatusDrop: SelectValue
      });
    }
  }

  handleShowSearchSelectDetails() {
    this.setState({
      AddSelectDetail: !this.state.AddSelectDetail
    });
  }
  handleStoreChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheckStoreID = (storeMasterID, rowData) => {
    //

    const newSelected = Object.assign({}, this.state.CheckStoreID);
    newSelected[storeMasterID] = !this.state.CheckStoreID[storeMasterID];
    this.setState({
      CheckStoreID: storeMasterID ? newSelected : false
    });
    var selectedRow = [];
    rowData["purposeId"] = this.state.CustStoreStatusDrop;
    if (this.state.selectedStoreData.length === 0) {
      selectedRow.push(rowData);
      this.setState({
        selectedStoreData: rowData
      });
    } else {
      if (newSelected[storeMasterID] === true) {
        for (var i = 0; i < this.state.selectedStoreData.length; i++) {
          if (this.state.selectedStoreData[i] === rowData) {
            selectedRow.splice(i, 1);

            break;
          } else {
            selectedRow = this.state.selectedStoreData;
            selectedRow.push(rowData);
            break;
          }
        }
      } else {
        for (var j = 0; j < this.state.selectedStoreData.length; j++) {
          if (this.state.selectedStoreData[j] === rowData) {
            selectedRow = this.state.selectedStoreData;
            selectedRow.splice(j, 1);
            break;
          }
        }
      }
    }

    this.setState({
      selectedStoreData: selectedRow
    });

    {
      this.props.getStoreID(selectedRow);
    }
  };
  onFilteredChange(filtered) {
    //
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
    //
    const { value } = e.target;
    const filterAll = value;
    const filtered = [{ id: "all", value: filterAll }];

    this.setState({ filterAll, filtered });
  }
  handleCustomerStoreStatus = e => {
    //
    this.setState({
      CustStoreStatusDrop: e.target.value
    });
  };

  render() {
     const TranslationContext = this.context.state.translateLanguage.default
    const { SearchData, selectedStoreData } = this.state;

    return (
      <Fragment>
        <div className="ticketSycard">
          <div className="ticketSycard1">
            <div className="row storemainrow">
              <div className="col-12 col-lg-7 col-xl-8">
                <select
                  className="systemstoredropdown"
                  // value={this.state.custmerStoreStatus}
                  value={this.state.CustStoreStatusDrop}
                  onChange={this.hanldeStatusChange.bind(this)}
                >
                  <option value="0">Customer Want to visit store</option>
                  <option value="1">Customer Already visited store</option>
                </select>
              </div>
              <div className="col-12 col-lg-3 col-xl-3">
                <div style={{ display: "flex", marginTop: "7px" }}>
                  <label className="orderdetailpopup">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.yes
                      }
                    else{
                      return "Yes"
                    }
                    })()
                  }</label>
                  <div className="switchmargin">
                    <div className="switch switch-primary d-inline m-r-10">
                      <input
                        type="checkbox"
                        id="editDashboard-p-18"
                        checked={this.state.SwitchBtnStatus}
                        onChange={this.handleStoreStatus}
                      />
                      <label
                        htmlFor="editDashboard-p-18"
                        className="cr"
                      ></label>
                    </div>
                  </div>
                  <label className="orderdetailpopup">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.no
                      }
                    else{
                      return "No"
                    }
                    })()
                  }</label>
                </div>
              </div>
              <div className="col-12 col-lg-2 col-xl-1">
                <div
                  className="storeplusline"
                  onClick={this.handleOrderStoreTableOpen}
                >
                  <span className="plusline1"></span>
                  <img src={ArrowImg} alt="Arrow" className="arrow-imgtask-1" />
                </div>
              </div>
            </div>

            <Modal
              onClose={this.handleOrderStoreTableClose}
              open={this.state.OrderStoreTable}
              modalId="addStoreTableModal"
              overlayId="logout-ovrly"
            >
              <div className="row storemainrow">
                <div className="col-md-12">
                  <select
                    className="systemstoredropdown1"
                    onChange={this.handleCustomerStoreStatus}
                    value={this.state.CustStoreStatusDrop}
                  >
                    <option value="0">Customer Want to visit store</option>
                    <option value="1">Customer Already visited store</option>
                  </select>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "7px",
                      float: "right"
                    }}
                  >
                    <label className="orderdetailpopup">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.yes
                      }
                    else{
                      return "Yes"
                    }
                    })()
                  }</label>
                    <div className="switchmargin">
                      <div className="switch switch-primary d-inline m-r-10">
                        <input
                          type="checkbox"
                          id="editDashboard-p-12"
                          checked={this.state.SwitchBtnStatus}
                          onChange={this.handleStoreStatus}
                        />
                        <label
                          htmlFor="editDashboard-p-12"
                          className="cr"
                        ></label>
                      </div>
                    </div>
                    <label className="orderdetailpopup">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.no
                      }
                    else{
                      return "No"
                    }
                    })()
                  }</label>
                    <div
                      className="storeplusline13"
                      onClick={this.handleOrderStoreTableClose}
                    >
                      <span
                        className="plusline13"
                        style={{ marginLeft: "10px" }}
                      ></span>
                      <img
                        src={MinusImg}
                        alt="Minus"
                        className="minus-imgorder"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div
                  className="col-md-6 m-b-10 m-t-10"
                  style={{ marginLeft: "25px" }}
                >
                  <input
                    type="text"
                    className="systemordersearch"
                    placeholder="Search By Store Name, Pin Code, Store Code"
                    // value={this.state.filterAll}
                    // onChange={this.filterAll}
                    name="SrchStoreNameCode"
                    value={this.state.SrchStoreNameCode}
                    onChange={this.handleStoreChange}
                    disabled={this.state.SwitchBtnStatus === true}
                  />
                  <img
                    src={SearchBlackImg}
                    alt="Search"
                    className="systemorder-imgsearch"
                    onClick={this.handleSearchStoreDetails.bind(this)}
                  />
                  {this.state.SrchStoreNameCode.length === 0 && (
                    <p
                      style={{
                        color: "red",
                        marginBottom: "0px"
                      }}
                    >
                      {this.state.byValideStoreData}
                    </p>
                  )}
                </div>
              </div>
              <span className="linestore1"></span>
              <div className="newtabstore">
                <div className="tab-content tabcontentstore">
                  <div className="">
                    <ul
                      className="nav alert-nav-tabs3 store-nav-tabs"
                      role="tablist"
                    >
                      <li className="nav-item fo">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#storedetail-tab"
                          role="tab"
                          aria-controls="storedetail-tab"
                          aria-selected="true"
                        >
                          
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.storedetail
                      }
                    else{
                      return "Store Details"
                    }
                    })()
                  }
                        </a>
                      </li>
                      {this.state.selectedStoreData.length !== 0 ? (
                        <li className="nav-item fo">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#selectedstore-tab"
                            role="tab"
                            aria-controls="selectedstore-tab"
                            aria-selected="false"
                          >
                            Selected Store
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </div>
              </div>
              <span className="linestore2"></span>
              <div className="tab-content p-0">
                <div
                  className="tab-pane fade show active"
                  id="storedetail-tab"
                  role="tabpanel"
                  aria-labelledby="storedetail-tab"
                >
                  <div className="reactstoreselect ">
                    <Table
                      className="custom-antd-table"
                      columns={[
                        {
                          // title: "",
                          // dataIndex: "storeID",
                          render: (row, data) => {
                            return (
                              <div className="filter-checkbox">
                                <input
                                  type="checkbox"
                                  className="d-none"
                                  id={"i" + data.storeID}
                                  name="ticket-store"
                                  checked={
                                    this.state.CheckStoreID[data.storeID] ===
                                    true
                                  }
                                  onChange={this.handleCheckStoreID.bind(
                                    this,
                                    data.storeID,
                                    data
                                  )}
                                />
                                <label htmlFor={"i" + data.storeID}></label>
                              </div>
                            );
                          }
                        },
                        {
                          title: "Store Code",
                          dataIndex: "storeCode"
                        },
                        {
                          title: "Store Name",
                          dataIndex: "storeName"
                        },
                        {
                          title: "Store Pin Code",
                          dataIndex: "pincode"
                        },
                        {
                          title: "Store Email ID",
                          dataIndex: "storeEmailID"
                        },
                        {
                          title: "Store Addres",
                          dataIndex: "address"
                        }
                      ]}
                      dataSource={SearchData}
                      pagination={false}
                    />
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="selectedstore-tab"
                  role="tabpanel"
                  aria-labelledby="selectedstore-tab"
                >
                  <div className="reactstoreselect datePickertable">
                    <Table
                      className="custom-antd-table datepicker-overflow"
                      columns={[
                        {
                          // title: "",
                          // dataIndex: "storeID",
                          render: (row, data) => {
                            return (
                              <div className="filter-checkbox">
                                <input
                                  className="d-none"
                                  type="checkbox"
                                  id={"selected" + data.storeID}
                                  name="ticket-store"
                                  checked={
                                    this.state.CheckStoreID[data.storeID] ===
                                    true
                                  }
                                  onChange={this.handleCheckStoreID.bind(
                                    this,
                                    data.storeID,
                                    data
                                  )}
                                />
                                <label
                                  htmlFor={"selected" + data.storeID}
                                ></label>
                              </div>
                            );
                          }
                        },
                        {
                          title: "Purpose",
                          // dataIndex: "storeID",
                          render: (row, data) => {
                            return (
                              <div
                                className="filter-checkbox"
                                style={{ marginLeft: "15px" }}
                              >
                                <label htmlFor={"selected" + data.storeID}>
                                  {data.purposeId === "0"
                                    ? "Customer Want to visit store"
                                    : "Customer Already visited store"}
                                </label>
                              </div>
                            );
                          }
                        },
                        {
                          title: "Store Code",
                          dataIndex: "storeCode"
                        },
                        {
                          title: "Store Name",
                          dataIndex: "storeName"
                        },
                        {
                          title: "Store Pin Code",
                          dataIndex: "pincode"
                        },
                        {
                          title: "Store Email ID",
                          dataIndex: "storeEmailID"
                        },
                        {
                          title: "Store Addres",
                          dataIndex: "address"
                        },
                        {
                          title: "Visit Date",
                          dataIndex: "visitDate",
                          render: (row, data) => {
                            return (
                              <div className="col-sm-12 p-0">
                                <DatePicker
                                  selected={data.VisitedDate}
                                  placeholderText="DD/MM/YYYY"
                                  showMonthDropdown
                                  showYearDropdown
                                  dateFormat="dd/MM/yyyy"
                                  id={"visitDate" + data.storeID}
                                  value={data.VisitedDate}
                                  name="visitDate"
                                  onChange={this.handleByvisitDate.bind(
                                    this,
                                    data
                                  )}
                                />
                              </div>
                            );
                          }
                        }
                      ]}
                      dataSource={selectedStoreData}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
            </Modal>
            <div className="row">
              <div
                className="col-md-11 m-b-10 m-t-10"
                style={{ marginLeft: "25px" }}
              >
                <form
                  name="form"
                  onSubmit={this.handleSearchStoreDetails.bind(this)}
                >
                  <div>
                    <input
                      type="text"
                      className="systemordersearch"
                      placeholder="Search By Store Name, Pin Code, Store Code"
                      name="SrchStoreNameCode"
                      value={this.state.SrchStoreNameCode}
                      onChange={this.handleStoreChange}
                      autoComplete="off"
                      disabled={this.state.SwitchBtnStatus === true}
                    />

                    <img
                      src={SearchBlackImg}
                      alt="Search"
                      className="systemorder-imgsearch"
                      onClick={this.handleSearchStoreDetails.bind(this)}
                    />
                  </div>
                </form>
                {this.state.SrchStoreNameCode.length === 0 && (
                  <p
                    style={{
                      color: "red",
                      marginBottom: "0px"
                    }}
                  >
                    {this.state.byValideStoreData}
                  </p>
                )}
              </div>
            </div>
            <span className="linestore3"></span>
            {this.state.message === "Record Not Found" ? (
              <div>
                <div className="div-notFound">
                  <img
                    src={NotFoundImg}
                    alt="Not Found"
                    className="notFound-addSrch"
                  />
                  <br />
                  <label
                    className="lbl-count-foundData"
                    style={{ fontSize: "22px" }}
                  >
                    
                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.wecouldnotfindstore
                      }
                    else{
                      return "We couldn't find the store details with"
                    }
                    })()
                  }
                    <br /> <span> 
                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.thidorderidsearch
                      }
                    else{
                      return "this store Id, Search another store"
                    }
                    })()
                  }
                    </span>
                  </label>
                </div>
              </div>
            ) : null}
            {this.state.message === "Success" ? (
              <div className="reacttableordermodal order-det">
                <div
                  className="row m-t-10 m-b-10"
                  style={{ marginLeft: "0", marginRight: "0" }}
                >
                  <div className="">
                    <ul
                      className="nav alert-nav-tabs3 store-nav-tabs"
                      role="tablist"
                    >
                      <li className="nav-item fo">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#storeSubdetail-tab"
                          role="tab"
                          aria-controls="storeSubdetail-tab"
                          aria-selected="true"
                        >
                           {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.storedetail
                      }
                    else{
                      return "Store Details"
                    }
                    })()
                  }
                        </a>
                      </li>
                      {this.state.AddSelectDetail === true ? (
                        <li className="nav-item fo">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#selectedSubstore-tab"
                            role="tab"
                            aria-controls="selectedSubstore-tab"
                            aria-selected="false"
                          >
                             {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.selectedstore
                      }
                    else{
                      return "Selected Store"
                    }
                    })()
                  }
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </div>
                <span className="linestore2"></span>
                <div className="tab-content p-0">
                  <div
                    className="tab-pane fade show active"
                    id="storeSubdetail-tab"
                    role="tabpanel"
                    aria-labelledby="storeSubdetail-tab"
                  >
                    <div className="reactstoreselect ordermainrow">
                      <Table
                        className="custom-antd-table"
                        columns={[
                          {
                            // title: "",
                            // dataIndex: "",
                            render: (row, data) => {
                              return (
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    className="d-none"
                                    id={"i" + data.storeID}
                                    name="ticket-store"
                                    checked={
                                      this.state.CheckStoreID[data.storeID] ===
                                      true
                                    }
                                    onChange={this.handleCheckStoreID.bind(
                                      this,
                                      data.storeID,
                                      data
                                    )}
                                  />
                                  <label htmlFor={"i" + data.storeID}></label>
                                </div>
                              );
                            }
                          },
                          {
                            title: "Store Code",
                            dataIndex: "storeCode"
                          },
                          {
                            title: "Store Name",
                            dataIndex: "storeName"
                          },
                          {
                            title: "Store Pin Code",
                            dataIndex: "pincode"
                          },
                          {
                            title: "Store Email ID",
                            dataIndex: "storeEmailID"
                          },
                          {
                            title: "Store Addres",
                            dataIndex: "address"
                          }
                        ]}
                        dataSource={SearchData}
                        pagination={false}
                      />
                    </div>
                    {this.state.selectedStoreData.length !== 0 ? (
                      <div className="storedetailtabsbutton">
                        <button
                          type="button"
                          className="addstoretabsbtn"
                          onClick={this.handleShowSearchSelectDetails.bind(
                            this
                          )}
                        >
                          ADD STORE
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="selectedSubstore-tab"
                    role="tabpanel"
                    aria-labelledby="selectedSubstore-tab"
                  >
                    <div className="reactstoreselect ordermainrow custom-antd-table">
                      <Table
                        className="custom-antd-table date-picker-arrows"
                        columns={[
                          {
                            // title: "",
                            // dataIndex: "",
                            render: (row, data) => {
                              // //
                              return (
                                <div className="filter-checkbox">
                                  <input
                                    className="d-none"
                                    type="checkbox"
                                    id={"selected" + data.storeID}
                                    name="ticket-store"
                                    checked={
                                      this.state.CheckStoreID[data.storeID] ===
                                      true
                                    }
                                    onChange={this.handleCheckStoreID.bind(
                                      this,
                                      data.storeID,
                                      data
                                    )}
                                  />
                                  <label
                                    htmlFor={"selected" + data.storeID}
                                  ></label>
                                </div>
                              );
                            }
                          },
                          {
                            title: "Purpose",
                            dataIndex: "storeID2",
                            render: (row, data) => {
                              return (
                                <div
                                  className="filter-checkbox"
                                  style={{ marginLeft: "15px" }}
                                >
                                  <label htmlFor={"selected" + data.storeID}>
                                    {data.purposeId === "0"
                                      ? "Customer Want to visit store"
                                      : "Customer Already visited store"}
                                  </label>
                                </div>
                              );
                            }
                          },
                          {
                            title: "Store Code",
                            dataIndex: "storeCode"
                          },
                          {
                            title: "Store Name",
                            dataIndex: "storeName"
                          },
                          {
                            title: "Store Pin Code",
                            dataIndex: "pincode"
                          },
                          {
                            title: "Store Email ID",
                            dataIndex: "storeEmailID"
                          },
                          {
                            title: "Store Addres",
                            dataIndex: "address"
                          },
                          {
                            title: "Visit Date",
                            dataIndex: "visitDate",
                            render: (row, data) => {
                              return (
                                <div className="col-sm-12 p-0 position-static">
                                  <DatePicker
                                    selected={data.VisitedDate}
                                    placeholderText="DD/MM/YYYY"
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="dd/MM/yyyy"
                                    id={"visitDate" + data.storeID}
                                    value={data.VisitedDate}
                                    name="visitDate"
                                    onChange={this.handleByvisitDate.bind(
                                      this,
                                      data
                                    )}
                                  />
                                </div>
                              );
                            }
                          }
                        ]}
                        dataSource={selectedStoreData}
                        pagination={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Fragment>
    );
  }
}

TicketSystemStore.contextType = MyContext;
export default TicketSystemStore;

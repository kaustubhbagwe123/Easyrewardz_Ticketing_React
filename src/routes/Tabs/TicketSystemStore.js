import React, { Component, Fragment } from "react";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";
import ArrowImg from "./../../assets/Images/arrow.png";
import NotFoundImg from "./../../assets/Images/notFound.png";
import Modal from "react-responsive-modal";
import ReactTable from "react-table";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import MinusImg from "./../../assets/Images/minus.png";
import matchSorter from "match-sorter";
import DatePicker from "react-datepicker";
import { Table } from "antd";

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
  }

  handleOrderStoreTableOpen() {
    this.setState({ OrderStoreTable: true });
  }
  handleOrderStoreTableClose() {
    this.setState({ OrderStoreTable: false });
  }
  handleByvisitDate(e, rowData) {
    debugger;
    var id = e.storeID;
    var index = this.state.selectedStoreData.findIndex(x => x.storeID === id);
    this.state.selectedStoreData["VisitedDate"] = rowData;
    var selectedStoreData = this.state.selectedStoreData;
    selectedStoreData[index].VisitedDate = rowData;

    this.setState({ selectedStoreData });
  }
  handleStoreStatus = e => {
    debugger;
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
    // if (this.state.SwitchBtnStatus === true) {
    //   this.setState({
    //     custVisit: 1,
    //     AlreadyCustVisit: 0
    //   });
    // } else {
    //   this.setState({
    //     custVisit: 0,
    //     AlreadyCustVisit: 0
    //   });
    // }
  };
  handleSearchStoreDetails() {
    debugger;
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
        }).then(function(res) {
          debugger;
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
        });
      } else {
        self.setState({
          byValideStoreData: "Please Enter Store Details."
        });
      }
    }
  }
  hanldeStatusChange(e) {
    debugger;
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
    debugger;

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
  handleCustomerStoreStatus = e => {
    debugger;
    this.setState({
      CustStoreStatusDrop: e.target.value
    });
  };

  
  render() {
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
                  <label className="orderdetailpopup">Yes</label>
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
                  <label className="orderdetailpopup">No</label>
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
                    <label className="orderdetailpopup">Yes</label>
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
                    <label className="orderdetailpopup">No</label>
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
                          Store Details
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
                  <div className="reactstoreselect">
                    {/* <ReactTable
                      data={SearchData}
                      onFilteredChange={this.onFilteredChange.bind(this)}
                      filtered={this.state.filtered}
                      defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value
                      }
                      columns={[
                        {
                          columns: [
                            {
                              Header: <></>,
                              accessor: "storeID",
                              Cell: row => (
                                <div
                                  className="filter-checkbox"
                                  style={{ marginLeft: "15px" }}
                                >
                                  <input
                                    type="checkbox"
                                    id={"i" + row.original.storeID}
                                    style={{ display: "none" }}
                                    name="ticket-store"
                                    checked={
                                      this.state.CheckStoreID[
                                        row.original.storeID
                                      ] === true
                                    }
                                    onChange={this.handleCheckStoreID.bind(
                                      this,
                                      row.original.storeID,
                                      row.original
                                    )}
                                  />
                                  <label
                                    htmlFor={"i" + row.original.storeID}
                                  ></label>
                                </div>
                              )
                            },
                            {
                              Header: <span>Store Code</span>,
                              accessor: "storeCode"
                            },
                            {
                              Header: <span>Store Name</span>,
                              accessor: "storeName"
                            },
                            {
                              Header: <span>Store Pin Code</span>,
                              accessor: "pincode"
                            },
                            {
                              Header: <span>Store Email ID</span>,
                              accessor: "storeEmailID"
                            },
                            {
                              Header: <span>Store Addres</span>,
                              accessor: "address"
                            }
                          ]
                        },
                        {
                          show: false,
                          Header: "All",
                          id: "all",
                          width: 0,
                          resizable: true,
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
                                "storeCode",
                                "storeName",
                                "storeEmailID",
                                "address",
                                "visitDate"
                              ],
                              threshold: matchSorter.rankings.WORD_STARTS_WITH
                            });
                            if (result.length > 0) {
                              debugger;
                              return result;
                            } else {
                              debugger;
                              result = [{ storeEmailID: "No Record Found" }];
                              return result;
                            }
                          },
                          filterAll: true
                        }
                      ]}
                      // resizable={false}
                      defaultPageSize={5}
                      showPagination={false}
                    /> */}
<Table
                        columns={[
                          {
                            title: "",
                            dataIndex: "storeID",
                            render: (row, data) => {
                              // debugger;
                              return (
                                <div>
                                   <input
                                      type="checkbox"
                                      id={"i" + data.storeID}
                                      name="ticket-store"
                                      checked={
                                        this.state.CheckStoreID[
                                          data.storeID
                                        ] === true
                                      }
                                      onChange={this.handleCheckStoreID.bind(
                                        this,
                                        data.storeID,
                                        data
                                      )}
                                    />
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
                    {/* <ReactTable
                      data={selectedStoreData}
                      columns={[
                        {
                          Header: (
                            <span style={{ paddingLeft: "50px" }}>Purpose</span>
                          ),
                          accessor: "purposeId",
                          Cell: row => (
                            <div
                              className="filter-checkbox"
                              style={{ marginLeft: "15px" }}
                            >
                              <input
                                type="checkbox"
                                id={"selected" + row.original.storeID}
                                style={{ display: "none" }}
                                name="ticket-store"
                                checked={
                                  this.state.CheckStoreID[
                                    row.original.storeID
                                  ] === true
                                }
                                onChange={this.handleCheckStoreID.bind(
                                  this,
                                  row.original.storeID,
                                  row.original
                                )}
                              />
                              <label
                                htmlFor={"selected" + row.original.storeID}
                              >
                                {row.original.purposeId === "0"
                                  ? "Customer Want to visit store"
                                  : "Customer Already visited store"}
                              </label>
                            </div>
                          )
                        },
                        {
                          Header: <span>Store Code</span>,
                          accessor: "storeCode"
                        },
                        {
                          Header: <span>Store Name</span>,
                          accessor: "storeName"
                        },
                        {
                          Header: <span>Store Pin Code</span>,
                          accessor: "pincode"
                        },
                        {
                          Header: <span>Store Email ID</span>,
                          accessor: "storeEmailID"
                        },
                        {
                          Header: <span>Store Addres</span>,
                          accessor: "address"
                        },
                        {
                          Header: <span>Visit Date</span>,
                          accessor: "visitDate",
                          Cell: row => {
                            return (
                              <div className="col-sm-12 p-0">
                                <DatePicker
                                  selected={row.original.VisitedDate}
                                  placeholderText="Visited Date"
                                  showMonthDropdown
                                  showYearDropdown
                                  dateFormat="dd/MM/yyyy"
                                  id={"visitDate" + row.original.storeID}
                                  value={row.original.VisitedDate}
                                  name="visitDate"
                                  onChange={this.handleByvisitDate.bind(
                                    this,
                                    row
                                  )}
                                />
                              </div>
                            );
                          }
                        }
                      ]}
                      defaultPageSize={5}
                      showPagination={false}
                    /> */}
                     <Table
                        columns={[
                          {
                            title: "",
                            dataIndex: "storeID",
                            render: (row, data) => {
                              // debugger;
                              return (
                                <div>
                                   <input
                                  type="checkbox"
                                  id={"selected" + data.storeID}
                                  name="ticket-store"
                                  checked={
                                    this.state.CheckStoreID[
                                      data.storeID
                                    ] === true
                                  }
                                  onChange={this.handleCheckStoreID.bind(
                                    this,
                                    data.storeID,
                                    data
                                  )}
                                />
                                </div>
                              );
                            }
                          },
                          {
                            title:"Purpose",
                            dataIndex:"storeID",
                            render:(row,data)=>{
                              return(
                                <div
                                className="filter-checkbox"
                                style={{ marginLeft: "15px" }}
                              >
                                <label
                                  htmlFor={"selected" + data.storeID}
                                >
                                  {data.purposeId === "0"
                                    ? "Customer Want to visit store"
                                    : "Customer Already visited store"}
                                </label>
                              </div>
                              )
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
                            render:(row,data)=>{
                              return(
                                <div className="col-sm-12 p-0">
                                <DatePicker
                                  selected={data.VisitedDate}
                                  placeholderText="Visited Date"
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
                              )
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
                <input
                  type="text"
                  className="systemordersearch"
                  placeholder="Search By Store Name, Pin Code, Store Code"
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
                    We couldn't find the store details with
                    <br /> <span> this store Id,Search another store</span>
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
                          Store Details
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
                            Selected Store
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
                            title: "",
                            dataIndex: "storeID",
                            render: (row, data) => {
                              // debugger;
                              return (
                                <div>
                                   <input
                                      type="checkbox"
                                      id={"i" + data.storeID}
                                      name="ticket-store"
                                      checked={
                                        this.state.CheckStoreID[
                                          data.storeID
                                        ] === true
                                      }
                                      onChange={this.handleCheckStoreID.bind(
                                        this,
                                        data.storeID,
                                        data
                                      )}
                                    />
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
                      {/* <ReactTable
                        data={SearchData}
                        onFilteredChange={this.onFilteredChange.bind(this)}
                        filtered={this.state.filtered}
                        defaultFilterMethod={(filter, row) =>
                          String(row[filter.id]) === filter.value
                        }
                        columns={[
                          {
                            columns: [
                              {
                                Header: <></>,
                                accessor: "storeID",
                                Cell: row => (
                                  <div
                                    className="filter-checkbox"
                                    style={{ marginLeft: "15px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id={"i" + row.original.storeID}
                                      style={{ display: "none" }}
                                      name="ticket-store"
                                      checked={
                                        this.state.CheckStoreID[
                                          row.original.storeID
                                        ] === true
                                      }
                                      onChange={this.handleCheckStoreID.bind(
                                        this,
                                        row.original.storeID,
                                        row.original
                                      )}
                                    />
                                    <label
                                      htmlFor={"i" + row.original.storeID}
                                    ></label>
                                  </div>
                                )
                              },
                              {
                                Header: <span>Store Code</span>,
                                accessor: "storeCode"
                              },
                              {
                                Header: <span>Store Name</span>,
                                accessor: "storeName"
                              },
                              {
                                Header: <span>Store Pin Code</span>,
                                accessor: "pincode"
                              },
                              {
                                Header: <span>Store Email ID</span>,
                                accessor: "storeEmailID"
                              },
                              {
                                Header: <span>Store Addres</span>,
                                accessor: "address"
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
                                  "storeCode",
                                  "storeName",
                                  "storeEmailID",
                                  "address",
                                  "visitDate"
                                ],
                                threshold: matchSorter.rankings.WORD_STARTS_WITH
                              });
                              if (result.length > 0) {
                                debugger;
                                return result;
                              } else {
                                debugger;
                                result = [{ storeEmailID: "No Record Found" }];
                                return result;
                              }
                            },
                            filterAll: true
                          }
                        ]}
                        // resizable={false}
                        defaultPageSize={5}
                        showPagination={false}
                      /> */}
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
                    <div className="reactstoreselect ordermainrow">
                      {/* <ReactTable
                        data={selectedStoreData}
                        columns={[
                          {
                            Header: <span></span>,
                            accessor: "invoiceNumber",
                            Cell: row => (
                              <div
                                className="filter-checkbox"
                                style={{ marginLeft: "15px" }}
                              >
                                <input
                                  type="checkbox"
                                  id={"selected" + row.original.storeID}
                                  style={{ display: "none" }}
                                  name="ticket-store"
                                  checked={
                                    this.state.CheckStoreID[
                                      row.original.storeID
                                    ] === true
                                  }
                                  onChange={this.handleCheckStoreID.bind(
                                    this,
                                    row.original.storeID,
                                    row.original
                                  )}
                                />
                                <label
                                  htmlFor={"selected" + row.original.storeID}
                                >
                                  {row.original.storeID}
                                </label>
                              </div>
                            )
                          },
                          {
                            Header: <span>Purpose</span>,
                            accessor: "storeCode",
                            Cell: row => (
                              <div
                                className="filter-checkbox"
                                style={{ marginLeft: "15px" }}
                              >
                                <label
                                  htmlFor={"selected" + row.original.storeID}
                                >
                                  {row.original.purposeId === "0"
                                    ? "Customer Want to visit store"
                                    : "Customer Already visited store"}
                                </label>
                              </div>
                            )
                          },
                          {
                            Header: <span>Store Code</span>,
                            accessor: "storeCode"
                          },
                          {
                            Header: <span>Store Name</span>,
                            accessor: "storeName"
                          },
                          {
                            Header: <span>Store Pin Code</span>,
                            accessor: "pincode"
                          },
                          {
                            Header: <span>Store Email ID</span>,
                            accessor: "storeEmailID"
                          },
                          {
                            Header: <span>Store Addres</span>,
                            accessor: "address"
                          },
                          {
                            Header: <span>Visit Date</span>,
                            accessor: "visitDate",
                            Cell: row => {
                              return (
                                <div className="col-sm-12 p-0">
                                  <DatePicker
                                    selected={row.original.VisitedDate}
                                    placeholderText="Visited Date"
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="dd/MM/yyyy"
                                    id={"visitDate" + row.original.storeID}
                                    value={row.original.VisitedDate}
                                    name="visitDate"
                                    onChange={this.handleByvisitDate.bind(
                                      this,
                                      row
                                    )}
                                  />
                                </div>
                              );
                            }
                          }
                        ]}
                        defaultPageSize={5}
                        showPagination={false}
                      /> */}
                       <Table
                       className="custom-antd-table"
                        columns={[
                          {
                            title: "",
                            dataIndex: "storeID",
                            render: (row, data) => {
                              // debugger;
                              return (
                                <div>
                                   <input
                                  type="checkbox"
                                  id={"selected" + data.storeID}
                                  name="ticket-store"
                                  checked={
                                    this.state.CheckStoreID[
                                      data.storeID
                                    ] === true
                                  }
                                  onChange={this.handleCheckStoreID.bind(
                                    this,
                                    data.storeID,
                                    data
                                  )}
                                />
                                </div>
                              );
                            }
                          },
                          {
                            title:"Purpose",
                            dataIndex:"storeID",
                            render:(row,data)=>{
                              return(
                                <div
                                className="filter-checkbox"
                                style={{ marginLeft: "15px" }}
                              >
                                <label
                                  htmlFor={"selected" + data.storeID}
                                >
                                  {data.purposeId === "0"
                                    ? "Customer Want to visit store"
                                    : "Customer Already visited store"}
                                </label>
                              </div>
                              )
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
                            render:(row,data)=>{
                              return(
                                <div className="col-sm-12 p-0">
                                <DatePicker
                                  selected={data.VisitedDate}
                                  placeholderText="Visited Date"
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
                              )
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

export default TicketSystemStore;

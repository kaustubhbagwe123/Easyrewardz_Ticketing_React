import React, { Component, Fragment } from "react";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";
import ArrowImg from "./../../assets/Images/arrow.png";
import NotFoundImg from "./../../assets/Images/notFound.png";
import Modal from "react-responsive-modal";
import ReactTable from "react-table";

class TicketSystemStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchStoreDetails: false,
      OrderStoreTable: false,
      AddSelectDetail: false
    };
    this.handleOrderStoreTableOpen = this.handleOrderStoreTableOpen.bind(this);
    this.handleOrderStoreTableClose = this.handleOrderStoreTableClose.bind(
      this
    );
  }

  handleOrderStoreTableOpen() {
    this.setState({ OrderStoreTable: true });
  }
  handleOrderStoreTableClose() {
    this.setState({ OrderStoreTable: false });
  }
  handleShowSearchStoreDetails() {
    this.setState({
      SearchStoreDetails: !this.state.SearchStoreDetails
    });
  }
  handleShowSearchSelectDetails() {
    this.setState({
      AddSelectDetail: !this.state.AddSelectDetail
    });
  }
  render() {
    const dataselectstore = [
      {
        taskTitle: "Store door are not working",
        assignTo: "G.Bansal",
        storeName: "Bata1"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal",
        storeName: "Bata2"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "G.Bansal",
        storeName: "Bata3"
      }
    ];

    const columnsselectstore = [
      {
        Header: <span>Purpose</span>,
        accessor: "invoiceNumber",
        Cell: row => (
          <div className="filter-checkbox" style={{ marginLeft: "15px" }}>
            <input
              type="checkbox"
              id="fil-number16"
              name="filter-type"
              style={{ display: "none" }}
              //   onChange={() => this.showAddNoteFuncation()}
            />
            <label htmlFor="fil-number16" style={{ paddingLeft: "25px" }}>
              <span className="add-note">
                Customer Want <br></br>to visit store
              </span>
            </label>
          </div>
        )
      },
      {
        Header: <span>Store Code</span>,
        accessor: "storeCode",
        Cell: row => <label>BB332398</label>
      },
      {
        Header: <span>Store Name</span>,
        accessor: "storeName"
      },
      {
        Header: <span>Store Pin Code</span>,
        accessor: "storePin",
        Cell: row => <label>02</label>
      },
      {
        Header: <span>Store Email ID</span>,
        accessor: "storeEmail",
        Cell: row => <label>2999</label>
      },
      {
        Header: <span>Store Addres</span>,
        accessor: "storeCode",
        Cell: row => (
          <label>
            UNIT D-338,|SECOND FLOOR,|M-3,DLF <br></br>MALL OF
            INDIA|SECTORE-18,|<br></br>UTTAR PRADESH | 201301
          </label>
        )
      },
      {
        Header: <span>Visit Date</span>,
        accessor: "visitDate",
        Cell: row => <label>23,Aug 2019</label>
      }
    ];
    return (
      <Fragment>
        <div className="row storemainrow">
          <div className="col-md-8">
            <select className="systemstoredropdown">
              <option>Customer Want to visit store</option>
              <option>Customer Already visited store</option>
            </select>
          </div>
          <div className="col-md-3">
            <div style={{ display: "flex", marginTop: "7px" }}>
              <label className="orderdetailpopup">Yes</label>
              <div className="switchmargin">
                <div className="switch switch-primary d-inline m-r-10">
                  <input type="checkbox" id="editDashboard-p-18" />
                  <label htmlFor="editDashboard-p-18" className="cr"></label>
                </div>
              </div>
              <label className="orderdetailpopup">No</label>
            </div>
          </div>
          <div className="col-md-1">
            <div className="storeplusline">
              <span className="plusline1"></span>
              <img
                src={ArrowImg}
                alt="Arrow"
                className="arrow-imgtask-1"
                onClick={this.handleOrderStoreTableOpen}
              />
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
            <div className="col-md-10">
              <select className="systemstoredropdown1">
                <option>Customer Want to visit store</option>
                <option>Customer Already visited store</option>
              </select>
            </div>
            <div className="col-md-1">
              <div style={{ display: "flex", marginTop: "7px" }}>
                <label className="orderdetailpopup">Yes</label>
                <div className="switchmargin">
                  <div className="switch switch-primary d-inline m-r-10">
                    <input type="checkbox" id="editDashboard-p-12" />
                    <label htmlFor="editDashboard-p-12" className="cr"></label>
                  </div>
                </div>
                <label className="orderdetailpopup">No</label>
              </div>
            </div>
            <div className="col-md-1">
              <div className="storeplusline">
                <span className="plusline1"></span>
                <img
                  src={ArrowImg}
                  alt="Arrow"
                  className="arrow-imgtask-1"
                  onClick={this.handleOrderStoreTableClose}
                />
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
                placeholder="Search By Store Name,Pin Code,Store Code"
              />
              <img
                src={SearchBlackImg}
                alt="Search"
                className="systemorder-imgsearch"
              />
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
                </ul>
              </div>
            </div>
          </div>
          <span className="linestore2"></span>
          <div className="tab-content p-0">
            <div
              className="tab-pane fade"
              id="storedetail-tab"
              role="tabpanel"
              aria-labelledby="storedetail-tab"
            >
              <div className="reactstoreselect">
                <ReactTable
                  data={dataselectstore}
                  columns={columnsselectstore}
                  // resizable={false}
                  defaultPageSize={5}
                  showPagination={false}
                />
              </div>
            </div>
            <div
              className="tab-pane fade show active"
              id="selectedstore-tab"
              role="tabpanel"
              aria-labelledby="selectedstore-tab"
            >
              <div className="reactstoreselect">
                <ReactTable
                  data={dataselectstore}
                  columns={columnsselectstore}
                  // resizable={false}
                  defaultPageSize={5}
                  showPagination={false}
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
              placeholder="Search By Store Name,Pin Code,Store Code"
            />
            <img
              src={SearchBlackImg}
              alt="Search"
              className="systemorder-imgsearch"
              onClick={this.handleShowSearchStoreDetails.bind(this)}
            />
          </div>
        </div>
        <span className="linestore3"></span>
        {this.state.SearchStoreDetails ? (
          <div>
            {this.state.AddSelectDetail === false ? (
              <div>
                <div
                  className="row m-t-10 m-b-10"
                  style={{ marginLeft: "0", marginRight: "0" }}
                >
                  <div className="col-md-9">
                    <label
                      className="orderdetailpopup"
                      style={{ marginTop: "3px" }}
                    >
                      Store Details
                    </label>
                  </div>
                </div>
                <span className="linestore2"></span>
                <div className="reactstoreselect">
                  <ReactTable
                    data={dataselectstore}
                    columns={columnsselectstore}
                    // resizable={false}
                    defaultPageSize={3}
                    showPagination={false}
                  />
                </div>
                <div className="storedetailtabsbutton">
                  <button
                    type="button"
                    className="addstoretabsbtn"
                    onClick={this.handleShowSearchSelectDetails.bind(this)}
                  >
                    ADD STORE
                  </button>
                </div>
              </div>
            ) : (
              <div>
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
                      </ul>
                    </div>
                  </div>
                </div>
                <span className="linestore2"></span>
                <div className="tab-content p-0">
                  <div
                    className="tab-pane fade"
                    id="storedetail-tab"
                    role="tabpanel"
                    aria-labelledby="storedetail-tab"
                  >
                    <div className="reactstoreselect">
                      <ReactTable
                        data={dataselectstore}
                        columns={columnsselectstore}
                        // resizable={false}
                        defaultPageSize={3}
                        showPagination={false}
                      />
                    </div>
                  </div>

                  <div
                    className="tab-pane fade show active"
                    id="selectedstore-tab"
                    role="tabpanel"
                    aria-labelledby="selectedstore-tab"
                  >
                    <div className="reactstoreselect">
                      <ReactTable
                        data={dataselectstore}
                        columns={columnsselectstore}
                        // resizable={false}
                        defaultPageSize={3}
                        showPagination={false}
                      />
                    </div>
                    <div className="storedetailtabsbutton">
                  <button
                    type="button"
                    className="addstoretabsbtn"
                  >
                    REMOVE STORE
                  </button>
                </div>
                  </div>
                </div>
              </div>
            )}
            {/* <div>
            <div
              className="row m-t-10 m-b-10"
              style={{ marginLeft: "0", marginRight: "0" }}
            >
              <div className="col-md-9">
                <label
                  className="orderdetailpopup"
                  style={{ marginTop: "3px" }}
                >
                  Store Details
                </label>
              </div>
            </div>
            <span className="linestore2"></span>
            <div className="reactstoreselect">
              <ReactTable
                data={dataselectstore}
                columns={columnsselectstore}
                // resizable={false}
                defaultPageSize={3}
                showPagination={false}
              />
            </div>
            <div className="storedetailtabsbutton">
              <button
                type="button"
                className="addstoretabsbtn"
                onClick={this.handleShowSearchSelectDetails.bind(this)}
              >
                ADD STORE
              </button>
            </div>
          </div> */}
          </div>
        ) : (
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
        )}

        {/* {this.state.AddSelectDetail ? (
            <div>

            </div>
        ) : (

          <div>
            
          </div>
        )} */}
      </Fragment>
    );
  }
}

export default TicketSystemStore;

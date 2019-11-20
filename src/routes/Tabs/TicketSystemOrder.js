import React, { Component } from "react";
import ArrowImg from "./../../assets/Images/arrow.png";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";
import NotFoundImg from "./../../assets/Images/notFound.png";
import Modal from "react-responsive-modal";
import ReactTable from "react-table";
import MinusImg from "./../../assets/Images/minus.png";

class TicketSystemOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchOrderDetails: false,
      AddManualOrderHideShow: false,
      OrderTable: false,
      AddManuallyData: false,
      AddManualSaveTbl: false
    };
    this.handleOrderTableOpen = this.handleOrderTableOpen.bind(this);
    this.handleOrderTableClose = this.handleOrderTableClose.bind(this);
  }
  handleOrderTableOpen() {
    this.setState({ OrderTable: true });
  }
  handleOrderTableClose() {
    this.setState({ OrderTable: false });
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

    const columnsOrder = [
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
    ];
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

    return (
      <div>
        <div className="row storemainrow">
          <div className="col-md-8">
            <label className="systemstordercustomer">
              Customer Want to attach order
            </label>
          </div>
          <div className="col-md-3">
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
          <div className="col-md-1">
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
              columns={columnsOrder}
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
        {this.state.AddManuallyData === false? (
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
        ) : (
          null
        )}
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
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="addmanuallytext1"
                  placeholder="Bill ID"
                />
              </div>
            </div>

            <div className="row m-b-10 m-l-10 m-r-10">
              <div className="col-md-6">
                <input
                  type="text"
                  className="addmanuallytext1"
                  placeholder="Product Bar Code"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="addmanuallytext1"
                  placeholder="Sources"
                />
              </div>
            </div>

            <div className="row m-b-10 m-l-10 m-r-10">
              <div className="col-md-6">
                <input
                  type="text"
                  className="addmanuallytext1"
                  placeholder="Mode Of Payment"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="addmanuallytext1"
                  placeholder="Date"
                />
              </div>
            </div>

            <div className="row m-b-10 m-l-10 m-r-10">
              <div className="col-md-6">
                <input
                  type="text"
                  className="addmanuallytext1"
                  placeholder="MRP"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="addmanuallytext1"
                  placeholder="Price Paid"
                />
              </div>
            </div>

            <div className="row m-b-10 m-l-10 m-r-10">
              <div className="col-md-6">
                <input
                  type="text"
                  className="addmanuallytext1"
                  placeholder="Discount"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="addmanuallytext1"
                  placeholder="Size"
                />
              </div>
            </div>

            <div className="row m-b-10 m-l-10 m-r-10">
              <div className="col-md-6">
                <input
                  type="text"
                  className="addmanuallytext1"
                  placeholder="Required Size"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="addmanuallytext1"
                  placeholder="Purchase from Store name"
                />
              </div>
            </div>

            <div className="row m-b-10 m-l-10 m-r-10">
              <div className="col-md-6">
                <input
                  type="text"
                  className="addmanuallytext1"
                  placeholder="Purchase from Store Addres"
                />
              </div>
            </div>

            <div className="row m-b-10 m-l-10 m-r-10">
              <div className="col-md-6">
                <button className="addmanual m-t-15"
                onClick={this.handleChangeSaveManualTbl.bind(this)}>SAVE</button>
              </div>
            </div>
            </div>
            ): (

            
          <div className="reacttableordermodal">

              <div className="row m-b-10">
                <div className="col-md-11"
                  style={{ marginLeft: "25px", marginTop: "20px" }}
                >
                  <input type="text" className="systemordersearch" placeholder="BB3736289940" />
                  <img src={SearchBlackImg} alt="Search" className="systemorder-imgsearch" />
                </div>
              </div>
              <span className="linestore2"></span>
              <div
            className="row m-t-10 m-b-10"
            style={{ marginLeft: "0", marginRight: "0" }}
          >
            <div className="col-md-9">
              <label className="orderdetailpopup" style={{marginTop:"3px"}}>Order Details</label>
            </div>
            <div className="col-md-3">
              <div style={{ float: "right", display: "flex" }}>
                <label className="orderdetailpopup " style={{marginTop:"3px"}}>Order</label>
                <div className="orderswitch orderswitchitem">
                  <div className="switch switch-primary d-inline">
                    <input type="checkbox" id="editTasks-p-2" />
                    <label htmlFor="editTasks-p-2" className="cr ord"></label>
                  </div>
                </div>
                <label className="orderdetailpopup" style={{marginTop:"3px"}}>Item</label>
              </div>
            </div>
            </div>
            <span className="linestore2"></span>
            <ReactTable
              data={dataOrder}
              columns={columnsOrder}
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
    );
  }
}

export default TicketSystemOrder;

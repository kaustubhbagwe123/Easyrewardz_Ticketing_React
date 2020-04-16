import React, { Component, Fragment } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
// import TableDemo from "../TableDemo";
import BataShoes from "./../../assets/Images/Bata-shoes.jpg";
import ArrowImg from "./../../assets/Images/arrow.png";
import PlusImg from "./../../assets/Images/plus.png";
import Headphone2Img from "./../../assets/Images/headphone2.png";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";
import DownImg from "./../../assets/Images/down.png";
import storeImg from "./../../assets/Images/store.png";
import ReactTable from "react-table";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import { Select, Table } from "antd";
import { NotificationManager } from "react-notifications";

const { Option } = Select;
const NEW_ITEM = "NEW_ITEM";

class ClaimApproveReject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      SearchDetails: true,
      claimID:0,
      brandData: [],
      categoryDropData: [],
      SubCategoryDropData: [],
      ListOfIssueData: [],
      selectBrand: 0,
      list1Value: "",
      ListOfSubCate: "",
      ListOfIssue: "",
      claimPercentage:"",
      orderDetailsData: [],
      customerData: {},
      OrderSubItem: [],
      customerName: "",
      customerPhoneNumber: "",
      customerAlternateNumber: "",
      emailID: "",
      alternateEmailID: "",
      gender: "",
      commentData: [],
      finalClaimPercentage: "",
      errFinalClaimPercent: ""
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    debugger;
    
    if (this.props.location.state) {
      var claimId = this.props.location.state.ClaimID;
      this.handleGetClaimByID(claimId);
      this.setState({
        claimID: claimId
      })
      this.handleGetStoreClaimComments(claimId);
      this.handleGetBrandList();
    }
    
  }

  handleToggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  handleShowSearchDetails() {
    this.setState({
      SearchDetails: !this.state.SearchDetails
    });
  }

  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ brandData: data });
        } else {
          self.setState({ brandData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  // handleBrandChange = e => {
  //   debugger;
  //   let value = e.target.value;
  //   this.setState({
  //     selectBrand: value,
  //     categoryDropData: [],
  //     SubCategoryDropData: [],
  //     ListOfIssueData: [],
  //     claimComments:""
  //   });
  //   setTimeout(() => {
  //     if (this.state.selectBrand) {
  //       this.handleGetCategoryList();
  //     }
  //   }, 1);
  // };

  // handleGetCategoryList = async (id, type) => {
  //   let self = this;
  //   var braindID;
  //   if (type == "edit") {
  //     braindID = id;
  //   } else {
  //     if (id) {
  //       braindID = id;
  //     } else {
  //       braindID = this.state.selectBrand;
  //     }
  //   }
  //   await axios({
  //     method: "post",
  //     url: config.apiUrl + "/Category/GetClaimCategoryListByBrandID",
  //     headers: authHeader(),
  //     params: {
  //       BrandID: braindID
  //     }
  //   })
  //     .then(function(res) {
  //       debugger;
  //       let data = res.data;
  //       self.setState({ categoryDropData: data });
  //     })
  //     .catch(data => {
  //       console.log(data);
  //     });
  // };

  // handleCategoryChange = value => {
  //   debugger;
  //   if (value !== NEW_ITEM) {
  //     this.setState({ list1Value: value, SubCategoryDropData: [] });
  //     setTimeout(() => {
  //       if (this.state.list1Value) {
  //         this.handleGetSubCategoryList(value);
  //       }
  //     }, 10);
  //   } else {
  //     this.setState({ showList1: true });
  //   }
  // };

  // handleGetSubCategoryList = async (id, type) => {
  //   debugger;
  //   let self = this;
  //   var Category_Id = "";
  //   if (type === "edit") {
  //     Category_Id = id;
  //   } else {
  //     Category_Id = this.state.list1Value;
  //   }
  //   await axios({
  //     method: "post",
  //     url: config.apiUrl + "/Category/GetClaimSubCategoryByCategoryID",
  //     headers: authHeader(),
  //     params: {
  //       CategoryID: Category_Id
  //     }
  //   })
  //     .then(function(res) {
  //       debugger;
  //       let data = res.data.responseData;
  //       self.setState({ SubCategoryDropData: data });
  //     })
  //     .catch(data => {
  //       console.log(data);
  //     });
  // };

  // handleSubCatOnChange = value => {
  //   debugger;
  //   if (value !== NEW_ITEM) {
  //     this.setState({ ListOfSubCate: value });
  //     setTimeout(() => {
  //       if (this.state.ListOfSubCate) {
  //         this.handleGetIssueTypeList();
  //       }
  //     }, 1);
  //   } else {
  //     this.setState({ ShowSubCate: true });
  //   }
  // };

  // handleGetIssueTypeList(id) {
  //   debugger;
  //   let self = this;
  //   var SubCat_Id = 0;
  //   if (id === "edit") {
  //     SubCat_Id = this.state.editCategory.subCategoryID;
  //   } else {
  //     SubCat_Id = this.state.ListOfSubCate;
  //   }
  //   axios({
  //     method: "post",
  //     url: config.apiUrl + "/Category/GetClaimIssueTypeList",
  //     headers: authHeader(),
  //     params: {
  //       SubCategoryID: SubCat_Id
  //     }
  //   })
  //     .then(function(res) {
  //       debugger;
  //       let status = res.data.message;
  //       let data = res.data.responseData;
  //       if (status === "Success") {
  //         self.setState({ ListOfIssueData: data });
  //       } else {
  //         self.setState({ ListOfIssueData: [] });
  //       }
  //     })
  //     .catch(data => {
  //       console.log(data);
  //     });
  // }

  // handleIssueOnChange = value => {
  //   debugger;
  //   if (value !== NEW_ITEM) {
  //     this.setState({ ListOfIssue: value });
  //   } else {
  //     this.setState({ ShowIssuetype: true });
  //   }
  // };

  handleGetClaimByID(claimId) {
    debugger;
    this.setState({ isloading: true });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/GetClaimByID",
      headers: authHeader(),
      params: { ClaimID: claimId }
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message == "Success" && responseData) {
         var orderDetails = [];
         orderDetails.push(responseData.customOrderMaster)
          // self.handleGetCategoryList(responseData.brandID, "edit");
          // self.handleGetSubCategoryList(responseData.categoryID, "edit");
          
          self.setState({
            selectBrand: responseData.brandID,
            list1Value: responseData.categoryName,
            ListOfSubCate: responseData.subCategoryName,
            ListOfIssue: responseData.issueTypeName,
            claimPercentage: responseData.claimAskFor,
            customerName: responseData.customerName,
            customerPhoneNumber: responseData.customerPhoneNumber,
            customerAlternateNumber: responseData.customerAlternateNumber,
            emailID: responseData.emailID,
            alternateEmailID: responseData.alternateEmailID,
            gender: responseData.gender,
            orderDetailsData: orderDetails,  
            OrderSubItem: responseData.customOrderMaster.orderItems
          })
        }
        // if (message === "Success" && responseData.length > 0) {
        //   if (tabFor === 1) {
        //     self.setState({ raisedByMeData: responseData, isloading: false });
        //   }
        //   if (tabFor === 2) {
        //     self.setState({ assignToMeData: responseData, isloading: false });
        //   }
        // } else {
        //   if (tabFor === 1) {
        //     self.setState({ raisedByMeData: responseData, isloading: false });
        //   }
        //   if (tabFor === 2) {
        //     self.setState({ assignToMeData: responseData, isloading: false });
        //   }
        // }
      }).catch(response => {
        self.setState({ isloading: false });
        console.log(response, "---handleGetTaskData");
      });
  }

  handleAddStoreClaimComments() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/AddStoreClaimComment",
      params: { ClaimID: this.state.claimID, Comment: this.state.claimComments},
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success("Record saved successfully");
          self.handleGetStoreClaimComments(self.state.claimID);
        } else {
          NotificationManager.error(res.data.message);
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleOnChange(e) {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }

  handleGetStoreClaimComments(claimId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/GetClaimCommentByClaimID",
      headers: authHeader(),
      params: { ClaimID: claimId }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ commentData: data });
        } else {
          self.setState({ commentData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleApproveRejectClaim(IsApprove, e) {
    let self = this;
    if(this.state.finalClaimPercentage!=="")
    {
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/IsClaimApprove",
      headers: authHeader(),
      params: { claimID: this.state.claimID, finalClaimAsked: this.state.finalClaimPercentage, IsApprove: IsApprove}
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          if (IsApprove== true) {
            NotificationManager.success("Record approved successfully");
          }else{
            NotificationManager.success("Record rejected successfully");
          }        
        } else {
          NotificationManager.error(res.data.message);
        }
      })
      .catch(data => {
        console.log(data);
      });
    }else{
      this.setState({
        errFinalClaimPercent: "Please enter final claim percentage"
      });
    }
  }

  render() {

    const { orderDetailsData } = this.state;

    const list1SelectOptions = this.state.categoryDropData.map((item, o) => (
      <Option key={o} value={item.categoryID}>
        {item.categoryName}
      </Option>
    ));

    const listSubCategory = this.state.SubCategoryDropData.map((item, o) => (
      <Option key={o} value={item.subCategoryID}>
        {item.subCategoryName}
      </Option>
    ));

    const listOfIssueType = this.state.ListOfIssueData.map((item, i) => (
      <Option key={i} value={item.issueTypeID}>
        {item.issueTypeName}
      </Option>
    ));

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
        Header: <span>SKU</span>,
        accessor: "Sku",
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
        Header: <span>Product Name</span>,
        accessor: "ProName",
        Cell: row => <label>Paper Bag Big</label>
      },
      {
        Header: <span>Price</span>,
        accessor: "Price",
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
        Header: <span>MOP</span>,
        accessor: "reqSiz",
        Cell: row => <label>Cash</label>
      }
    ];

    return (
      <Fragment>
        <div className="row claim-header-card width">
          <div className="col-md-7">
            <label className="claim-title1">Claim Ticket ID :</label>
            <label className="claim-A22345">A22345</label>
            <label className="claim-title1">Task ID :</label>
            <label className="claim-A22345">A22345</label>
            <label className="claim-title1">Ticket ID :</label>
            <label className="claim-A22345">A22345</label>
          </div>
          <div className="col-md-5">
            {/* <div className="oval-approve">
              <img src={StoreIcon} style={{ padding: "1px",width:"22px",height:"18px" }} alt="store-icon"/>
              </div> */}
            <div
              className="oval-5-1-new-store"
              style={{ marginLeft: "30px", marginRight: "15px" }}
            >
              <img src={storeImg} alt="headphone" className="storeImg-11" />
            </div>
            <label className="naman-R">Naman.R</label>
            <img src={DownImg} alt="down" className="down-header" />
            <div className="btn-approrej">
              <button type="button" className="btn-approrej1"
              onClick={this.handleApproveRejectClaim.bind(this, true)}
              >
                APPROVE CLAIM
              </button>
              <button type="button" className="btn-approrej1"
              onClick={this.handleApproveRejectClaim.bind(this, false)}
              >
                REJECT CLAIM
              </button>
            </div>
          </div>
        </div>
        <div className="back-color">
          <div className="row" style={{ margin: "0" }}>
            <div className="col-md-9" style={{ padding: "0" }}>
              <div className="card card-radius" style={{ padding: "45px 45px 30px", margin: "0 0 20px" }}>
                <div className="search-customer-padding">
                  <div className="" style={{ border: "1px solid #EEE", borderRadius: "5px" }}>
                    <div className="claim-status-card">
                      <label>
                        <b>Claim Status: Open</b>
                      </label>
                      <div className="claimplus">
                        <span className="plusline1"></span>
                        <img
                          src={ArrowImg}
                          alt="Arrow"
                          className="arrow-img-1"
                        />
                        <span className="plusline2"></span>
                        <img
                          src={PlusImg}
                          alt="Plush"
                          className="plush-img-1"
                          onClick={this.handleToggle.bind(this)}
                        />
                      </div>
                    </div>

                    <Collapse
                      isOpen={this.state.collapse}
                      style={{ width: "100%" }}
                    >
                      <Card>
                        <CardBody style={{ padding: "15px 0 0 0" }}>
                          <div className="row mx-0">
                            <div className="col-md-6">
                              <label className="orderdetailtext">
                                Order details
                              </label>
                            </div>
                            {/* <div className="col-md-6">
                              <input
                                type="text"
                                className="searchtext"
                                placeholder="Search Order"
                              />
                              <img
                                src={SearchBlackImg}
                                alt="Search"
                                className="searchImg-raise"
                                onClick={this.handleShowSearchDetails.bind(
                                  this
                                )}
                              />
                            </div> */}
                            <span className="Searchline"> </span>
                          </div>
                          {this.state.SearchDetails ? (
                            <div style={{ borderTop: "1px solid #EEE", marginTop: "12px" }}>
                              <div className="reacttableordermodal">
                                {/* <ReactTable
                                  data={dataOrder}
                                  // columns={columnsOrder}
                                  columns={[
                                    {
                                      Header: <span>Invoice Number</span>,
                                      accessor: "invoiceNumber",
                                      Cell: row => (
                                        <div
                                          className="filter-checkbox"
                                          style={{ marginLeft: "15px" }}
                                        >
                                          <input
                                            type="checkbox"
                                            id="fil-number1"
                                            name="filter-type"
                                            style={{ display: "none" }}
                                          //   onChange={() => this.showAddNoteFuncation()}
                                          />
                                          <label
                                            htmlFor="fil-number1"
                                            style={{ paddingLeft: "25px" }}
                                          >
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
                                      Cell: row => (
                                        <label>UNIT D-338,| SECOND FLOOR SECTOR 14</label>
                                      )
                                    },
                                    // {
                                    //   Header: <span>Discount</span>,
                                    //   accessor: "discount",
                                    //   Cell: row => <label>25%</label>
                                    // }
                                  ]}
                                  //resizable={false}
                                  defaultPageSize={3}
                                  showPagination={false}
                                  SubComponent={row => {
                                    return (
                                      <div className="reactstoreclaim" style={{ padding: "20px" }}>
                                        <ReactTable
                                          data={dataOrder1}
                                          columns={columnsOrder1}
                                          defaultPageSize={2}
                                          showPagination={false}
                                        />
                                      </div>
                                    );
                                  }}
                                /> */}
                                {orderDetailsData.length>0?(
                                <Table
                                  className="components-table-demo-nested custom-antd-table"
                                  dataSource={orderDetailsData}
                                  columns={[
                                    {
                                      title: "Invoice Number",
                                      dataIndex: "invoiceNumber"
                                    },
                                    {
                                      title: "Invoice Date",
                                      dataIndex: "dateFormat"
                                    },
                                    {
                                      title: "Item Count",
                                      dataIndex: "itemCount"
                                    },
                                    {
                                      title: "Item Price",
                                      dataIndex: "ordeItemPrice"
                                    },
                                    {
                                      title: "Price Paid",
                                      dataIndex: "orderPricePaid"
                                    },
                                    {
                                      title: "Store Code",
                                      dataIndex: "storeCode"
                                    },
                                    {
                                      title: "Store Address",
                                      dataIndex: "storeAddress"
                                    },
                                    {
                                      title: "Discount",
                                      dataIndex: "discount"
                                    }
                                  ]}
                                  expandedRowRender={row => {
                                    return (
                                      <Table
                                        // dataSource={this.state.OrderSubItem}
                                        dataSource={this.state.OrderSubItem.filter(
                                          x => x.orderMasterID === row.orderMasterID
                                        )}
                                        columns={[
                                          {
                                            title: "Article Number",
                                            dataIndex: "articleNumber"
                                          },
                                          {
                                            title: "Article Name",
                                            dataIndex: "articleName"
                                          },
                                          {
                                            title: "Article MRP",
                                            dataIndex: "itemPrice"
                                          },
                                          {
                                            title: "Price Paid",
                                            dataIndex: "pricePaid"
                                          },
                                          {
                                            title: "Discount",
                                            dataIndex: "discount"
                                          }
                                        ]}
                                        // rowSelection={rowSelection}
                                        pagination={false}
                                      />
                                    );
                                  }}
                                  pagination={false}
                                />
                                ):null
                                }
                              </div>


                            </div>
                            ) : (
                              <div className="uploadsearch">
                                <div className="row">
                                  <div className="col-md-12 uploadsechmargin">
                                    <label className="uploadsearch-text">
                                      No order found with this number
                                  </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12 uploadsechmargin">
                                    <button
                                      type="button"
                                      className="uploadsearchbtn"
                                    >
                                      <label
                                        for="file-upload"
                                        className="uploadsearchbtn-text"
                                      >
                                        UPLOAD FILE
                                    </label>
                                    </button>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12 uploadsechmargin">
                                    <u>
                                      <a href="#!">DOWNLOAD SAMPLE FILE</a>
                                    </u>
                                  </div>
                                </div>
                              </div>
                            )}
                        </CardBody>
                      </Card>
                    </Collapse>

                    {/* <Collapse isOpen={this.state.collapse}>
                      <Card style={{ marginRight: "31px" }}>
                        <CardBody style={{ marginRight: "-162px" }}>
                          <div className="row">
                            <div className="col-md-6">
                              <label className="claim-A22345">
                                Order details
                              </label>
                            </div>
                            <div className="col-md-6">
                              <input
                                type="text"
                                className="search-order"
                                placeholder="Search Order"
                              />
                              <img
                                src={SearchBlackImg}
                                alt="Search"
                                className="searchImg-2"
                              />
                            </div>
                            <TableDemo />
                          </div>
                        </CardBody>
                      </Card>
                    </Collapse> */}
                  </div>
                  <div className="row">
                  <div className="form-group col-md-4">
                      <label className="label-6">Brand</label>
                      <select
                        id="inputState"
                        className="form-control dropdown-label"
                        value={this.state.selectBrand}
                        onChange={this.handleBrandChange}
                      >
                        <option>select</option>
                        {this.state.brandData !== null &&
                            this.state.brandData.map((item, i) => (
                              <option
                                key={i}
                                value={item.brandID}
                                className="select-category-placeholder"
                              >
                                {item.brandName}
                              </option>
                            ))}
                      </select>
                    </div>
                    <div className="form-group col-md-4">
                      <label className="label-6">Claim Category</label>
                      <input
                        id="inputState"
                        className="form-control dropdown-label"
                        value={this.state.list1Value}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label className="label-6">Sub Category</label>
                      <input
                        id="inputState"
                        className="form-control dropdown-label"
                        value={this.state.ListOfSubCate}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label className="label-6">Claim Type</label>
                      <input
                        id="inputState"
                        className="form-control dropdown-label"
                        value={this.state.ListOfIssue}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label className="label-6"> Claim Asked for %</label>
                      <input
                        type="text"
                        className="form-control textBox"
                        placeholder="Claim Percentage"
                        name="claimPercentage"
                        value={this.state.claimPercentage}
                      />
                    </div>
                    <div className="col-md-4" style={{ marginTop: "44px" }}>
                      <button
                        type="button"
                        className=" form-control btn-btn-claim"
                      >
                        Attach Product Image
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label className="label-6">Attached Image</label>
                    </div>
                  </div>
                  <img src={BataShoes} alt="Bata" className="claim-bataShoes" />

                </div>
              </div>

              <div className="card card-radius" style={{ padding: "30px 45px 30px" }}>
                <div className="search-customer-padding">
                  <div className="row" style={{ margin: "0" }}>
                    <div className="form-group col-md-4" style={{ padding: "0" }}>
                      <label className="label-6">Final Claim Asked for %</label>
                      <input
                        type="text"
                        className="form-control textBox"
                        placeholder="Claim Percentage"
                        name="finalClaimPercentage"
                        value={this.state.finalClaimPercentage}
                        onChange={this.handleOnChange}
                      />
                      {this.state.finalClaimPercentage === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.errFinalClaimPercent}
                          </p>
                      )}
                    </div>
                  </div>

                  <div className="row" style={{ margin: "0" }}>
                    <div className="">
                      <label className="label-6">Comments By Approval</label>
                      <hr></hr>
                    </div>
                    <div className="" style={{ display: "contents" }}>
                      <textarea
                        className="ticket-comments-textarea"
                        placeholder="Add your Comment here"
                        name="claimComments"
                        value={this.state.claimComments}
                        onChange={this.handleOnChange}
                      ></textarea>
                      <div className="commentbt">
                        <button type="button" className="commentbtn"
                        onClick={this.handleAddStoreClaimComments.bind(this)}
                        >
                          <label className="txt">ADD COMMENT</label>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ margin: "0" }}>
                    <div className="">
                      <label className="label-6">
                        Comments By Approval: 0{this.state.commentData.length}
                      </label>
                    </div>
                  </div>
                  {this.state.commentData.map((value) => (
                  <div>
                  <div className="row" style={{ margin: "0" }}>
                    <div className="col-xs-3">
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55 naman"
                      />
                    </div>
                    <div className="col-md-9">
                      <label className="naman-R">{value.name}</label>
                    </div>
                    <div className="col-md-2">
                      <label className="hr-ago">{value.datetime}</label>
                    </div>
                  </div>
                  <div className="row" style={{ margin: "0" }}>
                    <label className="label-6">Comments:</label>
                  </div>
                  <div className="row" style={{ margin: "0" }}>
                    <div className="">
                      <label className="claim-comment">
                       {value.comment}
                      </label>
                      <hr />
                    </div>
                  </div>
                  </div>
                  ))}

                  {/* <div className="row" style={{ margin: "0" }}>
                    <div className="col-xs-3">
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55 naman"
                      />
                    </div>
                    <div className="col-md-9">
                      <label className="naman-R">Naman.R</label>
                    </div>
                    <div className="col-md-2">
                      <label className="hr-ago">5 hr ago</label>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card card-radius2 cardbor">
                <div className="alankrit">
                  <label>
                    <b>CUSTOMER NAME</b>
                  </label>
                  <label>
                    <span className="a">A</span>
                    {this.state.customerName}
                  </label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>PHONE NUMBER</b>
                  </label>
                  <label>{this.state.customerPhoneNumber}</label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>ALTERNATE NUMBER</b>
                  </label>
                  <label>{this.state.customerAlternateNumber}</label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>EMAIL</b>
                  </label>
                  <label>{this.state.emailID}</label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>ALTERNATE EMAIL</b>
                  </label>
                  <label>{this.state.alternateEmailID}</label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>GENDER</b>
                  </label>
                  <label>{this.state.gender}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ClaimApproveReject;

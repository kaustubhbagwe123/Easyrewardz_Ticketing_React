import React, { Component } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import { Popover } from "antd";
import axios from "axios";
import config from "../../helpers/config";
import CancalImg from "./../../assets/Images/cancal blue.png";
import Filter from "./../../assets/Images/icons8-filter.svg";
import InfoIcon from "./../../assets/Images/info-icon.png";
import WhiteRightArrow from "./../../assets/Images/down-white.png";
import SearchIcon from "./../../assets/Images/search-icon.png";
import { authHeader } from "../../helpers/authHeader";
import StoreMyTicketStatus from "./StoreMyTicketStatus";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
import DatePicker from "react-datepicker";
import moment from "moment";
import WhatsappActive from "./../../assets/Images/whatsapp-active.png";

class storeMyTicketList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapseSearch: false,
      SearchTicketData: [],
      ActiveTabId: 101,
      loading: false,
      byNewCount: 0,
      byOpenCount: 0,
      byResolvedCount: 0,
      selectedCategory: 0,
      selectedSubCategory: 0,
      selectedIssueType: 0,
      selectedTicketStatus: 0,
      CategoryData: [],
      SubCategoryData: [],
      IssueTypeData: [],
      TicketStatusData: StoreMyTicketStatus(),
      ticketIds: "",
      cSelectedRow: {},
      ticketDetailID: 0,
      TicketSearchCount: 0,
      translateLanguage: {},
      searchTicketParam: "ByCategory",
      ByDateCreatDate: "",
      mobileNumber: "",
      isMobileView: false,
      collapseMobileSearch: false,
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 10,
    };
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    this.handleGetStoreTicketGridData();
    this.handleGetStoreTicketTabCount();
    this.handleGetCategoryList();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  resize() {
    if (window.innerWidth <= 760) {
      this.setState({ isMobileView: window.innerWidth <= 760 });
    } else {
      this.setState({ isMobileView: false });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  //// --------------------------------API Call Start ----------------------------------
  /// handle Get Ticket Drid Data
  handleGetStoreTicketGridData() {
    let self = this;
    if (!this.state.collapseMobileSearch) {
      this.setState({
        loading: true,
      });
    }
    this.setState({ SearchTicketData: [] });
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/GetChatTickets",
      headers: authHeader(),
      data: {
        statusID: this.state.ActiveTabId,
        PageNo: this.state.currentPage,
        PageSize: this.state.postsPerPage,
      },
    })
      .then(function(res) {
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          self.setState({
            SearchTicketData: data.lstGetChatTickets,
            totalCount: data.totalCount,
            loading: false,
          });
        } else {
          self.setState({
            SearchTicketData: [],
            loading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get header tab count
  handleGetStoreTicketTabCount() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/ChatTicketStatusCount",
      headers: authHeader(),
    })
      .then(function(res) {
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          self.setState({
            byNewCount: data[0].ticketCount,
            byOpenCount: data[1].ticketCount,
            byResolvedCount: data[2].ticketCount,
          });
        } else {
          self.setState({
            SearchTicketData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Category Data for drop-down
  handleGetCategoryList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/GetChatCategory",
      headers: authHeader(),
    })
      .then(function(res) {
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          self.setState({
            CategoryData: data,
          });
        } else {
          self.setState({
            CategoryData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Sub Category Data for drop-down
  handleGetSubCategoryList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/GetChatSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        categoryID: this.state.selectedCategory,
      },
    })
      .then(function(res) {
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          self.setState({
            SubCategoryData: data,
          });
        } else {
          self.setState({
            SubCategoryData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Issue Type list for drop-down
  handleGetIssueTypeList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/GetChatIssueTypeBySubcategory",
      headers: authHeader(),
      params: {
        subCategoryID: this.state.selectedSubCategory,
      },
    })
      .then(function(res) {
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          self.setState({
            IssueTypeData: data,
          });
        } else {
          self.setState({
            IssueTypeData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  /// Handle Ticket Search Function
  handleTicketSearch() {
    this.setState({
      currentPage: 1,
      postsPerPage: 10,
    });
    var self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/GetChatTicketsOnSearch",
      headers: authHeader(),
      data: {
        CategoryId: parseInt(this.state.selectedCategory),
        SubCategoryId: parseInt(this.state.selectedSubCategory),
        IssueTypeId: parseInt(this.state.selectedIssueType),
        TicketStatusID: parseInt(this.state.selectedTicketStatus),
        PageNo: this.state.currentPage,
        PageSize: this.state.postsPerPage,
      },
    })
      .then(function(res) {
        debugger;
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (self.state.isMobileView) {
          self.setState({ collapseSearch: false });
        }
        if (Msg === "Success") {
          self.setState({
            collapseMobileSearch: false,
            SearchTicketData: data.lstGetChatTickets,
            totalCount: data.totalCount,
            TicketSearchCount: data.totalCount,
          });
        } else {
          self.setState({
            collapseMobileSearch: false,
            SearchTicketData: [],
            TicketSearchCount: 0,
          });
        }
      })
      .catch((data) => {
        if (self.state.isMobileView) {
          self.setState({ collapseSearch: false });
        }
        console.log(data);
      });
  }
  //// --------------------------------API Call End ----------------------------------
  /// Handle Toggle Search
  HandleToggleSearch() {
    if (this.state.isMobileView) {
      this.setState({
        collapseSearch: !this.state.collapseSearch,
        collapseMobileSearch: !this.state.collapseSearch,
      });
    } else {
      this.setState({
        collapseSearch: !this.state.collapseSearch,
        collapseMobileSearch: false,
      });
    }
  }
  HandleRowClickPage = (rowInfo, column) => {
    if ((rowInfo, column)) {
      return {
        onClick: (e) => {
          let Id = column.original["ticketID"];
          localStorage.setItem("ticketNo", Id);
          let self = this;
          self.setState({
            ticketDetailID: Id,
          });
          setTimeout(function() {
            self.props.history.push({
              pathname: "myTicket",
              ticketDetailID: Id,
            });
          }, 1000);
        },
      };
    }
    return {};
  };
  ////handle drop-down value change
  handleDropdownValueChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    if (name === "selectedCategory") {
      this.setState({
        selectedCategory: value,
        SubCategoryData: [],
        IssueTypeData: [],
      });
      setTimeout(() => {
        if (this.state.selectedCategory) {
          this.handleGetSubCategoryList();
        }
      }, 500);
    } else if (name === "selectedSubCategory") {
      this.setState({
        selectedSubCategory: value,
        IssueTypeData: [],
      });
      setTimeout(() => {
        if (this.state.selectedSubCategory) {
          this.handleGetIssueTypeList();
        }
      }, 500);
    } else if (name === "selectedIssueType") {
      this.setState({
        selectedIssueType: value,
      });
    } else if (name === "selectedTicketStatus") {
      this.setState({
        selectedTicketStatus: value,
      });
    }
  }
  /// handle Tab change
  handleTabChange(TabId) {
    if (TabId === "New") {
      this.setState({
        ActiveTabId: 101,
      });
    } else if (TabId === "Open") {
      this.setState({
        ActiveTabId: 102,
      });
    } else if (TabId === "Resolved") {
      this.setState({
        ActiveTabId: 103,
      });
    }
    if (this.state.isMobileView && this.state.collapseSearch) {
      this.setState({ collapseSearch: false, searchTicketParam: "ByCategory" });
    }
    this.setState({
      currentPage: 1,
      postsPerPage: 10,
    });
    setTimeout(() => {
      this.handleGetStoreTicketGridData();
    }, 300);

    // if (this.state.searchTicketParam === "ByCategory") {
    //   setTimeout(() => {
    //   }, 100);
    // } else if (this.state.searchTicketParam === "ByCustomer") {
    //   setTimeout(() => {
    //     this.handleGetStoreTicketByCustomerGridData();
    //   }, 100);
    // }
  }
  /// --------------Don't remove Commented code----------------------
  /// Check all checkbox
  // checkAllCheckbox = async (event) => {
  //   var obj = this.state.cSelectedRow;
  //   var strIds = "";
  //   const allCheckboxChecked = event.target.checked;
  //   var checkboxes = document.getElementsByName("ListCheckbox");
  //   if (allCheckboxChecked) {
  //     for (var i in checkboxes) {
  //       if (checkboxes[i].checked === false) {
  //         checkboxes[i].checked = true;
  //         if (checkboxes[i].getAttribute("attrIds") !== null)
  //           strIds += checkboxes[i].getAttribute("attrIds") + ",";
  //         for (let i = 0; i < this.state.SearchTicketData.length; i++) {
  //           obj[this.state.SearchTicketData[i].ticketID] = true;
  //         }
  //       }
  //     }
  //   } else {
  //     for (var J in checkboxes) {
  //       if (checkboxes[J].checked === true) {
  //         checkboxes[J].checked = false;
  //         for (let i = 0; i < this.state.SearchTicketData.length; i++) {
  //           obj[this.state.SearchTicketData[i].ticketID] = false;
  //         }
  //       }
  //     }
  //     strIds = "";
  //   }
  //   this.setState({
  //     cSelectedRow: obj,
  //   });
  //   await this.setState({
  //     ticketIds: strIds,
  //   });
  // };

  /// handle perticular select check box
  // handelCheckBoxCheckedChange = async (ticketID) => {
  //   var checkboxes = document.getElementsByName("ListCheckbox");
  //   var strIds = "";
  //   for (var i in checkboxes) {
  //     if (isNaN(i) === false) {
  //       if (checkboxes[i].checked === true) {
  //         if (checkboxes[i].getAttribute("attrIds") !== null)
  //           strIds += checkboxes[i].getAttribute("attrIds") + ",";
  //       }
  //     }
  //   }
  //   const newSelected = Object.assign({}, this.state.cSelectedRow);
  //   newSelected[ticketID] = !this.state.cSelectedRow[ticketID];

  //   await this.setState({
  //     cSelectedRow: ticketID ? newSelected : false,
  //     ticketIds: strIds,
  //   });
  // };

  /// --------------Don't remove Commented code----------------------
  /// handle Clear search function
  handleClearSearchData() {
    this.setState({
      selectedCategory: 0,
      selectedSubCategory: 0,
      selectedIssueType: 0,
      selectedTicketStatus: 0,
      SubCategoryData: [],
      IssueTypeData: [],
      TicketSearchCount: 0,
      ByDateCreatDate: "",
      mobileNumber: "",
    });
    this.handleGetStoreTicketGridData();
  }

  handleSubTabChange(tabname) {
    this.setState({
      searchTicketParam: tabname,
      selectedCategory: 0,
      selectedSubCategory: 0,
      selectedIssueType: 0,
      selectedTicketStatus: 0,
      SubCategoryData: [],
      IssueTypeData: [],
      TicketSearchCount: 0,
      ByDateCreatDate: "",
      mobileNumber: "",
      currentPage: 1,
      postsPerPage: 10,
    });

    if (tabname === "ByCategory") {
      setTimeout(() => {
        this.handleGetStoreTicketGridData();
      }, 500);
    } else if (tabname === "ByCustomer") {
      setTimeout(() => {
        this.handleGetStoreTicketByCustomerGridData(1);
      }, 500);
    }
  }

  handleGetStoreTicketByCustomerGridData(CurrentPage) {
    let self = this;
    if (!this.state.collapseMobileSearch) {
      this.setState({
        loading: true,
      });
    }

    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/GetChatTicketsByCustomer",
      headers: authHeader(),
      data: {
        statusID: this.state.ActiveTabId,
        PageNo: CurrentPage,
        PageSize: this.state.postsPerPage,
      },
    })
      .then(function(res) {
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          self.setState({
            SearchTicketData: data.lstGetChatTickets,
            totalCount: data.totalCount,
            loading: false,
          });
        } else {
          self.setState({
            SearchTicketData: [],
            loading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleByDateCreate(date) {
    this.setState({ ByDateCreatDate: date });
  }

  handleTicketByCustomerSearch() {
    var self = this;
    if (self.state.isMobileView && self.state.collapseSearch) {
      self.setState({
        collapseSearch: false,
      });
    }
    this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/GetChatTicketsByCustomerOnSearch",
      headers: authHeader(),
      data: {
        CategoryId: parseInt(this.state.selectedCategory),
        SubCategoryId: parseInt(this.state.selectedSubCategory),
        IssueTypeId: parseInt(this.state.selectedIssueType),
        TicketStatusID: parseInt(this.state.selectedTicketStatus),
        ChatLastDate:
          this.state.ByDateCreatDate !== ""
            ? moment(this.state.ByDateCreatDate).format("YYYY-MM-DD")
            : "",
        MobileNumber: this.state.mobileNumber,
      },
    })
      .then(function(res) {
        let Msg = res.data.message;
        let data = res.data.responseData;

        if (Msg === "Success") {
          self.setState({
            loading: false,
            SearchTicketData: data,
            TicketSearchCount: data.length,
            collapseMobileSearch: false,
          });
        } else {
          self.setState({
            loading: false,
            SearchTicketData: [],
            TicketSearchCount: 0,
            collapseMobileSearch: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  hanldeOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleBackSearchButton = () => {
    this.setState({
      collapseSearch: false,
      collapseMobileSearch: false,
    });
  };
  ///handle pagination onchage
  PaginationOnChange = async (numPage) => {
    await this.setState({
      currentPage: numPage,
    });

    if (this.state.searchTicketParam === "ByCustomer") {
      this.handleGetStoreTicketByCustomerGridData(numPage);
    } else {
      this.handleGetStoreTicketGridData();
    }
  };
  /// handle per page item change
  handlePageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
      currentPage: 1,
    });
    if (this.state.searchTicketParam === "ByCustomer") {
      setTimeout(() => {
        this.handleGetStoreTicketByCustomerGridData(1);
      }, 200);
    } else {
      this.handleGetStoreTicketGridData();
    }
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;

    return (
      <div>
        <div className="myticketlist-header mobticket dv-table-paging mobticketNew">
          <div className="setting-tabs esc esc1">
            <ul
              className="nav nav-tabs upper-tabs es"
              role="tablist"
              style={{ display: "inline" }}
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="New"
                  onClick={() => {
                    this.handleTabChange("New");
                  }}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.new
                    : "New"}
                  :
                  <span className="myTciket-tab-span">
                    {this.state.byNewCount < 9
                      ? "0" + this.state.byNewCount
                      : this.state.byNewCount}
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="Open"
                  onClick={() => {
                    this.handleTabChange("Open");
                  }}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.open
                    : "Open"}
                  :
                  <span className="myTciket-tab-span">
                    {this.state.byOpenCount < 9
                      ? "0" + this.state.byOpenCount
                      : this.state.byOpenCount}
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="Resolved"
                  onClick={() => {
                    this.handleTabChange("Resolved");
                  }}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.resolved
                    : "Resolved"}
                  :
                  <span className="myTciket-tab-span">
                    {this.state.byResolvedCount < 9
                      ? "0" + this.state.byResolvedCount
                      : this.state.byResolvedCount}
                  </span>
                </a>
              </li>
            </ul>
            {/* <div className="mobback">
              <div class="appcusto">
                <span class="apleft">
                  {this.state.isMobileView && this.state.collapseSearch
                    ? "Search Ticket"
                    : "Tickets"}
                </span>
                {!this.state.collapseSearch ? null : (
                  <a
                    className="aprightbck apright"
                    onClick={this.handleCampaignBackClick.bind(this)}
                    style={{ color: "#2561a8" }}
                  >
                    {this.state.isMobileView && this.state.collapseSearch
                      ? "Back"
                      : ""}
                  </a>
                )}
              </div>
            </div> */}
            <label className="labelticket">
              {this.state.isMobileView && this.state.collapseSearch
                ? "Search Ticket"
                : "Tickets"}
            </label>

            {this.state.isMobileView && this.state.collapseSearch ? (
              ""
            ) : (
              <div className="ticketResultClr">
                {this.state.TicketSearchCount > 0 ? (
                  <>
                    <label className="labelticket">
                      {this.state.isMobileView
                        ? `${this.state.TicketSearchCount} Result`
                        : null}
                    </label>
                    <label
                      className="labelticket blue-clr"
                      onClick={this.handleClearSearchData.bind(this)}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.label.clearsearch
                        : "CLEAR SEARCH"}
                    </label>
                  </>
                ) : null}
              </div>
            )}

            <label
              className="labelticket"
              onClick={this.handleBackSearchButton.bind(this)}
              style={{ padding: "2px 10px", float: "right" }}
            >
              {this.state.isMobileView && this.state.collapseSearch
                ? "Back"
                : ""}
            </label>
            {this.state.isMobileView && !this.state.collapseSearch ? (
              <div
                className="filter"
                onClick={this.HandleToggleSearch.bind(this)}
              >
                <img src={Filter} className="fil" alt="Filter" width="15px" />
              </div>
            ) : null}
            {!this.state.isMobileView ? (
              <div
                className="filter"
                onClick={this.HandleToggleSearch.bind(this)}
              >
                <img src={Filter} className="fil" alt="Filter" width="10px" />
              </div>
            ) : null}
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="Escalation-tab"
                role="tabpanel"
                aria-labelledby="Escalation-tab"
              >
                <div className="container-fluid">
                  <div
                    className="table-cntr mt-3 mtictab table-responsive"
                    style={{ overflow: "initial" }}
                  >
                    <div
                      className="float-search"
                      onClick={this.HandleToggleSearch.bind(this)}
                    >
                      <small>
                        {this.state.collapseSearch
                          ? TranslationContext !== undefined
                            ? TranslationContext.small.closesearch
                            : "Close Search"
                          : TranslationContext !== undefined
                          ? TranslationContext.small.searchtickets
                          : "Search Tickets"}
                      </small>
                      {this.state.collapseSearch ? (
                        <img
                          className="search-icon"
                          src={CancalImg}
                          alt="search-icon"
                        />
                      ) : (
                        <img
                          className="search-icon"
                          src={SearchIcon}
                          alt="search-icon"
                        />
                      )}
                    </div>
                    <div>
                      <Collapse isOpen={this.state.collapseSearch}>
                        <Card>
                          <CardBody>
                            <div className="myticlist-expand-sect">
                              <div className="position-relative">
                                <ul
                                  className="nav nav-tabs lower-tabs"
                                  role="tablist"
                                >
                                  <li className="nav-item">
                                    <a
                                      className={
                                        this.state.searchTicketParam ===
                                        "ByCategory"
                                          ? "nav-link active"
                                          : "nav-link"
                                      }
                                      data-toggle="tab"
                                      href="#category-tab"
                                      role="tab"
                                      aria-controls="category-tab"
                                      aria-selected="false"
                                      onClick={this.handleSubTabChange.bind(
                                        this,
                                        "ByCategory"
                                      )}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.bycategory
                                        : "By Category"}
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className={
                                        this.state.searchTicketParam ===
                                        "ByCustomer"
                                          ? "nav-link active"
                                          : "nav-link"
                                      }
                                      data-toggle="tab"
                                      href="#category-tab"
                                      role="tab"
                                      aria-controls="category-tab"
                                      aria-selected="false"
                                      onClick={this.handleSubTabChange.bind(
                                        this,
                                        "ByCustomer"
                                      )}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.bycustomer
                                        : "By Customer"}
                                    </a>
                                  </li>
                                </ul>
                                <div className="save-view-search mobileticket1">
                                  {(() => {
                                    if (
                                      this.state.searchTicketParam ===
                                      "ByCategory"
                                    ) {
                                      return (
                                        <button
                                          type="button"
                                          className="btn-inv"
                                          onClick={this.handleTicketSearch.bind(
                                            this
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button
                                                .viewsearch
                                            : "View Search"}
                                        </button>
                                      );
                                    } else if (
                                      this.state.searchTicketParam ===
                                      "ByCustomer"
                                    ) {
                                      return (
                                        <button
                                          type="button"
                                          className="btn-inv"
                                          onClick={this.handleTicketByCustomerSearch.bind(
                                            this
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button
                                                .viewsearch
                                            : "View Search"}
                                        </button>
                                      );
                                    }
                                  })()}
                                </div>
                              </div>

                              <div
                                className="tab-content lower-tabs-pane p-0"
                                style={{
                                  marginBottom: this.state.isMobileView
                                    ? "0"
                                    : "",
                                }}
                              >
                                <div
                                  className="tab-pane fade show active"
                                  id="category-tab"
                                  role="tabpanel"
                                  aria-labelledby="category-tab"
                                >
                                  <div className="container-fluid">
                                    <div className="row all-row">
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          name="selectedCategory"
                                          value={this.state.selectedCategory}
                                          onChange={this.handleDropdownValueChange.bind(
                                            this
                                          )}
                                        >
                                          <option value={0}>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.option
                                                  .category
                                              : "Category"}
                                          </option>
                                          {this.state.CategoryData !== null &&
                                            this.state.CategoryData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.categoryID}
                                                >
                                                  {item.categoryName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          name="selectedSubCategory"
                                          value={this.state.selectedSubCategory}
                                          onChange={this.handleDropdownValueChange.bind(
                                            this
                                          )}
                                        >
                                          <option value={0}>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.option
                                                  .subcategory
                                              : "Sub Category"}
                                          </option>
                                          {this.state.SubCategoryData !==
                                            null &&
                                            this.state.SubCategoryData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.subCategoryID}
                                                >
                                                  {item.subCategoryName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          name="selectedIssueType"
                                          value={this.state.selectedIssueType}
                                          onChange={this.handleDropdownValueChange.bind(
                                            this
                                          )}
                                        >
                                          <option value="0">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.option
                                                  .issuetype
                                              : "Issue Type"}
                                          </option>
                                          {this.state.IssueTypeData !== null &&
                                            this.state.IssueTypeData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.issueTypeID}
                                                >
                                                  {item.issueTypeName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          name="selectedTicketStatus"
                                          value={
                                            this.state.selectedTicketStatus
                                          }
                                          onChange={this.handleDropdownValueChange.bind(
                                            this
                                          )}
                                        >
                                          <option value="0">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.option
                                                  .ticketstatus
                                              : "Ticket Status"}
                                          </option>
                                          {this.state.TicketStatusData !==
                                            null &&
                                            this.state.TicketStatusData.map(
                                              (item, s) => (
                                                <option
                                                  key={s}
                                                  value={item.statusID}
                                                >
                                                  {item.statusName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>

                                      {(() => {
                                        if (
                                          this.state.searchTicketParam ===
                                          "ByCustomer"
                                        ) {
                                          return (
                                            <>
                                              <div className="col-md-3 col-sm-6 myticket-text">
                                                <input
                                                  type="text"
                                                  placeholder="Customer Mobile No"
                                                  name="mobileNumber"
                                                  value={
                                                    this.state.mobileNumber
                                                  }
                                                  onChange={this.hanldeOnChange}
                                                  autoComplete="off"
                                                />
                                              </div>
                                              <div className="col-md-3 col-sm-6">
                                                <DatePicker
                                                  selected={
                                                    this.state.ByDateCreatDate
                                                  }
                                                  onChange={this.handleByDateCreate.bind(
                                                    this
                                                  )}
                                                  placeholderText={
                                                    "Customer Last Message"
                                                  }
                                                  showMonthDropdown
                                                  showYearDropdown
                                                  dateFormat="dd/MM/yyyy"
                                                  autoComplete="off"
                                                  className="ant-calendar-date-picker-input"
                                                />
                                              </div>
                                            </>
                                          );
                                        }
                                      })()}
                                    </div>
                                  </div>
                                </div>
                                <div className="save-view-search mobileticket">
                                  {(() => {
                                    if (
                                      this.state.searchTicketParam ===
                                      "ByCategory"
                                    ) {
                                      return (
                                        <button
                                          type="button"
                                          className="btn-inv"
                                          onClick={this.handleTicketSearch.bind(
                                            this
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button
                                                .viewsearch
                                            : "View Search"}
                                        </button>
                                      );
                                    } else if (
                                      this.state.searchTicketParam ===
                                      "ByCustomer"
                                    ) {
                                      return (
                                        <button
                                          type="button"
                                          className="btn-inv"
                                          onClick={this.handleTicketByCustomerSearch.bind(
                                            this
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button
                                                .viewsearch
                                            : "View Search"}
                                        </button>
                                      );
                                    }
                                  })()}
                                </div>
                              </div>
                              {!this.state.isMobileView ? (
                                <div className="container-fluid myticlist-expand-sect">
                                  <div className="row common-adv-padd justify-content-between">
                                    <div className="col-auto d-flex align-items-center">
                                      <p className="font-weight-bold mr-3">
                                        <span
                                          className="blue-clr"
                                          style={{ cursor: "default" }}
                                        >
                                          {this.state.TicketSearchCount < 10
                                            ? "0" + this.state.TicketSearchCount
                                            : this.state.TicketSearchCount}
                                          &nbsp;
                                        </span>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.p.results
                                          : "Results"}
                                      </p>
                                      <label
                                        className="blue-clr fs-14"
                                        onClick={this.handleClearSearchData.bind(
                                          this
                                        )}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.clearsearch
                                          : "CLEAR SEARCH"}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </CardBody>
                        </Card>
                      </Collapse>
                    </div>
                    {this.state.loading === true ? (
                      <div className="loader-icon-cntr">
                        <div className="loader-icon"></div>
                      </div>
                    ) : (
                      <div>
                        <div className="MyTicketListReact cus-head storemyticketpgn">
                          {(() => {
                            if (this.state.searchTicketParam === "ByCategory") {
                              return !this.state.collapseMobileSearch ? (
                                <>
                                  <ReactTable
                                    data={this.state.SearchTicketData}
                                    columns={[
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.id
                                              : "ID"}
                                          </span>
                                        ),
                                        accessor: "ticketID",
                                        Cell: (row) => {
                                          return (
                                            <div className="idtitlearrow">
                                              <div className="mainalign">
                                                <span className="tickidcolor">
                                                  <label className="tickid">
                                                    ID :
                                                  </label>
                                                  {row.original.ticketID}
                                                </span>
                                                <span className="subcat">
                                                  {row.original.subCategory}
                                                </span>
                                                {this.state.isMobileView &&
                                                row.original.isIconDisplay ? (
                                                  <span className="">
                                                    <img
                                                      src={WhatsappActive}
                                                      alt="Rightarrow"
                                                      width="20px"
                                                    />
                                                  </span>
                                                ) : null}
                                                <span className="tickid rightarrow">
                                                  <img
                                                    src={WhiteRightArrow}
                                                    alt="Rightarrow"
                                                    width="10px"
                                                  />
                                                </span>
                                              </div>
                                              <span
                                                className="tickid"
                                                style={{
                                                  color: "#333333",
                                                  padding: "10px 50px 0 0",
                                                  textAlign: "left",
                                                }}
                                              >
                                                {row.original.ticketTitle}
                                              </span>
                                              <label
                                                className="notif-time"
                                                style={{
                                                  float: "right",
                                                  display: this.state
                                                    .isMobileView
                                                    ? "block"
                                                    : "none",
                                                }}
                                              >
                                                {row.original.createdOn}
                                              </label>
                                            </div>
                                          );
                                        },
                                      },
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span.status
                                              : "Status"}

                                            <FontAwesomeIcon
                                              icon={faCaretDown}
                                            />
                                          </span>
                                        ),
                                        className: "ticketcol",
                                        accessor: "ticketStatus",
                                        Cell: (row) => {
                                          if (
                                            row.original.ticketStatus === "Open"
                                          ) {
                                            return (
                                              <span className="table-b table-blue-btn">
                                                <label>
                                                  {row.original.ticketStatus}
                                                </label>
                                              </span>
                                            );
                                          } else if (
                                            row.original.ticketStatus ===
                                            "Resolved"
                                          ) {
                                            return (
                                              <span className="table-b table-green-btn">
                                                <label>
                                                  {row.original.ticketStatus}
                                                </label>
                                              </span>
                                            );
                                          } else if (
                                            row.original.ticketStatus === "New"
                                          ) {
                                            return (
                                              <span className="table-b table-yellow-btn">
                                                <label>
                                                  {row.original.ticketStatus}
                                                </label>
                                              </span>
                                            );
                                          }
                                        },
                                      },
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span.subject
                                              : "Subject"}
                                          </span>
                                        ),
                                        className: "ticketcol",
                                        accessor: "ticketTitle",
                                      },
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span.category
                                              : "Category"}

                                            <FontAwesomeIcon
                                              icon={faCaretDown}
                                            />
                                          </span>
                                        ),
                                        className: "ticketcol",
                                        accessor: "category",
                                        sortable: false,
                                        Cell: (row) => (
                                          <span className="one-line-outer">
                                            <label className="one-line">
                                              {row.original.category}
                                            </label>
                                            <Popover
                                              content={
                                                <div className="dash-creation-popup-cntr">
                                                  <ul className="dash-category-popup dashnewpopup">
                                                    <li>
                                                      <p>
                                                        {TranslationContext !==
                                                        undefined
                                                          ? TranslationContext.p
                                                              .category
                                                          : "Category"}
                                                      </p>
                                                      <p>
                                                        {row.original.category}
                                                      </p>
                                                    </li>
                                                    <li>
                                                      <p>
                                                        {TranslationContext !==
                                                        undefined
                                                          ? TranslationContext.p
                                                              .subcategory
                                                          : "Sub Category"}
                                                      </p>
                                                      <p>
                                                        {
                                                          row.original
                                                            .subCategory
                                                        }
                                                      </p>
                                                    </li>
                                                    <li>
                                                      <p>
                                                        {TranslationContext !==
                                                        undefined
                                                          ? TranslationContext.p
                                                              .type
                                                          : "Type"}
                                                      </p>
                                                      <p>
                                                        {row.original.issueType}
                                                      </p>
                                                    </li>
                                                  </ul>
                                                </div>
                                              }
                                              placement="bottom"
                                            >
                                              <img
                                                className="info-icon"
                                                src={InfoIcon}
                                                alt="info-icon"
                                              />
                                            </Popover>
                                          </span>
                                        ),
                                      },
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span.priority
                                              : "Priority"}

                                            <FontAwesomeIcon
                                              icon={faCaretDown}
                                            />
                                          </span>
                                        ),
                                        className: "ticketcol",
                                        accessor: "priority",
                                        minWidth: 50,
                                      },
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span.assignee
                                              : "Assignee"}

                                            <FontAwesomeIcon
                                              icon={faCaretDown}
                                            />
                                          </span>
                                        ),
                                        className: "ticketcol",
                                        accessor: "assignTo",
                                      },
                                      {
                                        Header: (
                                          <span className="">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span
                                                  .creationon
                                              : "Creation On"}

                                            <FontAwesomeIcon
                                              icon={faCaretDown}
                                            />
                                          </span>
                                        ),
                                        className: "ticketcol",
                                        accessor: "createdOn",
                                        Cell: (row) => {
                                          return (
                                            <span className="one-line-outer">
                                              <label className="one-line">
                                                {row.original.createdOn}
                                              </label>
                                              <Popover
                                                content={
                                                  <div className="insertpop1">
                                                    <ul className="dash-creation-popup">
                                                      <li className="title">
                                                        {TranslationContext !==
                                                        undefined
                                                          ? TranslationContext
                                                              .li
                                                              .creationdetails
                                                          : "Creation details"}
                                                      </li>
                                                      <li>
                                                        <p
                                                          style={{
                                                            flex: "0 0 0",
                                                          }}
                                                        >
                                                          {TranslationContext !==
                                                          undefined
                                                            ? TranslationContext
                                                                .p.createdby
                                                            : "Created Date"}
                                                        </p>
                                                        <p
                                                          style={{
                                                            textAlign: "right",
                                                          }}
                                                        >
                                                          {
                                                            row.original
                                                              .createdBy
                                                          }
                                                          {row.original
                                                            .createdBy
                                                            ? row.original
                                                                .createdDate
                                                              ? " (" +
                                                                row.original
                                                                  .createdDate +
                                                                ")"
                                                              : null
                                                            : row.original
                                                                .createdDate}
                                                        </p>
                                                      </li>

                                                      <li>
                                                        <p
                                                          style={{ flex: "0" }}
                                                        >
                                                          {TranslationContext !==
                                                          undefined
                                                            ? TranslationContext
                                                                .p.updatedby
                                                            : "Updated Date"}
                                                        </p>
                                                        <p
                                                          style={{
                                                            textAlign: "right",
                                                          }}
                                                        >
                                                          {
                                                            row.original
                                                              .updatedBy
                                                          }
                                                          {row.original
                                                            .updatedDate
                                                            ? " (" +
                                                              row.original
                                                                .updatedDate +
                                                              ")"
                                                            : null}
                                                        </p>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                }
                                                placement="left"
                                              >
                                                <img
                                                  className="info-icon info-iconcus"
                                                  src={InfoIcon}
                                                  alt="info-icon"
                                                />
                                              </Popover>
                                            </span>
                                          );
                                        },
                                      },
                                    ]}
                                    resizable={false}
                                    // defaultPageSize={10}
                                    showPagination={false}
                                    getTrProps={this.HandleRowClickPage}
                                    minRows={this.state.isMobileView ? 1 : 2}
                                    noDataText={"No Data Found"}
                                  />
                                  <Pagination
                                    currentPage={this.state.currentPage}
                                    totalSize={this.state.totalCount}
                                    sizePerPage={this.state.postsPerPage}
                                    changeCurrentPage={this.PaginationOnChange}
                                    theme="bootstrap"
                                  />
                                  <div className="position-relative">
                                    <div className="item-selection Camp-pagination">
                                      <select
                                        value={this.state.postsPerPage}
                                        onChange={this.handlePageItemchange}
                                      >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                      </select>
                                      <p>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.p.itemsperpage
                                          : "Items per page"}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              ) : null;
                            } else if (
                              this.state.searchTicketParam === "ByCustomer"
                            ) {
                              return !this.state.collapseMobileSearch ? (
                                <>
                                  <ReactTable
                                    data={this.state.SearchTicketData}
                                    columns={[
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.id
                                              : "ID"}
                                          </span>
                                        ),
                                        accessor: "ticketID",
                                        Cell: (row) => {
                                          return (
                                            <div className="idtitlearrow">
                                              <div className="mainalign">
                                                <span className="tickidcolor">
                                                  <label className="tickid">
                                                    ID :
                                                  </label>
                                                  {row.original.ticketID}
                                                </span>
                                                <span className="subcat">
                                                  {row.original.subCategory}
                                                </span>
                                                <span className="tickid rightarrow">
                                                  <img
                                                    src={WhiteRightArrow}
                                                    alt="Rightarrow"
                                                    width="10px"
                                                  />
                                                </span>
                                              </div>
                                              <span
                                                className="tickid"
                                                style={{
                                                  color: "#333333",
                                                  padding: "10px 50px 0 0",
                                                  textAlign: "left",
                                                }}
                                              >
                                                {row.original.ticketTitle}
                                              </span>
                                              <label
                                                className="notif-time"
                                                style={{
                                                  float: "right",
                                                  display: this.state
                                                    .isMobileView
                                                    ? "block"
                                                    : "none",
                                                }}
                                              >
                                                {row.original.createdOn}
                                              </label>
                                            </div>
                                          );
                                        },
                                      },
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span.status
                                              : "Status"}

                                            <FontAwesomeIcon
                                              icon={faCaretDown}
                                            />
                                          </span>
                                        ),
                                        className: "ticketcol",
                                        accessor: "ticketStatus",
                                        Cell: (row) => {
                                          if (
                                            row.original.ticketStatus === "Open"
                                          ) {
                                            return (
                                              <span className="table-b table-blue-btn">
                                                <label>
                                                  {row.original.ticketStatus}
                                                </label>
                                              </span>
                                            );
                                          } else if (
                                            row.original.ticketStatus ===
                                            "Resolved"
                                          ) {
                                            return (
                                              <span className="table-b table-green-btn">
                                                <label>
                                                  {row.original.ticketStatus}
                                                </label>
                                              </span>
                                            );
                                          } else if (
                                            row.original.ticketStatus === "New"
                                          ) {
                                            return (
                                              <span className="table-b table-yellow-btn">
                                                <label>
                                                  {row.original.ticketStatus}
                                                </label>
                                              </span>
                                            );
                                          }
                                        },
                                      },
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span.subject
                                              : "Subject"}
                                          </span>
                                        ),
                                        className: "ticketcol",
                                        accessor: "ticketTitle",
                                      },
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span.category
                                              : "Category"}

                                            <FontAwesomeIcon
                                              icon={faCaretDown}
                                            />
                                          </span>
                                        ),
                                        className: "ticketcol",
                                        accessor: "category",
                                        sortable: false,
                                        Cell: (row) => (
                                          <span className="one-line-outer">
                                            <label className="one-line">
                                              {row.original.category}
                                            </label>
                                            <Popover
                                              content={
                                                <div className="dash-creation-popup-cntr">
                                                  <ul className="dash-category-popup dashnewpopup">
                                                    <li>
                                                      <p>
                                                        {TranslationContext !==
                                                        undefined
                                                          ? TranslationContext.p
                                                              .category
                                                          : "Category"}
                                                      </p>
                                                      <p>
                                                        {row.original.category}
                                                      </p>
                                                    </li>
                                                    <li>
                                                      <p>
                                                        {TranslationContext !==
                                                        undefined
                                                          ? TranslationContext.p
                                                              .subcategory
                                                          : "Sub Category"}
                                                      </p>
                                                      <p>
                                                        {
                                                          row.original
                                                            .subCategory
                                                        }
                                                      </p>
                                                    </li>
                                                    <li>
                                                      <p>
                                                        {TranslationContext !==
                                                        undefined
                                                          ? TranslationContext.p
                                                              .type
                                                          : "Type"}
                                                      </p>
                                                      <p>
                                                        {row.original.issueType}
                                                      </p>
                                                    </li>
                                                  </ul>
                                                </div>
                                              }
                                              placement="bottom"
                                            >
                                              <img
                                                className="info-icon"
                                                src={InfoIcon}
                                                alt="info-icon"
                                              />
                                            </Popover>
                                          </span>
                                        ),
                                      },
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span.priority
                                              : "Priority"}

                                            <FontAwesomeIcon
                                              icon={faCaretDown}
                                            />
                                          </span>
                                        ),
                                        className: "ticketcol",
                                        accessor: "priority",
                                        minWidth: 50,
                                      },
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span.assignee
                                              : "Assignee"}

                                            <FontAwesomeIcon
                                              icon={faCaretDown}
                                            />
                                          </span>
                                        ),
                                        className: "ticketcol",
                                        accessor: "assignTo",
                                      },
                                      {
                                        Header: (
                                          <span className="">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span
                                                  .creationon
                                              : "Creation On"}

                                            <FontAwesomeIcon
                                              icon={faCaretDown}
                                            />
                                          </span>
                                        ),
                                        className: "ticketcol",
                                        accessor: "createdOn",
                                        Cell: (row) => {
                                          return (
                                            <span className="one-line-outer">
                                              <label className="one-line">
                                                {row.original.createdOn}
                                              </label>
                                              <Popover
                                                content={
                                                  <div className="insertpop1">
                                                    <ul className="dash-creation-popup">
                                                      <li className="title">
                                                        {TranslationContext !==
                                                        undefined
                                                          ? TranslationContext
                                                              .li
                                                              .creationdetails
                                                          : "Creation details"}
                                                      </li>
                                                      <li>
                                                        <p
                                                          style={{
                                                            flex: "0 0 0",
                                                          }}
                                                        >
                                                          {TranslationContext !==
                                                          undefined
                                                            ? TranslationContext
                                                                .p.createdby
                                                            : "Created Date"}
                                                        </p>
                                                        <p
                                                          style={{
                                                            textAlign: "right",
                                                          }}
                                                        >
                                                          {
                                                            row.original
                                                              .createdBy
                                                          }
                                                          {row.original
                                                            .createdBy
                                                            ? row.original
                                                                .createdDate
                                                              ? " (" +
                                                                row.original
                                                                  .createdDate +
                                                                ")"
                                                              : null
                                                            : row.original
                                                                .createdDate}
                                                        </p>
                                                      </li>

                                                      <li>
                                                        <p
                                                          style={{ flex: "0" }}
                                                        >
                                                          {TranslationContext !==
                                                          undefined
                                                            ? TranslationContext
                                                                .p.updatedby
                                                            : "Updated Date"}
                                                        </p>
                                                        <p
                                                          style={{
                                                            textAlign: "right",
                                                          }}
                                                        >
                                                          {
                                                            row.original
                                                              .updatedBy
                                                          }
                                                          {row.original
                                                            .updatedDate
                                                            ? " (" +
                                                              row.original
                                                                .updatedDate +
                                                              ")"
                                                            : null}
                                                        </p>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                }
                                                placement="left"
                                              >
                                                <img
                                                  className="info-icon info-iconcus"
                                                  src={InfoIcon}
                                                  alt="info-icon"
                                                />
                                              </Popover>
                                            </span>
                                          );
                                        },
                                      },
                                    ]}
                                    resizable={false}
                                    // defaultPageSize={10}
                                    showPagination={false}
                                    getTrProps={this.HandleRowClickPage}
                                    minRows={this.state.isMobileView ? 1 : 2}
                                    noDataText={"No Data Found"}
                                  />
                                  <Pagination
                                    currentPage={this.state.currentPage}
                                    totalSize={this.state.totalCount}
                                    sizePerPage={this.state.postsPerPage}
                                    changeCurrentPage={this.PaginationOnChange}
                                    theme="bootstrap"
                                  />
                                  <div className="position-relative">
                                    <div className="item-selection Camp-pagination">
                                      <select
                                        value={this.state.postsPerPage}
                                        onChange={this.handlePageItemchange}
                                      >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                      </select>
                                      <p>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.p.itemsperpage
                                          : "Items per page"}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              ) : null;
                            }
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default storeMyTicketList;

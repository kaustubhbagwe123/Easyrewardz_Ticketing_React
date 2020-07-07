import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import InfoIcon from "./../../assets/Images/info-icon.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import moment from "moment";
import axios from "axios";
import config from "./../../helpers/config";
import { authHeader } from "./../../helpers/authHeader";
import Modal from "react-responsive-modal";
import matchSorter from "match-sorter";
import Sorting from "./../../assets/Images/sorting.png";
import * as translationHI from "./../../translations/hindi";
import * as translationMA from "./../../translations/marathi";

class MyTicketDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketDetailID: 0,
      customerId: 0,
      DraftDetails: [],
      sortColumn: "",
      sortAllData: [],
      sortcategoryName: [],
      sortcreatedDate: [],
      sortHeader: "",
      filterTxtValue: "",
      sortFiltercategoryName: [],
      sortFiltercreatedDate: [],
      isortA: false,
      scategoryNameFilterCheckbox: "",
      screatedDateFilterCheckbox: "",
      tempDraftDetails: [],
      StatusModel: false,
      isloading: false,
      translateLanguage: {},
    };
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
  }

  componentDidMount() {
    this.handleGetDraftDetails();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.DraftDetails;

    if (this.state.sortColumn === "categoryName") {
      itemsArray.sort((a, b) => {
        if (a.categoryName < b.categoryName) return 1;
        if (a.categoryName > b.categoryName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdDate") {
      itemsArray.sort((a, b) => {
        if (a.createdDate < b.createdDate) return 1;
        if (a.createdDate > b.createdDate) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      DraftDetails: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.DraftDetails;

    if (this.state.sortColumn === "categoryName") {
      itemsArray.sort((a, b) => {
        if (a.categoryName < b.categoryName) return -1;
        if (a.categoryName > b.categoryName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdDate") {
      itemsArray.sort((a, b) => {
        if (a.createdDate < b.createdDate) return -1;
        if (a.createdDate > b.createdDate) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      DraftDetails: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  StatusOpenModel(data, header) {
    if (
      this.state.sortFiltercategoryName.length === 0 ||
      this.state.sortFiltercreatedDate.length === 0
    ) {
      return false;
    }
    if (data === "categoryName") {
      if (this.state.screatedDateFilterCheckbox !== "") {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          screatedDateFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdDate") {
      if (this.state.scategoryNameFilterCheckbox !== "") {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          scategoryNameFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    if (this.state.temoDraftDetails.length > 0) {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        DraftDetails: this.state.temoDraftDetails,
        sortFiltercategoryName: this.state.sortcategoryName,
        sortFiltercreatedDate: this.state.sortcreatedDate,
        sortFilterStatus: this.state.sortStatus,
      });
      if (this.state.sortColumn === "categoryName") {
        if (this.state.scategoryNameFilterCheckbox === "") {
        } else {
          this.setState({
            screatedDateFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdDate") {
        if (this.state.screatedDateFilterCheckbox === "") {
        } else {
          this.setState({
            scategoryNameFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        DraftDetails: this.state.isortA
          ? this.state.DraftDetails
          : this.state.sortAllData,

        sortFiltercategoryName: this.state.sortcategoryName,
        sortFiltercreatedDate: this.state.sortcreatedDate,
      });
    }
  }

  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var scategoryNameFilterCheckbox = this.state.scategoryNameFilterCheckbox;
    var screatedDateFilterCheckbox = this.state.screatedDateFilterCheckbox;

    var allData = this.state.sortAllData;

    if (column === "categoryName" || column === "all") {
      if (type === "value" && type !== "All") {
        scategoryNameFilterCheckbox = scategoryNameFilterCheckbox.replace(
          "all",
          ""
        );
        scategoryNameFilterCheckbox = scategoryNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (scategoryNameFilterCheckbox.includes(e.currentTarget.value)) {
          scategoryNameFilterCheckbox = scategoryNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          scategoryNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (scategoryNameFilterCheckbox.includes("all")) {
          scategoryNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "categoryName") {
            for (let i = 0; i < this.state.sortcategoryName.length; i++) {
              scategoryNameFilterCheckbox +=
                this.state.sortcategoryName[i].categoryName + ",";
            }
            scategoryNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdDate" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedDateFilterCheckbox = screatedDateFilterCheckbox.replace(
          "all",
          ""
        );
        screatedDateFilterCheckbox = screatedDateFilterCheckbox.replace(
          "all,",
          ""
        );
        if (screatedDateFilterCheckbox.includes(e.currentTarget.value)) {
          screatedDateFilterCheckbox = screatedDateFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          screatedDateFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screatedDateFilterCheckbox.includes("all")) {
          screatedDateFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "createdDate") {
            for (let i = 0; i < this.state.sortcreatedDate.length; i++) {
              screatedDateFilterCheckbox +=
                this.state.sortcreatedDate[i].createdDate + ",";
            }
            screatedDateFilterCheckbox += "all";
          }
        }
      }
    }

    this.setState({
      scategoryNameFilterCheckbox,
      screatedDateFilterCheckbox,
      issueColor: "",
      createdColor: "",
      stattusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "categoryName") {
      var sItems = scategoryNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.categoryName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        issueColor: "sort-column",
      });
    } else if (column === "createdDate") {
      var sItems1 = screatedDateFilterCheckbox.split(",");
      if (sItems1.length > 0) {
        for (let i = 0; i < sItems1.length; i++) {
          if (sItems1[i] !== "") {
            var tempFilterData1 = allData.filter(
              (a) => a.createdDate === sItems1[i]
            );
            if (tempFilterData1.length > 0) {
              for (let j = 0; j < tempFilterData1.length; j++) {
                itemsArray.push(tempFilterData1[j]);
              }
            }
          }
        }
      }
      this.setState({
        createdColor: "sort-column",
      });
    }

    this.setState({
      temoDraftDetails: itemsArray,
    });
    // this.StatusCloseModel();
  };
  ////handle get draft data
  handleGetDraftDetails() {
    let self = this;
    this.setState({ isloading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/GetDraftDetails",
      headers: authHeader(),
    })
      .then(function(res) {
        let data = res.data.responseData;
        let status = res.data.message;
        debugger;
        if (status === "Success") {
          self.setState({ DraftDetails: data, isloading: false });
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].categoryName]) {
              distinct.push(data[i].categoryName);
              unique[data[i].categoryName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortcategoryName.push({ categoryName: distinct[i] });
            self.state.sortFiltercategoryName.push({
              categoryName: distinct[i],
            });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdDate]) {
              distinct.push(data[i].createdDate);
              unique[data[i].createdDate] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortcreatedDate.push({ createdDate: distinct[i] });
            self.state.sortFiltercreatedDate.push({ createdDate: distinct[i] });
          }
        } else {
          self.setState({ DraftDetails: [], isloading: false });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  ////handle Row click
  hanldeRowClick = (rowInfo, column) => {
    // debugger;
    if ((rowInfo, column)) {
      return {
        onClick: (e) => {
          var Id = column.original["ticketId"];
          var CustId = column.original["customerID"];
          var self = this;
          self.setState({
            ticketDetailID: Id,
            customerId: CustId,
          });
          setTimeout(function() {
            self.props.history.push({
              pathname: "ticketsystem",
              state: self.state,
            });
          }, 1000);
        },
      };
    }
    return {};
  };

  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "categoryName") {
      var sortFiltercategoryName = matchSorter(
        this.state.sortcategoryName,
        e.target.value,
        { keys: ["categoryName"] }
      );
      if (sortFiltercategoryName.length > 0) {
        this.setState({ sortFiltercategoryName });
      } else {
        this.setState({
          sortFiltercategoryName: this.state.sortcategoryName,
        });
      }
    }
    if (this.state.sortColumn === "createdDate") {
      var sortFiltercreatedDate = matchSorter(
        this.state.sortcreatedDate,
        e.target.value,
        { keys: ["createdDate"] }
      );
      if (sortFiltercreatedDate.length > 0) {
        this.setState({ sortFiltercreatedDate });
      } else {
        this.setState({
          sortFiltercreatedDate: this.state.sortcreatedDate,
        });
      }
    }
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    var dataDraft = this.props.draftData;
    return (
      <Fragment>
        <div className="position-relative d-inline-block">
          <Modal
            onClose={this.StatusCloseModel}
            open={this.state.StatusModel}
            modalId="Status-popup"
            overlayId="logout-ovrly"
          >
            <div className="status-drop-down">
              <div className="sort-sctn">
                <label style={{ color: "#0066cc", fontWeight: "bold" }}>
                  {this.state.sortHeader}
                </label>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusAtoZ.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.sortatoz
                      : "SORT BY A TO Z"}
                  </p>
                </div>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusZtoA.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.sortztoa
                      : "SORT BY Z TO A"}
                  </p>
                </div>
              </div>
              <a
                href=""
                style={{ margin: "0 25px", textDecoration: "underline" }}
                onClick={this.setSortCheckStatus.bind(this, "all")}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.label.clearsearch
                  : "clear search"}
              </a>
              <div className="filter-type">
                <p>
                  {TranslationContext !== undefined
                    ? TranslationContext.p.filterbytype
                    : "FILTER BY TYPE"}
                </p>
                <input
                  type="text"
                  style={{ display: "block" }}
                  value={this.state.filterTxtValue}
                  onChange={this.filteTextChange.bind(this)}
                />
                <div className="FTypeScroll">
                  <div className="filter-checkbox">
                    <input
                      type="checkbox"
                      name="filter-type"
                      id={"fil-open"}
                      value="all"
                      checked={
                        this.state.scategoryNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.screatedDateFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "categoryName"
                    ? this.state.sortFiltercategoryName !== null &&
                      this.state.sortFiltercategoryName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.categoryName}
                            value={item.categoryName}
                            checked={this.state.scategoryNameFilterCheckbox.includes(
                              item.categoryName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "categoryName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.categoryName}>
                            <span className="table-btn table-blue-btn">
                              {item.categoryName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "createdDate"
                    ? this.state.sortFiltercreatedDate !== null &&
                      this.state.sortFiltercreatedDate.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.createdDate}
                            value={item.createdDate}
                            checked={this.state.screatedDateFilterCheckbox.includes(
                              item.createdDate
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "createdDate",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.createdDate}>
                            <span className="table-btn table-blue-btn">
                              {item.createdDate}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "isSLAActive"
                    ? this.state.sortFilterStatus !== null &&
                      this.state.sortFilterStatus.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.isSLAActive}
                            value={item.isSLAActive}
                            checked={this.state.sisSLAActiveFilterCheckbox.includes(
                              item.isSLAActive
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "isSLAActive",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.isSLAActive}>
                            <span className="table-btn table-blue-btn">
                              {item.isSLAActive}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div className="container-fluid mt-3">
          <div
            className="MyTicketListReact cus-head"
            style={{ backgroundColor: "#fff" }}
          >
            {this.state.isloading ? (
              <div className="loader-icon-cntr">
                <div className="loader-icon"></div>
              </div>
            ) : (
              <ReactTable
                data={this.state.DraftDetails}
                columns={[
                  {
                    Header: (
                      <span>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.tickettitle
                          : "Ticket Title"}
                      </span>
                    ),
                    accessor: "ticketTitle",
                  },
                  {
                    Header: (
                      <span>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.ticketdetails
                          : "Ticket Detail"}
                      </span>
                    ),
                    accessor: "ticketDescription",
                  },
                  {
                    Header: (
                      <span
                        onClick={this.StatusOpenModel.bind(
                          this,
                          "categoryName",
                          TranslationContext !== undefined
                            ? TranslationContext.label.category
                            : "Category"
                        )}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.label.category
                          : "Category"}{" "}
                        <FontAwesomeIcon icon={faCaretDown} />
                      </span>
                    ),
                    sortable: false,
                    accessor: "categoryName",
                    Cell: (row) => {
                      var ids = row.original["ticketId"];
                      return (
                        <span>
                          <label>{row.original.categoryName}</label>
                          <Popover
                            content={
                              <div className="dash-creation-popup-cntr">
                                <ul className="dash-category-popup dashnewpopup">
                                  <li>
                                    <p>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.category
                                        : "Category"}
                                    </p>
                                    <p>{row.original.categoryName}</p>
                                  </li>
                                  <li>
                                    <p>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.subcategory
                                        : "Sub Category"}
                                    </p>
                                    <p>{row.original.subCategoryName}</p>
                                  </li>
                                  <li>
                                    <p>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.span.type
                                        : "Type"}
                                    </p>
                                    <p>{row.original.issueTypeName}</p>
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
                              id={ids}
                            />
                          </Popover>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span
                        onClick={this.StatusOpenModel.bind(
                          this,
                          "createdDate",
                          TranslationContext !== undefined
                          ? TranslationContext.th
                              .createddate
                          : "Created Date"
                        )}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.ticketingDashboard
                              .draftcreationdate
                          : "Draft Creation Date"}
                        <FontAwesomeIcon icon={faCaretDown} />
                      </span>
                    ),
                    sortable: false,
                    accessor: "createdDate",
                    Cell: (props) => (
                      <span>
                        <label>
                          {moment(props.original.createdDate).format(
                            "DD MMM YYYY"
                          )}
                        </label>
                      </span>
                    ),
                  },
                ]}
                defaultPageSize={5}
                getTrProps={this.hanldeRowClick}
                showPagination={true}
                minRows={2}
              />
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MyTicketDraft;

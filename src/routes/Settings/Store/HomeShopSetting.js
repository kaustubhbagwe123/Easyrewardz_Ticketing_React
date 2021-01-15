import React, { Component } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag.js";
import { Collapse, CardBody, Card } from "reactstrap";
import SearchIcon from "./../../../assets/Images/search-icon.png";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import config from "./../../../helpers/config";
import { authHeader } from "../../../helpers/authHeader";
import { NotificationManager } from "react-notifications";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
import { Spin, Empty } from "antd";

class HomeShopSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      FilterCollapse: false,
      storeAgentData: [],
      brandID: "",
      brandData: [],
      storeCode: "",
      StoreCodeData: [],
      translateLanguage: {},
      isloading: false,
    };
  }

  componentDidMount() {
    if (window.localStorage.getItem("module")) {
      var moduleData = JSON.parse(window.localStorage.getItem("module"));
      if (moduleData) {
        var campModule = moduleData.filter(
          (x) => x.moduleName === "Settings" && x.modulestatus === true
        );
        if (campModule.length === 0) {
          this.props.history.push("/store/404notfound");
        }
      }
    }
    this.handleGetBrandData();
    this.handleGetStoreAgentListData();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  handleFilterCollapse() {
    this.setState((state) => ({ FilterCollapse: !this.state.FilterCollapse }));
  }

  handleGetBrandData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then((res) => {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ brandData: data });
        } else {
          self.setState({ brandData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  handleGetStoreCodeData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/GetStoreCodeByBrandID",
      headers: authHeader(),
      params: {
        BrandIDs: this.state.brandID,
      },
    })
      .then((res) => {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ StoreCodeData: data });
        } else {
          self.setState({ StoreCodeData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  handleOnBrandChangeData = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });
    this.handleGetStoreCodeData();
  };

  handleOnStoreCodeChangeData = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleGetStoreAgentListData() {
    let self = this;
    this.setState({ isloading: true });

    axios({
      method: "post",
      url: config.apiUrl + "/HSSetting/GetStoreAgentList",
      headers: authHeader(),
      params: {
        BrandID: this.state.brandID === "" ? 0 : parseInt(this.state.brandID),
        StoreID:
          this.state.storeCode === "" ? 0 : parseInt(this.state.storeCode),
      },
    })
      .then((res) => {
        let status = res.data.message;
        let data = res.data.responseData;
        self.setState({ isloading: false });
        if (status === "Success") {
          self.setState({ storeAgentData: data });
        } else {
          self.setState({ storeAgentData: [] });
        }
      })
      .catch((response) => {
        self.setState({ isloading: false });
        console.log(response);
      });
  }

  checkSuggestionFreeText = async (row, type) => {
    const TranslationContext = this.state.translateLanguage.default;
    let storeAgentData = [...this.state.storeAgentData],
      suggestion,
      freeText,
      attachment,
      grammarlyCheck;
    for (let i = 0; i < storeAgentData.length; i++) {
      if (type === "suggestion") {
        if (storeAgentData[i].agentID === row.agentID) {
          suggestion = storeAgentData[i].suggestion;
          storeAgentData[i].suggestion = suggestion === 0 ? 1 : 0;
        }
      }
      if (type === "freetext") {
        if (storeAgentData[i].agentID === row.agentID) {
          freeText = storeAgentData[i].freeText;
          storeAgentData[i].freeText = freeText === 0 ? 1 : 0;
        }
      }
      if (type === "attachment") {
        if (storeAgentData[i].agentID === row.agentID) {
          attachment = storeAgentData[i].attachment;
          storeAgentData[i].attachment = attachment === 0 ? 1 : 0;
        }
      }
      // if (type === "grammarlyCheck") {
      //   if (storeAgentData[i].agentID === row.agentID) {
      //     grammarlyCheck = storeAgentData[i].grammarlyCheck;
      //     storeAgentData[i].grammarlyCheck = grammarlyCheck === 0 ? 1 : 0;
      //   }
      // }
    }

    await this.setState({
      storeAgentData,
    });

    axios({
      method: "post",
      url: config.apiUrl + "/HSSetting/InsertUpdateAgentDetails",
      headers: authHeader(),
      data: {
        AgentID: row.agentID,
        BrandID: row.brandID,
        StoreCode: row.storeCode,
        Suggestion: row.suggestion,
        FreeText: row.freeText,
        Attachment: row.attachment,
        // GrammarlyCheck: row.grammarlyCheck,
      },
    })
      .then((res) => {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordupdatedsuccessfully
              : "Record updated Successfully."
          );
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/store/settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/store/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            {TranslationContext !== undefined
              ? TranslationContext.link.store
              : "Store"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.homeshopsetting
              : "Home Shop Setting"}
          </Link>
        </div>
        <div className="tab-content store-task-tab-cont">
          <div
            className="tab-pane fade show active"
            id="raised-by-me-tab"
            role="tabpanel"
            aria-labelledby="raised-by-me-tab"
          >
            <div className="main-Claimdiv">
              <div className="table-cntr StoreRaiseReact">
                <div>
                  <Collapse isOpen={this.state.FilterCollapse}>
                    <Card>
                      <CardBody>
                        <div className="table-expandable-sctn1">
                          <div className="tab-content p-0">
                            <div className="container-fluid">
                              <div className="row all-row">
                                <div className="col-md-4">
                                  <select
                                    name="brandID"
                                    value={this.state.brandID}
                                    onChange={this.handleOnBrandChangeData}
                                  >
                                    <option value="">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.brand
                                        : "Brand"}
                                    </option>
                                    {this.state.brandData !== null &&
                                      this.state.brandData.map((item, i) => (
                                        <option value={item.brandID}>
                                          {item.brandName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-md-4">
                                  <select
                                    name="storeCode"
                                    value={this.state.storeCode}
                                    onChange={this.handleOnStoreCodeChangeData}
                                  >
                                    <option value="">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.storecode
                                        : "Store Code"}
                                    </option>
                                    {this.state.StoreCodeData !== null &&
                                      this.state.StoreCodeData.map(
                                        (item, i) => (
                                          <option value={item.storeID}>
                                            {item.storeCode}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                                <div className="col-md-4">
                                  <ul role="tablist">
                                    <div className="tasksearchdiv">
                                      <button
                                        className="btn-inv"
                                        type="button"
                                        style={{
                                          margin: "10px",
                                          width: "180px",
                                        }}
                                        onClick={this.handleGetStoreAgentListData.bind(
                                          this
                                        )}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.button.viewsearch
                                          : "VIEW SEARCH"}
                                      </button>
                                    </div>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Collapse>
                  <div
                    className="float-search"
                    onClick={this.handleFilterCollapse.bind(this)}
                  >
                    <small>
                      {this.state.FilterCollapse
                        ? TranslationContext !== undefined
                          ? TranslationContext.small.closesearch
                          : "Close Search"
                        : TranslationContext !== undefined
                        ? TranslationContext.small.search
                        : "Search"}
                    </small>
                    <img
                      className="search-icon"
                      src={SearchIcon}
                      alt="search-icon"
                    />
                  </div>
                  <div className="table-cntr raisereactTable">
                    <ReactTable
                      data={this.state.storeAgentData}
                      columns={[
                        {
                          Header: (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.srno
                                : "Sr No."}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "agentID",
                          Cell: (row) => {
                            return row.index + 1;
                          },
                          sortable: false,
                        },
                        {
                          Header: (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.agentname
                                : "Agent Name"}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "agentName",
                          sortable: false,
                        },
                        {
                          Header: (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.emailid
                                : "Email ID"}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "emailID",
                          sortable: false,
                        },
                        {
                          Header: (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.suggestion
                                : "Suggestion"}
                            </span>
                          ),
                          accessor: "suggestion",
                          sortable: false,
                          Cell: (row) => {
                            return (
                              <div className="switch switch-primary d-inline m-r-10">
                                <input
                                  type="checkbox"
                                  id={"i" + row.index}
                                  name="allModules"
                                  checked={
                                    row.original.suggestion === 0 ? true : false
                                  }
                                  onChange={this.checkSuggestionFreeText.bind(
                                    this,
                                    row.original,
                                    "suggestion"
                                  )}
                                />
                                <label
                                  htmlFor={"i" + row.index}
                                  className="cr cr-float-auto"
                                  style={{ float: "inherit" }}
                                ></label>
                              </div>
                            );
                          },
                        },
                        {
                          Header: (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.freetext
                                : "Free Text"}
                            </span>
                          ),
                          accessor: "freeText",
                          sortable: false,
                          Cell: (row) => {
                            return (
                              <div className="switch switch-primary d-inline m-r-10">
                                <input
                                  type="checkbox"
                                  id={"j" + row.index}
                                  name="allModules"
                                  checked={
                                    row.original.freeText === 0 ? true : false
                                  }
                                  onChange={this.checkSuggestionFreeText.bind(
                                    this,
                                    row.original,
                                    "freetext"
                                  )}
                                />
                                <label
                                  htmlFor={"j" + row.index}
                                  className="cr cr-float-auto"
                                  style={{ float: "inherit" }}
                                ></label>
                              </div>
                            );
                          },
                        },
                        {
                          Header: <span>Attachment</span>,
                          accessor: "attachment",
                          sortable: false,
                          Cell: (row) => {
                            return (
                              <div className="switch switch-primary d-inline m-r-10">
                                <input
                                  type="checkbox"
                                  id={"a" + row.index}
                                  name="allModules"
                                  checked={
                                    row.original.attachment === 0 ? true : false
                                  }
                                  onChange={this.checkSuggestionFreeText.bind(
                                    this,
                                    row.original,
                                    "attachment"
                                  )}
                                />
                                <label
                                  htmlFor={"a" + row.index}
                                  className="cr cr-float-auto"
                                  style={{ float: "inherit" }}
                                ></label>
                              </div>
                            );
                          },
                        },
                        // {
                        //   Header: <span>Grammarly Check</span>,
                        //   accessor: "grammarlyCheck",
                        //   sortable: false,
                        //   Cell: (row) => {
                        //     return (
                        //       <div className="switch switch-primary d-inline m-r-10">
                        //         <input
                        //           type="checkbox"
                        //           id={"g" + row.index}
                        //           name="allModules"
                        //           checked={
                        //             row.original.grammarlyCheck === 0
                        //               ? true
                        //               : false
                        //           }
                        //           onChange={this.checkSuggestionFreeText.bind(
                        //             this,
                        //             row.original,
                        //             "grammarlyCheck"
                        //           )}
                        //         />
                        //         <label
                        //           htmlFor={"g" + row.index}
                        //           className="cr cr-float-auto"
                        //           style={{ float: "inherit" }}
                        //         ></label>
                        //       </div>
                        //     );
                        //   },
                        // },
                      ]}
                      defaultPageSize={10}
                      minRows={2}
                      showPagination={true}
                      noDataText={
                        this.state.isloading ? (
                          <Spin size="large" tip="Loading..." />
                        ) : this.state.storeAgentData.length === 0 ? (
                          <Empty
                            style={{ margin: "0" }}
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                          />
                        ) : null
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomeShopSetting;

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

class HomeShopSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            FilterCollapse: false,
            storeAgentData: [],
            brandID: "",
            brandData: [],
            storeCode: "",
            StoreCodeData: []
        }
    }

    componentDidMount() {
        this.handleGetBrandData();
        this.handleGetStoreAgentListData();
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
            debugger;
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
        debugger;
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
            debugger;
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
        debugger;
        await this.setState({
          [e.target.name]: e.target.value
        });
        this.handleGetStoreCodeData();
      }

      handleOnStoreCodeChangeData = async (e) => {
        debugger;
        await this.setState({
          [e.target.name]: e.target.value
        });
      }

      handleGetStoreAgentListData() {
        debugger;
        let self = this;
        axios({
          method: "post",
          url: config.apiUrl + "/HSSetting/GetStoreAgentList",
          headers: authHeader(),
          params: {
            BrandID: this.state.brandID===""?0:parseInt(this.state.brandID),
            StoreID: this.state.storeCode===""?0:parseInt(this.state.storeCode)
          },
        })
          .then((res) => {
            debugger;
            let status = res.data.message;
            let data = res.data.responseData;
            if (status === "Success") {
              self.setState({ storeAgentData: data });
            } else {
              self.setState({ storeAgentData: [] });
            }
          })
          .catch((response) => {
            console.log(response);
          });
      }

      checkSuggestionFreeText = async (row, type) => {
        debugger;
        let storeAgentData = [...this.state.storeAgentData],
        suggestion,
        freeText
        for (let i = 0; i < storeAgentData.length; i++) {
            if(type === "suggestion")
            {
                if (storeAgentData[i].agentID === row.agentID) {
                    suggestion = storeAgentData[i].suggestion;
                    storeAgentData[i].suggestion = suggestion===0?1:0;
                }
            }
            if(type === "freetext"){

                if (storeAgentData[i].agentID === row.agentID) {
                    freeText = storeAgentData[i].freeText;
                    storeAgentData[i].freeText = freeText===0?1:0;
                }
            }
            }

        await this.setState({
            storeAgentData
        });
        let self = this;
        axios({
            method: "post",
            url: config.apiUrl + "/HSSetting/InsertUpdateAgentDetails",
            headers: authHeader(),
            data: {
                AgentID: row.agentID,
                BrandID: row.brandID,
                StoreCode: row.storeCode,
                Suggestion: row.suggestion,
                FreeText: row.freeText
            },
          })
            .then((res) => {
              debugger;
              let status = res.data.message;
              let data = res.data.responseData;
              if (status === "Success") {
                NotificationManager.success("Record updated Successfully.");
              } else {
                NotificationManager.error(status);
              }
            })
            .catch((response) => {
              console.log(response);
            });
      };

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid setting-title setting-breadcrumb">
                    <Link to="/store/settings" className="header-path">
                        Settings
                </Link>
                    <span>&gt;</span>
                    <Link
                        to={{
                            pathname: "/store/settings",
                            tabName: "store-tab",
                        }}
                        className="header-path"
                    >
                        Store
                </Link>
                    <span>&gt;</span>
                    <Link to={Demo.BLANK_LINK} className="active header-path">
                        Home Shop Setting
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
                                                                {/* <select
                                                                        name="isTicketMapped"
                                                                    //value={this.state.isTicketMapped}
                                                                    //onChange={this.handleOnChangeData} 
                                                                    >
                                                                        <option value="">Brand</option>
                                                                        <option value="yes">bataclub</option>
                                                                        <option value="no">soch</option>
                                                                    </select> */}
                                                                    <select
                                                                    name="brandID"
                                                                    value={this.state.brandID}
                                                                    onChange={this.handleOnBrandChangeData}
                                                                    >
                                                                    <option value="">Brand</option>
                                                                    {this.state.brandData !== null &&
                                                                    this.state.brandData.map((item, i) => (
                                                                        <option value={item.brandID}>{item.brandName}</option>
                                                                    ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    {/* <select
                                                                        name="isTicketMapped"
                                                                    //value={this.state.isTicketMapped}
                                                                    //onChange={this.handleOnChangeData} 
                                                                    >
                                                                        <option value="">Store Code</option>
                                                                        <option value="yes">Store-1</option>
                                                                        <option value="no">Store-2</option>
                                                                    </select> */}
                                                                    <select
                                                                    name="storeCode"
                                                                    value={this.state.storeCode}
                                                                    onChange={this.handleOnStoreCodeChangeData}
                                                                    >
                                                                    <option value="">Store Code</option>
                                                                    {this.state.StoreCodeData !== null &&
                                                                    this.state.StoreCodeData.map((item, i) => (
                                                                        <option value={item.storeID}>{item.storeCode}</option>
                                                                    ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4">
                                                                <ul role="tablist">
                                                                    <div className="tasksearchdiv">
                                                                        <button
                                                                            className="btn-inv"
                                                                            type="button"
                                                                            style={{ margin: "10px", width: "180px" }}
                                                                            onClick={this. handleGetStoreAgentListData.bind(this)}
                                                                        >
                                                                            VIEW SEARCH
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
                                            {this.state.FilterCollapse ? "Close Search" : "Search"}
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
                                                            Sr No. <FontAwesomeIcon icon={faCaretDown} />
                                                        </span>
                                                    ),
                                                    accessor: "agentID",
                                                    Cell: (row) => {
                                                        return (row.index + 1)
                                                    }
                                                },
                                                {
                                                    Header: (
                                                        <span>
                                                            Agent Name <FontAwesomeIcon icon={faCaretDown} />
                                                        </span>
                                                    ),
                                                    accessor: "agentName",
                                                    
                                                },
                                                {
                                                    Header: (
                                                        <span>
                                                            Email ID <FontAwesomeIcon icon={faCaretDown} />
                                                        </span>
                                                    ),
                                                    accessor: "emailID",
                                                    
                                                },
                                                {
                                                    Header: (
                                                        <span>
                                                            Suggestion
                                                        </span>
                                                    ),
                                                    accessor: "suggestion",
                                                    sortable: false,
                                                    Cell: (row) => {
                                                       return (<div className="switch switch-primary d-inline m-r-10">
                                                            <input
                                                                type="checkbox"
                                                                id={"i"+row.index}
                                                                name="allModules"
                                                                //attrIds={item.moduleId}
                                                                checked={row.original.suggestion===0?true:false}
                                                                onChange={this.checkSuggestionFreeText.bind(
                                                                    this,
                                                                    row.original,
                                                                    "suggestion"
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor={"i"+row.index}
                                                                className="cr cr-float-auto"
                                                                style={{float: "inherit"}}
                                                            ></label>
                                                        </div>)
                                                    }
                                                },
                                                {
                                                    Header: (
                                                        <span>
                                                            Free Text
                                                        </span>
                                                    ),
                                                    accessor: "freeText",
                                                    sortable: false,
                                                    Cell: (row) => {
                                                        return (<div className="switch switch-primary d-inline m-r-10">
                                                            <input
                                                                type="checkbox"
                                                                id={"j"+row.index}
                                                                name="allModules"
                                                                //attrIds={item.moduleId}
                                                                checked={row.original.freeText===0?true:false}
                                                                onChange={this.checkSuggestionFreeText.bind(
                                                                    this,
                                                                    row.original,
                                                                    "freetext"
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor={"j"+row.index}
                                                                className="cr cr-float-auto"
                                                                style={{float: "inherit"}}
                                                            ></label>
                                                        </div>)
                                                    }
                                                }
                                            ]}
                                            // resizable={false}
                                            defaultPageSize={10}
                                            minRows={2}
                                            showPagination={true}
                                            // getTrProps={this.HandleRowClickPage}
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
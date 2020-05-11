import React, { Component } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag.js";
import { Collapse, CardBody, Card } from "reactstrap";
import SearchIcon from "./../../../assets/Images/search-icon.png";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

class HomeShopSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            FilterCollapse: false,
            storeAgentData: [{ Id: 1, AgentName: "abc" }]
        }
    }

    handleFilterCollapse() {
        this.setState((state) => ({ FilterCollapse: !this.state.FilterCollapse }));
    }

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
                                                        <ul className="nav nav-tabs" role="tablist">
                                                            <div className="tasksearchdiv">
                                                                <button
                                                                    className="btn-inv"
                                                                    type="button"
                                                                    style={{ margin: "10px", width: "180px" }}
                                                                //onClick={this.handleGetStoreFilterList.bind(this)}
                                                                >
                                                                    VIEW SEARCH
                                                                </button>
                                                            </div>
                                                        </ul>

                                                        <div className="container-fluid">
                                                            <div className="row all-row">
                                                                <div className="col-md-3">
                                                                <select
                                                                        name="isTicketMapped"
                                                                    //value={this.state.isTicketMapped}
                                                                    //onChange={this.handleOnChangeData} 
                                                                    >
                                                                        <option value="">Brand</option>
                                                                        <option value="yes">bataclub</option>
                                                                        <option value="no">soch</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <select
                                                                        name="isTicketMapped"
                                                                    //value={this.state.isTicketMapped}
                                                                    //onChange={this.handleOnChangeData} 
                                                                    >
                                                                        <option value="">Store Code</option>
                                                                        <option value="yes">Store-1</option>
                                                                        <option value="no">Store-2</option>
                                                                    </select>
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
                                                            ID <FontAwesomeIcon icon={faCaretDown} />
                                                        </span>
                                                    ),
                                                    accessor: "Id",
                                                },
                                                {
                                                    Header: (
                                                        <span>
                                                            Agent Name <FontAwesomeIcon icon={faCaretDown} />
                                                        </span>
                                                    ),
                                                    accessor: "AgentName",
                                                    // Cell: (row) => {
                                                    //     if (row.original.status !== undefined) {
                                                    //         if (row.original.status === "New") {
                                                    //             return (
                                                    //                 <span className="table-btn table-yellow-btn">
                                                    //                     <label>{row.original.status}</label>
                                                    //                 </span>
                                                    //             );
                                                    //         } else if (row.original.status === "Open") {
                                                    //             return (
                                                    //                 <span className="table-btn table-blue-btn">
                                                    //                     <label>{row.original.status}</label>
                                                    //                 </span>
                                                    //             );
                                                    //         } else {
                                                    //             return (
                                                    //                 <span className="table-btn table-green-btn">
                                                    //                     <label>{row.original.status}</label>
                                                    //                 </span>
                                                    //             );
                                                    //         }
                                                    //     }
                                                    //     else {
                                                    //         if (row.original.claimStatus === "New") {
                                                    //             return (
                                                    //                 <span className="table-btn table-yellow-btn">
                                                    //                     <label>{row.original.claimStatus}</label>
                                                    //                 </span>
                                                    //             );
                                                    //         } else if (row.original.claimStatus === "Open") {
                                                    //             return (
                                                    //                 <span className="table-btn table-blue-btn">
                                                    //                     <label>{row.original.claimStatus}</label>
                                                    //                 </span>
                                                    //             );
                                                    //         } else {
                                                    //             return (
                                                    //                 <span className="table-btn table-green-btn">
                                                    //                     <label>{row.original.claimStatus}</label>
                                                    //                 </span>
                                                    //             );
                                                    //         }
                                                    //     }
                                                    // },
                                                },
                                                {
                                                    Header: (
                                                        <span>
                                                            Suggestion
                                                        </span>
                                                    ),
                                                    accessor: "issueTypeName",
                                                    Cell: (row) => {
                                                       return (<div className="switch switch-primary d-inline m-r-10">
                                                            <input
                                                                type="checkbox"
                                                                id={"i1"}
                                                                name="allModules"
                                                                //attrIds={item.moduleId}
                                                                //checked={item.isActive}
                                                                // onChange={this.checkModule.bind(
                                                                //     this,
                                                                //     item.moduleId
                                                                // )}
                                                            />
                                                            <label
                                                                htmlFor={"i1"}
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
                                                    accessor: "raiseBy",
                                                    Cell: (row) => {
                                                        return (<div className="switch switch-primary d-inline m-r-10">
                                                            <input
                                                                type="checkbox"
                                                                id={"i2"}
                                                                name="allModules"
                                                                //attrIds={item.moduleId}
                                                                //checked={item.isActive}
                                                                // onChange={this.checkModule.bind(
                                                                //     this,
                                                                //     item.moduleId
                                                                // )}
                                                            />
                                                            <label
                                                                htmlFor={"i2"}
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
                                            getTrProps={this.HandleRowClickPage}
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
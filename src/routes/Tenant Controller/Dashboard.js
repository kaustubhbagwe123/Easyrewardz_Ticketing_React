import React, { Component, Fragment } from "react";
import Modal from "react-responsive-modal";
import RightBlue from "./../../assets/Images/rightblue.png";
import BlackTopArrow from "./../../assets/Images/blue-top-arrow-blue.png";
import { Collapse, CardBody, Card } from "reactstrap";
import ReactTable from "react-table";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BataSmall from "./../../assets/Images/bata1.png";
import LooksSmall from "./../../assets/Images/looks.png";
import Smile from "./../../assets/Images/smile.png";
import RblVlcc from "./../../assets/Images/rblvlcc.png";
import SearchIcon from "./../../assets/Images/search-icon.png";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AllAcount: false,
      collapseSearch: false
    };
  }
  handleAccountAllOpen() {
    this.setState({ AllAcount: true });
  }
  handleAccountAllClose() {
    this.setState({ AllAcount: false });
  }
  toggleSearch() {
    this.setState(state => ({ collapseSearch: !state.collapseSearch }));
  }

  render() {
    const data = [
      {
        Name: (
          <div>
            
              <img src={LooksSmall} alt="Bata" className="lookssmall" />
            
            <label>
              Looks Salon Pvt.Ltd<br></br>
              <span className="looksnumber">#837299</span>
            </label>
          </div>
        ),
        Health: (
          <div>
            <span>
              <img src={Smile} alt="Bata" className="" />
            </span>
            <label>Good</label>
          </div>
        ),
        Stage: "Upsell",
        Status: "Paying",
        PlanName: "Plan1",
        PlanValue: "3,00,000",
        Csm: "Rashmi Chatterjee"
      },
      {
        Name: (
          <div>
            
              <img src={BataSmall} alt="Bata" className="lookssmall" />
            
            <label>
              Bata India Ltd<br></br>
              <span className="looksnumber">#837299</span>
            </label>
          </div>
        ),
        Health: (
          <div>
            <span>
              <img src={Smile} alt="Bata" className="" />
            </span>
            <label>Average</label>
          </div>
        ),
        Stage: "Onboarding",
        Status: "Paying",
        PlanName: "Plan1",
        PlanValue: "6,00,000",
        Csm: "Dharmendra Sagar"
      },
      {
        Name: (
          <div>
            
              <img src={RblVlcc} alt="Bata" className="lookssmall" />
            
            <label>
              Vlcc Health Care Limited<br></br>
              <span className="looksnumber">#837299</span>
            </label>
          </div>
        ),
        Health: (
          <div>
            <span>
              <img src={Smile} alt="Bata" className="" />
            </span>
            <label>Poor</label>
          </div>
        ),
        Stage: "Trial",
        Status: "Trial",
        PlanName: "Plan1",
        PlanValue: "Free",
        Csm: "Manish Singh"
      },
      {
        Name: (
          <div>
          
              <img src={RblVlcc} alt="Bata" className="lookssmall" />
           
            <label>
              RBL Ltd<br></br>
              <span className="looksnumber">#837299</span>
            </label>
          </div>
        ),
        Health: (
          <div>
            <span>
              <img src={Smile} alt="Bata" className="" />
            </span>
            <label>Good</label>
          </div>
        ),
        Stage: "Upsell",
        Status: "Paying",
        PlanName: "Plan1",
        PlanValue: "3,00,000",
        Csm: "Sandeep Rathi"
      }
    ];

    const columns = [
      {
        Header: (
          <span>
            Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "Name"
      },
      {
        Header: (
          <span>
            Health
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "Health"
      },
      {
        Header: (
          <span>
            Stage
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "Stage"
      },
      {
        Header: (
          <span>
            Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "Status"
      },
      {
        Header: (
          <span>
            Plan Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "PlanName"
      },
      {
        Header: (
          <span>
            Plan Value
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "PlanValue"
      },
      {
        Header: (
          <span>
            CSM
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "Csm"
      },
      {
        Header: <span>Action</span>,
        accessor: "Action",
        Cell: props => (
          <div>
            <a href="EditDetails"><button className="actionbuttonreact">EDIT</button></a>
          </div>
        )
      }
    ];
    return (
      <Fragment>
        <div className="container-fluid dash-dropdowns">
          <div>
            <label className="tenant-overview">
              <span className="tenant-overview1">O</span>VERVIEW
            </label>
          </div>
          <div className="d-flex">
            <div className="tenant-accounts">
              <label className="tenant-accounts1">Accounts </label>
              <label
                className="dropdown1"
                onClick={this.handleAccountAllOpen.bind(this)}
              >
                All
              </label>
              <Modal
                onClose={this.handleAccountAllClose.bind(this)}
                open={this.state.AllAcount}
                modalId="AllAcountTenantModal"
                overlayId="logout-ovrly"
              >
                <div>
                  <label className="AllAcounttext">All</label>
                  <div className="rightbluefloat">
                    <img
                      src={RightBlue}
                      alt="Right-Blue"
                      className="rightblue"
                    />
                  </div>
                  <label className="AllAcounttext">Looks Salon Pvt.Ltd</label>
                  <label className="AllAcounttext">Bata India Ltd</label>
                  <label className="AllAcounttext">
                    VlCC Health Care Limited
                  </label>
                  <label className="AllAcounttext">RBL Ltd</label>
                </div>
              </Modal>
            </div>
            <div className="tenant-accounts-date">
              <label className="tenant-accounts1">Date Range </label>
              <label className="dropdown1">11Mar-12Apr</label>
            </div>
          </div>
        </div>
        <section className="dash-cntr" style={{backgroundColor:"#F5F5F5"}}>
          <Card>
            <CardBody>
              <div className="container-fluid dash-tp-card">
                <div className="row justify-content-center">
                  <div className="col-md col-sm-4 col-6">
                    <div className="dash-top-cards">
                      <p className="card-head1">Accounts</p>
                      <div className="card-values1">
                        <span className="card-head1number">343</span>
                        <img
                          src={BlackTopArrow}
                          alt="Right-Blue"
                          className="toparrownumber"
                        />
                        <span className="card-head1number1">43</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md col-sm-4 col-6">
                    <div className="dash-top-cards">
                      <p className="card-head1">Onboarded</p>
                      <div className="card-values1">
                        <span className="card-head1number">56</span>
                        <img
                          src={BlackTopArrow}
                          alt="Right-Blue"
                          className="toparrownumber"
                        />
                        <span className="card-head1number1">13</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md col-sm-4 col-6">
                    <div className="dash-top-cards">
                      <p className="card-head1">Revenue</p>
                      <div className="card-values1">
                      <span className="card-head1number1">₹</span>
                        <span className="card-head1number">43.8k</span>
                        <img
                          src={BlackTopArrow}
                          alt="Right-Blue"
                          className="toparrownumber"
                        />
                        <span className="card-head1number1">3.7k</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md col-sm-4 col-6">
                    <div className="dash-top-cards">
                      <p className="card-head1">Churned</p>
                      <div className="card-values1">
                        <span
                          className="card-head1number"
                          style={{ color: "red" }}
                        >
                          07
                        </span>
                        <img
                          src={BlackTopArrow}
                          alt="Right-Blue"
                          className="toparrownumberred"
                        />
                        <span className="card-head1number1">3</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md col-sm-4 col-6">
                    <div className="dash-top-cards">
                      <p className="card-head1">Health</p>
                      <div>
                        <span className="healthcircle"></span>
                        <span className="card-head1number12">90</span>
                        <span className="card-head1number12">142</span>
                        <span className="card-head1number12">70</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>
        <section className="">
          <Collapse isOpen={this.state.collapseSearch}>
            <Card style={{padding:"25px 0px",backgroundColor:"#F5F5F5"}}>
              <CardBody style={{padding:"0"}}>
                <div className="container-fluid dash-tp-card">
                  <div className="dash-top-cards1">
                    <div className="row sectiontenant m-b-20 m-t-20">
                      <div className="col-md-6" style={{ textAlign: "left" }}>
                        <label className="searchaccount">Search Accounts</label>
                      </div>
                    </div>
                    <div className="row sectiontenant m-b-20">
                      <div className="col-md-3">
                        <select>
                          <option>Name</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <select>
                          <option>Stage</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <select>
                          <option>Status</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <select>
                          <option>Plan Name</option>
                        </select>
                      </div>
                    </div>
                    <div className="row sectiontenant m-b-20">
                      <div className="col-md-3">
                        <select>
                          <option>Subscription Type</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <select>
                          <option>Payment Status</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <select>
                          <option>CSM</option>
                        </select>
                      </div>
                    </div>
                    <div className="row sectiontenant m-b-20">
                      <div className="col-md-12" style={{ textAlign: "right" }}>
                        <div>
                          <button className="searchbtn">Search</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row sectiontenant halfcirclemarginleft">
                  <div className="col-md-12">
                    <div
                      className="halfcircle"
                      onClick={this.toggleSearch.bind(this)}
                    ></div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Collapse>
        </section>
        <div className="container-fluid">
          <div className="table-cntr m-t-10">
            <div className="tenantreact">
              <ReactTable
                data={data}
                columns={columns}
                // resizable={false}
                defaultPageSize={5}
                showPagination={false}
              />
            </div>

            <div
              className="float-search"
              onClick={this.toggleSearch.bind(this)}
            >
              <small>Search Account</small>
              <img className="search-icon" src={SearchIcon} alt="search-icon" />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;

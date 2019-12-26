import React, { Component, Fragment } from "react";
import SearchIcon from "./../../assets/Images/search-icon.png";
import ReactTable from "react-table";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BataSmall from "./../../assets/Images/bata1.png";
import LooksSmall from "./../../assets/Images/looks.png";
import Smile from "./../../assets/Images/smile.png";
import RblVlcc from "./../../assets/Images/rblvlcc.png";
import Demo from "./../../store/Hashtag";

class AllAcounts extends Component {
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
      },
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
            <a href="EditUserDetails"><button className="actionbuttonreact">EDIT</button></a>
          </div>
        )
      }
    ];

    return (
      <Fragment>
        <div className="">
          <div className="dash-cntrr1" style={{ paddingBottom: "50px", backgroundColor: "#f5f5f5" }}>
            <div className="table-cntr mt-4">
              <div className="tenantreact">
                <ReactTable
                  data={data}
                  columns={columns}
                  // resizable={false}
                  defaultPageSize={12}
                  showPagination={false}
                />
                  <div className="position-relative">
                    <div className="pagi">
                      <ul>
                        <li>
                          <a href={Demo.BLANK_LINK}>&lt;</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>1</a>
                        </li>
                        <li className="active">
                          <a href={Demo.BLANK_LINK}>2</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>3</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>4</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>5</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>6</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>&gt;</a>
                        </li>
                      </ul>
                    </div>
                    <div className="item-selection">
                      <select>
                        <option>30</option>
                        <option>50</option>
                        <option>100</option>
                      </select>
                      <p>Items per page</p>
                    </div>
                  </div>
              </div>

              <div className="float-search">
                <small>Search Account</small>
                <img
                  className="search-icon"
                  src={SearchIcon}
                  alt="search-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AllAcounts;

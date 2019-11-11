import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import InfoIcon from "./../../assets/Images/info-icon.png";
import HeadPhone3 from "./../../assets/Images/headphone3.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QaPending from "./Tabs/QaPending";
import QaAudit from "./Tabs/QaAudit";

class QAMyTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  hanleChange_MyTicket = () => {
    this.props.history.push("/qa/myticket");
  };

  render() {
    const dataAll = [
      {
        statusNew: (
          <span className="table-ba Qatable-blue-btn">
            <label onClick={this.handleChange_MyTicket}>PENDING</label>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-ba Qatable-blue-btn">
            <label>PENDING</label>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-ba Qatable-green-btn">
            <label>AUDIT DONE</label>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-ba Qatable-green-btn">
            <label>AUDIT DONE</label>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-ba Qatable-green-btn">
            <label>AUDIT DONE</label>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-ba Qatable-green-btn">
            <label>AUDIT DONE</label>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-ba Qatable-green-btn">
            <label>AUDIT DONE</label>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-ba Qatable-blue-btn">
            <label>AUDIT DONE</label>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-ba Qatable-blue-btn">
            <label>AUDIT DONE</label>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-ba Qatable-blue-btn">
            <label>AUDIT DONE</label>
          </span>
        )
      }
    ];

    const columnsAll = [
      {
        Header: <span>ID</span>,
        accessor: "idNew",
        Cell: props => (
          <span>
            <img src={HeadPhone3} alt="HeadPhone" className="headPhone3" />
            ABC1234
          </span>
        )
      },
      {
        Header: (
          <span>
            QA Status <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "statusNew"
      },
      {
        Header: (
          <span>
            Subject
            <span style={{ fontWeight: "bold", fontSize: "13px !important" }}>
              /Lastest Message
            </span>
          </span>
        ),
        accessor: "subjectNew",
        Cell: props => (
          <label>
            Need to change my shipping address{" "}
            <span style={{ display: "block" }}>
              Hope this help, Please rate us
            </span>
          </label>
        )
      },
      {
        Header: (
          <span>
            Category <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "categoryNew",
        Cell: props => (
          <span>
            <label>Defective article </label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </span>
        )
      },
      {
        Header: (
          <span>
            Priority <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "priorityNew",
        Cell: props => <span>High</span>
      },
      {
        Header: (
          <span>
            Assigne <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "assigneeNew",
        Cell: props => <span>Naman</span>
      },
      {
        Header: (
          <span>
            Creation On <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "creationNew",
        Cell: props => (
          <span>
            <label>13 May 2049</label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </span>
        )
      }
    ];

    return (
      <Fragment>
        <div className="myticketlist-header">
          <div className="setting-tabs esc">
            <ul className="nav nav-tabs es" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#All-tab"
                  role="tab"
                  aria-controls="All-tab"
                  aria-selected="true"
                >
                  All: <span className="myTciket-tab-span">04</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Pending-tab"
                  role="tab"
                  aria-controls="Pending-tab"
                  aria-selected="false"
                >
                  Pending For QA: <span className="myTciket-tab-span">09</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Audit-tab"
                  role="tab"
                  aria-controls="Audit-tab"
                  aria-selected="false"
                >
                  Audit Done: <span className="myTciket-tab-span">10</span>
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="All-tab"
                role="tabpanel"
                aria-labelledby="All-tab"
              >
                <div className="newReact">
                  <ReactTable
                    data={dataAll}
                    columns={columnsAll}
                    // resizable={false}
                    defaultPageSize={5}
                    showPagination={true}
                    // getTrProps={this.}
                  />
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Pending-tab"
                role="tabpanel"
                aria-labelledby="Pending-tab"
              >
                <QaPending />
              </div>

              <div
                className="tab-pane fade"
                id="Audit-tab"
                role="tabpanel"
                aria-labelledby="Audit-tab"
              >
                <QaAudit />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default QAMyTicket;

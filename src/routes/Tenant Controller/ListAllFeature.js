import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import InfoImg from "./../../assets/Images/icons8-info.svg";
import Dot from "./../../assets/Images/dot.png";
import DelIcon from "./../../assets/Images/del-big.png";
import Pencil from "./../../assets/Images/pencil.png";
import { Popover } from "antd";

class ListAllFeature extends Component {
  render() {
    const Pencil1 = (
      <div>
        <div className="CenterPlan tooltipcenterplan">
          <div className="row m-b-20">
            <div className="col-md-12">
              <label className="createplantext">Edit Feature</label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label className="PlanName">Feature Name</label>
              <input type="text" className="txt-1" placeholder="Phone Trees" maxLength="25" />
            </div>
          </div>
          <div className="row m-t-10">
            <div className="col-md-12">
              <label className="PlanName">Plan Price(Monthly)</label>
              <div className="input-group">
                <span className="input-group-addon">₹</span>
                <input type="text" className="form-control" placeholder="199" />
              </div>
              {/* <span>₹</span>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="11999"
                        /> */}
            </div>
          </div>

          <div className="row m-t-10">
            <div className="col-md-12">
              <label className="PlanName">Plan Price(Yearly)</label>
              <div className="input-group">
                <span className="input-group-addon">₹</span>
                <input type="text" className="form-control" placeholder="99" />
              </div>
            </div>
          </div>

          <div className="row m-t-10">
            <div className="col-md-12">
              <label className="PlanName">ToolTip</label>

              <input
                type="textarea"
                className="txt-1tooltip"
                placeholder="Lorem ipsum is simply dummytext of printing and type setting
                        industry.Lorem ipsum is simply dummytext of printing and type setting
                        industry."
              />
            </div>
          </div>

          <div className="row m-t-40">
            <div className="col-md-6">
              <div className="cancel">
                <button>Cancel</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="save">
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    const AddNew = (
      <div>
        <div className="CenterPlan tooltipcenterplan">
          <div className="row m-b-20">
            <div className="col-md-12">
              <label className="createplantext">Add New Feature</label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label className="PlanName">Feature Name</label>
              <input type="text" className="txt-1" placeholder="Phone Trees" maxLength="25" />
            </div>
          </div>
          <div className="row m-t-10">
            <div className="col-md-12">
              <label className="PlanName">Plan Price(Monthly)</label>
              <div className="input-group">
                <span className="input-group-addon">₹</span>
                <input type="text" className="form-control" placeholder="199" />
              </div>
              {/* <span>₹</span>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="11999"
                        /> */}
            </div>
          </div>

          <div className="row m-t-10">
            <div className="col-md-12">
              <label className="PlanName">Plan Price(Yearly)</label>
              <div className="input-group">
                <span className="input-group-addon">₹</span>
                <input type="text" className="form-control" placeholder="99" />
              </div>
            </div>
          </div>

          <div className="row m-t-10">
            <div className="col-md-12">
              <label className="PlanName">ToolTip</label>

              <input
                type="textarea"
                className="txt-1tooltip"
                placeholder="Lorem ipsum is simply dummytext of printing and type setting
                        industry.Lorem ipsum is simply dummytext of printing and type setting
                        industry."
              />
            </div>
          </div>

          <div className="row m-t-40">
            <div className="col-md-6">
              <div className="cancel">
                <button>Cancel</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="save">
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    const data = [
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Call to Ticket</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute<br></br>
            Which form is required Grammatically.
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Email Ticketing</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Social Tickets</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Chat Ticketa</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Support Bot</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Live Chat Support to customers</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Knowledge Base</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Reporting & Analytics</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Prebuilt Dashboard</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Roles & Permission</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>SLA Management</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Skilled based Ticket Assignment</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>IVR Phone Trees</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Inbound/Outbound Calling</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>RealTime IVR Analytics</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Roles & Permission</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>SLA Management</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Skilled based Ticket Assignment</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>IVR Phone Trees</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>Inbound/Outbound Calling</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      },
      {
        Fea: (
          <span>
            <img src={Dot} className="Dotent" alt="Info" />
            <label>RealTime IVR Analytics</label>
            <img src={InfoImg} className="info-icon" alt="Info" />
          </span>
        ),
        Tool: (
          <label>
            Which form is required Grammatically but which contribute which
          </label>
        )
      }
    ];

    const columns = [
      {
        Header: <span>Features</span>,
        accessor: "Fea"
      },
      {
        Header: <span>Tooltip</span>,
        accessor: "Tool"
      },
      {
        Header: <span>Monthly(Per User)</span>,
        accessor: "Month",
        Cell: props => <label>₹ 120</label>
      },
      {
        Header: <span>Yearly(Per User)</span>,
        accessor: "year",
        Cell: props => <label>₹ 99</label>
      },
      {
        Header: <span></span>,
        accessor: "year",
        Cell: props => (
          <span>
            <Popover content={Pencil1} placement="top" trigger="click">
              <img src={Pencil} className="delicon" alt="Info" />
            </Popover>

            <img src={DelIcon} className="delicon" alt="Info" />
          </span>
        )
      }
    ];

    return (
      <Fragment>
        <div className="container-fluid">
          <div className="dash-cntr1">
            <label className="enterprisetext">List Of all Features</label>
            <div
              className="ListAllReacttable"
              style={{ backgroundColor: "#fff" }}
            >
              <ReactTable
                data={data}
                columns={columns}
                // resizable={false}
                defaultPageSize={22}
                showPagination={false}
              />
              <div className="row">
              <div className="col-md-6">
                <div className="savecancelenterprise1">
                  <Popover content={AddNew} placement="top" trigger="click">
                    <button className="addnew">+ Add New Features</button>
                  </Popover>
                </div>
              </div>
              <div className="col-md-6">
                <div className="savecancelenterprise">
                  <button className="Cancel">Cancel</button>
                  <button className="Save">Save</button>
                </div>
              </div>
            </div>
            </div>
            
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ListAllFeature;

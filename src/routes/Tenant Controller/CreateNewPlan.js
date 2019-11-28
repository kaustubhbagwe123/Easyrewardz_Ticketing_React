import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import InfoImg from "./../../assets/Images/icons8-info.svg";
import Dot from "./../../assets/Images/dot.png";

class CreateNewPlan extends Component {
    render() {
        const data = [
            {
              Fea: (
                <span>
                  <img src={Dot} className="Dotent" alt="Info" />
                  <label>Call to Ticket</label>
                  <img src={InfoImg} className="info-icon" alt="Info" />
                </span>
              ),
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-1" />
                    <label htmlFor="enterprise-s-1" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-1" />
                    <label htmlFor="enterprise-a-1" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-2" />
                    <label htmlFor="enterprise-s-2" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-2" />
                    <label htmlFor="enterprise-a-2" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-3" />
                    <label htmlFor="enterprise-s-3" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-3" />
                    <label htmlFor="enterprise-a-3" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-4" />
                    <label htmlFor="enterprise-s-4" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-4" />
                    <label htmlFor="enterprise-a-4" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-5" />
                    <label htmlFor="enterprise-s-5" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-5" />
                    <label htmlFor="enterprise-a-5" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-6" />
                    <label htmlFor="enterprise-s-6" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-6" />
                    <label htmlFor="enterprise-a-6" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-7" />
                    <label htmlFor="enterprise-s-7" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-7" />
                    <label htmlFor="enterprise-a-7" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-9" />
                    <label htmlFor="enterprise-s-9" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-9" />
                    <label htmlFor="enterprise-a-9" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-10" />
                    <label htmlFor="enterprise-s-10" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-10" />
                    <label htmlFor="enterprise-a-10" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-11" />
                    <label htmlFor="enterprise-s-11" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-11" />
                    <label htmlFor="enterprise-a-11" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-12" />
                    <label htmlFor="enterprise-s-12" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-12" />
                    <label htmlFor="enterprise-a-12" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-13" />
                    <label htmlFor="enterprise-s-13" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-13" />
                    <label htmlFor="enterprise-a-13" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-14" />
                    <label htmlFor="enterprise-s-14" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-14" />
                    <label htmlFor="enterprise-a-14" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-15" />
                    <label htmlFor="enterprise-s-15" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-15" />
                    <label htmlFor="enterprise-a-15" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-16" />
                    <label htmlFor="enterprise-s-16" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-16" />
                    <label htmlFor="enterprise-a-16" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-17" />
                    <label htmlFor="enterprise-s-17" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-17" />
                    <label htmlFor="enterprise-a-17" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-18" />
                    <label htmlFor="enterprise-s-18" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-18" />
                    <label htmlFor="enterprise-a-18" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-19" />
                    <label htmlFor="enterprise-s-19" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-19" />
                    <label htmlFor="enterprise-a-19" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-20" />
                    <label htmlFor="enterprise-s-20" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-20" />
                    <label htmlFor="enterprise-a-20" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-21" />
                    <label htmlFor="enterprise-s-21" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-21" />
                    <label htmlFor="enterprise-a-21" className="cr"></label>
                  </div>
                </div>
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
              showHide: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-s-22" />
                    <label htmlFor="enterprise-s-22" className="cr"></label>
                  </div>
                </div>
              ),
              addOn: (
                <div className="tenantEnterprise">
                  <div className="switch switch-primary">
                    <input type="checkbox" id="enterprise-a-22" />
                    <label htmlFor="enterprise-a-22" className="cr"></label>
                  </div>
                </div>
              )
            }
          ];
      
          const columns = [
            {
              Header: <span>Features</span>,
              accessor: "Fea"
            },
            {
              Header: <span>Show/Hide</span>,
              accessor: "showHide"
            },
            {
              Header: <span>Add ons</span>,
              accessor: "addOn"
            },
            {
              Header: <span>Monthly(Per User)</span>,
              accessor: "Month",
              Cell: props => <label>₹ 1199</label>
            },
            {
              Header: <span>Yearly(Per User)</span>,
              accessor: "year",
              Cell: props => (
              <label>₹ 999</label>
              ),
            }
          ];
        return (
            <Fragment>
            <div className="container-fluid">
              <div className="dash-cntr1">
                <label className="enterprisetext">Create Plan</label>
                <div
                  className="EnterpriseReact"
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
                  <div className="col-md-12">
                    <div className="savecancelenterprise">
                      <button className="Cancel">Cancel</button>
                      <a href="createPlan"><button className="Save">Save & Next</button></a>
                    </div>
                  </div>
                </div>
                </div>
                
              </div>
            </div>
          </Fragment>
        )
    }
}

export default CreateNewPlan

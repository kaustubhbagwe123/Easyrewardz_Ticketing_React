import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faSquareFull } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
// import { Popover } from "antd";
// import { Link } from "react-router-dom";

class EssentialProfeTable extends Component {
    render() {
        return (
            <div className="col-sm-9" style={{margin:"auto"}}>
                <table className="table">
                <tr className="value-th">
                  <th>
                    <h2>Plan</h2>
                    <h2>Features</h2>
                  </th>
                  <th>
                    <div className="plan-th text-center">
                      <h3>Essential</h3>
                      <h2>₹ 999</h2>
                      <p>Per User/Month</p>
                    </div>
                  </th>
                  <th className="active-col">
                    <div className="plan-th text-center">
                      <h3>Professional</h3>
                      <h2>₹ 1999</h2>
                      <p>Per User/Month</p>
                    </div>
                  </th>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Calls to Ticket
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check"></td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Email Ticketing
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Social Tickets
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Chat Tickets
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Support Bot
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Live Chat Support to customers
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Knowledge Base
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Reporting and Analytics
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Prebuild Dashboard
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Roles and Permission
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check"></td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    SLA Management
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Skilled Based Ticket Assignment
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    IVR Phone Trees
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Inbound / Outbound Calling
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Realtime IVR Analytics
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    SLA Management
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check"></td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Skilled Based Ticket Assignment
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check"></td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    IVR Phone Trees
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Inbound / Outbound Calling
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faPlusCircle} className="plusicon" />
                  </td>
                  <td className="plantab-check"></td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faSquareFull} className="sq" />
                    Roles and Permission
                    <FontAwesomeIcon icon={faInfoCircle} className="info" />
                  </td>
                  <td className="plantab-check">
                    <FontAwesomeIcon icon={faPlusCircle} className="plusicon" />
                  </td>
                  <td className="plantab-check"></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      type="submit"
                      className="btn addplanbtn btn-primary"
                    >
                      Add Plan
                    </button>
                  </td>
                </tr>
              </table>
            </div>
        )
    }
}

export default EssentialProfeTable

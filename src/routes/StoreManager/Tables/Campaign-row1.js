import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class CampaignTable1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
    };
    this.DateChange = this.DateChange.bind(this);
  }
  DateChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    return (
      <div>
        <table className="camp-datepick">
          <thead style={{ color: "#F0F0F0" }}>
            <tr>
              <th>Customer Name</th>
              <th style={{ paddingLeft: "82px" }}>Date</th>
              <th style={{ paddingLeft: "8px" }}>Status</th>
              <th style={{ padding: "0px" }}>Responce</th>
              <th style={{ padding: "0px" }}>Call Recheduled To</th>
              <th style={{ textAlign: "left", float: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ border: "none" }}>
              <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                Naman Rampal
                <span className="sml-fnt">9873470074</span>
              </td>
              <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                29 April 2016
              </td>
              <td
                style={{
                  paddingLeft: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {/* <button
                  className="contactBtnGreen"
                  type="button"
                  style={{ minWidth: "5px", marginRight: "2px" }}
                >
                  <label className="table-btnlabel">Contacted</label>
                </button> */}
                <input
                  type="radio"
                  name="campaign-status"
                  className="campaign-status-btn"
                  id="contactBtnGreen"
                />
                <label
                  className="table-btnlabel contactBtnGreen"
                  htmlFor="contactBtnGreen"
                >
                  Contacted
                </label>
                {/* <button
                  className="notConnectedBtnRed"
                  type="button"
                  style={{ marginRight: "2px" }}
                >
                  <label className="table-btnlabel">Not Contacted</label>
                </button> */}
                <input
                  type="radio"
                  name="campaign-status"
                  className="campaign-status-btn"
                  id="notConnectedBtnRed"
                />
                <label
                  className="table-btnlabel notConnectedBtnRed"
                  htmlFor="notConnectedBtnRed"
                >
                  Not Contacted
                </label>
                {/* <button
                  className="followUpBtnYellow"
                  type="button"
                  style={{ minWidth: "5px" }}
                >
                  <label className="table-btnlabel">Follow Up</label>
                </button> */}
                <input
                  type="radio"
                  name="campaign-status"
                  className="campaign-status-btn"
                  id="followUpBtnYellow"
                />
                <label
                  className="table-btnlabel followUpBtnYellow"
                  htmlFor="followUpBtnYellow"
                >
                  Follow Up
                </label>
              </td>
              <td style={{ width: "18%", paddingLeft: "0px" }}>
                <select
                  id="inputState"
                  className="responceDrop-down dropdown-label"
                >
                  <option>Ringing No Response</option>
                  <option>Call Back Later</option>
                  <option>Mobile No Not Reachable</option>
                  <option>No Switched Off</option>
                  <option>Call Disconnected</option>
                  <option>Mobile No Does Not Exist</option>
                  <option>Mobile No Does Not Exist</option>
                  <option>Wrong Mobile Number</option>
                  <option>Customer Was Happy</option>
                  <option>Customer Was Not Happy</option>
                </select>
              </td>
              <td style={{ width: "15%", textAlign: "left", padding: "0px" }}>
                {/* <input
                  type="text"
                  placeholder="Select Date & Time"
                  className="txtStore dateTimeStore"
                /> */}
                <DatePicker
                  id="startDate"
                  name="startDate"
                  showMonthDropdown
                  showYearDropdown
                  selected={this.state.startDate}
                  onChange={this.DateChange}
                  className="txtStore dateTimeStore"
                  placeholderText="Select Date & Time"
                />
              </td>
              <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                <button
                  className="saveBtn"
                  type="button"
                  style={{ minWidth: "5px", marginRight: "3px" }}
                >
                  <label className="saveLabel">Save</label>
                </button>
                <button className="raisedticket-Btn" type="button">
                  <label className="raise-ticketLbl">Raise Ticket</label>
                </button>
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                Naman Rampal
                <span className="sml-fnt">9873470074</span>
              </td>
              <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                29 April 2016
              </td>
              <td
                style={{
                  paddingLeft: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                <button
                  className="contactBtnGreen"
                  type="button"
                  style={{ minWidth: "5px", marginRight: "2px" }}
                >
                  <label className="table-btnlabel">Contacted</label>
                </button>
                <button
                  className="notConnectedBtnRed"
                  type="button"
                  style={{ marginRight: "2px" }}
                >
                  <label className="table-btnlabel">Not Contacted</label>
                </button>
                <button
                  className="followUpBtnYellow"
                  type="button"
                  style={{ minWidth: "5px" }}
                >
                  <label className="table-btnlabel">Follow Up</label>
                </button>
              </td>
              <td style={{ width: "18%", paddingLeft: "0px" }}>
                <select
                  id="inputState"
                  className="responceDrop-down dropdown-label"
                >
                  <option>Ringing No Response</option>
                  <option>Call Back Later</option>
                  <option>Mobile No Not Reachable</option>
                  <option>No Switched Off</option>
                  <option>Call Disconnected</option>
                  <option>Mobile No Does Not Exist</option>
                  <option>Mobile No Does Not Exist</option>
                  <option>Wrong Mobile Number</option>
                  <option>Customer Was Happy</option>
                  <option>Customer Was Not Happy</option>
                </select>
              </td>
              <td style={{ width: "15%", textAlign: "left", padding: "0px" }}>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  showMonthDropdown
                  showYearDropdown
                  selected={this.state.startDate}
                  onChange={this.DateChange}
                  className="txtStore dateTimeStore"
                  placeholderText="Select Date & Time"
                />
              </td>
              <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                <button
                  className="saveBtn"
                  type="button"
                  style={{ minWidth: "5px", marginRight: "3px" }}
                >
                  <label className="saveLabel">Save</label>
                </button>
                <button className="raisedticket-Btn" type="button">
                  <label className="raise-ticketLbl">Raise Ticket</label>
                </button>
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                Naman Rampal
                <span className="sml-fnt">9873470074</span>
              </td>
              <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                29 April 2016
              </td>
              <td
                style={{
                  paddingLeft: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                <button
                  className="contactBtnGreen"
                  type="button"
                  style={{ minWidth: "5px", marginRight: "2px" }}
                >
                  <label className="table-btnlabel">Contacted</label>
                </button>
                <button
                  className="notConnectedBtnRed"
                  type="button"
                  style={{ marginRight: "2px" }}
                >
                  <label className="table-btnlabel">Not Contacted</label>
                </button>
                <button
                  className="followUpBtnYellow"
                  type="button"
                  style={{ minWidth: "5px" }}
                >
                  <label className="table-btnlabel">Follow Up</label>
                </button>
              </td>
              <td style={{ width: "18%", paddingLeft: "0px" }}>
                <select
                  id="inputState"
                  className="responceDrop-down dropdown-label"
                >
                  <option>Ringing No Response</option>
                  <option>Call Back Later</option>
                  <option>Mobile No Not Reachable</option>
                  <option>No Switched Off</option>
                  <option>Call Disconnected</option>
                  <option>Mobile No Does Not Exist</option>
                  <option>Mobile No Does Not Exist</option>
                  <option>Wrong Mobile Number</option>
                  <option>Customer Was Happy</option>
                  <option>Customer Was Not Happy</option>
                </select>
              </td>
              <td style={{ width: "15%", textAlign: "left", padding: "0px" }}>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  showMonthDropdown
                  showYearDropdown
                  selected={this.state.startDate}
                  onChange={this.DateChange}
                  className="txtStore dateTimeStore"
                  placeholderText="Select Date & Time"
                />
              </td>
              <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                <button
                  className="saveBtn"
                  type="button"
                  style={{ minWidth: "5px", marginRight: "3px" }}
                >
                  <label className="saveLabel">Save</label>
                </button>
                <button className="raisedticket-Btn" type="button">
                  <label className="raise-ticketLbl">Raise Ticket</label>
                </button>
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                Naman Rampal
                <span className="sml-fnt">9873470074</span>
              </td>
              <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                29 April 2016
              </td>
              <td
                style={{
                  paddingLeft: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                <button
                  className="contactBtnGreen"
                  type="button"
                  style={{ minWidth: "5px", marginRight: "2px" }}
                >
                  <label className="table-btnlabel">Contacted</label>
                </button>
                <button
                  className="notConnectedBtnRed"
                  type="button"
                  style={{ marginRight: "2px" }}
                >
                  <label className="table-btnlabel">Not Contacted</label>
                </button>
                <button
                  className="followUpBtnYellow"
                  type="button"
                  style={{ minWidth: "5px" }}
                >
                  <label className="table-btnlabel">Follow Up</label>
                </button>
              </td>
              <td style={{ width: "18%", paddingLeft: "0px" }}>
                <select
                  id="inputState"
                  className="responceDrop-down dropdown-label"
                >
                  <option>Ringing No Response</option>
                  <option>Call Back Later</option>
                  <option>Mobile No Not Reachable</option>
                  <option>No Switched Off</option>
                  <option>Call Disconnected</option>
                  <option>Mobile No Does Not Exist</option>
                  <option>Mobile No Does Not Exist</option>
                  <option>Wrong Mobile Number</option>
                  <option>Customer Was Happy</option>
                  <option>Customer Was Not Happy</option>
                </select>
              </td>
              <td style={{ width: "15%", textAlign: "left", padding: "0px" }}>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  showMonthDropdown
                  showYearDropdown
                  selected={this.state.startDate}
                  onChange={this.DateChange}
                  className="txtStore dateTimeStore"
                  placeholderText="Select Date & Time"
                />
              </td>
              <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                <button
                  className="saveBtn"
                  type="button"
                  style={{ minWidth: "5px", marginRight: "3px" }}
                >
                  <label className="saveLabel">Save</label>
                </button>
                <button className="raisedticket-Btn" type="button">
                  <label className="raise-ticketLbl">Raise Ticket</label>
                </button>
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                Naman Rampal
                <span className="sml-fnt">9873470074</span>
              </td>
              <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                29 April 2016
              </td>
              <td
                style={{
                  paddingLeft: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                <button
                  className="contactBtnGreen"
                  type="button"
                  style={{ minWidth: "5px", marginRight: "2px" }}
                >
                  <label className="table-btnlabel">Contacted</label>
                </button>
                <button
                  className="notConnectedBtnRed"
                  type="button"
                  style={{ marginRight: "2px" }}
                >
                  <label className="table-btnlabel">Not Contacted</label>
                </button>
                <button
                  className="followUpBtnYellow"
                  type="button"
                  style={{ minWidth: "5px" }}
                >
                  <label className="table-btnlabel">Follow Up</label>
                </button>
              </td>
              <td style={{ width: "18%", paddingLeft: "0px" }}>
                <select
                  id="inputState"
                  className="responceDrop-down dropdown-label"
                >
                  <option>Ringing No Response</option>
                  <option>Call Back Later</option>
                  <option>Mobile No Not Reachable</option>
                  <option>No Switched Off</option>
                  <option>Call Disconnected</option>
                  <option>Mobile No Does Not Exist</option>
                  <option>Mobile No Does Not Exist</option>
                  <option>Wrong Mobile Number</option>
                  <option>Customer Was Happy</option>
                  <option>Customer Was Not Happy</option>
                </select>
              </td>
              <td style={{ width: "15%", textAlign: "left", padding: "0px" }}>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  showMonthDropdown
                  showYearDropdown
                  selected={this.state.startDate}
                  onChange={this.DateChange}
                  className="txtStore dateTimeStore"
                  placeholderText="Select Date & Time"
                />
              </td>
              <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                <button
                  className="saveBtn"
                  type="button"
                  style={{ minWidth: "5px", marginRight: "3px" }}
                >
                  <label className="saveLabel">Save</label>
                </button>
                <button className="raisedticket-Btn" type="button">
                  <label className="raise-ticketLbl">Raise Ticket</label>
                </button>
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                Naman Rampal
                <span className="sml-fnt">9873470074</span>
              </td>
              <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                29 April 2016
              </td>
              <td
                style={{
                  paddingLeft: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                <button
                  className="contactBtnGreen"
                  type="button"
                  style={{ minWidth: "5px", marginRight: "2px" }}
                >
                  <label className="table-btnlabel">Contacted</label>
                </button>
                <button
                  className="notConnectedBtnRed"
                  type="button"
                  style={{ marginRight: "2px" }}
                >
                  <label className="table-btnlabel">Not Contacted</label>
                </button>
                <button
                  className="followUpBtnYellow"
                  type="button"
                  style={{ minWidth: "5px" }}
                >
                  <label className="table-btnlabel">Follow Up</label>
                </button>
              </td>
              <td style={{ width: "18%", paddingLeft: "0px" }}>
                <select
                  id="inputState"
                  className="responceDrop-down dropdown-label"
                >
                  <option>Ringing No Response</option>
                  <option>Call Back Later</option>
                  <option>Mobile No Not Reachable</option>
                  <option>No Switched Off</option>
                  <option>Call Disconnected</option>
                  <option>Mobile No Does Not Exist</option>
                  <option>Mobile No Does Not Exist</option>
                  <option>Wrong Mobile Number</option>
                  <option>Customer Was Happy</option>
                  <option>Customer Was Not Happy</option>
                </select>
              </td>
              <td style={{ width: "15%", textAlign: "left", padding: "0px" }}>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  showMonthDropdown
                  showYearDropdown
                  selected={this.state.startDate}
                  onChange={this.DateChange}
                  className="txtStore dateTimeStore"
                  placeholderText="Select Date & Time"
                />
              </td>
              <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                <button
                  className="saveBtn"
                  type="button"
                  style={{ minWidth: "5px", marginRight: "3px" }}
                >
                  <label className="saveLabel">Save</label>
                </button>
                <button className="raisedticket-Btn" type="button">
                  <label className="raise-ticketLbl">Raise Ticket</label>
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                Naman Rampal
                <span className="sml-fnt">9873470074</span>
              </td>
              <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                29 April 2016
              </td>
              <td
                style={{
                  paddingLeft: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                <button
                  className="contactBtnGreen"
                  type="button"
                  style={{ minWidth: "5px", marginRight: "2px" }}
                >
                  <label className="table-btnlabel">Contacted</label>
                </button>
                <button
                  className="notConnectedBtnRed"
                  type="button"
                  style={{ marginRight: "2px" }}
                >
                  <label className="table-btnlabel">Not Contacted</label>
                </button>
                <button
                  className="followUpBtnYellow"
                  type="button"
                  style={{ minWidth: "5px" }}
                >
                  <label className="table-btnlabel">Follow Up</label>
                </button>
              </td>
              <td style={{ width: "18%", paddingLeft: "0px" }}>
                <select
                  id="inputState"
                  className="responceDrop-down dropdown-label"
                >
                  <option>Ringing No Response</option>
                  <option>Call Back Later</option>
                  <option>Mobile No Not Reachable</option>
                  <option>No Switched Off</option>
                  <option>Call Disconnected</option>
                  <option>Mobile No Does Not Exist</option>
                  <option>Mobile No Does Not Exist</option>
                  <option>Wrong Mobile Number</option>
                  <option>Customer Was Happy</option>
                  <option>Customer Was Not Happy</option>
                </select>
              </td>
              <td style={{ width: "15%", textAlign: "left", padding: "0px" }}>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  showMonthDropdown
                  showYearDropdown
                  selected={this.state.startDate}
                  onChange={this.DateChange}
                  className="txtStore dateTimeStore"
                  placeholderText="Select Date & Time"
                />
              </td>
              <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                <button
                  className="saveBtn"
                  type="button"
                  style={{ minWidth: "5px", marginRight: "3px" }}
                >
                  <label className="saveLabel">Save</label>
                </button>
                <button className="raisedticket-Btn" type="button">
                  <label className="raise-ticketLbl">Raise Ticket</label>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CampaignTable1;

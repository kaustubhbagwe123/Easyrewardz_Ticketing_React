import React, { Component } from "react";
import TableArrowIcon from "./../../assets/Images/table-arr.png";
import InfoIcon from "./../../assets/Images/info-icon.png";
import HeadPhone3 from "./../../assets/Images/headphone3.png";

class MyTicketTask extends Component {
  render() {
    return (
      <div>
        <div className="row table-cntr mt-3">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th className="table-img-cntr"></th>
                <th>Task Title</th>
                <th>
                  Department
                  <img src={TableArrowIcon} alt="table-arr-icon" />
                </th>
                <th>
                  Store Code
                  <img src={TableArrowIcon} alt="table-arr-icon" />
                </th>
                <th>
                  Created By
                  <img src={TableArrowIcon} alt="table-arr-icon" />
                </th>
                <th>
                  Creation on
                  <img src={TableArrowIcon} alt="table-arr-icon" />
                </th>
                <th>
                  Assign to
                  <img src={TableArrowIcon} alt="table-arr-icon" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </td>
                <td>
                  <span className="table-btn table-blue-btn">Open</span>
                </td>
                <td className="table-img-cntr"></td>
                <td>Wifi is not working form 5hrs</td>
                <td>
                  Internet
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>2349</td>
                <td>N Rampal</td>
                <td>
                  2 Hour Ago
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>A. Bansal</td>
              </tr>
              <tr>
                <td>
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </td>
                <td>
                  <span className="table-btn table-blue-btn">Open</span>
                </td>
                <td className="table-img-cntr"></td>
                <td>Store door are not working</td>
                <td>
                  hardware
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>2349</td>
                <td>N Rampal</td>

                <td>
                  12 March 2018
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>G. Bansal</td>
              </tr>
              <tr>
                <td>
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </td>
                <td>
                  <span className="table-btn table-green-btn">Solved</span>
                </td>
                <td className="table-img-cntr"></td>
                <td>Supplies are not coming on time</td>
                <td>
                  supply
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>2349</td>
                <td>N Rampal</td>
                <td>
                  12 March 2018
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>G. Bansal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MyTicketTask;

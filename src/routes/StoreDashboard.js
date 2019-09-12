import React, { Component } from "react";
import "../../node_modules/jquery/dist/jquery.js";
import "../../node_modules/popper.js/dist/popper.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.js";
import Demo from '../store/Hashtag.js'
import SearchIcon from './../assets/Images/search-icon.png'
 

class StoreDashboard extends Component {
  render() {
    return (
      <div>
        <section className="dash-cntr">
          <div className="container-fluid btm-mar store-dash-top">
            <div className="row">
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Task</p>
                  <div className="aside-cont">
                    <div>
                      <span className="card-value">10</span>
                      <small>Open</small>
                    </div>
                    <div>
                      <span className="card-value">45</span>
                      <small>Due Today</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Task</p>
                  <div className="aside-cont">
                    <div>
                      <span className="card-value red-clr">40</span>
                      <small>Over-due</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Claim</p>
                  <div className="aside-cont">
                    <div>
                      <span className="card-value">10</span>
                      <small>Open</small>
                    </div>
                    <div>
                      <span className="card-value">45</span>
                      <small>Due Today</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Claim</p>
                  <span className="card-value red-clr">40</span>
                </div>
              </div>
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Campaign</p>
                  <div className="aside-cont">
                    <div>
                      <span className="card-value">60</span>
                      <small>Open</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid btm-mar">
            <div className="row">
              <div className="col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Open Task-Department Wise</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Task by priority</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Open Campaign by type</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Claim Vs Invoice &amp; Article</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Open Claim Stats</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Claim Vs Invoice Amount</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="table-cntr mt-3">
              <ul className="store-dash-tabs">
                <li>
                  <a href={Demo.BLANK_LINK} className="active">
                    Task: <span>06</span>
                  </a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>
                    Claim: <span>05</span>
                  </a>
                </li>
              </ul>
              <div className="store-table-cntr">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>
                        Status
                        {/* <img src="Images/table-arr.png" alt="image missing" /> */}
                      </th>
                      <th>Task Title</th>
                      <th>
                        Department
                        <img src="Images/table-arr.png" alt="table-arr" />
                      </th>
                      <th>
                        Store Name
                        <img src="Images/table-arr.png" alt="table-arr" />
                      </th>
                      <th>
                        Creation on
                        <img src="Images/table-arr.png" alt="table-arr" />
                      </th>
                      <th>
                        Assign to
                        <img src="Images/table-arr.png" alt="table-arr" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Wif is not working form 5hrs</td>
                      <td>
                        Internet
                        <img
                          className="info-icon"
                          src="Images/info-icon.png"
                          alt="info-icon"
                        />
                      </td>
                      <td>BATA1</td>
                      <td>
                        2 Hour Ago
                        <img
                          className="info-icon"
                          src="Images/info-icon.png"
                          alt="info-icon"
                        />
                      </td>
                      <td>A. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Store door are not working</td>
                      <td>
                        Hardware
                        <img
                          className="info-icon"
                          src="Images/info-icon.png"
                          alt="info-icon"
                        />
                      </td>
                      <td>BATA2</td>
                      <td>
                        12 March 2018
                        <img
                          className="info-icon"
                          src="Images/info-icon.png"
                          alt="info-icon"
                        />
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td>Supplies are not coming on time</td>
                      <td>
                        Supply
                        <img
                          className="info-icon"
                          src="Images/info-icon.png"
                          alt="info-icon"
                        />
                      </td>
                      <td>BATA3</td>
                      <td>
                        12 March 2018
                        <img
                          className="info-icon"
                          src="Images/info-icon.png"
                          alt="info-icon"
                        />
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Wif is not working form 5hrs</td>
                      <td>
                        Internet
                        <img
                          className="info-icon"
                          src="Images/info-icon.png"
                          alt="info-icon"
                        />
                      </td>
                      <td>BATA1</td>
                      <td>
                        2 Hour Ago
                        <img
                          className="info-icon"
                          src="Images/info-icon.png"
                          alt="info-icon"
                        />
                      </td>
                      <td>A. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Store door are not working</td>
                      <td>
                        Hardware
                        <img
                          className="info-icon"
                          src="Images/info-icon.png"
                          alt="info-icon"
                        />
                      </td>
                      <td>BATA2</td>
                      <td>
                        12 March 2018
                        <img
                          className="info-icon"
                          src="Images/info-icon.png"
                          alt="info-icon"
                        />
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td>Supplies are not coming on time</td>
                      <td>
                        Supply
                        <img
                          className="info-icon"
                          src="Images/info-icon.png"
                          alt="info-icon"
                        />
                      </td>
                      <td>BATA3</td>
                      <td>
                        12 March 2018
                        <img
                          className="info-icon"
                          src="Images/info-icon.png"
                          alt="info-icon"
                        />
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Store door are not working</td>
                      <td>
                        Hardware
                        <img
                          className="info-icon"
                          src="Images/info-icon.png"
                          alt="info-icon"
                        />
                      </td>
                      <td>BATA2</td>
                      <td>
                        12 March 2018
                        <img
                          className="info-icon"
                          src="Images/info-icon.png"
                          alt="info-icon"
                        />
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                  </tbody>
                </table>
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
                      <a href={Demo.BLANK_LINK}>7</a>
                    </li>
                    <li>
                      <a href={Demo.BLANK_LINK}>&gt;</a>
                    </li>
                  </ul>
                </div>
                <div className="float-search">
                  <small>Search</small>
                  <img
                    className="search-icon"
                    src={SearchIcon}
                    alt="search-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default StoreDashboard;

import React,{Component} from 'react';
import TableArr from "./../../assets/Images/table-arr.png";
import InfoIcon from "./../../assets/Images/info-icon.png";
import Demo from "../../store/Hashtag.js";
import { UncontrolledPopover, PopoverBody } from "reactstrap";

class AssignedToMe extends Component {
    render() {
        return (
          <div>
            <div className="table-cntr">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Task Title</th>
                    <th>
                      Department <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Created By <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Store Name <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Creation on <img src={TableArr} alt="table-arr" />
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
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="AbcInterner"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="AbcInterner"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Internet</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>BATA1</td>
                    <td>
                      ABS
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="ABSStore"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="ABSStore"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Store Name</p>
                              <p className="title">ABS</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>
                      2 Hour Ago
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="hrago2"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="hrago2"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <ul className="dash-creation-popup">
                              <li className="title">Creation details</li>
                              <li>
                                <p>Naman Created</p>
                                <p>2 Hrs ago</p>
                              </li>
                              <li>
                                <p>Assigned to Vikas</p>
                                <p>1.5 Hrs ago</p>
                              </li>
                              <li>
                                <p>Vikas updated</p>
                                <p>1 Hr ago</p>
                              </li>
                              <li>
                                <p>Response time remaining by</p>
                                <p>30 mins</p>
                              </li>
                              <li>
                                <p>Response overdue by</p>
                                <p>1 Hr</p>
                              </li>
                              <li>
                                <p>Resolution overdue by</p>
                                <p>2 Hrs</p>
                              </li>
                            </ul>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
                    <td>
                      <span className="table-btn table-blue-btn">Open</span>
                    </td>
                    <td>Store door are not working</td>
                    <td>
                      Hardware
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="HhhHardware"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="HhhHardware"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Hardware</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>BATA2</td>
                    <td>
                      HHH
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="HHH2Store"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="HHH2Store"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Store Name</p>
                              <p className="title">HHH</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="marchHhr"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="auto"
                          target="marchHhr"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <ul className="dash-creation-popup">
                              <li className="title">Creation details</li>
                              <li>
                                <p>Naman Created</p>
                                <p>2 Hrs ago</p>
                              </li>
                              <li>
                                <p>Assigned to Vikas</p>
                                <p>1.5 Hrs ago</p>
                              </li>
                              <li>
                                <p>Vikas updated</p>
                                <p>1 Hr ago</p>
                              </li>
                              <li>
                                <p>Response time remaining by</p>
                                <p>30 mins</p>
                              </li>
                              <li>
                                <p>Response overdue by</p>
                                <p>1 Hr</p>
                              </li>
                              <li>
                                <p>Resolution overdue by</p>
                                <p>2 Hrs</p>
                              </li>
                            </ul>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
                    <td>
                      <span className="table-btn table-green-btn">Solved</span>
                    </td>
                    <td>Supplies are not coming on time</td>
                    <td>
                      Supply
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="BataSupply"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="BataSupply"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Supply</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>BATA3</td>
                    <td>
                      BATA
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="BATA1Store"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="BATA1Store"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Store Name</p>
                              <p className="title">BATA</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="marchBata"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="auto"
                          target="marchBata"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <ul className="dash-creation-popup">
                              <li className="title">Creation details</li>
                              <li>
                                <p>Naman Created</p>
                                <p>2 Hrs ago</p>
                              </li>
                              <li>
                                <p>Assigned to Vikas</p>
                                <p>1.5 Hrs ago</p>
                              </li>
                              <li>
                                <p>Vikas updated</p>
                                <p>1 Hr ago</p>
                              </li>
                              <li>
                                <p>Response time remaining by</p>
                                <p>30 mins</p>
                              </li>
                              <li>
                                <p>Response overdue by</p>
                                <p>1 Hr</p>
                              </li>
                              <li>
                                <p>Resolution overdue by</p>
                                <p>2 Hrs</p>
                              </li>
                            </ul>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
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
                        src={InfoIcon}
                        alt="info-icon"
                        id="HnmInternet"
                      />
                      <UncontrolledPopover
                        trigger="hover"
                        placement="bottom"
                        target="HnmInternet"
                        className="general-popover created-popover"
                      >
                        <PopoverBody>
                          <div>
                            <p className="sub-title">Department</p>
                            <p className="title">Internet</p>
                          </div>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </td>
                    <td>BATA1</td>
                    <td>
                      HNM
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="HNMStore"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="HNMStore"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Store Name</p>
                              <p className="title">HNM</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>
                      12 March 2018{" "}
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="HnmMarch"
                      />
                      <UncontrolledPopover
                        trigger="hover"
                        placement="auto"
                        target="HnmMarch"
                        className="general-popover created-popover"
                      >
                        <PopoverBody>
                          <ul className="dash-creation-popup">
                            <li className="title">Creation details</li>
                            <li>
                              <p>Naman Created</p>
                              <p>2 Hrs ago</p>
                            </li>
                            <li>
                              <p>Assigned to Vikas</p>
                              <p>1.5 Hrs ago</p>
                            </li>
                            <li>
                              <p>Vikas updated</p>
                              <p>1 Hr ago</p>
                            </li>
                            <li>
                              <p>Response time remaining by</p>
                              <p>30 mins</p>
                            </li>
                            <li>
                              <p>Response overdue by</p>
                              <p>1 Hr</p>
                            </li>
                            <li>
                              <p>Resolution overdue by</p>
                              <p>2 Hrs</p>
                            </li>
                          </ul>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </td>
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
                        src={InfoIcon}
                        alt="info-icon"
                        id="HhhHardware1"
                      />
                      <UncontrolledPopover
                        trigger="hover"
                        placement="bottom"
                        target="HhhHardware1"
                        className="general-popover created-popover"
                      >
                        <PopoverBody>
                          <div>
                            <p className="sub-title">Department</p>
                            <p className="title">Hardware</p>
                          </div>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </td>
                    <td>BATA2</td>
                    <td>
                      HHH
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="HHH1Store"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="HHH1Store"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Store Name</p>
                              <p className="title">HHH</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>
                      12 March 2018
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="Hhh1march"
                      />
                      <UncontrolledPopover
                        trigger="hover"
                        placement="auto"
                        target="Hhh1march"
                        className="general-popover created-popover"
                      >
                        <PopoverBody>
                          <ul className="dash-creation-popup">
                            <li className="title">Creation details</li>
                            <li>
                              <p>Naman Created</p>
                              <p>2 Hrs ago</p>
                            </li>
                            <li>
                              <p>Assigned to Vikas</p>
                              <p>1.5 Hrs ago</p>
                            </li>
                            <li>
                              <p>Vikas updated</p>
                              <p>1 Hr ago</p>
                            </li>
                            <li>
                              <p>Response time remaining by</p>
                              <p>30 mins</p>
                            </li>
                            <li>
                              <p>Response overdue by</p>
                              <p>1 Hr</p>
                            </li>
                            <li>
                              <p>Resolution overdue by</p>
                              <p>2 Hrs</p>
                            </li>
                          </ul>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
                    <td>
                      <span className="table-btn table-green-btn">Solved</span>
                    </td>
                    <td>Store door are not working</td>
                    <td>
                      Supply
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="RRtSupply"
                      />
                      <UncontrolledPopover
                        trigger="hover"
                        placement="bottom"
                        target="RRtSupply"
                        className="general-popover created-popover"
                      >
                        <PopoverBody>
                          <div>
                            <p className="sub-title">Department</p>
                            <p className="title">Supply</p>
                          </div>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </td>
                    <td>BATA3</td>
                    <td>
                      RRT
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="RRTStore"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="RRTStore"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Store Name</p>
                              <p className="title">RRT</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>
                      12 March 2018
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="Rrt3march"
                      />
                      <UncontrolledPopover
                        trigger="hover"
                        placement="auto"
                        target="Rrt3march"
                        className="general-popover created-popover"
                      >
                        <PopoverBody>
                          <ul className="dash-creation-popup">
                            <li className="title">Creation details</li>
                            <li>
                              <p>Naman Created</p>
                              <p>2 Hrs ago</p>
                            </li>
                            <li>
                              <p>Assigned to Vikas</p>
                              <p>1.5 Hrs ago</p>
                            </li>
                            <li>
                              <p>Vikas updated</p>
                              <p>1 Hr ago</p>
                            </li>
                            <li>
                              <p>Response time remaining by</p>
                              <p>30 mins</p>
                            </li>
                            <li>
                              <p>Response overdue by</p>
                              <p>1 Hr</p>
                            </li>
                            <li>
                              <p>Resolution overdue by</p>
                              <p>2 Hrs</p>
                            </li>
                          </ul>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
                    <td>
                      <span className="table-btn table-green-btn">Solved</span>
                    </td>
                    <td>Supplies are not coming on time</td>
                    <td>
                      Hardware
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="HghHardware"
                      />
                      <UncontrolledPopover
                        trigger="hover"
                        placement="bottom"
                        target="HghHardware"
                        className="general-popover created-popover"
                      >
                        <PopoverBody>
                          <div>
                            <p className="sub-title">Department</p>
                            <p className="title">Hardware</p>
                          </div>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </td>
                    <td>BATA3</td>
                    <td>
                      HGH
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="HGHStore"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="HGHStore"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Store Name</p>
                              <p className="title">HGH</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>
                      12 March 2018
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="HGHMarch"
                      />
                      <UncontrolledPopover
                        trigger="hover"
                        placement="auto"
                        target="HGHMarch"
                        className="general-popover created-popover"
                      >
                        <PopoverBody>
                          <ul className="dash-creation-popup">
                            <li className="title">Creation details</li>
                            <li>
                              <p>Naman Created</p>
                              <p>2 Hrs ago</p>
                            </li>
                            <li>
                              <p>Assigned to Vikas</p>
                              <p>1.5 Hrs ago</p>
                            </li>
                            <li>
                              <p>Vikas updated</p>
                              <p>1 Hr ago</p>
                            </li>
                            <li>
                              <p>Response time remaining by</p>
                              <p>30 mins</p>
                            </li>
                            <li>
                              <p>Response overdue by</p>
                              <p>1 Hr</p>
                            </li>
                            <li>
                              <p>Resolution overdue by</p>
                              <p>2 Hrs</p>
                            </li>
                          </ul>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="pagi heightpagination">
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
            </div>
          </div>
        );
    }
}

export default AssignedToMe;
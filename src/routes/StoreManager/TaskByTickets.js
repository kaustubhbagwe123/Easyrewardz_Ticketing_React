import React,{Component} from 'react';
import TableArr from "./../../assets/Images/table-arr.png";
import InfoIcon from "./../../assets/Images/info-icon.png";
import Demo from "../../store/Hashtag.js";
import { UncontrolledPopover, PopoverBody } from "reactstrap";

class TaskByTickets extends Component{
    render() {
        return (
          <div>
            <div className="table-cntr taskByTable">
              <table>
                <thead>
                  <tr>
                    <th>Task ID</th>
                    <th>Ticket ID</th>
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
                    <th>
                      Assign to <img src={TableArr} alt="table-arr" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ABC1234</td>
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
                          id="TaskInternet1"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskInternet1"
                          className="general-popover created-popover">
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Internet</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>A. Bansal</td>
                    <td>ABS
                    <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="TaskABS"
                      />
                       <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskABS"
                          className="general-popover created-popover">
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">ABS</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                    </td>
                    <td>
                      2 Hour Ago
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="Taskhrago2"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="Taskhrago2"
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
                    <td>A. Bansal</td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
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
                          id="TaskHardware1"
                        />
                       <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskHardware1"
                          className="general-popover created-popover">
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Hardware</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>G. Bansal</td>
                    <td>HHH
                    <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="TaskHHH1"
                      />
                       <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskHHH1"
                          className="general-popover created-popover">
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">HHH</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                    </td>
                    <td>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskMarch1"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="auto"
                          target="TaskMarch1"
                          className="general-popover created-popover">
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
                    <td>G. Bansal</td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
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
                          id="TaskSupply1"
                        />
                         <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskSupply1"
                          className="general-popover created-popover">
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Supply</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>                  
                      </div>
                    </td>
                    <td>G. Bansal</td>
                    <td>BATA
                    <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="Taskbata11"
                      />
                       <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="Taskbata11"
                          className="general-popover created-popover">
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">BATA</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>  
                    </td>
                    <td>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskMarch2"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="auto"
                          target="TaskMarch2"
                          className="general-popover created-popover">
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
                    <td>G. Bansal</td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
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
                        id="TaskInternet2"
                      />
                       <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskInternet2"
                          className="general-popover created-popover">
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Internet</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover> 
                    </td>
                    <td>A. Bansal</td>
                    <td>HNM
                    <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="TaskHardware3"
                      />
                    </td>
                    <td>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskMarch3"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="auto"
                          target="TaskMarch3"
                          className="general-popover created-popover">
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
                    <td>A. Bansal</td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
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
                        id="TaskHardware2"
                      />
                       <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskHardware2"
                          className="general-popover created-popover">
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Hardware</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover> 
                    </td>
                    <td>G. Bansal</td>
                    <td>HHH
                    <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="TaskHardware3"
                      />
                    </td>
                    <td>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskMarch4"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="auto"
                          target="TaskMarch4"
                          className="general-popover created-popover">
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
                    <td>G. Bansal</td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
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
                        id="TaskSupply2"
                      />
                         <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskSupply2"
                          className="general-popover created-popover">
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Supply</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover> 
                    </td>
                    <td>G. Bansal</td>
                    <td>RRT
                    <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="TaskHardware3"
                      />
                    </td>
                    <td>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskMarch5"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="auto"
                          target="TaskMarch5"
                          className="general-popover created-popover">
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
                    <td>G. Bansal</td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
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
                        id="TaskHardware3"
                      />
                     <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskHardware3"
                          className="general-popover created-popover">
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Hardware</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover> 
                    </td>
                    <td>BATA3</td>
                    <td>HGH
                    <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="TaskHardware3"
                      />
                    </td>
                    <td>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskMarch6"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="auto"
                          target="TaskMarch6"
                          className="general-popover created-popover">
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
                    <td>G. Bansal</td>
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
export default TaskByTickets;
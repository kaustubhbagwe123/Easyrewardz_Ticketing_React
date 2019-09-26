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
                          id="Internet1"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="Internet1"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Category</p>
                              <p className="title">Defective article</p>
                            </div>
                            <div>
                              <p className="sub-title">Sub Category</p>
                              <p className="title">Customer wants refund</p>
                            </div>
                            <div>
                              <p className="sub-title">Type</p>
                              <p className="title">Delivery</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>BATA1</td>
                    <td>High</td>
                    <td>
                      2 Hour Ago
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-creation-popup dash-popup">
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
                          id="hardware1"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="hardware1"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Category</p>
                              <p className="title">Defective article</p>
                            </div>
                            <div>
                              <p className="sub-title">Sub Category</p>
                              <p className="title">Customer wants refund</p>
                            </div>
                            <div>
                              <p className="sub-title">Type</p>
                              <p className="title">Delivery</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>BATA2</td>
                    <td>High</td>
                    <td>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-creation-popup dash-popup">
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
                          id="supply1"
                        />
                          <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="supply1"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Category</p>
                              <p className="title">Defective article</p>
                            </div>
                            <div>
                              <p className="sub-title">Sub Category</p>
                              <p className="title">Customer wants refund</p>
                            </div>
                            <div>
                              <p className="sub-title">Type</p>
                              <p className="title">Delivery</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>                      
                      </div>
                    </td>
                    <td>BATA3</td>
                    <td>High</td>
                    <td>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-creation-popup dash-popup">
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
                        id="internet2"
                      />
                       <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="internet2"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Category</p>
                              <p className="title">Defective article</p>
                            </div>
                            <div>
                              <p className="sub-title">Sub Category</p>
                              <p className="title">Customer wants refund</p>
                            </div>
                            <div>
                              <p className="sub-title">Type</p>
                              <p className="title">Delivery</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                    </td>
                    <td>BATA1</td>
                    <td>High</td>
                    <td>
                      12 March 2018{" "}
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
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
                        id="hardware5"
                      />
                       <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="hardware5"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Category</p>
                              <p className="title">Defective article</p>
                            </div>
                            <div>
                              <p className="sub-title">Sub Category</p>
                              <p className="title">Customer wants refund</p>
                            </div>
                            <div>
                              <p className="sub-title">Type</p>
                              <p className="title">Delivery</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                    </td>
                    <td>BATA2</td>
                    <td>High</td>
                    <td>
                      12 March 2018{" "}
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
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
                        id="supply2"
                      />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="supply2"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Category</p>
                              <p className="title">Defective article</p>
                            </div>
                            <div>
                              <p className="sub-title">Sub Category</p>
                              <p className="title">Customer wants refund</p>
                            </div>
                            <div>
                              <p className="sub-title">Type</p>
                              <p className="title">Delivery</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                    </td>
                    <td>BATA3</td>
                    <td>High</td>
                    <td>
                      12 March 2018{" "}
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
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
                        id="hardware3"
                      />
                      <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="hardware3"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Category</p>
                              <p className="title">Defective article</p>
                            </div>
                            <div>
                              <p className="sub-title">Sub Category</p>
                              <p className="title">Customer wants refund</p>
                            </div>
                            <div>
                              <p className="sub-title">Type</p>
                              <p className="title">Delivery</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                    </td>
                    <td>BATA3</td>
                    <td>High</td>
                    <td>
                      12 March 2018{" "}
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
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
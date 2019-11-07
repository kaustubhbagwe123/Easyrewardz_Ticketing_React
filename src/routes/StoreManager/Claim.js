import React, { Component, Fragment } from "react";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
// import { history } from "./../../store/history";
import TableArr from "./../../assets/Images/table-arr.png";
import InfoIcon from "./../../assets/Images/info-icon.png";
import HeadphoneImg from "./../../assets/Images/headphone3.png";
import Demo from "../../store/Hashtag";

class Claim extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handlePageChange() {
    this.props.history.push("raiseClaim");
  }
  handleChangeStoreTask = () => {
    this.props.history.push("/store/claimApproveReject");
  };
  render() {
    return (
      <Fragment>
        <div className="store-task-tabs">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#raised-by-me-tab"
                role="tab"
                aria-controls="raised-by-me-tab"
                aria-selected="true"
              >
                Raised by Me
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#assigned-to-me-tab"
                role="tab"
                aria-controls="assigned-to-me-tab"
                aria-selected="false"
              >
                Assigned To Me
              </a>
            </li>
          </ul>
          <button className="butn" onClick={this.handlePageChange.bind(this)}>
            RAISE CLAIM
          </button>
        </div>
        <div className="tab-content store-task-tab-cont">
          <div
            className="tab-pane fade show active"
            id="raised-by-me-tab"
            role="tabpanel"
            aria-labelledby="raised-by-me-tab"
          >
            <div className="main-Claimdiv">
              <div className="table-cntr claimTbl">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Status</th>
                      <th>Claim Issue Type</th>
                      <th>
                        Category <img src={TableArr} alt="table-arr" />
                      </th>
                      <th>
                        Raised by <img src={TableArr} alt="table-arr" />
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
                    <tr onClick={this.handleChangeStoreTask}>
                      <td>
                        <img
                          src={HeadphoneImg}
                          alt="table-arr"
                          className="claim-headPhoneImg"
                        />
                        ABC1234
                      </td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Borken shoes in 30 days</td>
                      <td>
                        Defective article
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
                      <td>N Rampal</td>
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
                      <td>A. Bansal</td>
                    </tr>
                    <tr onClick={this.handleChangeStoreTask}>
                      <td>
                        <img
                          src={HeadphoneImg}
                          alt="table-arr"
                          className="claim-headPhoneImg"
                        />
                        ABC1234
                      </td>
                      <td>
                        <span className="table-btn table-blue-btn">New</span>
                      </td>
                      <td>Wrong Size</td>
                      <td>
                        Defective article
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
                      <td>N Rampal</td>
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
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={HeadphoneImg}
                          alt="table-arr"
                          className="claim-headPhoneImg"
                        />
                        ABC1234
                      </td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td>Broken Shoes In 30 days</td>
                      <td>
                        Defective article
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
                      <td>N Rampal</td>
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
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={HeadphoneImg}
                          alt="table-arr"
                          className="claim-headPhoneImg"
                        />
                        ABC1234
                      </td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>
                        <label>
                          Need to change my shipping address
                          <span className="claim-span">
                            Hope this help, Please rate us
                          </span>
                        </label>
                      </td>
                      <td>
                        Defective article
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
                      <td>N Rampal</td>
                      <td>
                        12 March 2018
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>A. Bansal</td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={HeadphoneImg}
                          alt="table-arr"
                          className="claim-headPhoneImg"
                        />
                        ABC1234
                      </td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>
                        <label>
                          Need to change my shipping address
                          <span className="claim-span">
                            Hope this help, Please rate us
                          </span>
                        </label>
                      </td>
                      <td>
                        Defective article
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
                      <td>N Rampal</td>
                      <td>
                        12 March 2018{" "}
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={HeadphoneImg}
                          alt="table-arr"
                          className="claim-headPhoneImg"
                        />
                        ABC1234
                      </td>
                      <td>
                        <span className="table-btn table-green-btn">NEW</span>
                      </td>
                      <td>
                        <label>
                          Need to change my shipping address
                          <span className="claim-span">
                            Hope this help, Please rate us
                          </span>
                        </label>
                      </td>
                      <td>
                        Defective article
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
                      <td>N Rampal</td>
                      <td>
                        12 March 2018{" "}
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={HeadphoneImg}
                          alt="table-arr"
                          className="claim-headPhoneImg"
                        />
                        ABC1234
                      </td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td>
                        <label>
                          Need to change my shipping address
                          <span className="claim-span">
                            Hope this help, Please rate us
                          </span>
                        </label>
                      </td>
                      <td>
                        Defective article
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
                      <td>N Rampal</td>
                      <td>
                        12 March 2018
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
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
          </div>
          <div
            className="tab-pane fade"
            id="assigned-to-me-tab"
            role="tabpanel"
            aria-labelledby="assigned-to-me-tab"
          >
            2
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Claim;

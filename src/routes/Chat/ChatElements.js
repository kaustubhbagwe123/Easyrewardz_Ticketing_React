import React, { Component, Fragment } from "react";
import Demo from "../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import storeSettings from "./../../assets/Images/store-settings.png";
import { Popover } from "antd";

class ChatElements extends Component {

  hide(e, id) {
    debugger;
    // document.getElementById(id).style.display="none";
    document.getElementById(id).parentElement.parentElement.parentElement.parentElement.parentElement.style.display="none";
  }
  show(e, id) {
    debugger;
    if(document.getElementById(id))    
      // document.getElementById(id).style.display="block";
      document.getElementById(id).parentElement.parentElement.parentElement.parentElement.parentElement.style.display="block";
  }

  render() {
    const dataChatElement = [
      {
        id: "D1",
        eleIcon: (
          <span>
            <div className="chat-elementicon">
              <img
                src={storeSettings}
                alt="store-settings"
                className="chatelementiconimg"
              />
            </div>
          </span>
        ),
        eleCode: "Element_ColMore",
        eleName: "Collect More",
        deactive: (
          <div className="crm-margin-div crm-padding-div">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c1" />
              <label
                htmlFor="Notification-c1"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D2",
        eleIcon: (
          <span>
            <div className="chat-elementicon">
              <img
                src={storeSettings}
                alt="store-settings"
                className="chatelementiconimg"
              />
            </div>
          </span>
        ),
        eleCode: "Element_ViewProf",
        eleName: "View Profile",
        deactive: (
          <div className="crm-margin-div crm-padding-div">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c2" />
              <label
                htmlFor="Notification-c2"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D3",
        eleIcon: (
          <span>
            <div className="chat-elementicon">
              <img
                src={storeSettings}
                alt="store-settings"
                className="chatelementiconimg"
              />
            </div>
          </span>
        ),
        eleCode: "Element_PntBal",
        eleName: "Point Balance",
        deactive: (
          <div className="crm-margin-div crm-padding-div">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c3" />
              <label
                htmlFor="Notification-c3"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D4",
        eleIcon: (
          <span>
            <div className="chat-elementicon">
              <img
                src={storeSettings}
                alt="store-settings"
                className="chatelementiconimg"
              />
            </div>
          </span>
        ),
        eleCode: "Element_AvailCpn",
        eleName: "Available Coupons",
        deactive: (
          <div className="crm-margin-div crm-padding-div">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c4" />
              <label
                htmlFor="Notification-c4"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D5",
        eleIcon: (
          <span>
            <div className="chat-elementicon">
              <img
                src={storeSettings}
                alt="store-settings"
                className="chatelementiconimg"
              />
            </div>
          </span>
        ),
        eleCode: "Element_GVs",
        eleName: "Available GVs",
        deactive: (
          <div className="crm-margin-div crm-padding-div">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c5" />
              <label
                htmlFor="Notification-c5"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D6",
        eleIcon: (
          <span>
            <div className="chat-elementicon">
              <img
                src={storeSettings}
                alt="store-settings"
                className="chatelementiconimg"
              />
            </div>
          </span>
        ),
        eleCode: "Element_ReqEPIN",
        eleName: "Request EPIN",
        deactive: (
          <div className="crm-margin-div crm-padding-div">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c6" />
              <label
                htmlFor="Notification-c6"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D7",
        eleIcon: (
          <span>
            <div className="chat-elementicon">
              <img
                src={storeSettings}
                alt="store-settings"
                className="chatelementiconimg"
              />
            </div>
          </span>
        ),
        eleCode: "Element_FAQ",
        eleName: "FAQ",
        deactive: (
          <div className="crm-margin-div crm-padding-div">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c7" />
              <label
                htmlFor="Notification-c7"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D8",
        eleIcon: (
          <span>
            <div className="chat-elementicon">
              <img
                src={storeSettings}
                alt="store-settings"
                className="chatelementiconimg"
              />
            </div>
          </span>
        ),
        eleCode: "Element_Sub/Unsub",
        eleName: "Subscribe/Unsubscribe",
        deactive: (
          <div className="crm-margin-div crm-padding-div">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c8" />
              <label
                htmlFor="Notification-c8"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D9",
        eleIcon: (
          <span>
            <div className="chat-elementicon">
              <img
                src={storeSettings}
                alt="store-settings"
                className="chatelementiconimg"
              />
            </div>
          </span>
        ),
        eleCode: "Element_WhaNew",
        eleName: "What's New",
        deactive: (
          <div className="crm-margin-div crm-padding-div">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c9" />
              <label
                htmlFor="Notification-c9"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D10",
        eleIcon: (
          <span>
            <div className="chat-elementicon">
              <img
                src={storeSettings}
                alt="store-settings"
                className="chatelementiconimg"
              />
            </div>
          </span>
        ),
        eleCode: "Element_Fdk",
        eleName: "Feedback",
        deactive: (
          <div className="crm-margin-div crm-padding-div">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c10" />
              <label
                htmlFor="Notification-c10"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D11",
        eleIcon: (
          <span>
            <div className="chat-elementicon">
              <img
                src={storeSettings}
                alt="store-settings"
                className="chatelementiconimg"
              />
            </div>
          </span>
        ),
        eleCode: "Element_Rev",
        eleName: "Review",
        deactive: (
          <div className="crm-margin-div crm-padding-div">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c11" />
              <label
                htmlFor="Notification-c11"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D12",
        eleIcon: (
          <span>
            <div className="chat-elementicon">
              <img
                src={storeSettings}
                alt="store-settings"
                className="chatelementiconimg"
              />
            </div>
          </span>
        ),
        eleCode: "Element_Poll",
        eleName: "Poll",
        deactive: (
          <div className="crm-margin-div crm-padding-div">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c12" />
              <label
                htmlFor="Notification-c12"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D13",
        eleIcon: (
          <span>
            <div className="chat-elementicon">
              <img
                src={storeSettings}
                alt="store-settings"
                className="chatelementiconimg"
              />
            </div>
          </span>
        ),
        eleCode: "Element_Survey",
        eleName: "Survey",
        deactive: (
          <div className="crm-margin-div crm-padding-div">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c13" />
              <label
                htmlFor="Notification-c13"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D14",
        eleIcon: (
          <span>
            <div className="chat-elementicon">
              <img
                src={storeSettings}
                alt="store-settings"
                className="chatelementiconimg"
              />
            </div>
          </span>
        ),
        eleCode: "Element_StoLoc",
        eleName: "Store Locator",
        deactive: (
          <div className="crm-margin-div crm-padding-div">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c14" />
              <label
                htmlFor="Notification-c14"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      }
    ];

    const columnsChatElement = [
      {
        Header: (
          <span>
            Element Icon
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "eleIcon"
      },
      {
        Header: (
          <span>
            Element Code
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "eleCode"
      },
      {
        Header: (
          <span>
            Element Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "eleName"
      },
      {
        Header: (
          <span>
            Activate/Deactivate
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "deactive"
      },
      {
        Header: <span>Actions</span>,
        accessor: "actiondept",
        // Cell: row => (
        //   <button className="react-tabel-button">
        //     <label className="Table-action-edit-button-text">EDIT</label>
        //   </button>
        // )
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>
              <Popover content={<div className={"edtpadding"} id={"edtpadding"+ids }>
                <div className="d-flex">
                  <div>
                    <div className="">
                      <label className="popover-header-text">EDIT ELEMENT</label>
                    </div>
                    <div className="pop-over-div">
                      <label className="edit-label-1">Element Code</label>
                      <input
                        type="text"
                        className="txt-edit-popover"
                        placeholder="Enter Element Code"
                        maxLength={10}
                      />
                    </div>
                    <div className="pop-over-div">
                      <label className="edit-label-1">Element Name</label>
                      <input
                        type="text"
                        className="txt-edit-popover"
                        placeholder="Enter Element Name"
                        maxLength={25}
                      />
                    </div>
                    <div className="pop-over-div" style={{ width: "170px" }}>
                      <label className="edit-label-1">Element Icon</label>
                      <div class="custom-file txt-edit-popover">
                        <input type="file" className="custom-file-input" />
                        <label className="custom-file-label">Element_Icon.png</label>
                      </div>
                    </div>
                    <br />
                    <div>
                      <a className="pop-over-cancle canblue" id="can1" onClick={() => this.hide(this, "edtpadding"+ids)}>CANCEL</a>
                      <button className="pop-over-button">
                        SAVE
            </button>
                    </div>
                  </div>
                </div>
              </div>} placement="bottom" trigger="click">
                <button className="react-tabel-button editre" id={ids} onClick={() => this.show(this, "edtpadding"+ids)}>
                  EDIT
                </button>
              </Popover>
            </div>
          );
        }
      }
    ];
   

    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
            Chat
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            Elements
          </Link>
        </div>

        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height ChatElementReact">
                  <ReactTable
                    data={dataChatElement}
                    columns={columnsChatElement}
                    // resizable={false}
                    defaultPageSize={15}
                    showPagination={false}
                  />
                  <div className="position-relative1">
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
                          <a href={Demo.BLANK_LINK}>&gt;</a>
                        </li>
                      </ul>
                    </div>
                    <div className="item-selection">
                      <select>
                        <option>30</option>
                        <option>50</option>
                        <option>100</option>
                      </select>
                      <p>Items per page</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="create-department">CREATE ELEMENT</label>
                    <div className="div-padding-1">
                      <label className="designation-name">Element Code</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Element Code"
                        maxLength={10}
                      />
                    </div>
                    <div className="divSpace">
                      <div className="">
                        <label className="reports-to">Element Name</label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enter Element Name"
                          maxLength={25}
                        />
                      </div>
                    </div>
                    <div className="" style={{ marginBottom: "15px" }}>
                      <label className="reports-to">Element Icon</label>
                      <div class="custom-file">
                        <input type="file" className="custom-file-input" />
                        <label className="custom-file-label">
                          Element_Icon.png
                        </label>
                      </div>
                      {/* <div>
                        <button type="button" className="chatelementbrowse">
                            Browse
                        </button>
                        </div> */}
                    </div>
                    <div className="btnSpace">
                      <button className="CreateADDBtn">
                        ADD
                      </button>
                    </div>
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

export default ChatElements;

import React, { Component, Fragment } from "react";
import Demo from "../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";

class ChatThemes extends Component {
  hide(e, id) {
    // document.getElementById(id).style.display="none";
    document.getElementById(
      id
    ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
      "none";
  }
  show(e, id) {
    if (document.getElementById(id))
      // document.getElementById(id).style.display="block";
      document.getElementById(
        id
      ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
        "block";
  }
  render() {
    const dataChatRules = [
      {
        id: "D1",
        themeCode: "Theme_Arbo",
        themeName: "Arbo Cement",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c1" />
              <label
                htmlFor="Notification-c1"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        ),
      },
      {
        id: "D2",
        themeCode: "Theme_Boo",
        themeName: "BooCosmos",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c2" />
              <label
                htmlFor="Notification-c2"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        ),
      },
      {
        id: "D3",
        themeCode: "Theme_Arch",
        themeName: "Archstone",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c3" />
              <label
                htmlFor="Notification-c3"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        ),
      },
      {
        id: "D4",
        themeCode: "Theme_Boost",
        themeName: "Boost",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c4" />
              <label
                htmlFor="Notification-c4"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        ),
      },
      {
        id: "D5",
        themeCode: "Theme_CC",
        themeName: "Cream City",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c5" />
              <label
                htmlFor="Notification-c5"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        ),
      },
      {
        id: "D6",
        themeCode: "Theme_EMt",
        themeName: "EMinente",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c6" />
              <label
                htmlFor="Notification-c6"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        ),
      },
      {
        id: "D7",
        themeCode: "Theme_F&F",
        themeName: "Floss & Flirt",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c7" />
              <label
                htmlFor="Notification-c7"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        ),
      },
      {
        id: "D8",
        themeCode: "Theme_Dellin",
        themeName: "Dellin",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c8" />
              <label
                htmlFor="Notification-c8"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        ),
      },
      {
        id: "D9",
        themeCode: "Theme_Emp",
        themeName: "Empire",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c9" />
              <label
                htmlFor="Notification-c9"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        ),
      },
      {
        id: "D10",
        themeCode: "Theme_Flo",
        themeName: "Flourish",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c9" />
              <label
                htmlFor="Notification-c9"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        ),
      },
      {
        id: "D11",
        themeCode: "Theme_De",
        themeName: "De'pise",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c9" />
              <label
                htmlFor="Notification-c9"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        ),
      },
      {
        id: "D12",
        themeCode: "Theme_En",
        themeName: "Enclave",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c9" />
              <label
                htmlFor="Notification-c9"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        ),
      },
    ];

    const columnsChatRules = [
      {
        Header: (
          <span>
            Theme Code
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "themeCode",
      },
      {
        Header: (
          <span>
            Theme Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "themeName",
      },
      {
        Header: (
          <span>
            Activate/Deactivate
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "deactive",
      },
      {
        Header: <span>Actions</span>,
        accessor: "actiondept",
        Cell: (row) => {
          var ids = row.original["id"];
          return (
            <div>
              <Popover
                content={
                  <div className="edtpadding" id={"edtpadding" + ids}>
                    <div className="d-flex">
                      <div>
                        <div className="">
                          <label className="popover-header-text">
                            EDIT THEME
                          </label>
                        </div>
                        <div className="pop-over-div">
                          <label className="edit-label-1">Theme Code</label>
                          <input
                            type="text"
                            className="txt-edit-popover"
                            placeholder="Enter Theme Code"
                            maxLength={10}
                          />
                        </div>
                        <div className="pop-over-div">
                          <label className="edit-label-1">Theme Name</label>
                          <input
                            type="text"
                            className="txt-edit-popover"
                            placeholder="Enter Theme Name"
                            maxLength={25}
                          />
                        </div>
                        <div
                          className="pop-over-div"
                          style={{ width: "170px" }}
                        >
                          <label className="edit-label-1">Theme Icon</label>
                          <div className="custom-file txt-edit-popover">
                            <input type="file" className="custom-file-input" />
                            <label className="custom-file-label">
                              Theme.png
                            </label>
                          </div>
                        </div>
                        <br />
                        <div>
                          <a
                            href="#!"
                            className="pop-over-cancle canblue"
                            onClick={() => this.hide(this, "edtpadding" + ids)}
                          >
                            CANCEL
                          </a>
                          <button className="pop-over-button">SAVE</button>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                placement="bottom"
                trigger="click"
              >
                <button
                  className="react-tabel-button editre"
                  id={ids}
                  onClick={() => this.show(this, "edtpadding" + ids)}
                >
                  EDIT
                </button>
              </Popover>
            </div>
          );
        },
      },
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
            Themes
          </Link>
        </div>

        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height chatThemes ChatElementReact">
                  <ReactTable
                    data={dataChatRules}
                    columns={columnsChatRules}
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
                    <label className="create-department">CREATE THEME</label>
                    <div className="div-padding-1">
                      <label className="designation-name">Theme Code</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Theme Code"
                        maxLength={10}
                      />
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Theme Name</label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enter Theme Name"
                          maxLength={25}
                        />
                      </div>
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">
                        Theme Style{" "}
                        <span className="chat-file-upl">(CSS File Only)</span>
                      </label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" />
                        <label className="custom-file-label">
                          bata_branding.css
                        </label>
                      </div>
                    </div>
                    <div className="btnSpace">
                      <button className="CreateADDBtn">ADD</button>
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

export default ChatThemes;

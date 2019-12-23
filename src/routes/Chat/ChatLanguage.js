import React, { Component, Fragment } from "react";
import Demo from "../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import storeSettings from "./../../assets/Images/store-settings.png";

class ChatLanguage extends Component {
  render() {
    const dataChatLanguage = [
      {
        id: "D1",
        langIcon: (
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
        langCode: "Lang_Hindi",
        langName: "Hindi",
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
        langIcon: (
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
        langCode: "Lang_English",
        langName: "English",
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
        langIcon: (
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
        langCode: "Lang_Assamese",
        langName: "Assamese",
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
        langIcon: (
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
        langCode: "Lang_Bengali",
        langName: "Bengali",
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
        langIcon: (
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
        langCode: "Lang_Gujarati",
        langName: "Gujarati",
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
        langIcon: (
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
        langCode: "Lang_Kannada",
        langName: "Kannada",
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
        langIcon: (
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
        langCode: "Lang_Malayalam",
        langName: "Malayalam",
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
        langIcon: (
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
        langCode: "Lang_Marathi",
        langName: "Marathi",
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
        langIcon: (
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
        langCode: "Lang_Odia",
        langName: "Odia",
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
        langIcon: (
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
        langCode: "Lang_Punjabi",
        langName: "Punjabi",
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
        langIcon: (
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
        langCode: "Lang_Tamil",
        langName: "Tamil",
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
        langIcon: (
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
        langCode: "Lang_Telugu",
        langName: "Telugu",
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
        langIcon: (
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
        langCode: "Lang_Urdu",
        langName: "Urdu",
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
      }
    ];

    const columnsChatLanguage = [
      {
        Header: (
          <span>
            Language Icon
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "langIcon"
      },
      {
        Header: (
          <span>
            Language Code
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "langCode"
      },
      {
        Header: (
          <span>
            Language Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "langName"
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
        Cell: row => (
          <button className="react-tabel-button">
            <label className="Table-action-edit-button-text">EDIT</label>
          </button>
        )
        //   Cell: row => {
        //     var ids = row.original["id"];
        //     return (
        //       <div>

        //         <Popover content={QaCrmEdit} placement="bottom">
        //           <button className="react-tabel-button" id={ids}>
        //             <label className="Table-action-edit-button-text">EDIT</label>
        //           </button>
        //         </Popover>
        //       </div>
        //     );
        //   }
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
            Language
          </Link>
        </div>

        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height ChatElementReact">
                  <ReactTable
                    data={dataChatLanguage}
                    columns={columnsChatLanguage}
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
                    <label className="create-department">CREATE LANGUAGE</label>
                    <div className="div-padding-1">
                      <label className="designation-name">Language Code</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Language Code"
                      />
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Language Name</label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enter Language Name"
                        />
                      </div>
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">Language Icon</label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" />
                        <label className="custom-file-label">
                          Language_Icon.png
                        </label>
                      </div>

                    </div>
                    <div className="btnSpace">
                      <button className="CreateADDBtn">
                        <label className="addLable">ADD</label>
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

export default ChatLanguage;

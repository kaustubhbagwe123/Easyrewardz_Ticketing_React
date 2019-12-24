import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import InfoIcon from "./../../assets/Images/info-icon.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import Demo from "./../../store/Hashtag.js";

class MyTicketDraft extends Component {
    render() {

        const dataDraft = [
            {
                statusNew: (
                            <span className="table-b table-blue-btn">
                            <label>Open</label>
                            </span>
                            ),   
            },
            {
                statusNew: (
                            <span className="table-b table-yellow-btn">
                            <label>New</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-b table-green-btn">
                            <label>Solved</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-b table-blue-btn">
                            <label>Open</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-b table-blue-btn">
                            <label>Open</label>
                            </span>
                           ),
            }
            
          ];
      
          const columnsDraft = [
            {
              Header: <span>TicketTitle</span>,
              accessor: "idNew",
                        Cell:props => 
                        <span>
                            <label>Need to change my shipping address</label>
                        </span>
            },
            {
              Header: <span>TicketDetail</span>,
              accessor: "ticketDet",
                         Cell:props =>
                         <label>Need to change my shipping address
                         Need to change my shipping address
                         </label>
            },
            {
                Header: <span>Category <FontAwesomeIcon icon={faCaretDown} /></span>,
                accessor: "categoryNew",
                        Cell:props =>
                            <span>
                               <label>Defective article </label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
                            </span>
            },
            {
                Header: <span>Draft Creation Date<FontAwesomeIcon icon={faCaretDown} /></span>,
                accessor: "creationNew",
                        Cell:props =>
                        <span>
                            <label>13 May 2049</label>
                        </span>
            },
          ];
          const DefArti = (
            <div className="dash-creation-popup-cntr">
              <ul className="dash-category-popup dashnewpopup">
                <li>
                  <p>Category</p>
                  <p>Defective article</p>
                </li>
                <li>
                  <p>Sub Category</p>
                  <p>Customer wants refund</p>
                </li>
                <li>
                  <p>Type</p>
                  <p>Delivery</p>
                </li>
              </ul>
            </div>
          );
        return (
            <Fragment>
                 <div className="newReact"> 
                <ReactTable
                    data={dataDraft}
                    columns={columnsDraft}
                    // resizable={false}
                    defaultPageSize={5}
                    showPagination={false}
                />
                 <div className="position-relative">
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
            </Fragment>
        )
    }
}

export default MyTicketDraft

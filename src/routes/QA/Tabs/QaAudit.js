import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import InfoIcon from "./../../../assets/Images/info-icon.png";
import HeadPhone3 from "./../../../assets/Images/headphone3.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Demo from '../../../store/Hashtag';


class QaAudit extends Component {
    render() {
        const dataaudit = [
            {
                statusNew: (
                            <span className="table-ba Qatable-green-btn">
                            <label>AUDIT DONE</label>
                            </span>
                            ),   
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-green-btn">
                            <label>AUDIT DONE</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-green-btn">
                            <label>AUDIT DONE</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-green-btn">
                            <label>AUDIT DONE</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-green-btn">
                            <label>AUDIT DONE</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-green-btn">
                            <label>AUDIT DONE</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-green-btn">
                            <label>AUDIT DONE</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-green-btn">
                            <label>AUDIT DONE</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-green-btn">
                            <label>AUDIT DONE</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-green-btn">
                            <label>AUDIT DONE</label>
                            </span>
                           ),
            }
         
          ];
      
          const columnsaudit = [
            {
              Header: <span>ID</span>,
              accessor: "idNew",
                        Cell:props => 
                        <span>
                            <img src={HeadPhone3} alt="HeadPhone" className="headPhone3"/>
                            ABC1234
                        </span>
            },
            {
              Header: <span>Status <FontAwesomeIcon icon={faCaretDown} /></span>,
              accessor: "statusNew"
            },
            {
              Header: <span>Subject<span style={{fontWeight:"bold",fontSize:"13px !important"}}>/Lastest Message</span></span>,
              accessor: "subjectNew",
                      Cell:props =>
                        <label>Need to change my shipping address{" "}
                                <span style={{display:"block"}}>Hope this help, Please rate us</span>
                        </label>
            },
            {
                Header: <span>Category <FontAwesomeIcon icon={faCaretDown} /></span>,
                accessor: "categoryNew",
                        Cell:props =>
                            <span>
                                <label>Defective article{" "}</label>
                                <img className="info-icon" src={InfoIcon} alt="info-icon" />
                            </span>
            },
            {
                Header: <span>Priority <FontAwesomeIcon icon={faCaretDown} /></span>,
                accessor: "priorityNew",
                        Cell:props =>
                        <span>High</span>
            },
            {
                Header: <span>Assigne <FontAwesomeIcon icon={faCaretDown} /></span>,
                accessor: "assigneeNew",
                        Cell:props =>
                        <span>Naman</span>
            },
            {
                Header: <span>Creation On <FontAwesomeIcon icon={faCaretDown} /></span>,
                accessor: "creationNew",
                        Cell:props =>
                        <span>
                            <label>13 May 2049</label>
                            <img className="info-icon" src={InfoIcon} alt="info-icon"/>
                        </span>
            },
          ];

        return (
            <Fragment>
            <div className="newReact"> 
            <ReactTable
                data={dataaudit}
                columns={columnsaudit}
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

export default QaAudit;

import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import HeadPhone3 from "./../../assets/Images/headphone3.png";
import InfoIcon from "./../../assets/Images/info-icon.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MyTicketClosed extends Component {
    render() {

        const dataClose = [
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
            },
            {
                statusNew: (
                            <span className="table-b table-yellow-btn">
                            <label>Open</label>
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
            },
            {
                statusNew: (
                            <span className="table-b table-yellow-btn">
                            <label>New</label>
                            </span>
                           )                
            }
          ];
      
          const columnsClose = [
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
                    data={dataClose}
                    columns={columnsClose}
                    // resizable={false}
                    defaultPageSize={5}
                    showPagination={true}
                />
                </div>
                </Fragment>
        )
    }
}

export default MyTicketClosed

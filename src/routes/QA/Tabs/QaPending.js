import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import InfoIcon from "./../../../assets/Images/info-icon.png";
import HeadPhone3 from "./../../../assets/Images/headphone3.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class QaPending extends Component {
    render() {

        const datapending = [
            {
                statusNew: (
                            <span className="table-ba Qatable-blue-btn">
                            <label>PENDING</label>
                            </span>
                            ),   
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-blue-btn">
                            <label>PENDING</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-blue-btn">
                            <label>PENDING</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-blue-btn">
                            <label>PENDING</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-blue-btn">
                            <label>PENDING</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-blue-btn">
                            <label>PENDING</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-blue-btn">
                            <label>PENDING</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-blue-btn">
                            <label>PENDING</label>
                            </span>
                           ),
            },
            {
                statusNew: (
                            <span className="table-ba Qatable-blue-btn">
                            <label>PENDING</label>
                            </span>
                           ),
            }
         
          ];
      
          const columnspending = [
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
                    data={datapending}
                    columns={columnspending}
                    // resizable={false}
                    defaultPageSize={5}
                    showPagination={true}
                />
                </div>
            </Fragment>
        )
    }
}

export default QaPending;

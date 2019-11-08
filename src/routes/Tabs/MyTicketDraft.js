import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import InfoIcon from "./../../assets/Images/info-icon.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                                <label>Defective article{" "}</label>
                                <img className="info-icon" src={InfoIcon} alt="info-icon" />
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

        return (
            <Fragment>
                 <div className="newReact"> 
                <ReactTable
                    data={dataDraft}
                    columns={columnsDraft}
                    // resizable={false}
                    defaultPageSize={5}
                    showPagination={true}
                />
                </div>
            </Fragment>
        )
    }
}

export default MyTicketDraft

import React, { Component } from "react";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "react-table/react-table.css";
import Braille from "./../assets/Images/braille.svg";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
 
const SortableItem = SortableElement(({value}) => <li>{value}</li>);
const SortableList = SortableContainer(({items}) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </ul>
    );
  });

class abc extends Component {
        state = {
            data : [
                {
                  sort: "",
                  name: "Tanner Linsley",
                  age: 26,
                  friend: {
                    name: "Jason Maurer",
                    age: 23
                  },
                 
                },
                {
                  sort: "",
                  name: "sfdsf",
                  age: 24345,
                  friend: {
                    name: "dsfsdfr",
                    age: 333323
                  },
                 
                },
                {
                  sort: "",
                  name: "sfdsf",
                  age: 24365,
                  friend: {
                    name: "dsfsdfr",
                    age: 333323
                  },
                 
                },
                {
                  sort: "",
                  name: "sfdsf",
                  age: 24335,
                  friend: {
                    name: "dsfsdfr",
                    age: 333323
                  },
                
                }
              ],
              items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
        }
        onSortEnd = ({oldIndex, newIndex}) => {
            this.setState(({items}) => ({
              items: arrayMove(items, oldIndex, newIndex),
            }));
          };
  render() {
    // const data = [
    //   {
    //     sort: "",
    //     name: "Tanner Linsley",
    //     age: 26,
    //     friend: {
    //       name: "Jason Maurer",
    //       age: 23
    //     },
    //     Action: (
    //       <button className="react-tabel-button">
    //         <label className="Table-action-edit-button-text">EDIT</label>
    //       </button>
    //     )
    //   },
    //   {
    //     sort: "",
    //     name: "sfdsf",
    //     age: 24345,
    //     friend: {
    //       name: "dsfsdfr",
    //       age: 333323
    //     },
    //     Action: (
    //       <button className="react-tabel-button">
    //         <label className="Table-action-edit-button-text">EDIT</label>
    //       </button>
    //     )
    //   },
    //   {
    //     sort: "",
    //     name: "sfdsf",
    //     age: 24365,
    //     friend: {
    //       name: "dsfsdfr",
    //       age: 333323
    //     },
    //     Action: (
    //       <button className="react-tabel-button">
    //         <label className="Table-action-edit-button-text">EDIT</label>
    //       </button>
    //     )
    //   },
    //   {
    //     sort: "",
    //     name: "sfdsf",
    //     age: 24335,
    //     friend: {
    //       name: "dsfsdfr",
    //       age: 333323
    //     },
    //     Action: (
    //       <button className="react-tabel-button">
    //         <label className="Table-action-edit-button-text">EDIT</label>
    //       </button>
    //     )
    //   }
    // ];
    const columns = [
      {
        Header: <span className="rt-th"></span>,
        accessor: "sort", // String-based value accessors!
        Cell: cellInfo => <img src={Braille} alt="braille-icon" />,
        className: "rt-tableMoveImge",
        sortable: false
      },
      {
        Header: (
          <span className="rt-resizable-header"> 
            Namess
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "name"
      },
      {
        Header: (
          <span>
            Age
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "age",
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        id: "friendName", // Required because our accessor is not a string
        Header: (
          <span>
            Friend Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: d => d.friend.name // Custom value accessors!
      },
      {
        Header: props => (
          <span>
            Friend Age
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ), // Custom header components!
        accessor: "friend.age"
      },
      {
        Header: "Action",
        accessor: "Action",
        sortable: false,
        className:'btn-padding-rTbale',
        Cell:cellInfo => <button className="react-tabel-button">
        <label className="Table-action-edit-button-text">EDIT</label>
      </button>
      }
    ];
     return (
       <div className="container-fluid">
         <div className="store-settings-cntr">
           <div className="col-md-8">
             <div className="table-cntr table-height">
               <ReactTable
                 data={this.state.data}
                 columns={columns}
                 showPaginationBottom={false}
                 defaultPageSize={5}
                 resizable={false}
                 className="rt-td"
                 headerClassName="rt-thead -header"
               />
               <SortableList
                 items={this.state.items}
                 onSortEnd={this.onSortEnd.bind(this)}
               />
             </div>
           </div>
         </div>
       </div>
     );
  }
}

export default abc;

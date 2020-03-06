import React, { Component,useState } from "react";
import Demo from "../../../store/Hashtag";
import Modal from "react-responsive-modal";
import Sorting from "./../../../assets/Images/sorting.png";
import ReactTable from "react-table";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import FileUpload from "./../../../assets/Images/file.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { Popover } from "antd";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import config from "../../../helpers/config";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { authHeader } from "../../../helpers/authHeader";
import ActiveStatus from "../../activeStatus";
import { CSVLink } from "react-csv";



const MyButton = props => {

  const { children } = props;
  return (
    <div style={{ cursor: "pointer" }} {...props}>
      <button className="react-tabel-button" id="p-edit-pop-2">
        <label className="Table-action-edit-button-text">
          {children}
        </label>
      </button>
    </div>
  );
};

const Content = props => {
  debugger
  const { rowData } = props
  const [designationName, setDesignationvalue] = useState(rowData.designationName);
  const [reportTo, setreportToValue] = useState(rowData.reportToDesignation);
  const [status, setStatusValue] = useState(rowData.status);
  const [designationID] = useState(rowData.designationID);

  props.callBackEdit(designationName, reportTo, status,designationID);
  return (

    <div className="edtpadding">
                                      <label className="popover-header-text">
                                        EDIT HIERARCHY
                                      </label>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Designation Name
                                        </label>
                                        <input
                                          type="text"
                                          className="txt-edit-popover"
                                          placeholder="Enter Designation Name"
                                          maxLength={25}
                                          name="designation_Name"
                                          value={
                                            designationName
                                          }
                                          onChange={e => setDesignationvalue(e.target.value)}
                                        />
                                        {designationName === "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {props.editdesignationNameCompulsion}
                    </p>
                  )}
                                        
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Report To
                                        </label>
                                        <select
                                          className="edit-dropDwon dropdown-setting"
                                          name="report_To"
                                          value={
                                            reportTo
                                          }
                                          //onChange={this.handleOnChangeData}
                                          onChange={e => setreportToValue(e.target.value)}
                                        >
                                          <option>select</option>
                                          <option value={0}>Root</option>
                                          {props.reportToData !== null &&
                                            props.reportToData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.designationID}
                                                >
                                                  {item.designationName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        {reportTo === "select" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {props.editreportToCompulsion}
                    </p>
                  )}
                                        
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Status
                                        </label>
                                        <select
                                          className="edit-dropDwon dropdown-setting"
                                          name="designation_status"
                                          value={
                                            status
                                          }
                                          onChange={e => setStatusValue(e.target.value)}
                                        >
                                          <option>select</option>
                                          {props.activeData !== null &&
                                            props.activeData.map(
                                              (item, j) => (
                                                <option
                                                  key={j}
                                                  value={item.ActiveID}
                                                >
                                                  {item.ActiveName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        {status === "select" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {props.editstatusCompulsion}
                    </p>
                  )}
                                        
                                      </div>
                                      <br />
                                      <div>
                                        <a
                                          className="pop-over-cancle canblue"
                                          href={Demo.BLANK_LINK}
                                        >
                                          CANCEL
                                        </a>
                                        <button
                                          className="pop-over-button"
                                          // type="button"
                                          // onClick={this.handleUpdateHierarchyData.bind(
                                          //   this,
                                          //   ids
                                          // )}
                                        >

                                          <label className="pop-over-btnsave-text" onClick={(e) => { props.handleUpdateHierarchyData(e, designationID) }}>SAVE</label>
                                        </button>
                                      </div>
                                    </div>
   
  );
}





class TicketHierarchy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      isOpen: false,
      StatusModel: false,
      designation_name: "",
      selectReportTo: 0,
      selectStatus: 0,
      hierarchyData: [],
      reportToData: [],
      activeData: ActiveStatus(),
      hierarchyEditData: {},
      designationNameCompulsion:"",
      reportToCompulsion:"",
      statusCompulsion:"",
      editdesignationNameCompulsion: "Designation Name field is compulsory.",
      editreportToCompulsion:"ReportTo field is compulsory.",
      editstatusCompulsion: "Status field is compulsory.",
      sortAllData:[],
      sortDesignation:[],
      sortReportTo:[],
      sortColumn:"",
      designationColor:"",
      reportToColor:"",
      updateDesignation:"",
      updateReprtTo:"",
      updateStatus:"",
      rowData: {}
    };
    this.togglePopover = this.togglePopover.bind(this);
    this.handleGetHierarchyData = this.handleGetHierarchyData.bind(this);
    this.hanldeGetReportListDropDown = this.hanldeGetReportListDropDown.bind(
      this
    );
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
  }
  callBackEdit = (designationName, reportTo, status, rowData) => {
    debugger;
    // this.setState({RoleName,updateRoleisActive:Status})
    this.state.updateDesignation = designationName;
    this.state.updateReprtTo = reportTo;
    this.state.updateStatus = status;
    this.state.rowData = rowData;
  }

  togglePopover() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  hide(e, id) {
    debugger;
    // document.getElementById(id).style.display="none";
    document.getElementById(id).parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none";
  }
  show(e, id) {
    debugger;
    if (document.getElementById(id))
      // document.getElementById(id).style.display="block";
      document.getElementById(id).parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "block";
  }
  componentDidMount() {
    this.handleGetHierarchyData();
    this.hanldeGetReportListDropDown();
  }
  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.hierarchyData;

    itemsArray.sort(function(a, b)  {
      return    a.ticketStatus > b.ticketStatus ? 1:-1;
        });

    

    this.setState({
      hierarchyData: itemsArray
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.hierarchyData;
    itemsArray.sort((a, b)=> {
      return a.ticketStatus < b.ticketStatus
         
      
    });
    this.setState({
      hierarchyData: itemsArray
    });
    this.StatusCloseModel();
  }

  StatusOpenModel(data) {
    debugger;
  
    this.setState({ StatusModel: true,sortColumn:data });
  }
  StatusCloseModel() {
    this.setState({ StatusModel: false });
  }

  setSortCheckStatus = (column,e) => {
    debugger;
    
    var itemsArray = [];
    var data = e.currentTarget.value;
    if(column==="all"){
      itemsArray=this.state.sortAllData;
      this.setState({
        designationColor:"",
        reportToColor:""
   });
     
    }else if(column==="designationName"){
        this.state.hierarchyData=this.state.sortAllData;
        itemsArray = this.state.hierarchyData.filter(
          a => a.designationName === data
        );
        this.setState({
             designationColor:"blue",
             reportToColor:""
        });
      }else if(column==="reportTo"){
        this.state.hierarchyData=this.state.sortAllData;
        itemsArray = this.state.hierarchyData.filter(
          a => a.reportTo === data
        );
        this.setState({
          designationColor:"",
          reportToColor:"blue"
     });
      }
     
    
    this.setState({
      hierarchyData: itemsArray
    });
    this.StatusCloseModel();
  };
  hanldeGetReportListDropDown() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetDesignationList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({
          reportToData: data
        });
      } else {
        self.setState({
          reportToData: []
        });
      }
    }).catch(data => {
      console.log(data);
      });
  }
  handleGetHierarchyData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Hierarchy/ListHierarchy",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;

      if(data !==null){
        self.state.sortAllData=data;
        var unique=[];
      var distinct = [];
      for( let i = 0; i < data.length; i++ ){
        if( !unique[data[i].designationName]){
          distinct.push(data[i].designationName);
          unique[data[i].designationName]=1;
        }
      }
      for (let i = 0; i < distinct.length; i++) {
        self.state.sortDesignation.push({ designationName: distinct[i] });
      }
  
  
      var unique=[];
      var distinct = [];
      for( let i = 0; i < data.length; i++ ){
        if( !unique[data[i].reportTo]){
          distinct.push(data[i].reportTo);
          unique[data[i].reportTo]=1;
        }
      }
      for (let i = 0; i < distinct.length; i++) {
        self.state.sortReportTo.push({ reportTo: distinct[i] });
      }
      }

     

      if (status === "Success") {
        self.setState({
          hierarchyData: data
        });
      } else {
        self.setState({
          hierarchyData: []
        });
      }
    }).catch(data => {
      console.log(data);
      });
  }
  handleSubmitData() {
    debugger;
    if(
        this.state.designation_name.length > 0 &&
        this.state.selectReportTo.length > 0 &&
        this.state.selectStatus !== 0 

    ){

    
    let self = this;
    var activeStatus = 0;
    var status = this.state.selectStatus;
    if (status === "Active") {
      activeStatus = 1;
    } else {
      activeStatus = 0;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Hierarchy/CreateHierarchy",
      headers: authHeader(),
      data: {
        DesignationName: this.state.designation_name.trim(),
        ReportToDesignation: this.state.selectReportTo,
        IsActive: activeStatus
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetHierarchyData();
        NotificationManager.success("Hierarchy added successfully.");
        self.setState({
          designation_name: "",
          selectReportTo: 0,
          selectedStatus: 1
        });
      }
    }).catch(data => {
      console.log(data);
      });
  }else{

    this.setState({
      designationNameCompulsion: "Designation Name field is compulsory.",
      reportToCompulsion: "ReportTo field is compulsory.",
      statusCompulsion: "Status field is compulsory."
      
    });

  }
  }
  handleDeleteHierarchy(hierarchy_Id) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Hierarchy/CreateHierarchy",
      headers: authHeader(),
      data: {
        DesignationID: hierarchy_Id,
        Deleteflag: 1
      }
    }).then(function(res) {
      debugger;
      let status = res.data.statusCode;
      if (status === 1010) {
        self.handleGetHierarchyData();
        NotificationManager.success("Designation deleted successfully.");
      }else{
        NotificationManager.error(res.data.message);
      }
    }).catch(data => {
      console.log(data);
      });
  }
  handleUpdateHierarchyData(e,designationID){
    debugger;
    if(
      this.state.updateDesignation.length > 0 &&
      this.state.updateReprtTo !== "select" &&
      this.state.updateStatus !== "select"
    ){
    let self = this;
    var activeStatus = 0;
    
    if (self.state.updateStatus === "Active") {
      activeStatus = 1;
    } else {
      activeStatus = 0;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Hierarchy/CreateHierarchy",
      headers: authHeader(),
      data: {
        DesignationID:designationID,
        DesignationName:self.state.updateDesignation.trim(),
        ReportToDesignation: self.state.updateReprtTo,
        IsActive: activeStatus
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetHierarchyData();
        NotificationManager.success("Hierarchy update successfully.");
       
      }else{
        NotificationManager.error("Hierarchy not update.");
      }
    }).catch(data => {
      console.log(data);
      });
  }else{
    NotificationManager.error("Hierarchy not update.");
    this.setState({
      editdesignationNameCompulsion: "Designation Name field is compulsory.",
      editreportToCompulsion:"ReportTo field is compulsory.",
      editstatusCompulsion: "Status field is compulsory."
    });
   
  }
  }
  handleGetEditData(data) {
    debugger;
    this.show();
    var hierarchyEditData = data;
    hierarchyEditData.designation_Name = hierarchyEditData.designationName;
    hierarchyEditData.report_To = hierarchyEditData.reportToDesignation;
    hierarchyEditData.designation_status = hierarchyEditData.status;

    this.setState({
      hierarchyEditData
    });
  }
  handleOnReportToChange = e => {
    let value = e.target.value;
    this.setState({ selectReportTo: value });
  };
  handleStatusChange = e => {
    let value = e.target.value;
    this.setState({ selectStatus: value });
  };
  handleOnChangeData = e => {
    debugger;
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.hierarchyEditData;
    data[name] = value;

    this.setState({
      EditTemp: data
    });
  };
  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };
  fileDrop = e => {
    this.setState({ fileName: e.dataTransfer.files[0].name });
    e.preventDefault();
  };
  fileDragOver = e => {
    e.preventDefault();
  };
  fileDragEnter = e => {
    e.preventDefault();
  };
  handleOnChangeHierarchyData = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { hierarchyData } = this.state;

    return (
      <React.Fragment>
        <NotificationContainer />
        <div className="position-relative d-inline-block">
          <Modal
            onClose={this.StatusCloseModel}
            open={this.state.StatusModel}
            modalId="Status-popup"
            overlayId="logout-ovrly"
          >
            <div className="status-drop-down">
              <div className="sort-sctn">
                <div className="d-flex">
                  <a href="#!"
                    onClick={this.sortStatusAtoZ.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>SORT BY A TO Z</p>
                </div>
                <div className="d-flex">
                  <a href="#!"
                    onClick={this.sortStatusZtoA.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>SORT BY Z TO A</p>
                </div>
              </div>
              <div className="filter-type">
        
                <p>FILTER BY TYPE</p>
                 <div className="filter-checkbox">
                <input
                    type="checkbox"
                    
                    name="filter-type"
                    id={"fil-open" }
                  
                    value="all"
                    onChange={this.setSortCheckStatus.bind(this,"all")}
                  />
                  <label htmlFor={"fil-open"}>
                    <span className="table-btn table-blue-btn">ALL</span>
                  </label>
                  </div>
                {this.state.sortColumn==="designationName" ? 
                
                this.state.sortDesignation !== null && 
                  this.state.sortDesignation.map((item, i) => ( 
                    <div className="filter-checkbox">
                      
                  <input
                    type="checkbox"
                    
                    name="filter-type"
                    id={"fil-open" + item.designationName}
                  
                    value={item.designationName}
                    onChange={this.setSortCheckStatus.bind(this,"designationName")}
                  />
                  <label htmlFor={"fil-open" + item.designationName}>
                    <span className="table-btn table-blue-btn">{item.designationName}</span>
                  </label>
                </div>
                  ))

                :null}

                { this.state.sortColumn==="reportTo" ? 
                
                this.state.sortReportTo !== null && 
                  this.state.sortReportTo.map((item, i) => ( 
                    <div className="filter-checkbox">
                      
                  <input
                    type="checkbox"
                    
                    name="filter-type"
                    id={"fil-open" + item.reportTo}
                  
                    value={item.reportTo}
                    onChange={this.setSortCheckStatus.bind(this,"reportTo")}
                  />
                  <label htmlFor={"fil-open" + item.reportTo}>
                    <span className="table-btn table-blue-btn">{item.reportTo}</span>
                  </label>
                </div>
                  ))

                :null}

              
                

              </div>
             

             
              
            </div>
          </Modal>
        </div>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <a href="settings" className="header-path">
            Ticketing
          </a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="header-path active">
            Hierarchy
          </a>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr tickhierpad">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketHierarchyReact">
                  <ReactTable
                    data={hierarchyData}
                    columns={[
                      {
                        Header: (
                          <span style={{color:this.state.designationColor}} onClick={this.StatusOpenModel.bind(this,"designationName")} >
                            Designation
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "designationName"
                      },
                      {
                        Header: (
                          <span style={{color:this.state.reportToColor}} onClick={this.StatusOpenModel.bind(this,"reportTo")}>
                            Report To
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "reportTo"
                      },
                      {
                        Header: (
                          <span>
                            Created By
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "createdbyperson",
                        Cell: row => {
                          // var ids = row.original["designationID"];
                          return (
                            <div>
                              <span>
                                Admin
                                <Popover
                                  content={
                                    <div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            Created By:&nbsp;
                                            {row.original["createdbyperson"]}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Created Date:&nbsp;
                                          {row.original["createdateformat"]}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            Updated By:&nbsp;
                                            {row.original["updatedbyperson"]}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Updated Date:&nbsp;
                                          {row.original["updateddateformat"]}
                                        </p>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                >
                                  <img
                                    className="info-icon-cp"
                                    src={BlackInfoIcon}
                                    alt="info-icon"
                                  />
                                </Popover>
                              </span>
                            </div>
                          );
                        }
                      },
                      {
                        Header: (
                          <span>
                            Status
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "status"
                      },
                      {
                        Header: <span>Actions</span>,
                        accessor: "actiondept",
                        Cell: row => {
                          var ids = row.original["designationID"];
                          return (
                            <>
                              <span>
                                <Popover
                                  content={
                                    <div className="samdel d-flex general-popover popover-body" id={"samdel" + ids}>
                                      <div className="del-big-icon">
                                        <img src={DelBigIcon} alt="del-icon" />
                                      </div>
                                      <div>
                                        <p className="font-weight-bold blak-clr">
                                          Delete file?
                                        </p>
                                        <p className="mt-1 fs-12">
                                          Are you sure you want to delete this
                                          file?
                                        </p>
                                        <div className="del-can">
                                          <a className="canblue" onClick={() => this.hide(this, "samdel" + ids)}>CANCEL</a>
                                          <button
                                            className="butn"
                                            type="button"
                                            onClick={this.handleDeleteHierarchy.bind(
                                              this,
                                              ids
                                            )} 
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                  trigger="click"
                                >
                                  <img
                                    src={RedDeleteIcon}
                                    alt="del-icon"
                                    className="del-btn"
                                    onClick={() => this.show(this, "samdel" + ids)}
                                  />
                                </Popover>
                                <Popover
                                  content={
                                    <Content rowData={row.original}
                                     reportToData={this.state.reportToData} 
                                     activeData={this.state.activeData}
                                     editdesignationNameCompulsion={this.state.editdesignationNameCompulsion}
                                     editreportToCompulsion={this.state.editreportToCompulsion}
                                     editstatusCompulsion={this.state.editstatusCompulsion}
                                     callBackEdit={this.callBackEdit} handleUpdateHierarchyData={this.handleUpdateHierarchyData.bind(this)} />
                                  }
                                  placement="bottom"
                                  trigger="click"
                                >
                                  {/* <button
                                    className="react-tabel-button"
                                    type="button"
                                    // onClick={() => this.handleGetEditData.bind(
                                    //   this,
                                    //   row.original
                                    // )}
                                  >
                                    EDIT
                                  </button> */}
                                   <label className="Table-action-edit-button-text">
                    <MyButton>
                      EDIT
                    </MyButton>
                  </label>
                                </Popover>
                              </span>
                            </>
                          );
                        }
                      }
                    ]}
                    // resizable={false}
                    minRows={1}
                    defaultPageSize={10}
                    showPagination={true}
                  />
                  {/* <div className="position-relative">
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
                  </div> */}
                </div>
              </div>

              <div className="col-md-4">
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="create-department">
                      CREATE HIERARCHY
                    </label>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        Designation Name
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Designation Name"
                        maxLength={25}
                        name="designation_name"
                        value={this.state.designation_name}
                        onChange={this.handleOnChangeHierarchyData}
                      />
                       {this.state.designation_name.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.designationNameCompulsion}
                    </p>
                  )}
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Reports To</label>
                        <select
                          className="form-control dropdown-setting"
                          value={this.state.selectReportTo}
                          onChange={this.handleOnReportToChange}
                        >
                          <option>select</option>
                          <option value={0}>Root</option>
                          {this.state.reportToData !== null &&
                            this.state.reportToData.map((item, i) => (
                              <option key={i} value={item.designationID}>
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectReportTo === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.reportToCompulsion}
                    </p>
                  )}
                      </div>
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">Status</label>
                      <select
                        className="form-control dropdown-setting"
                        value={this.state.selectStatus}
                        onChange={this.handleStatusChange}
                        
                      >
                        
                        <option >select</option>
                        {this.state.activeData !== null &&
                          this.state.activeData.map((item, j) => (
                            <option key={j} value={item.ActiveID}>
                              {item.ActiveName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectStatus === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.statusCompulsion}
                    </p>
                  )}
                    </div>
                    <div className="btnSpace">
                      <button
                        className="addBtn-ticket-hierarchy"
                        type="button"
                        onClick={this.handleSubmitData.bind(this)}
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="right-sect-div">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <h3 className="pb-0">Bulk Upload</h3>
                    <div className="down-excel">
                      <p>Template</p>
                      <CSVLink  filename={"Hierarchy.csv"} data={config.hierarchyTemplate}>
                       <img src={DownExcel} alt="download icon" />
                     </CSVLink>
                    </div>
                  </div>
                  <input
                    id="file-upload"
                    className="file-upload d-none"
                    type="file"
                    onChange={this.fileUpload}
                  />
                  <label
                    htmlFor="file-upload"
                    onDrop={this.fileDrop}
                    onDragOver={this.fileDragOver}
                    onDragEnter={this.fileDragEnter}
                  >
                    <div className="file-icon">
                      <img src={FileUpload} alt="file-upload" />
                    </div>
                    <span>Add File</span> or Drop File here
                  </label>
                  {this.state.fileName && (
                    <div className="file-info">
                      <div className="file-cntr">
                        <div className="file-dtls">
                          <p className="file-name">{this.state.fileName}</p>
                          <div className="del-file" id="del-file-1">
                            <img src={DelBlack} alt="delete-black" onClick={this.togglePopover} />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="del-file-1"
                            className="general-popover delete-popover"
                            isOpen={this.state.isOpen} toggle={this.togglePopover}
                          >
                            <PopoverBody className="d-flex">
                              <div className="del-big-icon">
                                <img src={DelBigIcon} alt="del-icon" />
                              </div>
                              <div>
                                <p className="font-weight-bold blak-clr">
                                  Delete file?
                                </p>
                                <p className="mt-1 fs-12">
                                  Are you sure you want to delete this file?
                                </p>
                                <div className="del-can">
                                  <a className="canblue" onClick={this.togglePopover}>CANCEL</a>
                                  <button className="butn">Delete</button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                        <div>
                          <span className="file-size">122.6kb</span>
                        </div>
                      </div>
                      <div className="file-cntr">
                        <div className="file-dtls">
                          <p className="file-name">{this.state.fileName}</p>
                          <a className="file-retry" href={Demo.BLANK_LINK}>
                            Retry
                          </a>
                        </div>
                        <div>
                          <span className="file-failed">Failed</span>
                        </div>
                      </div>
                      <div className="file-cntr">
                        <div className="file-dtls">
                          <p className="file-name pr-0">
                            {this.state.fileName}
                          </p>
                        </div>
                        <div>
                          <div className="d-flex align-items-center mt-2">
                            <ProgressBar className="file-progress" now={60} />
                            <div className="cancel-upload">
                              <img src={UploadCancel} alt="upload cancel" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <button className="butn">ADD</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TicketHierarchy;

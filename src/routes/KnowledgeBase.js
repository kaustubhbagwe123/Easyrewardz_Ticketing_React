import React, { Component, Fragment } from "react";
import Demo from "../store/Hashtag.js";
import SerachIcon from "./../assets/Images/serach-icon-left.png";
import DownArrowIcon from "./../assets/Images/down-1.png";
import Modal from "react-responsive-modal";
import LeftBackIcon from "./../assets/Images/black-left-arrow.png";
import CancelIcon from "./../assets/Images/cancel.png";
import { Collapse, CardBody } from "reactstrap";
import { Card } from "react-bootstrap";
import CKEditor from 'ckeditor4-react';

class KnowledgeBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerfirst: "block",
      headersecound: "none",
      searchmodal: false,
      addnewkbmodal: false,
      editapprove: false,
      detailscollapse: false,
      tabcolor: "#2561A8",
      tabcolor1: "#4A4A4A"
    };
    this.HandelFirstTabClick = this.HandelFirstTabClick.bind(this);
    this.HandelSecoundTabClick = this.HandelSecoundTabClick.bind(this);
    this.opneSearchModal = this.opneSearchModal.bind(this);
    this.closeSearchModal = this.closeSearchModal.bind(this);
    this.HandelOnenCloseDetailsCollapse = this.HandelOnenCloseDetailsCollapse.bind(this)
  }
  opneSearchModal() {
    this.setState({ searchmodal: true });
  }
  closeSearchModal() {
    this.setState({ searchmodal: false });
  }

  openEditAproveBModal() {
    this.setState({ editapprove: true });
  }
  closeEditAproveModal() {
    this.setState({ editapprove: false });
  }

  openAddNewKBModal() {
    this.setState({ addnewkbmodal: true });
  }
  closeAddNewKBModal() {
    this.setState({ addnewkbmodal: false });
  }

  HandelFirstTabClick() {
    this.setState({
      headerfirst: "block",
      headersecound: "none",
      detailscollapse: false,
      tabcolor: "#2561A8",
      tabcolor1: "#4A4A4A"
    });
  }

  HandelSecoundTabClick() {
    this.setState({
      headerfirst: "none",
      headersecound: "block",
      detailscollapse: false,
      tabcolor: "#4A4A4A",
      tabcolor1: "#2561A8"
    });
  }

  HandelOnenCloseDetailsCollapse() {
    this.setState({ detailscollapse: !this.state.detailscollapse });
  }
  render() {
    return (
      <Fragment>
        <div className="kb-header">
          <a href={Demo.BLANK_LINK} onClick={this.HandelFirstTabClick}>
            <label
              className="header-new-submissions"
              style={{ color: this.state.tabcolor }}
            >
              New Submissions
            </label>
          </a>
          <a href={Demo.BLANK_LINK} onClick={this.HandelSecoundTabClick}>
            <label
              className="header-new-submissions-1"
              style={{ color: this.state.tabcolor1 }}
            >
              Knowledge Base List
            </label>
          </a>
          <button
            className="kb-Header-button"
            onClick={this.openAddNewKBModal.bind(this)}
          >
            <label className="add-new-kb">Add New KB</label>
          </button>
        </div>
        <div
          className="main-content-kb"
          style={{ display: this.state.headerfirst }}
        >
          <div className="main-content-margin">
            <div className="row" style={{ padding: "35px 35px 10px 35px" }}>
              <div className="col-md-6"> 
              <label className="main-conenet-point">02 ITEMS</label>
              <small className="clear-search" onClick={this.opneSearchModal}>
                Clear Search
              </small>
              </div>
              <div className="col-md-6">
              <label className="search-KB" onClick={this.opneSearchModal}>
                SEARCH
              </label>
              <img
                src={SerachIcon}
                alt="serach-icon"
                className="searchicon"
                onClick={this.opneSearchModal}
              />
              </div>
            </div>
            <div className="kb-table" style={{ padding: "0px 30px 0px 20px" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Details</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Sub catogory</th>
                    <th className="pad">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label className="table-id-data">ABC1234</label>
                    </td>
                    <td>
                      <p
                        className="table-details-data"
                        style={{ display: "block" }}
                      >
                        Can I purchase a domain through Google?
                      </p>
                      <p className="table-details-data-1">
                        Google can help you purchase a domain through one of our
                        domain host partners. During sign up, just select the
                        option to…
                      </p>
                      <img
                        src={DownArrowIcon}
                        alt="down-arrow-icon"
                        className="down-icon-kb"
                      />
                    </td>
                    <td>
                      <label className="table-type-return">return</label>
                    </td>
                    <td>
                      <label className="table-category">
                        defective article
                      </label>
                    </td>
                    <td>
                      <label className="table-subcategory">
                        pain in feet/knee/leg
                      </label>
                    </td>
                    <td style={{padding:"15px 0"}}>
                      <span style={{float:"right"}}>
                        <button className="reject-button">
                        <label className="reject-button-text">reject</label>
                      </button>
                      <button
                        className="aprove-button"
                        onClick={this.openEditAproveBModal.bind(this)}
                      >
                        <label className="approve-button-text">APPROVE</label>
                      </button>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="table-id-data">ABC1234</label>
                    </td>
                    <td>
                      <p className="table-details-data">
                        Can I still use the previous version of Sites?
                      </p>{" "}
                      <img
                        src={DownArrowIcon}
                        alt="down-arrow-icon"
                        className="down-icon-kb"
                        onClick={this.HandelOnenCloseDetailsCollapse}
                      />
                      <Collapse isOpen={this.state.detailscollapse}>
                        <Card>
                          <CardBody>
                            <p className="table-details-data-1">
                              If your company is using any previous version of
                              Sites, there will be no disruption. Keep editing
                              and sharing your Sites as youIf your company is
                              using any previous version of Sites, there will be
                              no disruption. Keep editing and sharing your Sites
                              as youIf your company is using any previous
                              version of Sites, there will be no disruption.
                              Keep editing and sharing your Sites as you If your
                              company is using any previous version of Sites,
                            </p>
                          </CardBody>
                        </Card>
                      </Collapse>
                    </td>
                    <td>
                      <label className="table-type-return">return</label>
                    </td>
                    <td>
                      <label className="table-category">
                        defective article
                      </label>
                    </td>
                    <td>
                      <label className="table-subcategory">
                        pain in feet/knee/leg
                      </label>
                    </td>
                    <td style={{padding:"15px 0"}}>
                      <span style={{float:"right"}}>
                        <button className="reject-button">
                        <label className="reject-button-text">reject</label>
                      </button>
                      <button
                        className="aprove-button"
                        onClick={this.openEditAproveBModal.bind(this)}
                      >
                        <label className="approve-button-text">APPROVE</label>
                      </button>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
                <a href={Demo.BLANK_LINK}>7</a>
              </li>
              <li>
                <a href={Demo.BLANK_LINK}>&gt;</a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="main-content-kb"
          style={{ display: this.state.headersecound }}
        >
          <div className="main-content-margin">
            <div className="row" style={{ padding: "35px 35px 10px 35px" }}>
              <label className="main-conenet-point">02 ITEMS</label>
              <small className="clear-search">Clear Search</small>

              <label className="search-KB" onClick={this.opneSearchModal}>
                SEARCH
              </label>
              <img
                src={SerachIcon}
                alt="serach-icon"
                className="searchicon"
                onClick={this.opneSearchModal}
              />
            </div>
            <div className="kb-table" style={{ padding: "0px 30px 0px 20px" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Details</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Sub catogory</th>
                    <th className="pad">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label className="table-id-data">ABC1234</label>
                    </td>
                    <td>
                      <p
                        className="table-details-data"
                        style={{ display: "block" }}
                      >
                        Can I purchase a domain through Google?
                      </p>

                      <p className="table-details-data-1">
                        Google can help you purchase a domain through one of our
                        domain host partners. During sign up, just select the
                        option to…
                      </p>
                      <img
                        src={DownArrowIcon}
                        alt="down-arrow-icon"
                        className="down-icon-kb"
                      />
                    </td>
                    <td>
                      <label className="table-type-return">return</label>
                    </td>
                    <td>
                      <label className="table-category">
                        defective article
                      </label>
                    </td>
                    <td>
                      <label className="table-subcategory">
                        pain in feet/knee/leg
                      </label>
                    </td>
                    <td>
                      <button className="reject-button-1">
                        <label className="reject-button-text">DELETE</label>
                      </button>
                      {/* <button className="aprove-button">
                        <label className="approve-button-text">APPROVE</label>
                      </button> */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="table-id-data">NA</label>
                    </td>
                    <td>
                      <p className="table-details-data">
                        Can I still use the previous version of Sites?
                      </p>{" "}
                      <img
                        src={DownArrowIcon}
                        alt="down-arrow-icon"
                        className="down-icon-kb"
                        onClick={this.HandelOnenCloseDetailsCollapse}
                      />
                      <Collapse isOpen={this.state.detailscollapse}>
                        <Card>
                          <CardBody>
                            <p className="table-details-data-1">
                              If your company is using any previous version of
                              Sites, there will be no disruption. Keep editing
                              and sharing your Sites as youIf your company is
                              using any previous version of Sites, there will be
                              no disruption. Keep editing and sharing your Sites
                              as youIf your company is using any previous
                              version of Sites, there will be no disruption.
                              Keep editing and sharing your Sites as you If your
                              company is using any previous version of Sites,
                            </p>
                          </CardBody>
                        </Card>
                      </Collapse>
                    </td>
                    <td>
                      <label className="table-type-return">return</label>
                    </td>
                    <td>
                      <label className="table-category">
                        defective article
                      </label>
                    </td>
                    <td>
                      <label className="table-subcategory">
                        pain in feet/knee/leg
                      </label>
                    </td>
                    <td>
                      <button className="reject-button">
                        <label className="reject-button-text">DELETE</label>
                      </button>
                      <button className="aprove-button">
                        <label className="approve-button-text">EDIT</label>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
                <a href={Demo.BLANK_LINK}>7</a>
              </li>
              <li>
                <a href={Demo.BLANK_LINK}>&gt;</a>
              </li>
            </ul>
          </div>
        </div>
        {/* ----------------------------------Search Modal------------------------------------ */}
        <Modal
          onClose={this.closeSearchModal}
          open={this.state.searchmodal}
          modalId="kb-search-popup"
          overlayId="kb-search-ovrly"
        >
          <div className="kb-Model-mp">
            <div className="">
              <img
                src={LeftBackIcon}
                alt="back-icon"
                className="back-button-left"
                onClick={this.closeSearchModal}
              />
              <label className="search-modal-text">SEARCH</label>
              <button className="search-button-modal">
                <label className="search-button-modal-text">APPLY</label>
              </button>
            </div>
            <br />
            <br />
            <div className="row">
              <select className="kb-modal-type-select">
                <option>Type</option>
              </select>
            </div>
            <br />
            <div className="row">
              <select className="kb-modal-type-select">
                <option>Category</option>
              </select>
            </div>
            <br />
            <div className="row">
              <select className="kb-modal-type-select">
                <option>Sub Category</option>
              </select>
            </div>
          </div>
        </Modal>

        {/* -----------------------------------------------END---------------------------------------- */}
        {/* ---------------------------------------ADD NEW KB MODAL----------------------------------- */}

        <Modal
          onClose={this.closeAddNewKBModal.bind(this)}
          open={this.state.addnewkbmodal}
          modalId="addkb-modal-popup"
          overlayId="addkb-modal-ovrly"
        >
          <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cancel-button-modal-icon"
            onClick={this.closeAddNewKBModal.bind(this)}
          />
          <div>
            <div className="kb-Model-mp">
              <div className="">
                <label className="search-modal-text">ADD</label>
              </div>
              <br />

              <div className="row">
                <div>
                  <select className="add-select-category">
                    <option>Select Category</option>
                  </select>
                </div>
                <div>
                  <select className="add-select-category">
                    <option>Select Subcategory</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <input
                  type="text"
                  className="addkb-subject"
                  placeholder=" Write subject here"
                />
              </div>
              <br />
              <div className="row KBase">
                <CKEditor
                  config={{
                    toolbar: [
                    {
                      name: 'basicstyles',
                      items: ['Bold', 'Italic','Strike']
                    },
                    {
                      name: 'styles',
                      items: ['Styles', 'Format']
                    },
                    {
                      name: 'paragraph',
                      items: ['NumberedList', 'BulletedList']
                    },
                    {
                      name: 'links',
                      items: ['Link', 'Unlink']
                    },
                    {
                      name: 'insert',
                      items: ['Image', 'Table']
                    },
                    {
                      name: 'tools',
                      items: ['Maximize']
                    },
                    {
                      name: 'editing',
                      items: ['Scayt']
                    }
                  ],
                  }}
                />
              </div>
              <br />
              <div className="row" style={{ marginLeft: "59%" }}>
                <label
                  className="cancel-button-modal"
                  onClick={this.closeAddNewKBModal.bind(this)}
                >
                  CANCEL
                </label>
                <button className="add-kb-button-modal">
                  <label className="add-kb-button-text-modal">SAVE</label>
                </button>
              </div>
            </div>
          </div>
        </Modal>
        {/* -----------------------------------------------END---------------------------------------- */}
        {/* ---------------------------------------Approve MODAL----------------------------------- */}

        <Modal
          onClose={this.closeEditAproveModal.bind(this)}
          open={this.state.editapprove}
          modalId="addkb-modal-popup"
          overlayId="addkb-modal-ovrly"
        >
          <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cancel-button-modal-icon"
            onClick={this.closeEditAproveModal.bind(this)}
          />
          <div>
            <div className="kb-Model-mp">
              <div className="">
                <label className="search-modal-text">CONFIRM</label>
              </div>
              <br />
              <div className="row">
                <div>
                  <select className="add-select-category">
                    <option>defective article</option>
                  </select>
                </div>
                <div>
                  <select className="add-select-category">
                    <option>pain in feet/knee/leg</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <input
                  type="text"
                  className="addkb-subject"
                  placeholder="Can I purchase a domain through Google?"
                />
              </div>
              <br />
              <div className="row KBase">
              <CKEditor
                  config={{
                    toolbar: [
                    {
                      name: 'basicstyles',
                      items: ['Bold', 'Italic','Strike']
                    },
                    {
                      name: 'styles',
                      items: ['Styles', 'Format']
                    },
                    {
                      name: 'paragraph',
                      items: ['NumberedList', 'BulletedList']
                    },
                    {
                      name: 'links',
                      items: ['Link', 'Unlink']
                    },
                    {
                      name: 'insert',
                      items: ['Image', 'Table']
                    },
                    {
                      name: 'tools',
                      items: ['Maximize']
                    },
                    {
                      name: 'editing',
                      items: ['Scayt']
                    }
                  ],
                  }}
                />
              </div>
              <br />
              <div className="row" style={{ marginLeft: "59%" }}>
                <label
                  className="cancel-button-modal"
                  onClick={this.closeEditAproveModal.bind(this)}
                >
                  CANCEL
                </label>
                <button className="add-kb-button-modal">
                  <label className="add-kb-button-text-modal">APPROVE</label>
                </button>
              </div>
            </div>
          </div>
        </Modal>
        {/* -----------------------------------------------END---------------------------------------- */}
      </Fragment>
    );
  }
}

export default KnowledgeBase;

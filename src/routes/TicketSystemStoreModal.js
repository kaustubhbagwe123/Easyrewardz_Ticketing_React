import React,{Component} from 'react';
import { Accordion, Card,Button } from "react-bootstrap";
import BlueStoreIcon from "./../assets/Images/storeBlue.png";
import BlackProductIcon from "./../assets/Images/product-black.png";
import MyTicket from './MyTicket';
import CrossIcon from "./../assets/Images/cancel.png";
import Modal from "react-responsive-modal";
import MyTicket from './MyTicket';




class TikcetSystemStoreModal extends Component {
  constructor(props) {
                       super(props);

                       this.state = {
                         storeproductsearch: false,
                         checkactive:"#9B9B9B"

                       };
                       this.myTicket=new MyTicket();
                     }
 
  
  HandleStoreProductSearchModalOpen() {
 
    this.myTicket.HandleStoreModalClose.bind(this);
    this.setState({ storeproductsearch: true });
  }
  HandleStoreProductSearchModalClose() {
    this.setState({
      storeproductsearch: false
    });
  }

HandalDatatable(){
  debugger;
this.setState({checkactive:"#4A4A4A"});


}

  render() {
    return (
      <>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header aria-expanded="true">
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                <div>
                  <img
                    src={BlueStoreIcon}
                    alt="blue-store-icon"
                    className="storemd-icon"
                  />
                  <label className="collstore-head-text">STORE</label>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <div className="row">
                  <select className="storemodal-select">
                    <option>Select State</option>
                  </select>
                  <div
                    className="filter-checkbox"
                    style={{ marginTop: "10px" }}
                  >
                    <input
                      type="checkbox"
                      id="all-india"
                      name="filter-type"
                      style={{ display: "none" }}
                    />
                    <label htmlFor="all-india" style={{ paddingLeft: "25px" }}>
                      <span className="add-note">All India</span>
                    </label>
                  </div>
                </div>
                <div className="row storemodal-row">
                  <input
                    type="text"
                    className="storemodal-text"
                    placeholder="Enter Pincode"
                  />
                </div>
                <div className="row storemodal-row">
                  <input
                    type="text"
                    className="storemodal-text"
                    placeholder="Enter Area"
                  />
                </div>
                <div className="row storemodal-row-1">
                  <label className="storemodal-more-filter">MORE FILTER</label>
                </div>
                <div className="row storemodal-row">
                  <select className="storemodal-select">
                    <option>Select Cause</option>
                  </select>
                </div>
                <div className="row storemodal-row">
                  <input
                    type="text"
                    className="storemodal-text"
                    placeholder="Enter Area"
                  />
                </div>
                <div className="row storemodal-row-1">
                  <button
                    className="storemodal-search-btn"
                    onClick={this.HandleStoreProductSearchModalOpen.bind(this)}
                  >
                    <label className="storemodal-search-btn-text">SEARCH</label>
                  </button>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <hr />
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                <div>
                  <img
                    src={BlackProductIcon}
                    alt="blue-store-icon"
                    className="storemd-icon"
                  />
                  <label className="collstore-head-text-black">PRODUCT</label>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div className="row storemodal-row">
                  <input
                    type="text"
                    className="storemodal-text"
                    placeholder="Enter Product Name"
                  />
                </div>
                <div className="row storemodal-row-1">
                  <button
                    className="storemodal-search-btn"
                    onClick={this.HandleStoreProductSearchModalOpen.bind(this)}
                  >
                    <label className="storemodal-search-btn-text">SEARCH</label>
                  </button>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <Modal
          open={this.state.storeproductsearch}
          onClose={this.HandleStoreProductSearchModalClose.bind(this)}
          modalId="storeproductsearchmodal"
          overlayId="layout-storeproductsearchmodal"
        >
          <div className="row">
            <div className="col-md-5">
              <div className="profilemodalmaindiv-1">
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Card.Header aria-expanded="true">
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <div>
                          <img
                            src={BlueStoreIcon}
                            alt="blue-store-icon"
                            className="storemd-icon"
                          />
                          <label className="collstore-head-text">STORE</label>
                        </div>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <div className="row" style={{ display: "block" }}>
                          <select className="storemodal-select">
                            <option>Select State</option>
                            <option selected>Delhi</option>
                          </select>
                          <div
                            className="filter-checkbox"
                            style={{ marginTop: "10px" }}
                          >
                            <input
                              type="checkbox"
                              id="fil-open"
                              name="filter-type"
                              style={{ display: "none" }}
                            />
                            <label
                              htmlFor="fil-open"
                              style={{ paddingLeft: "25px" }}
                            >
                              <span className="add-note">All India</span>
                            </label>
                          </div>
                        </div>
                        <div className="row storemodal-row">
                          <input
                            type="text"
                            className="storemodal-text"
                            placeholder="Enter Pincode"
                          />
                        </div>
                        <div className="row storemodal-row">
                          <input
                            type="text"
                            className="storemodal-text"
                            placeholder="Enter Area"
                          />
                        </div>
                        <div className="row storemodal-row-1">
                          <label className="storemodal-more-filter">
                            MORE FILTER
                          </label>
                        </div>
                        <div className="row storemodal-row">
                          <select className="storemodal-select">
                            <option>Select Cause</option>
                          </select>
                        </div>
                        <div className="row storemodal-row">
                          <input
                            type="text"
                            className="storemodal-text"
                            placeholder="Enter Area"
                          />
                        </div>
                        <div className="row storemodal-row-1">
                          <button
                            className="storemodal-search-btn"
                            onClick={this.HandleStoreProductSearchModalOpen.bind(
                              this
                            )}
                          >
                            <label className="storemodal-search-btn-text">
                              SEARCH
                            </label>
                          </button>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <hr />
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        <div>
                          <img
                            src={BlackProductIcon}
                            alt="blue-store-icon"
                            className="storemd-icon"
                          />
                          <label className="collstore-head-text-black">
                            PRODUCT
                          </label>
                        </div>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <div className="row storemodal-row">
                          <input
                            type="text"
                            className="storemodal-text"
                            placeholder="Enter Product Name"
                          />
                        </div>
                        <div className="row storemodal-row-1">
                          <div
                            className="storemodal-search-btn"
                            onClick={this.HandleStoreProductSearchModalOpen.bind(
                              this
                            )}
                          >
                            <label className="storemodal-search-btn-text">
                              SEARCH
                            </label>
                          </div>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </div>
            <div className="col-md-7">
              <div className="storeproductdetailsdiv">
                <div style={{ float: "" }}>
                  <img
                    src={CrossIcon}
                    alt="cross-icon"
                    className="pro-cross-icn-1"
                    onClick={this.HandleStoreProductSearchModalClose.bind(this)}
                  />
                </div>
                <br />
                <div className="storeheadsearchdiv">
                  <label className="storeproduct-tab-head-text tabhead1">
                    Store
                  </label>

                  <label className="storeproduct-tab-head-text tabhead2">
                    Code
                  </label>
                  <label className="storeproduct-tab-head-text tabhead3">
                    Phone
                  </label>
                  <label className="storeproduct-tab-head-text tabhead4">
                    Date
                  </label>
                </div>
                <div className="storeheadsearchdiv">
                  <div
                    className="filter-checkbox"
                    style={{ marginTop: "10px" }}
                  >
                    <input
                      type="checkbox"
                      id="data1"
                      name="filter-type"
                      style={{ display: "none" }}
                      onChange={this.HandalDatatable.bind(this)}
                    />
                    <label
                      htmlFor="data1"
                      style={{ paddingLeft: "25px" }}
                      className="tabdatadeactive-1 tabhead1"
                    >
                      <span
                        className="add-note"
                        style={{ color: this.checkactive }}
                      >
                        Bata Paschim Vihar
                      </span>
                    </label>

                    <label
                      className="tabdatadeactive tabhead2"
                      style={{ color: this.checkactive }}
                    >
                      223001
                    </label>
                    <label className="tabdatadeactive tabhead3">
                      120 772 882
                    </label>
                    <label
                      className="tabdatadeactive tabhead4"
                      style={{ color: this.checkactive }}
                    >
                      13 May 2018
                    </label>
                  </div>
                </div>
                <div
                  className="storeheadsearchdiv"
                  style={{ color: this.state.checkactive }}
                >
                  <div
                    className="filter-checkbox"
                    style={{ marginTop: "10px" }}
                  >
                    <input
                      type="checkbox"
                      id="data2"
                      name="filter-type"
                      style={{ display: "none" }}
                      onChange={this.HandalDatatable.bind(this)}
                    />
                    <label
                      htmlFor="data2"
                      style={{ paddingLeft: "25px" }}
                      className="tabdatadeactive-1 tabhead1"
                    >
                      <span className="add-note">Bata Paschim Vihar</span>
                    </label>

                    <label className="tabdatadeactive tabhead2">223001</label>
                    <label className="tabdatadeactive tabhead3">
                      120 772 882
                    </label>
                    <label className="tabdatadeactive tabhead4">
                      13 May 2018
                    </label>
                  </div>
                </div>
                <div
                  className="storeheadsearchdiv"
                  style={{ color: this.state.checkactive }}
                >
                  <div
                    className="filter-checkbox"
                    style={{ marginTop: "10px" }}
                  >
                    <input
                      type="checkbox"
                      id="data3"
                      name="filter-type"
                      style={{ display: "none" }}
                      onChange={this.HandalDatatable.bind(this)}
                    />
                    <label
                      htmlFor="data3"
                      style={{ paddingLeft: "25px" }}
                      className="tabdatadeactive-1 tabhead1"
                    >
                      <span className="add-note">Bata Paschim Vihar</span>
                    </label>

                    <label className="tabdatadeactive tabhead2">223001</label>
                    <label className="tabdatadeactive tabhead3">
                      120 772 882
                    </label>
                    <label className="tabdatadeactive tabhead4">
                      13 May 2018
                    </label>
                  </div>
                </div>
                <br />
                <div style={{ float: "right" }}>
                  <button className="addselected-button">
                    <label className="addselected-button-text">
                      ADD SELECTED
                    </label>
                  </button>
                </div>
                <br />
                <br />
                <div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}
export default TikcetSystemStoreModal;
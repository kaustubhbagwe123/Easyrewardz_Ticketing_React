import React,{Component} from 'react';
import { Accordion, Card,Button } from "react-bootstrap";
import BlueStoreIcon from "./../assets/Images/storeBlue.png";
import BlackProductIcon from "./../assets/Images/product-black.png";
import MyTicket from './MyTicket';

class TikcetSystemStoreModal extends Component{
  constructor(props) {
    super(props)
    this.state = {
      storemodal: false
    }
    this.abs= new MyTicket()
  }
  HandleStoreModalClose() {
    this.setState({ storemodal: false });
  }

    render(){
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
                      <div className="storemodal-search-btn">
                        <label className="storemodal-search-btn-text">
                          SEARCH
                        </label>
                      </div>
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
                      <div className="storemodal-search-btn">
                        <label className="storemodal-search-btn-text">
                          SEARCH
                        </label>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </>
        );
    }

}
export default TikcetSystemStoreModal;
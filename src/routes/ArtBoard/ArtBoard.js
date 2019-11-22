import React, { Component } from 'react'
import sliderimg from './../../assets/Images/slider-img.png'
import info1 from './../../assets/Images/ozh1.png'
import info2 from './../../assets/Images/ozh2.png'
import info3 from './../../assets/Images/ozh3.png'
import info4 from './../../assets/Images/ozh4.png'
import client1 from './../../assets/Images/client1.png'
import client2 from './../../assets/Images/client2.png'
import client3 from './../../assets/Images/client3.png'
import client4 from './../../assets/Images/client4.png'

class ArtBoard extends Component {
    render() {
        
        return (
            <div>
                <section>
                    <div className="carousel-sec">
                        <div className="row">
                            <div className="col-12 col-sm-6 no-padding">
                                <div className="slider-leftsec">
                                    <span className="car-caption">
                                        <h3>Affordable and Customized</h3>
                                        <h3>for your business</h3>
                                    </span>
                                    <p>Customer Loyalty | Employee Loyalty | Gift Card Program</p>
                                    <span className="input-group">
                                        <input type="number" placeholder="Enter your mobile number" className="form-control"/>
                                        <span className="input-group-addon">
                                            <button className="getstarted">Get Started</button>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 no-padding">
                                <div className="slider-rightsec">
                                    <img src={sliderimg} style={{ width: "" }} alt="Slider Img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container">
                        <div className="info-sec text-center">
                            <h2>All in one promotional platform</h2>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-3">
                                    <img src={info1} style={{ width: "" }} alt="info1" />
                                    <h3>Affordable and Customized</h3>
                                    <p>Users are more toleant of minor usability issues when they find an interface visually appealing.</p>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <img src={info2} style={{ width: "" }} alt="info2" />
                                    <h3>Affordable and Customized</h3>
                                    <p>Users are more toleant of minor usability issues when they find an interface visually appealing.</p>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <img src={info3} style={{ width: "" }} alt="info3" />
                                    <h3>Affordable and Customized</h3>
                                    <p>Users are more toleant of minor usability issues when they find an interface visually appealing.</p>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <img src={info4} style={{ width: "" }} alt="info4" />
                                    <h3>Affordable and Customized</h3>
                                    <p>Users are more toleant of minor usability issues when they find an interface visually appealing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container">
                        <div className="client-sec text-center">
                            <h2>Our Clients</h2>
                            <div className="row">
                                <div className="col-12 col-sm-4 col-md-2">
                                    <img src={client1} style={{ width: "" }} alt="client1" />
                                </div>
                                <div className="col-12 col-sm-4 col-md-2">
                                    <img src={client2} style={{ width: "" }} alt="client2" />
                                </div>
                                <div className="col-12 col-sm-4 col-md-2">
                                    <img src={client3} style={{ width: "" }} alt="client3" />
                                </div>
                                <div className="col-12 col-sm-4 col-md-2">
                                    <img src={client4} style={{ width: "" }} alt="client4" />
                                </div>
                                <div className="col-12 col-sm-4 col-md-2">
                                    <img src={client1} style={{ width: "" }} alt="client1" />
                                </div>
                                <div className="col-12 col-sm-4 col-md-2">
                                    <img src={client2} style={{ width: "" }} alt="client2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default ArtBoard

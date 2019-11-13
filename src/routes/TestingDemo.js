import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

 class TestingDemo extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
      value: 10
     }
   }
   

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  
  render() {
    const { value } = this.state
    return (
      <div className='slider'>
        <Slider
          min={0}
          max={100}
          value={value}
          // onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          // onChangeComplete={this.handleChangeComplete}
        />
        {/* <div className='value'>{value}</div> */}
      </div>
    )
  }
}

export default TestingDemo

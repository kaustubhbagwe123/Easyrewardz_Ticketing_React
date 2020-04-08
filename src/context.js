import React, { Component } from 'react'
import * as translationHI from './translations/hindi'
import * as translationMA from './translations/marathi'

// Create new context
export const MyContext = React.createContext()

// Then create a Provider Component
export class MyProvider extends Component {
  state = {
    isNavOpen: false,
    language: '',
    translateLanguage: {}
  }

  changeLanguage = (e) =>{
    debugger;
    if (e.target.value === 'hindi') {
      this.state.translateLanguage = translationHI
    }
    else if(e.target.value === 'marathi'){
      this.state.translateLanguage = translationMA
    }
    else{
      this.state.translateLanguage = {}
    }
    this.setState({
      isNavOpen: !this.state.isNavOpen,
      language: e.target.value,
      translateLanguage: this.state.translateLanguage
    })

    document.body.classList.toggle('nav-is-open')
  }

  toggleNav = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    })

    document.body.classList.toggle('nav-is-open')
  }

  render() {
    return (
      <MyContext.Provider value={{
        state: this.state,
        changeLanguage: this.changeLanguage,
        toggleNav: this.toggleNav
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}
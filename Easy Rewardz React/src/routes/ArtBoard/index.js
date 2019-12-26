import React, { Component } from "react";
import { Route } from "react-router-dom";
import ArtboardLayout from "./artboardlayout";
import ArtBoard from "./ArtBoard";
import Signup from "./Signup";
import Chequestatus from "./Chequestatus";
import POstatus from "./POstatus";
import Congratulation from "./Congratulation";
import "./../../assets/css/artboard.css";
 
export class ArtBoardApp extends Component {
  render() {
    const { match } = this.props;
    return (
      <ArtboardLayout>
        <Route
          exact
          path={`${match.url}/artBoard`}
          component={ArtBoard}
        />
        <Route
          exact
          path={`${match.url}/signup`}
          component={Signup}
        />
         <Route
          exact
          path={`${match.url}/chequestatus`}
          component={Chequestatus}
        />    
         <Route
          exact
          path={`${match.url}/postatus`}
          component={POstatus}
        />      
         <Route
          exact
          path={`${match.url}/congratulation`}
          component={Congratulation}
        />   
      </ArtboardLayout>
    );
  }
}
export default ArtBoardApp;

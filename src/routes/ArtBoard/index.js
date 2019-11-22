import React, { Component } from "react";
import { Route } from "react-router-dom";
import ArtboardLayout from "./artboardlayout";
import ArtBoard from "./ArtBoard";
import Signup from "./Signup";
 
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
         
      </ArtboardLayout>
    );
  }
}
export default ArtBoardApp;

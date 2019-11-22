import React, { Component } from "react";
import { Route } from "react-router-dom";
import TenantLayout from "./TenantLayout";
import Dashboard from "./Dashboard";

export class TenantApp extends Component {
  render() {
    const { match } = this.props;
    return (
      <TenantLayout>
        <Route
          exact
          path={`${match.url}/Dashboard`}
          component={Dashboard}
        />
        
      </TenantLayout>
    );
  }
}
export default TenantApp;

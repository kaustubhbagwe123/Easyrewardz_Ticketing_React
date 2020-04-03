import React, { Component } from "react";
import { Route } from "react-router-dom";
import TenantLayout from "./TenantLayout";
import Dashboard from "./Dashboard";
import "./../../assets/css/tenant.css";
import AllAcounts from "./AllAcounts";
import Settings from "./Settings";
import Enterprise from "./EnterprisePlan";
import CreatePlan from "./CreatePlan";
import CreateNewPlan from "./CreateNewPlan";
import CustomPlan from "./CustomPlan";
import ListAllFeature from "./ListAllFeature";
import EditDetails from "./EditDetails";
import EditUserDetails from "./EditUserDetails";

export class TenantApp extends Component {
  render() {
    const { match } = this.props;
    return (
      <TenantLayout>
        <Route exact path={`${match.url}/Dashboard`} component={Dashboard} />
        <Route exact path={`${match.url}/allAcounts`} component={AllAcounts} />
        <Route exact path={`${match.url}/settings`} component={Settings} />
        <Route exact path={`${match.url}/enterprise`} component={Enterprise} />
        <Route exact path={`${match.url}/createPlan`} component={CreatePlan} />
        <Route exact path={`${match.url}/createNewPlan`} component={CreateNewPlan} />
        <Route exact path={`${match.url}/customPlan`} component={CustomPlan} />
        <Route exact path={`${match.url}/listAllFeature`} component={ListAllFeature} />
        <Route exact path={`${match.url}/editDetails`} component={EditDetails} />
        <Route exact path={`${match.url}/editUserDetails`} component={EditUserDetails} />
        
      </TenantLayout>
    );
  }
}
export default TenantApp;

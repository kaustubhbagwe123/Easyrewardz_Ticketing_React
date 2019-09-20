import React, { Component } from "react";
import { Route } from "react-router-dom";
import StoreLayout from "./../StoreManager/storelayout";
import StoreDashboard from "./StoreDashboard";
import StoreMaster from "./StoreMaster";
import StoreTask from "./StoreTask";
import StoreTaskView from "./StoreTaskView";

export class StoreApp extends Component {
  render() {
    const { match } = this.props;
    return (
      <StoreLayout>
        <Route
          exact
          path={`${match.url}/storeDashboard`}
          component={StoreDashboard}
        />
        <Route
          exact
          path={`${match.url}/storemaster`}
          component={StoreMaster}
        />
        <Route exact path={`${match.url}/storetask`} component={StoreTask} />
        <Route
          exact
          path={`${match.url}/storetaskview`}
          component={StoreTaskView}
        />
      </StoreLayout>
    );
  }
}
export default StoreApp;

import React, { Component } from "react";
import { Route } from "react-router-dom";
import QADashboardSearch from "./QADashboardSearch";
import Layout from './qalayout';

class index extends Component {
  render() {
    const { match } = this.props;
    return (
      <Layout>
        <Route
          exact
          path={`${match.url}/Dashboard`}
          component={QADashboardSearch}
        />
      </Layout>
    );
  }
}

export default index;

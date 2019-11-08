import React, { Component } from "react";
import { Route } from "react-router-dom";
import QADashboard from "./QADashboard";
import Layout from './qalayout';
import QAMyTicket from "./QAMyTicket";

class index extends Component {
  render() {
    const { match } = this.props;
    return (
      <Layout>
        <Route
          exact
          path={`${match.url}/Dashboard`}
          component={QADashboard}
        />
        <Route exact
        path={`${match.url}/myTicket`}
        component={QAMyTicket}/>
      </Layout>
    );
  }
}

export default index;

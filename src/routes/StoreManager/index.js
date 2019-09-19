import React, { Component } from "react";
import { Route } from "react-router-dom";
import StoreLayout from "./../StoreManager/storelayout";
import StoreDashboard from "./StoreDashboard";
import StoreMaster from "./StoreMaster";

export class StoreApp extends Component {
    render(){
        const{match}=this.props;
        return(
            <StoreLayout>
                <Route exact path={`${match.url}/storeDashboard`} component={StoreDashboard} />
                <Route exact path={`${match.url}/storemaster`} component={StoreMaster} />
            </StoreLayout>
            );
    }
}
export default StoreApp;
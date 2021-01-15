import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
// import Loadable from "react-loadable";
import "react-notifications/lib/notifications.css";

//Css
import "./assets/css/style.css";
import "./assets/css/settings.css";
import "./assets/css/store.css";
import "./assets/css/custome.css";

//JS
import "./../node_modules/popper.js/dist/popper.js";
import "./../node_modules/bootstrap/dist/js/bootstrap.js";
import "./../node_modules/jquery/dist/jquery.js";
import "./assets/css/chat.css";
import "react-table/react-table.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-pagination-js/dist/styles.css";

/////js
import "./../node_modules/bootstrap/dist/js/bootstrap.min.js";

///Component
import SignIn from "./Component/SignIn";
import ForgotPassword from "./Component/ForgotPassword";
import ProgramCodeSignIn from "./Component/ProgramCodeSignIn";
import App from "./routes/index";
import PieChart from "./Component/PieChart/PieChart";
import StoreApp from "./routes/StoreManager/index";
import ChangePassword from "./Component/ChangePassword";
import UserForgotPassword from "./Component/UserForgotPassword";
import StoreProgramCode from "./Component/Store/StoreProgramCode";
import StoreSignIn from "./Component/Store/StoreSignIn";
import StoreForgotPassword from "./Component/Store/StoreForgotPassword";
import StoreUserForgotPassword from "./Component/Store/StoreUserForgotPassword";
import ModuleSelect from "./Component/ModuleSelect";
import LanguageSelection from "./Component/Store/LanguageSelection";
import TicketingLanguageSelection from "./Component/TicketingLanguageSelection";
import ShipmentPrintHtml from "./routes/StoreManager/OrderTabs/ShipmentPrintHtml";
import Logout from "./../src/routes/StoreManager/Logout"

ReactDOM.render(
  <Router>
    {/* if required the only on uncomment this code and your system do not push this line*/}
    {/* <Route exact path="/" component={ModuleSelect} /> */}
    <Route path="/admin" component={App} />
    <Route path="/store" component={StoreApp} />
    <Route exact path="/programCodeSignIn" component={ProgramCodeSignIn} />
    <Route exact path="/SignIn" component={SignIn} />
    <Route
      exact
      path="/TicketingLanguageSelection"
      component={TicketingLanguageSelection}
    />
    <Route exact path="/Forgotpassword" component={ForgotPassword} />
    <Route exact path="/ChangePassword" component={ChangePassword} />
    <Route exact path="/languageSelection" component={LanguageSelection} />
    <Route exact path="/" component={StoreProgramCode} />
    <Route exact path="/storeSignIn" component={StoreSignIn} />
    <Route exact path="/storeForgotpassword" component={StoreForgotPassword} />
    <Route
      exact
      path="/storeUserForgotPassword"
      component={StoreUserForgotPassword}
    />
    <Route exact path="/UserForgotPassword" component={UserForgotPassword} />
    <Route exact path="/PieChart" component={PieChart} />
    <Route path="/ShipmentPrintHtml" component={ShipmentPrintHtml} />
    <Route path="/logout" component={Logout} />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';

//Css
import "./assets/css/style.css";
import "./assets/css/settings.css";
import "./assets/css/QA.css";
import "./assets/css/store.css";
import "./assets/css/custome.css";
<<<<<<< HEAD
//import "./assets/css/artboard.css";
=======
// import "./assets/css/artboard.css";
>>>>>>> 87cf9956995434be31979d6f420b9f3ed566a17d

//JS
import "./../node_modules/popper.js/dist/popper.js";
import "./../node_modules/bootstrap/dist/js/bootstrap.js";
import "./../node_modules/jquery/dist/jquery.js";
import "./assets/css/chat.css";
import "react-table/react-table.css";
import "react-datepicker/dist/react-datepicker.css";
 
/////js
import "./../node_modules/bootstrap/dist/js/bootstrap.min.js";
// import "./assets/js/bootstrap.min.js";

///Component
import SignIn from "./Component/SignIn";
import ForgotPassword from "./Component/ForgotPassword";
import ProgramCodeSignIn from "./Component/ProgramCodeSignIn";
import App from "./routes/index";
import PieChart from "./Component/PieChart/PieChart";
import StoreApp from "./routes/StoreManager/index";
import QAApp from './routes/QA/index';
import ArtBoardApp from './routes/ArtBoard/index';
<<<<<<< HEAD
// import ArtBoard from "./routes/ArtBoard/ArtBoard";
// import header from "./routes/ArtBoard/header";
=======
import TenantApp from "./routes/Tenant Controller";
>>>>>>> 87cf9956995434be31979d6f420b9f3ed566a17d
// import MyTicket from './routes/MyTicket';

ReactDOM.render(
  <Router>
    <Route path="/admin" component={App} />
    <Route path="/store" component={StoreApp} />
    <Route path="/qa" component={QAApp} />
    <Route exact path="/" component={ProgramCodeSignIn} />
    <Route exact path="/SignIn" component={SignIn} />
    <Route exact path="/Forgotpassword" component={ForgotPassword} />
    <Route exact path="/PieChart" component={PieChart} />
    <Route path="/artBoard" component={ArtBoardApp} />
<<<<<<< HEAD
=======
    <Route path="/tenantApp" component={TenantApp} />
>>>>>>> 87cf9956995434be31979d6f420b9f3ed566a17d
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();

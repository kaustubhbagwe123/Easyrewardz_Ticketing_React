import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Css
import "./assets/css/style.css";
import "./assets/css/custome.css";
import "./assets/css/settings.css";
import "./assets/css/QA.css";
import "./assets/css/store.css";

//JS
import "./../node_modules/popper.js/dist/popper.js";
import "./../node_modules/bootstrap/dist/js/bootstrap.js";
import "./../node_modules/jquery/dist/jquery.js";
import "./assets/css/chat.css";

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
// import MyTicket from './routes/MyTicket';
// import MyTicket from './routes/MyTicket';

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Router>
    <Route path="/admin" component={App} />
    <Route path="/store" component={StoreApp}/>
    <Route exact path="/" component={ProgramCodeSignIn} />
    <Route exact path="/SignIn" component={SignIn} />
    <Route exact path="/Forgotpassword" component={ForgotPassword} />
    <Route exact path="/PieChart" component={PieChart} />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();

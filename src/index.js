import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Css
import "./assets/css/style.css";
import "./assets/css/custome.css";
///Component
import SingIn from "./Component/SingIn";
import ForgotPassword from "./Component/ForgotPassword";
import ProgramCodeSignIn from "./Component/ProgramCodeSignIn";
import App from "./routes/index";
import PieChart from "./Component/PieChart/PieChart";
// import MyTicket from './routes/MyTicket';
// import MyTicket from './routes/MyTicket';

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Router>
    <Route path="/" component={App} />
    <Route exact path="/" component={ProgramCodeSignIn} />
    <Route exact path="/SingIn" component={SingIn} />
    <Route exact path="/Forgotpassword" component={ForgotPassword} />
    <Route exact path="/PieChart" component={PieChart} />
    {/* <Route exact path="/MyTicket" component={MyTicket}/> */}
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();

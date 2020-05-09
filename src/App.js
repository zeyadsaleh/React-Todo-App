import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home.js';
import Login from "./components/login.js";
import SignUp from "./components/signup.js";
import Logout from "./components/signout.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: localStorage.getItem('token') ? true : false
    }
  }

  isLoggedin = (value) => {
    this.setState({isLoggedin:value})
  }
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/"}>TODO</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  {!this.state.isLoggedin ? (
                    <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                      </li>
                    </>
                ) : (
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-out"}>Log Out</Link>
                    </li>)}
                </ul>
              </div>
            </div>
          </nav>

           <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path="/home"> <Home isLoggedin={this.state.isLoggedin} /> </Route>
                <Route path="/sign-out"><Logout isLoggedin={this.isLoggedin}/> </Route>
                <Route path="/sign-in"><Login isLoggedin={this.isLoggedin}/></Route>
                <Route path="/sign-up"><SignUp isLoggedin={this.isLoggedin} /></Route>
              </Switch>
            </div>
          </div>
        </div>
        </Router>
    );
  }
}


export default App;



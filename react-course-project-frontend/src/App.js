import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AddTravelPost from "./component/add-travelpost.component";
import TravelPost from "./component/travelpost.component";
import TravelPostsList from "./component/travelposts-list.component";


import AuthService from "./service/auth.service";

import Login from "./component/login.component";
import Register from "./component/register.component";
import Profile from "./component/profile.component";
import BoardUser from "./component/board-user.component";


class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/travelposts" className="navbar-brand">
            BucketList Blog
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/travelposts"} className="nav-link">
                Travel Posts
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
      
          
        {currentUser && (
               <li className="nav-item">
               <Link to={"/add"} className="nav-link">
                 Add
               </Link>
             </li>
            )}
           

           {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/travelposts"]} component={TravelPostsList} />
            <Route exact path="/add" component={AddTravelPost} />
            <Route path="/travelposts/:id" component={TravelPost} />
            
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
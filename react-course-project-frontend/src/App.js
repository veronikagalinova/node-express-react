import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AddTravelPost from "./component/add-travelpost.component";
import TravelPost from "./component/travelpost.component";
import TravelPostsList from "./component/travelposts-list.component";

class App extends Component {
  render() {
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
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/travelposts"]} component={TravelPostsList} />
            <Route exact path="/add" component={AddTravelPost} />
            <Route path="/travelposts/:id" component={TravelPost} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
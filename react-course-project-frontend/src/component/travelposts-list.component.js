import React, { Component } from "react";
import TravelPostDataService from "../service/travelpost.service";
import { Link } from "react-router-dom";
import AuthService from "../service/auth.service";

export default class TravelPostsList extends Component {

  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrievetravelPosts = this.retrieveTravelPosts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTravelPost = this.setActiveTravelPost.bind(this);
    this.removeAllTravelPosts = this.removeAllTravelPosts.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      travelPosts: [],
      currentTravelPost: null,
      currentIndex: -1,
      searchTitle: "",
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    this.retrieveTravelPosts();
      const user = AuthService.getCurrentUser();
  
      if (user) {
        this.setState({
          currentUser: user,
          showModeratorBoard: user && user.roles.includes("ROLE_MODERATOR"),
          showAdminBoard: user && user.roles.includes("ROLE_ADMIN"),
        });
    }
  
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }
  retrieveTravelPosts() {
    console.log("retrieveTravelPosts")
    TravelPostDataService.getAll()
      .then(response => {
        console.log(response)
        this.setState({
          travelPosts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTravelPosts();
    this.setState({
      currentTravelPost: null,
      currentIndex: -1
    });
  }

  setActiveTravelPost(travelPost, index) {
    this.setState({
      currentTravelPost: travelPost,
      currentIndex: index
    });
  }

  removeAllTravelPosts() {
    TravelPostDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchTitle() {
    TravelPostDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          travelPosts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }





  render() {
    const { searchTitle, travelPosts, currentTravelPost, currentIndex, showAdminBoard, showModeratorBoard, currentUser } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
              </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Travel posts list</h4>

          <ul className="list-group">
            {travelPosts &&
              travelPosts.map((travelPost, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTravelPost(travelPost, index)}
                  key={index}
                >
                  {travelPost.title}
                </li>
              ))}
              </ul>

{/* {showAdminBoard && ( */}
<button
  className="m-3 btn btn-sm btn-danger"
  onClick={this.removeAlltravelPosts}
>
  Remove All
</button>
{/* )} */}
</div>
<div className="col-md-6">
{currentTravelPost ? (
  <div>
    <h4>Travel Post</h4>
    <div>
      <label>
      <strong>Title:</strong>
                </label>{" "}
                {currentTravelPost.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTravelPost.description}
              </div>
              <div>
                <label>
                  <strong>Body:</strong>
                </label>{" "}
                {currentTravelPost.body}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTravelPost.published ? "Published" : "Pending"}
              </div>
{/* 
{
  currentUser && currentTravelPost.postedBy === currentUser.id && ( */}
    <Link
                to={"/travelPosts/" + currentTravelPost.id}
                className="btn btn-warning"
                >
                Edit
              </Link>
  {/* ) */}
{/* } */}
              
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a TravelPost...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
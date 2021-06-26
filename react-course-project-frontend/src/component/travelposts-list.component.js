import React, { Component } from "react";
import TravelPostDataService from "../service/travelpost.service";
import { Link } from "react-router-dom";

export default class TravelPostsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrievetravelPosts = this.retrieveTravelPosts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTravelPosts = this.setActiveTravelPosts.bind(this);
    this.removeAllTravelPosts = this.removeAllTravelPosts.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      travelPosts: [],
      currentTravelPos: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTravelPosts();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }
  retrieveTravelPosts() {
    TravelPostDataService.getAll()
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

  refreshList() {
    this.retrieveTravelPosts();
    this.setState({
      currentTravelPost: null,
      currentIndex: -1
    });
  }

  setActiveTravelPosts(travelPost, index) {
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
    const { searchTitle, travelPosts, currentTravelPost, currentIndex } = this.state;

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
                  onClick={() => this.setActivetravelPost(travelPost, index)}
                  key={index}
                >
                  {travelPost.title}
                </li>
              ))}
              </ul>

<button
  className="m-3 btn btn-sm btn-danger"
  onClick={this.removeAlltravelPosts}
>
  Remove All
</button>
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
                  <strong>Status:</strong>
                </label>{" "}
                {currentTravelPost.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/travelPosts/" + currentTravelPost.id}
                className="badge badge-warning"
                >
                Edit
              </Link>
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
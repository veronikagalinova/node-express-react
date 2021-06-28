import React, { Component } from "react";
import TravelPostDataService from "../service/travelpost.service";

export default class TravelPost extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTravelPost = this.getTravelPost.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTravelPost = this.updateTravelPost.bind(this);
    this.deleteTravelPost = this.deleteTravelPost.bind(this);

    this.state = {
      currentTravelPost: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTravelPost(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTravelPost: {
          ...prevState.currentTravelPost,
          title: title
        }
    };
});
}

onChangeDescription(e) {
const description = e.target.value;

this.setState(prevState => ({
  currentTravelPost: {
    ...prevState.currentTravelPost,
    description: description
  }
}));
}

getTravelPost(id) {

TravelPostDataService.get(id)
  .then(response => {
    this.setState({
      currentTravelPost: response.data
    });
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
});
}

updatePublished(status) {
  var data = {
    id: this.state.currentTravelPost.id,
    title: this.state.currentTravelPost.title,
    description: this.state.currentTravelPost.description,
    published: status
  };

  TravelPostDataService.update(this.state.currentTravelPost.id, data)
    .then(response => {
      this.setState(prevState => ({
        currentTravelPost: {
          ...prevState.currentTravelPost,
          published: status
        }
      }));
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
}

updateTravelPost() {
  TravelPostDataService.update(
    this.state.currentTravelPost.id,
    this.state.currentTravelPost
  )
    .then(response => {
      console.log(response.data);
      this.setState({
        message: "The TravelPost was updated successfully!"
      });
    })
    .catch(e => {
      console.log(e);
    });
}
deleteTravelPost() {    
    TravelPostDataService.delete(this.state.currentTravelPost.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/travelposts')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTravelPost } = this.state;

    return (
    <div>
        {currentTravelPost ? (
          <div className="edit-form">
            <h4>Travel Post</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTravelPost.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTravelPost.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTravelPost.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTravelPost.published ? (
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={this.deleteTravelPost}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-outline-warning btn-sm"
              onClick={this.updateTravelPost}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a TravelPost...</p>
          </div>
        )}
      </div>
    );
  }
}
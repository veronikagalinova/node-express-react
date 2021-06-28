import React, {
    Component
} from "react";
import TravelPostDataService from "../service/travelpost.service";

export default class AddTravelPost extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);

        this.saveTravelPost = this.saveTravelPost.bind(this);
        this.newTravelPost = this.newTravelPost.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            published: false,
            body: "",
            // authorId: null,
            // comments: [],
            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeBody(e) {
      this.setState({
        body: e.target.value
    });
    }

    saveTravelPost() {
        var data = {
            title: this.state.title,
            description: this.state.description,
            published: true,
            body: this.state.body
        };

        TravelPostDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published,
                    body: response.data.body,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newTravelPost() {
        this.setState({
            id: null,
            title: "",
            description: "",
            published: false,
            body: "",
            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={this.newTravelPost}>
                    Add
                  </button>
                </div>
              ) : (
                <div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    name="title"
                  />
                </div>
                <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
                  <label htmlFor="body">Body</label>
                  <input
                    type="text"
                    className="form-control"
                    id="body"
                    required
                    value={this.state.body}
                    onChange={this.onChangeBody}
                    name="title"
                  />
                  </div>

            <button onClick={this.saveTravelPost} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  
    }
}
const db = require("../models");
const TravelPost = db.travelposts;

// Create and Save a new TravelPost
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.description) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a TravelPost
  const travelpost = new TravelPost({
    title: req.body.title,
    description: req.body.description,
    destination: req.body.destination,
    published: req.body.published ? req.body.published : false,
    body: req.body.body,
    postedBy: req.body.postedBy
  });

  // Save TravelPost in the database
  travelpost
    .save(travelpost)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TravelPost."
      });
    });
};

// Retrieve all TravelPost from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    TravelPost.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving TravelPosts."
        });
      });
};

// Find a single TravelPost with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    TravelPost.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found TravelPosts with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving TravelPosts with id=" + id });
      });
};

// Update a TravelPost by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      TravelPost.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update TravelPost with id=${id}. Maybe TravelPost was not found!`
            });
          } else res.send({ message: "TravelPost was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating TravelPost with id=" + id
          });
        });
};

// Delete a TravelPost with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    TravelPost.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete TravelPost with id=${id}. Maybe TravelPost was not found!`
          });
        } else {
          res.send({
            message: "TravelPost was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete TravelPost with id=" + id
        });
      });
};

// Delete all TravelPost from the database.
exports.deleteAll = (req, res) => {
    TravelPost.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} TravelPost were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all TravelPosts."
      });
    });
};

// Find all TravelPost for destination - TEST
exports.findAllByDestination = (req, res) => {
    const destination = req.params.destination;
    TravelPost.find({ destination: destination })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TravelPosts for destination " + destination 
      });
    });
};

// Find all TravelPost for destination - TEST
exports.findAllTitle = (req, res) => {
  const title = req.params.title;
  TravelPost.find({ title: title })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving TravelPosts for title " + title 
    });
  });
};
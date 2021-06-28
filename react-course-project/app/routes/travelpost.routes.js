module.exports = app => {
    const travelposts = require("../controllers/travelpost.controller.js");
  
    var router = require("express").Router();
  
    // Create a new TravelPost
    router.post("/", travelposts.create);
  
    // Retrieve all TravelPost
    router.get("/", travelposts.findAll);
  
    // Retrieve a single TravelPost with id
    router.get("/:id", travelposts.findOne);
  
    // Update a TravelPost with id
    router.put("/:id", travelposts.update);
  
    // Delete a TravelPost with id
    router.delete("/:id", travelposts.delete);
  
    // Create a new TravelPost
    router.delete("/", travelposts.deleteAll);
  
    app.use('/api/travelposts', router);
  };
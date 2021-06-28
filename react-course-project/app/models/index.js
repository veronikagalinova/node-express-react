const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.travelposts = require("./travelpost.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
db.role = require("./role.model")(mongoose);

db.ROLES = ["traveler", "admin", "moderator"];

module.exports = db;
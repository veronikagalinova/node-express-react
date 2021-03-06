const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

module.exports = mongoose => {
  var schema =
    mongoose.Schema({
      title: String,
      description: String,
      destionation: String,
      published: Boolean,
      postedBy: {
        type: ObjectId,
        ref: "User",
      },
      body: {
        type: {},
        required: true,
        min: 2,
        max: 2000000,
      },
      photo: {
        data: Buffer,
        contentType: String,
      }
    }, {
      timestamps: true
    });


  schema.method("toJSON", function () {
    const {
      __v,
      _id,
      ...object
    } = this.toObject();
    object.id = _id;
    return object;
  });

  const TravelPost = mongoose.model("travelpost", schema);
  return TravelPost;
};
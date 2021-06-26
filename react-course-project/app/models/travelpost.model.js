module.exports = mongoose => {
  var schema =
    mongoose.Schema({
      title: String,
      description: String,
      destionation: String,
      published: Boolean,
      authorId: Number,
      commentId: Number
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
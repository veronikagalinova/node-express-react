module.exports = mongoose => {
  var schema =
    mongoose.Schema({
      name: String
    }, {
      timestamps: true
    });
  const Role = mongoose.model("Role", schema);
  return Role;
};
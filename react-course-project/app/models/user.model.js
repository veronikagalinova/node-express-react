module.exports = mongoose => {
  var schema =
      ({
      username: String,
      email: String,
      password: String,
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
    });

    const User = mongoose.model("users", schema);
    return User;
  };
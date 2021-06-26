module.exports = mongoose => {
    var schema = mongoose.Schema({
        firstName: {
            type: String,
        },
        secondName: {
            type: String,
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            defualt: false
        },
    }, {
        timestamps: true
    });

    const User = mongoose.model("user", schema);
    return User;
};
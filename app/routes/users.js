
const { createUser, login } = require('./../controller/users');

module.exports = function (app) {
    // define routes in here
    app.post("/users", createUser);
    app.post("/users/login", login);
};

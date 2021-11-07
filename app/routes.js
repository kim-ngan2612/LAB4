module.exports = function (app) {
  require("./routes/products")(app);
  require("./routes/users")(app);
};

const { createProducts, getProducts } = require("../controller/products");
const isAuth = require('./../middleware/isAuth');

module.exports = function (app) {
  app.get("/products", isAuth, getProducts);
  
  app.post("/products", createProducts);
};

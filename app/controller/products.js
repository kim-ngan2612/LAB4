const Products = require("./../models/products");

module.exports = {
  getProducts: async function (req, res, next) {
    const products = await Products.find({});

    return res.status(200).json({ products: products });
  },

  createProducts: async function (req, res, next) {
    try {
      const { name, imageLink, type, price } = req.body;

      // create new products instance
      const newProd = new Products({
        name: name,
        imageLink: imageLink,
        type: type,
        price: price,
      });

      // save products
      await newProd.save();

      res.status(201).json({ product_created: newProd });
    } catch (err) {
      res.status(500).json({ mess: err.message });
    }
  },
  // PUT/ DELETE
};

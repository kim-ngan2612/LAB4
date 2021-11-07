const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    price: {
        type: Number
    },
    imageLink: {
        type: String
    }
})

module.exports = mongoose.model('products', productsSchema);
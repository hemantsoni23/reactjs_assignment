const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
});

module.exports = mongoose.model('Product', DataSchema);

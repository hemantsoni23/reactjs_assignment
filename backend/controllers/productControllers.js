const Product = require('../models/Product');

// GET /api/Product/all - Fetch all Product for admin
const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Product' });
    }
};

// GET /api/Product/:id - Fetch single Product
const getProductById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching Product' });
    }
}

// POST /api/Product
const createProduct = async (req, res) => {
    const { name, price, description, category, image, stock } = req.body;

    try {
        const newProduct = new Product({
            name,
            price, 
            description,
            category,
            image,
            stock
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', Product: newProduct });
    } catch (error) {
        res.status(500).json({ error: 'Error creating Product',error });
    }
};

// PUT /api/Product/:id -
const updateProduct = async (req, res) => {
    const { name, price, description, category, image, stock } = req.body;

    try {
        const id = String(req.params.id);
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found or unauthorized' });
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.category = category || product.category;
        product.image = image || product.image;
        product.stock = stock || product.stock;
        await product.save();

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ error: 'Error updating Product', error });
    }
};

// DELETE /api/Product/:id 
const deleteProduct = async (req, res) => {

    try {
        const id = String(req.params.id);
        const product = await Product.findOneAndDelete({ _id: id });

        if (!product) {
            return res.status(404).json({ error: 'Product not found or unauthorized' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting Product' });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct, 
    getAllProduct,
    getProductById
};

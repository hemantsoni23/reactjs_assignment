const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');
const authMiddleware = require('../middlewares/authMiddlewares');

// GET /api/data/all - Fetch all data for admin
router.get('/all', productControllers.getAllProduct);

// GET /api/data/:id - Fetch single data
router.get('/:id', productControllers.getProductById);

// POST /api/data - Create new data
router.post('/', authMiddleware, productControllers.createProduct);

// PUT /api/data/:id - Update data
router.put('/:id', authMiddleware, productControllers.updateProduct);

// DELETE /api/data/:id - Delete data
router.delete('/:id', authMiddleware, productControllers.deleteProduct);

module.exports = router;

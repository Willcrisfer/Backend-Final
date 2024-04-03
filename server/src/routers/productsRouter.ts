import { Router } from "express";
import ProductsController from "../controllers/productsController.js";

const router = Router();

// Get all products
/**
 * @swagger 
 * tags:
 *   name: Products
 *   description: Api para gerenciamento de produtos
 */

/**
 * @swagger
 * /api/products:
 *   get:   
 *     summary: Get all products
 *     tags: [Products]
 *    
 *     
 */
router.get('/products', ProductsController.getAllProducts);


// Get product by ID
router.get('/products/:id', ProductsController.getProductById);

// Create a new product
router.post('/products', ProductsController.createProduct);

// Update an existing product
router.put('/products/:id', ProductsController.updateProduct);

// Delete an existing product
router.delete('/products/:id', ProductsController.deleteProduct);

export default router;
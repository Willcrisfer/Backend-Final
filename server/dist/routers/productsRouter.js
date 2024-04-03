import { Router } from "express";
import ProductsController from "../controllers/productsController.js";
const router = Router();
router.get('/products', ProductsController.getAllProducts);
router.get('/products/:id', ProductsController.getProductById);
router.post('/products', ProductsController.createProduct);
router.put('/products/:id', ProductsController.updateProduct);
router.delete('/products/:id', ProductsController.deleteProduct);
export default router;
//# sourceMappingURL=productsRouter.js.map
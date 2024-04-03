import fileService from "../utils/fileService.js";
import jsonFileReader from "../utils/jsonFileReader.js";
const productsPath = "./src/data/products.json";
class ProductsController {
    getAllProducts(req, res) {
        const products = jsonFileReader.readFileJson(productsPath);
        return res.json(products);
    }
    ;
    getProductById(req, res) {
        const productId = parseInt(req.params.id);
        const products = jsonFileReader.readFileJson(productsPath);
        const product = products.find(product => product.id === productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        return res.json(product);
    }
    ;
    createProduct(req, res) {
        var _a, _b;
        const newProduct = req.body;
        const products = jsonFileReader.readFileJson(productsPath);
        const lastId = products.length > 0 ? products[products.length - 1].id : 0;
        newProduct.id = lastId + 1;
        newProduct.image = "no-image.jpg";
        if ((_a = req.files) === null || _a === void 0 ? void 0 : _a.image) {
            newProduct.image = fileService.save((_b = req.files) === null || _b === void 0 ? void 0 : _b.image);
        }
        products.push(newProduct);
        jsonFileReader.writeFileJson(productsPath, products);
        return res.status(201).json(newProduct);
    }
    ;
    updateProduct(req, res) {
        var _a, _b;
        const productId = parseInt(req.params.id);
        const { title, price, description, category } = req.body;
        const products = jsonFileReader.readFileJson(productsPath);
        const productIndex = products.findIndex(product => product.id === productId);
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        const updatedProduct = {
            id: productId,
            title,
            price,
            description,
            category,
            image: products[productIndex].image
        };
        if ((_a = req.files) === null || _a === void 0 ? void 0 : _a.image) {
            fileService.delete(products[productIndex].image);
            updatedProduct.image = fileService.save((_b = req.files) === null || _b === void 0 ? void 0 : _b.image);
        }
        products[productIndex] = updatedProduct;
        jsonFileReader.writeFileJson(productsPath, products);
        return res.json(updatedProduct);
    }
    ;
    deleteProduct(req, res) {
        const productId = parseInt(req.params.id);
        const products = jsonFileReader.readFileJson(productsPath);
        const productIndex = products.findIndex(product => product.id === productId);
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        fileService.delete(products[productIndex].image);
        const deletedProduct = products.splice(productIndex, 1);
        jsonFileReader.writeFileJson(productsPath, products);
        return res.json(deletedProduct[0]);
    }
    ;
}
export default new ProductsController;
//# sourceMappingURL=productsController.js.map
import { IProduct } from "../interfaces/interfaces.js";
import fileService from "../utils/fileService.js";
import jsonFileReader from "../utils/jsonFileReader.js";
import { Request, Response } from 'express';
import ProductService from "../services/ProductService.js";
import ProductModel from "../models/ProductModel.js";

const productsPath = "./src/data/products.json";

class ProductsController {
  // getAllProducts(req: Request, res: Response) {
  //   const products: IProduct[] = jsonFileReader.readFileJson(productsPath);
  //   return res.json(products);
  // };

  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductModel.find();
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
  };

  getProductById(req: Request, res: Response) {
    const productId = parseInt(req.params.id);
    const products: IProduct[] = jsonFileReader.readFileJson(productsPath);
    const product: IProduct | undefined =
      products.find(product => product.id === productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    return res.json(product);
  };

  createProduct(req: Request, res: Response) {

    /////// NEW VERSION

    try {
      const newProduct: IProduct = ProductService.create (req.body,req.files?.image);
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json({ error: error, "message": "Internal Server Error" });
    }



    /////// OLD VERSION
    // const newProduct: IProduct = req.body;

    // const products: IProduct[] = jsonFileReader.readFileJson(productsPath);
    // const lastId = products.length > 0 ? products[products.length - 1].id : 0;
    // newProduct.id = lastId + 1;

    // newProduct.image = "no-image.jpg";
    // if (req.files?.image) {
    //   newProduct.image = fileService.save(req.files?.image) //
    // }

    // products.push(newProduct);
    // jsonFileReader.writeFileJson(productsPath, products);

    // return res.status(201).json(newProduct);
  };



  updateProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.id);
    const updatedProduct = 
    ProductService.update(req.body, productId, req.files?.image);

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    } 
    return res.json(updatedProduct);
  };

  deleteProduct(req: Request, res: Response) {
    const deletedProduct = ProductService.delete(parseInt(req.params.id))
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    return res.json(deletedProduct)
  


  /// NEW VERSION
  // updateProduct(req: Request, res: Response) {
  //   const productId = parseInt(req.params.id);
  //   const updatedProduct = 
  //   ProductService.update(req.body, productId, req.files?.image);

  //   if (!updatedProduct) {
  //     return res.status(404).json({ error: 'Product not found.' });
  //   } 
  //   return res.json(updatedProduct);
  // };


    /// OLD VERSION
  //   const productId = parseInt(req.params.id);
  //   const { title, price, description, category } = req.body;

  //   const products: IProduct[] = jsonFileReader.readFileJson(productsPath);

  //   const productIndex = products.findIndex(product => product.id === productId);

  //   if (productIndex === -1) {
  //     return res.status(404).json({ error: 'Product not found.' });
  //   }

  //   const updatedProduct: IProduct = {
  //     id: productId,
  //     title,
  //     price,
  //     description,
  //     category,
  //     image: products[productIndex].image
  //   }

  //   if (req.files?.image) {
  //     fileService.delete(products[productIndex].image);
  //     updatedProduct.image = fileService.save(req.files?.image);
  //   }

  //   products[productIndex] = updatedProduct;

  //   jsonFileReader.writeFileJson(productsPath, products);

  //   return res.json(updatedProduct);
  // };



  //deleteProduct(req: Request, res: Response) {
    ////// NEW VERSION
  //  const productId = parseInt(req.params.id);
  //     const deleteProduct = 
  //     ProductService.update(req.body, productId, req.files?.image);
  
  //     if (!this.deleteProduct) {
  //       return res.status(404).json({ error: 'Product not found.' });
  //     } 
  //     return res.json(deleteProduct);
  



      ////// OLD VERSION
        //     const productId = parseInt(req.params.id);
        //     const products: IProduct[] = jsonFileReader.readFileJson(productsPath);
        //     const productIndex = products.findIndex(product => product.id === productId);

        //     if (productIndex === -1) {
        //       return res.status(404).json({ error: 'Product not found.' });
        //     }
        //     fileService.delete(products[productIndex].image);
        //     const deletedProduct = products.splice(productIndex, 1);

        //     jsonFileReader.writeFileJson(productsPath, products);

        //     return res.json(deletedProduct[0]);
  };
}

export default new ProductsController;
import { IProduct } from "../interfaces/interfaces.js";
import FileService from "../utils/fileService.js";
import jsonFileReader from "../utils/jsonFileReader.js";

const productsPath = "./src/data/products.json";

class ProductService {
  getAll(): IProduct[] {
    return jsonFileReader.readFileJson(productsPath)
  };

  getOne(productId: number): IProduct | undefined {
    const products: IProduct[] = jsonFileReader.readFileJson(productsPath);
    return products.find(product => product.id === productId);
  };

  create(productData: any, imageFile : any): IProduct {
    const { title, price, description, category } = productData;
    const products: IProduct[] = jsonFileReader.readFileJson(productsPath);
    const lastId = products.length > 0 ? products[products.length - 1].id : 0;
    let image = "no-image.jpg";

    const newProduct: IProduct = {
      id: lastId + 1,
      title,
      price,
      description,
      category,
      image
    }
    if (imageFile) {
      newProduct.image = FileService.save(imageFile);
    }
    products.push(newProduct);
    jsonFileReader.writeFileJson(productsPath, products);
    return newProduct;
  };

  update(productData: any, productId: number, productImage: any) {
    const { title, price, description, category } = productData;
    const products: IProduct[] = jsonFileReader.readFileJson(productsPath);
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
      return undefined;
    }

    const updatedProduct: IProduct = {
      id: productId,
      title, price, description, category,
      image: products[productIndex].image
    }
   if (productImage) {
    FileService.delete(products[productIndex].image);
    updatedProduct.image = FileService.save(productImage);
   }

    products[productIndex] = updatedProduct;
    jsonFileReader.writeFileJson(productsPath, products);
    return updatedProduct;
  };


  delete(productId: number): IProduct | undefined {
    const products: IProduct[] = jsonFileReader.readFileJson(productsPath);
    const productIndex =
      products.findIndex(product => product.id === productId);
    if (productIndex === -1) {
      return undefined;
    }
    FileService.delete(products[productIndex].image);
    const deletedProduct = products.splice(productIndex, 1);
    jsonFileReader.writeFileJson(productsPath, products);
    return deletedProduct[0];
  



//   delete(productData: any, productId: number, productImage: any) {

//     const { title, price, description, category } = productData;
//     const products: IProduct[] = jsonFileReader.readFileJson(productsPath);
//     const productIndex = products.findIndex(product => product.id === productId);

//     if (productIndex === -1) {
//     return undefined;
//     }

//     const deletedProduct: IProduct = {
//         id: productId,
//         title, price, description, category,
//         image: products[productIndex].image
//       }

//       if (productImage) {
//         FileService.delete(products[productIndex].image);
//         deletedProduct.image = FileService.save(productImage);
//        }
//         products[productIndex] = deletedProduct;
//         jsonFileReader.writeFileJson(productsPath, products);
//         return deletedProduct;;


    //     }
    //     fileService.delete(products[productIndex].image);
    //     const deletedProduct = products.splice(productIndex, 1);
  
    //     jsonFileReader.writeFileJson(productsPath, products);
  
    //     return res.json(deletedProduct[0]);
     
    
  };
}
export default new ProductService;
import { ProductAttributes, Product } from '../models/product.model';
import { UserAttributes, User } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class ProductService {

    public bought(product1: ProductAttributes): Promise<ProductAttributes> {
       return Product.findOne( {
           where: {
               productId: product1.productId
           }
       })
           .then(product => {
               product.set('status', 'sold');
               product.save();
               return Promise.resolve(product);
           });
    }
}

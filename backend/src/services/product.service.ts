import { ProductAttributes, Product } from '../models/product.model';
import { UserAttributes, User } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class ProductService {

    public bought(tobuyId: number, buyerId: number): Promise<ProductAttributes> {
       return Product.findByPk(tobuyId)
           .then(product => {
               product.set('status', 'sold');
               product.set('boughtbyId', buyerId);
               product.save();
               return Promise.resolve(product);
           });
    }

    public price(Id: number): Promise<number> {
        return Product.findByPk(Id)
            .then(product => {
                const price = product.price;
                return Promise.resolve(price);
            });
    }

    public userId(Id: number): Promise<number> {
        return Product.findByPk(Id)
            .then(product => {
                const userId = product.userId;
                return Promise.resolve(userId);
            });
    }
}

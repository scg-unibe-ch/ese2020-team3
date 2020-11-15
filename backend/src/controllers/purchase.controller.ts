import express from 'express';
import { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import Sequelize, {where} from 'sequelize';

const purchaseController: Router = express.Router();
const userService = new UserService();
const productService = new ProductService();


/**
 * !!!!!!!!!!!!! DO NOT USE THIS IT DOES NOT WORK YET !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
purchaseController.put('/calculate/:productid/:price',
    async (req: Request, res: Response) => {
        const tobuyId = Number(req.params.productId);
        const buyerId = req.body.userId;
        const price = Number(req.params.price);
        const product = productService.bought(tobuyId, buyerId);
        userService.buy(buyerId, price).then(bought => res.send(bought)).catch(err => res.status(500).send(err));
}
);

export const PurchaseController: Router = purchaseController;

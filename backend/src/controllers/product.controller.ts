import express from 'express';
import { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import Sequelize, {where} from 'sequelize';

const productController: Router = express.Router();
const userService = new UserService();
const productService = new ProductService();

// post a product
productController.post('/post', (req: Request, res: Response) => {
    Product.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));
});

// update product attributes
productController.put('/:id', (req: Request, res: Response) => {
    Product.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update(req.body).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));

});

// get price of product
productController.get('/price',
    (req: Request, res: Response) => {
        const Id = Number(req.body.productId);
        Product.findByPk(Id)
            .then(product => {
                const price = product.price;
                res.status(200).send(price.toString());
            });
    });

// get Id of user who posted the product
productController.get('/userId',
    (req: Request, res: Response) => {
        const Id = Number(req.body.productId);
        Product.findByPk(Id)
            .then(product => {
                const userId = product.userId;
                res.status(200).send(userId.toString());
            });
    });

// search for specific product
productController.get('/search',
    (req: Request, res: Response) => {

        let title = '%';
        let uplim = 10000;
        let lowlim = 0;
        const location = '%';
        let deliverable = null;

    if (req.body.title != null) {
        title = req.body.title;
    }
    if (req.body.uplim != null) {
        uplim = req.body.uplim;
    }
    if (req.body.lowlim != null) {
        lowlim = req.body.lowlim;
    }
    if (req.body.location != null) {
            lowlim = req.body.lowlim;
    }
    if (req.body.deliverable != null) {
        deliverable = req.body.deliverable;
    }

        Product.findAll({
                where: Sequelize.and({
                    price: {[Sequelize.Op.gte]: lowlim, [Sequelize.Op.lte]: uplim},
                    title: {[Sequelize.Op.like]: '%' + title + '%'},
                    location: {[Sequelize.Op.like]: '%' + location + '%'},
                    deliverable: {[Sequelize.Op.is]: deliverable}
                })
            }
        )
            .then(found => {
                res.status(200).send(found);
            });
    });

// updates product with userId of user who bought it and sets status to 'sold'
productController.put('/buy/:id',
    (req: Request, res: Response) => {
    const tobuyId = Number(req.params.id);
    const buyerId = req.body.userId;
        productService.bought(tobuyId, buyerId).then((bought) => res.status(200).send(bought)).catch(err => res.status(500).send(err));
    }
);

// deletes product
productController.delete('/:id', (req: Request, res: Response) => {
    Product.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

productController.get('/:id', (req: Request, res: Response) => {
    Product.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                res.status(200).send(found);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

// for some reason this doesnt find anything
/*
productController.get('/all', (req: Request, res: Response) => {
    Product.findAll()
        .then(found => {
            if (found != null) {
                res.status(200).send(found);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});
*/

// gets products by authorized
productController.get('/authorized/:boolean',  (req: Request, res: Response) => {
    const authorized = req.params.boolean;
    Product.findAll({
        where: Sequelize.or({
            authorized: {[Sequelize.Op.like]: '%' + authorized + '%'}
        })
    })
        .then(found => {
            if (found != null) {
                res.status(200).send(found);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

// gets all products posted by a certain user
productController.get('/all/:userId',  (req: Request, res: Response) => {
    const userId = req.params.userId;
    Product.findAll({
        where: Sequelize.or({
            userId: {[Sequelize.Op.like]: userId }
        })
    })
        .then(found => {
            if (found != null) {
                res.status(200).send(found);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});




export const ProductController: Router = productController;

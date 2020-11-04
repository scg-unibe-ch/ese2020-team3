import express from 'express';
import { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import Sequelize, {where} from 'sequelize';

const productController: Router = express.Router();
const userService = new UserService();
const productService = new ProductService();

productController.post('/post', (req: Request, res: Response) => {
    Product.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));
});

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


productController.get('/search',
    (req: Request, res: Response) => {
        let title = '%';
        let uplim = 10000;
        let lowlim = 0;
        const location = '%';
        let deliverable = '%';
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

// TODO product needs to know userID and do some testing
productController.put('/buy',
    (req: Request, res: Response) => {
        productService.bought(req.body).then(() => res.status(200).send());
    }
);

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

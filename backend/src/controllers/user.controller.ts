
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register',
    (req: Request, res: Response) => {
        userService.register(req.body).then(registered => res.send(registered)).catch(err => res.status(500).send(err));
    }
);

userController.put('/update',
    (req: Request, res: Response) => {
        userService.update(req.body).then(updated => res.send(updated)).catch(err => res.status(500).send(err));
    }
    );

// TODO not yet tested
userController.put('/calculate/:price',
    (req: Request, res: Response) => {
        const buyerId = req.body.userId;
        const price = Number(req.params.price);
        userService.calculate(buyerId, price).then(calculated => res.send(calculated)).catch(err => res.status(500).send(err));
    }
    );

userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body).then(login => res.send(login)).catch(err => res.status(500).send(err));
    }
);

userController.get('/', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll().then(users => res.send(users)).catch(err => res.status(500).send(err));
    }
);

export const UserController: Router = userController;

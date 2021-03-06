import { UserAttributes, User } from '../models/user.model';
import { ProductAttributes, Product } from '../models/product.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {

    public register(user: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;
        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        return User.create(user).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public sell(sellerId: number, price: number): Promise<UserAttributes> {
        return User.findOne( {
            where: {
                userId: sellerId
            }
        })
            .then(user => {
                user.set('wallet', user.wallet + price);
                user.save();
                return Promise.resolve(user);
            });
    }

    public buy(buyerId: number, price: number): Promise<UserAttributes> {
        return User.findOne( {
            where: {
                userId: buyerId
            }
        })
            .then(user => {
                user.set('wallet', user.wallet - price);
                user.save();
                return Promise.resolve(user);
            });
    }

    public update(user1: UserAttributes): Promise<UserAttributes> {
        // const newAttributes = user;
        return User.findOne({
            where: {
                userId: user1.userId
            }
        })
            .then(user => {
                user.update(user1);
                return Promise.resolve(user);
            });
    }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        const secret = process.env.JWT_SECRET;
        return User.findOne({
            where: {
                userName: loginRequestee.userName
            }
        })
        .then(user => {
            if (bcrypt.compareSync(loginRequestee.password, user.password)) {// compares the hash with the password from the lognin request
                const token: string = jwt.sign({ userName: user.userName, userId: user.userId }, secret, { expiresIn: '2h' });
                return Promise.resolve({ user, token });
            } else {
                return Promise.reject({ message: 'not authorized' });
            }
        })
        .catch(err => Promise.reject({ message: err }));
    }

    public getAll(): Promise<User[]> {
        return User.findAll();
    }
}

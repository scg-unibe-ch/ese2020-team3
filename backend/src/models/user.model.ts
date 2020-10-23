import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface UserAttributes {
    userId: number;
    userEmail: string;
    userFirstName: string;
    userLastName: string;
    userName: string;
    password: string;
    gender: string;
    telephoneNumber: number;
    street: string;
    pinCode: number;
    city: string;
    country: string;
    isAdmin: boolean;
    wallet: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    userId!: number;
    userEmail!: string;
    userFirstName!: string;
    userLastName!: string;
    userName!: string;
    password!: string;
    gender!: string;
    telephoneNumber!: number;
    street!: string;
    pinCode!: number;
    city!: string;
    country!: string;
    isAdmin!: boolean;
    wallet!: number;

    public static initialize(sequelize: Sequelize) {
        User.init({
                userId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                userEmail: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                userFirstName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                userLastName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                userName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                gender: {
                    type: DataTypes.STRING,
                },
                telephoneNumber: {
                    type: DataTypes.INTEGER,
                },
                street: {
                    type: DataTypes.STRING,
                },
                pinCode: {
                    type: DataTypes.INTEGER,
                },
                city: {
                    type: DataTypes.STRING,
                },
                country: {
                    type: DataTypes.STRING,
                },
                wallet: {
                    type: DataTypes.INTEGER,
                },
                isAdmin: {
                    type: DataTypes.BOOLEAN,
                }
            },


            {
                sequelize,
                tableName: 'users'
            }
        );
    }
}

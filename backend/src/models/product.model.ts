import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { TodoList } from './todolist.model';

export interface ProductAttributes {

    productId: number;
    authorized: boolean;
    title: string;
    type: string;
    location: string;
    sell_lend: string;
    deliverable: boolean;
    status: string;
    description: string;
    price: number;
    userId: number;
}

// tells sequelize that todoItemId is not a required field
export interface ProductCreationAttributes extends Optional<Product, 'productId'> { }


export class Product extends Model<ProductAttributes, ProductAttributes> implements ProductAttributes {

    productId!: number;
    authorized!: boolean;
    title!: string;
    type!: string;
    location!: string;
    sell_lend!: string;
    deliverable!: boolean;
    status!: string;
    description!: string;
    price!: number;
    userId!: number;


    public static initialize(sequelize: Sequelize) { // definition for database
        Product.init({
                productId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                authorized: {
                    type: DataTypes.BOOLEAN,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                type: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                location: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                sell_lend: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                deliverable: {
                    type: DataTypes.BOOLEAN,
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                price: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: 'products' }
        );

    }
    /*public static createAssociations() {
        TodoItem.belongsTo(TodoList, {
            targetKey: 'todoListId',
            as: 'todoList',
            onDelete: 'cascade',
            foreignKey: 'todoListId'
        });
    }*/

}

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface UserInstance extends Model {
    id: number;
    name: string,
    cidade: string,
    email: string;
    password: string;
    permissao: string;
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type:DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    cidade: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    },
    permissao: {
        type: DataTypes.STRING
    },

}, {
    tableName: 'users',
    timestamps: false
});


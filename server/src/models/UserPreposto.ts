import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface UserInstancePreposto extends Model {
    iduserPreposto: number;
    name: string,
    cidade: string,
    email: string;
    password: string;
    permissao: string;
    createdAt: Date,
}

export const UserPreposto = sequelize.define<UserInstancePreposto>('UserPreposto', {
    iduserPreposto: {
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
    createdAt: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'userpreposto',
    timestamps: false
});
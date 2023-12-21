import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { User } from './User';

export interface UserInstancePreposto extends Model {
    id: number;
    name: string,
    cidade: string,
    email: string;
    password: string;
    permissao: string;
    createdAt: Date;
    users_id: number;
    user?: typeof User & { name: string | null };
}

export const UserPreposto = sequelize.define<UserInstancePreposto>('UserPreposto', {
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
    createdAt: {
        type: DataTypes.DATE,
    },
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // adjust as needed
        references: {
            model: 'users', // adjust if your actual table name is different
            key: 'id',
        },
    },
}, {
    tableName: 'userpreposto',
    timestamps: false
});

UserPreposto.belongsTo(User, { foreignKey: 'users_id', as: 'user' });
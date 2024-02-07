    import { Model, DataTypes } from 'sequelize';
    import { sequelize } from '../instances/mysql';
    import { User } from './User';

    export interface ProcessoInstance extends Model {
        idProcesso: number;
        nProcesso: string,
        nameAutor: string,
        nameReu: string;
        situacao: string;
        createdBy: string,
        createdAt: Date,
        users_id: number;
        user?: typeof User & { name: string | null };
    }

    export const Processo = sequelize.define<ProcessoInstance>('Processo', {
        idProcesso: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        nProcesso: {
            type:DataTypes.STRING,
        },
        nameAutor: {
            type: DataTypes.STRING,

        },
        nameReu: {
            type: DataTypes.STRING,
        },
        situacao: {
            type: DataTypes.STRING
        },
        createdBy: {
            type: DataTypes.STRING,
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
        tableName: 'processos',
        timestamps: false
    });
    Processo.belongsTo(User, { foreignKey: 'users_id', as: 'user' });
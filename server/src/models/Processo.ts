import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface ProcessoInstance extends Model {
    idProcesso: number;
    nProcesso: string,
    nameAutor: string,
    nameReu: string;
    situacao: string;
    createdBy: string,
    createdAt: Date,
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
}, {
    tableName: 'processos',
    timestamps: false
});
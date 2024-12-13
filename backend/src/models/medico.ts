import {DataTypes, Model} from "sequelize";
import sequelize from "@config/db";
import Pessoa from './pessoa';

export interface MedicoAtributos {
  id?: number;
  crm: string;
  idPessoa: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class Medico extends Model<MedicoAtributos> implements MedicoAtributos {
  public id!: number;
  public crm!: string;
  public idPessoa!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public static associate(models: any) {
    Medico.belongsTo(models.Pessoa, { foreignKey: 'idPessoa' });
  }
}

Medico.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    crm: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    idPessoa: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: 'Pessoa',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: "Medico",
    tableName: "medico",
    freezeTableName: true,
    timestamps: true,
  }
);



export default Medico;
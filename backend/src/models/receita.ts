import {DataTypes, Model} from "sequelize";
import sequelize from "@config/db";

export interface ReceitaAtributos {
  id?: number;
  nome: string;
  idMedico: number;
  idPessoa: number;
  descricao?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Receita extends Model<ReceitaAtributos> implements ReceitaAtributos {
  public id!: number;
  public nome!: string;
  public idMedico!: number;
  public idPessoa!: number;
  public descricao?: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Receita.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idMedico: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idPessoa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Receita",
    tableName: "receita",
    freezeTableName: true,
    timestamps: true,
  }
);

export default Receita;
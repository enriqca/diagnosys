import {BelongsTo, DataTypes, Model} from "sequelize";
import sequelize from "@config/db";
import Pessoa from "./pessoa";

export interface UsuarioAtributos {
  id?: number;
  login: string;
  senha: string;
  idPessoa: number;
  tipo: 'P'|'M'|'A';
  createdAt?: Date;
  updatedAt?: Date;
}

class Usuario extends Model<UsuarioAtributos> implements UsuarioAtributos {
  public id!: number;
  public login!: string;
  public senha!: string;
  public idPessoa!: number;
  public tipo!: 'P'|'M'|'A';
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public static associate(models: any) {
    Usuario.belongsTo(models.Pessoa, { foreignKey: 'idPessoa' });
  }
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idPessoa: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: Pessoa,
        key: 'id'
      }
    },
    tipo: {
      type: DataTypes.ENUM('P', 'M', 'A'),
      defaultValue: 'P',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "usuario",
    freezeTableName: true,
    timestamps: true,
  }
);

export default Usuario;

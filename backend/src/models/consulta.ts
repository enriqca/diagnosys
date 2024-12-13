import {DataTypes, Model, Sequelize} from "sequelize";
import sequelize from "@config/db";
import Pessoa from "./pessoa";
import Medico from "./medico";

export interface ConsultaAtributos {
  id?: number;
  idMedico: number;
  idPessoa: number;
  tipo: 'consulta'|'retorno';
  data: Date;
  descricao?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Consulta extends Model<ConsultaAtributos> implements ConsultaAtributos {
  public id!: number;
  public idMedico!: number;
  public idPessoa!: number;
  public tipo!: 'consulta'|'retorno';
  public data!: Date;
  public descricao?: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public static associate(models: any) {
    Consulta.belongsTo(models.Pessoa, { foreignKey: 'idPessoa' });
  }
}

Consulta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idMedico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Medico',
        key: 'id'
      }
    },
    idPessoa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Pessoa',
        key: 'id'
      }
      },
    tipo: {
      type: DataTypes.ENUM('consulta', 'retorno'),
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Consulta",
    tableName: "consulta",
    freezeTableName: true,
    timestamps: true,
  }
);

Pessoa.hasMany(Consulta, {foreignKey: 'idPessoa'});

Consulta.belongsTo(Medico, {foreignKey: 'idMedico'});
Medico.hasMany(Consulta, {foreignKey: 'idMedico'});

export default Consulta;
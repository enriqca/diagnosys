import {DataTypes, Model} from "sequelize";
import sequelize from "@config/db";
import Usuario from "./usuario";
import Medico from "./medico";

export interface PessoaAtributos {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  rg?: string;
  telefone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Pessoa extends Model<PessoaAtributos> implements PessoaAtributos {
  public id!: number;
  public nome!: string;
  public email!: string;
  public cpf!: string;
  public rg?: string;
  public telefone?: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public static associate(models: any) {
    Pessoa.hasOne(models.Usuario, { foreignKey: 'idPessoa' });
    Pessoa.hasOne(models.Medico, {foreignKey: 'idPessoa'});
  }
}

Pessoa.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // get() {
      //   const rawValue = this.getDataValue("cpf");

      //   return rawValue
      //     ? rawValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
      //     : null;
      // },
      // set(val: String) {
      //   this.setDataValue("cpf", val.replace(/\D/g, ""));
      // },
    },
    rg: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("rg");

        return rawValue
          ? rawValue.replace(/^(\d{2})(\d{3})(\d{3})$/, "$1-$2.$3")
          : null;
      },
      set(val: string) {
        if (val) this.setDataValue("rg", val.replace(/\D/g, ""));
      },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Pessoa",
    tableName: "pessoa",
    freezeTableName: true,
    timestamps: true,
  }
);

Pessoa.hasOne(Usuario, {foreignKey: 'idPessoa'});
Usuario.belongsTo(Pessoa, {foreignKey: 'idPessoa'});

Pessoa.hasOne(Medico, {foreignKey: 'idPessoa'});
Medico.belongsTo(Pessoa, {foreignKey: 'idPessoa'});

export default Pessoa;

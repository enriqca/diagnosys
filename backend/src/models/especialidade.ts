import {DataTypes, Model} from "sequelize";
import sequelize from "@config/db";

export interface EspecialidadeAtributos {
  id?: number;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Especialidade
  extends Model<EspecialidadeAtributos>
  implements EspecialidadeAtributos
{
  public id!: number;
  public descricao!: string;
  public readonly createdAt?: Date | undefined;
  public readonly updatedAt?: Date | undefined;
}

Especialidade.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Especialidade",
    tableName: "especialidade",
    freezeTableName: true,
    timestamps: true,
  }
);

export default Especialidade;

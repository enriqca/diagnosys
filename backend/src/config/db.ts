import {Options, Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const config: Options = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "mysql",
  logging: true,
};

export default new Sequelize(config);

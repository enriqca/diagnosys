import express, {Express} from "express";
import dotenv from "dotenv";
import pessoaController from "@controllers/pessoaController";
import usuarioController from "@controllers/usuarioController";
import medicoController from "@controllers/medicoController";
import authController from "@controllers/authController";
import consultaController from "@controllers/consultaController";
import db from "@config/db";
import bodyParser from "body-parser";
const cors = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.use(authController);
app.use(pessoaController);
app.use(usuarioController);
app.use(medicoController);
app.use(consultaController);

app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);

  try {
    db.authenticate().then(() => {
      console.log("Conectado com sucesso no banco de dados");
    });
  } catch (error) {
    console.error("Erro ao conectar no banco de dados: ", error);
  }
});

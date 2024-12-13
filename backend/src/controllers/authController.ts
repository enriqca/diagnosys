import {NextFunction, Request, Response, Router} from "express";
import Usuario from "@models/usuario";
import jwt from "jsonwebtoken";
import Pessoa from "@models/pessoa";
import { criarPessoa } from "@dao/pessoaDAO";
import { criarUsuario } from "@dao/usuarioDAO";

interface JwtPayload {
  id: string
}

const router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const {login, senha} = req.body;
  
  const usuario = await Usuario.findOne({where: {login}, include: {model: Pessoa}});

  if(!usuario) {
    res.status(404).send('Usuário ou senha inválidos')
    return;
  };
  
  const senhaValida = usuario?.senha == senha;

  if(!senhaValida) {
    res.status(401).send({auth: false, token: null})
    return;
  }
  
  const token = jwt.sign({id: usuario?.id}, '47126117', {
    expiresIn: 86400
  });

  res.status(200).send({auth: true, token, user: usuario});
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const dados = req.body;

  const pessoa = await criarPessoa(dados);

  dados.idPessoa = pessoa.id;

  const usuario = await criarUsuario(dados);

  const token = jwt.sign({id: usuario.id}, '47126117', {
    expiresIn: 86400
  });

  res.status(200).send({auth: true, token, user: usuario});
});

router.post('/getUser', async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || '';

  const dados = jwt.verify(token, '47126117') as JwtPayload;

  if(!dados.id) res.status(401).send('Token inválido');
  
  const usuario = await Usuario.findByPk(dados.id, {include: {model: Pessoa}});

  res.status(200).json(usuario);
})

export default router;
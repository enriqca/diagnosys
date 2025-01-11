import {deletarUsuario, criarUsuario, listarUsuarios, buscarUsuario} from "@dao/usuarioDAO";
import {listarReceitas} from "@dao/receitaDAO";
import {listarConsultas} from "@dao/consultaDAO";
import {NextFunction, Request, Response} from "express";
import Usuario from "@models/usuario";
import {atualizarPessoa} from "@dao/pessoaDAO";
import Pessoa from "@models/pessoa";
import {criarMedico} from "@dao/medicoDAO";
import { criarPessoa } from "@dao/pessoaDAO";
const bcrypt = require('bcryptjs');

export async function listaUsuarios(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const usuarios = await listarUsuarios();

    if (usuarios.length > 0) {
      res.status(200).json(usuarios);
    } else {
      console.log("Nenhum usuário encontrado");
      res.status(404).send('Não há nenhum usuário cadastrado');
    }
  } catch (error) {
    console.log('Erro ao listar os usuários:', error);
    res.status(500).send('Erro ao listar os usuários');
    next(error);
  }
}

export async function buscaUsuario(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {id} = req.params;

    const usuario = await buscarUsuario(id);

    if(!usuario){
      res.status(404).json({mensagem: 'Usuário não encontrado!'})
    }
    else {
      res.status(200).json(usuario);
    }
    
  } catch (error) {
    console.log('Erro ao buscar usuário:', error);
    res.status(500).send('Erro ao buscar usuário');
    next(error);
  }
}

export async function criaUsuario(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dados = req.body;

    const { senha, ...restoDados } = dados;
    const hashedSenha = await bcrypt.hash(senha, 10);

    const usuario = await criarUsuario({
      ...restoDados,
      senha: hashedSenha,
    });

    const pessoa = await criarPessoa({
      ...restoDados,
      senha: hashedSenha,
    });

    usuario.idPessoa = pessoa.id;

    await usuario.save();

    if(usuario.tipo == 'M') {
      const medico = await criarMedico(dados);
      medico.idPessoa = pessoa.id;
      await medico.save();
    }

    res.status(201).json(usuario);

  } catch (error) {
    console.log('Erro ao adicionar usuário:', error);
    res.status(500).send('Erro ao adicionar usuário');
    next(error);
  }
}

export async function deletaUsuario(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {id} = req.params;

    const usuario = await buscarUsuario(id);

    if(!usuario) {
      res.status(404).json({mensagem: 'Usuário não encontrado!'})
    }
    else {
      await deletarUsuario(usuario);
      res.status(200).json({ mensagem: `Usuário ${usuario.login} removido com sucesso!` });
    }

  } catch (error) {
    console.log('Erro ao excluir usuário:', error);
    res.status(500).send('Erro ao excluir usuário');
    next(error);
  }
}

export async function listaReceitas(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {id} = req.params;

    const registro = await listarReceitas(id);

    if (registro.length > 0) {
      res.status(200).json(registro);
    } else {
      res.status(404).send('Nenhum registro encontrado para o usuário fornecido');
    }
  } catch (error) {
    console.log('Erro ao listar os registros:', error);
    res.status(500).send('Erro ao listar os registros');
    next(error);
  }
}

export async function listaConsultas(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {id} = req.params;

    const consulta = await listarConsultas(id);

    if (consulta.length > 0) {
      res.status(200).json(consulta);
    } else {
      res.status(404).send('Nenhuma consulta encontrada para o usuário fornecido');
    }
  } catch (error) {
    console.log('Erro ao listar as consulta:', error);
    res.status(500).send('Erro ao listar as consulta');
    next(error);
  }
}

export async function atualizaUsuario(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const usuario = await Usuario.findByPk(id);
    
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const pessoa = await Pessoa.findByPk(usuario.idPessoa);

    if (!pessoa) {
      throw new Error('Pessoa não encontrada');
    }

    usuario.update(updateData);
    const atualizado = await atualizarPessoa(pessoa, updateData);

    res.status(200).json(atualizado);
  } catch (error) {
    console.log('Erro ao atualizar usuário:', error);
    res.status(500).send('Erro ao atualizar usuário');
    next(error);
  }
}

export async function logarUsuario(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>{
  try {
    const {email, senha} = req.body;

    if (!email || !senha) {
      res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
      return;
    }

    const usuario = await Usuario.findOne({ where: { login: email } });

    if (!usuario) {
      res.status(404).json({ mensagem: "Usuário não encontrado." });
      return;
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      res.status(401).json({ mensagem: "Senha incorreta." });
      return;
    }
    let nome;
    const pessoa = await Pessoa.findOne({ where: { email: email } });
    if(pessoa){
      nome = pessoa.nome;
    }
    // Se tudo estiver correto, pode-se considerar que o login foi bem-sucedido
    res.status(200).json({ mensagem: `Login bem-sucedido!`, nome: nome });

  }catch (error) {
      console.log('Erro ao verificar usuário:', error);
      res.status(500).send('Erro ao verificar usuário');
      next(error);
    }
};
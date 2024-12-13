import {deletarPessoa, criarPessoa, listarPessoas, buscarPessoa} from "@dao/pessoaDAO";
import {NextFunction, Request, Response} from "express";

export async function listaPessoas(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const pessoas = await listarPessoas();

    if (pessoas.length > 0) {
      res.status(200).json(pessoas);
    } else {
      res.status(404).send('Não há nenhuma pessoa cadastrada');
    }
    
  } catch (error) {
    console.error('Erro ao listar as pessoas:', error);
    res.status(500).send('Erro ao listar as pessoas');
    next(error);
  }
}

export async function buscaPessoa(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {id} = req.params;

    const pessoa = await buscarPessoa(id);

    if(!pessoa){
      res.status(404).json({mensagem: 'Pessoa não encontrada!'})
    }
    else {
      res.status(200).json(pessoa);
    }
    
  } catch (error) {
    console.error('Erro ao buscar pessoa:', error);
    res.status(500).send('Erro ao buscar pessoa');
    next(error);
  }
}

export async function criaPessoa(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dados = req.body;

    const pessoa = await criarPessoa(dados);

    res.status(201).json(pessoa);

  } catch (error) {
    console.error('Erro ao adicionar pessoa:', error);
    res.status(500).send('Erro ao adicionar pessoa');
    next(error);
  }
}

export async function deletaPessoa(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {id} = req.params;

    const pessoa = await buscarPessoa(id);

    if(!pessoa) {
      res.status(404).json({mensagem: 'Pessoa não encontrada!'})
    }
    else {
      await deletarPessoa(pessoa);
      res.status(200).json({ mensagem: `Pessoa ${pessoa.nome} removida com sucesso!` });
    }

  } catch (error) {
    console.error('Erro ao excluir pessoa:', error);
    res.status(500).send('Erro ao excluir pessoa');
    next(error);
  }
}
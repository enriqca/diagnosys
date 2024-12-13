import {deletarMedico, criarMedico, listarMedicos, buscarMedico, buscarMedicoPorNome, buscarMedicoPorIdPessoa} from "@dao/medicoDAO";
import {listarReceitasMedico, criarReceita} from "@dao/receitaDAO";
import {listarConsultasMedico, criarConsulta, listarConsultasGeral} from "@dao/consultaDAO";
import {buscarPessoa, criarPessoa} from "@dao/pessoaDAO";
import {buscarUsuario} from "@dao/usuarioDAO";
import {NextFunction, Request, Response} from "express";

export async function listaMedicos(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const medicos = await listarMedicos();

    if (medicos.length > 0) {
      res.status(200).json(medicos);
    } else {
      res.status(404).send('Não há nenhum medico cadastrado');
    }
    
  } catch (error) {
    console.error('Erro ao listar os medicos:', error);
    res.status(500).send('Erro ao listar os medicos');
    next(error);
  }
}

export async function buscaMedico(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {id} = req.params;

    const pessoa = await buscarMedico(id);

    if(!pessoa){
      res.status(404).json({mensagem: 'Medico não encontrado!'})
    }
    else {
      res.status(200).json(pessoa);
    }
    
  } catch (error) {
    console.error('Erro ao buscar medico:', error);
    res.status(500).send('Erro ao buscar medico');
    next(error);
  }
}

export async function buscaMedicoPorNome(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {nome} = req.params;

    const medicos = await buscarMedicoPorNome(nome);

    if(!medicos || medicos.length <= 0){
      res.status(200).json([]);
    }
    else {
      res.status(200).json(medicos);
    }
    
  } catch (error) {
    console.error('Erro ao buscar medico:', error);
    res.status(500).send('Erro ao buscar medico');
    next(error);
  }
}

export async function criaMedico(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dados = req.body;

    const pessoa = await criarPessoa({nome: dados.nome, email: dados.email, cpf: dados.cpf, rg: dados.rg, telefone: dados.telefone});

    const medico = await criarMedico({idPessoa: pessoa.id, crm: dados.crm});

    res.status(201).json(medico);

  } catch (error) {
    console.error('Erro ao adicionar medico:', error);
    res.status(500).send('Erro ao adicionar medico');
    next(error);
  }
}

export async function deletaMedico(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {id} = req.params;

    const medico = await buscarMedico(id);

    if(!medico) {
      res.status(404).json({mensagem: 'Medico não encontrado!'})
    }
    else {
      await deletarMedico(medico);
      res.status(200).json({ mensagem: `Medico ${medico.crm} removida com sucesso!` });
    }

  } catch (error) {
    console.error('Erro ao excluir medico:', error);
    res.status(500).send('Erro ao excluir medico');
    next(error);
  }
}

export async function listaReceitas(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {idMedico} = req.params;

    const registro = await listarReceitasMedico(idMedico);

    if (registro.length > 0) {
      res.status(200).json(registro);
    } else {
      res.status(404).send('Nenhum registro encontrado para o usuário fornecido');
    }
  } catch (error) {
    console.error('Erro ao listar os registros:', error);
    res.status(500).send('Erro ao listar os registros');
    next(error);
  }
}

export async function criaReceita(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dados = req.body;
    
    const medico = await buscarMedico(dados.idMedico);

    if(!medico){
      res.status(404).json({mensagem: 'Não há médico registrado com esse id'})
    }
    else {
      const registro = await criarReceita(dados);
      res.status(201).json(registro);
    }

  } catch (error) {
    console.error('Erro ao adicionar registro:', error);
    res.status(500).send('Erro ao adicionar registro');
    next(error);
  }
}

export async function listaConsultasGeral(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const registro = await listarConsultasGeral();

    if (registro.length > 0) {
      res.status(200).json(registro);
    } else {
      res.status(404).send('Nenhuma consulta encontrada para o usuário fornecido');
    }
  } catch (error) {
    console.error('Erro ao listar as consultas:', error);
    res.status(500).send('Erro ao listar as consultas');
    next(error);
  }
}

export async function listaConsultas(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {idMedico} = req.params;

    const registro = await listarConsultasMedico(idMedico);

    if (registro.length > 0) {
      res.status(200).json(registro);
    } else {
      res.status(404).send('Nenhuma consulta encontrada para o usuário fornecido');
    }
  } catch (error) {
    console.error('Erro ao listar as consultas:', error);
    res.status(500).send('Erro ao listar as consultas');
    next(error);
  }
}

export async function criaConsulta(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dados = req.body;

    const [dia, mes, ano] = dados.data.split('/');
    const dataObject = new Date(`${ano}-${mes}-${dia}`);

    dados.data = dataObject;

    const usuarioMedico = await buscarUsuario(dados.idMedico);

    console.log('usuario medico', usuarioMedico);

    console.log('idPEssoa', usuarioMedico?.idPessoa);

    if(!usuarioMedico){
      res.status(404).json({mensagem: 'Não há usuário registrado com esse id de médico'})
    }
    
    const medico = await buscarMedicoPorIdPessoa(usuarioMedico?.idPessoa || '');

    console.log('medico', medico);

    if(!medico){
      res.status(404).json({mensagem: 'Não há médico registrado com esse id'})
    }
    else {
      const consulta = await criarConsulta(dados);
      res.status(201).json(consulta);
    }

  } catch (error) {
    console.error('Erro ao adicionar consulta:', error);
    res.status(500).send('Erro ao adicionar consulta');
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

    if(!usuario) {
      res.status(404).json({mensagem: 'Usuario não encontrado!'})
    }
    else {
      res.status(200).json(usuario);
    }

  } catch (error) {
    console.error('Erro ao listar o usuario:', error);
    res.status(500).send('Erro ao listar o usuario');
    next(error);
  }
}
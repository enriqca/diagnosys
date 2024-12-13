import { listaMedicos, buscaMedico, buscaMedicoPorNome, criaMedico, deletaMedico, listaReceitas, criaReceita, listaConsultasGeral, listaConsultas, criaConsulta, buscaUsuario } from '@services/medicoService';
import { listarMedicos, buscarMedico, buscarMedicoPorNome, criarMedico, deletarMedico, buscarMedicoPorIdPessoa } from '@dao/medicoDAO';
import { criarPessoa } from '@dao/pessoaDAO';
import { buscarUsuario } from '@dao/usuarioDAO';
import { listarReceitasMedico, criarReceita } from '@dao/receitaDAO';
import { listarConsultasMedico, criarConsulta, listarConsultasGeral } from '@dao/consultaDAO';
import { Request, Response, NextFunction } from 'express';

jest.mock('@dao/medicoDAO');
jest.mock('@dao/pessoaDAO');
jest.mock('@dao/consultaDAO');
jest.mock('@dao/receitaDAO');
jest.mock('@dao/usuarioDAO');

describe('DAO Module Path Test', () => {
    it('should import listarMedicos correctly', () => {
        expect(listarMedicos).toBeDefined();
    });
});

describe('Medico Service', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as any as Response;
    next = jest.fn();
  });

  describe('listaMedicos', () => {
    it('deve retornar uma lista de médicos', async () => {
      (listarMedicos as jest.Mock).mockResolvedValue([{ id: 1, nome: 'Dr. John Doe' }]);

      await listaMedicos(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, nome: 'Dr. John Doe' }]);
    });

    it('deve retornar 404 se não houver médicos', async () => {
      (listarMedicos as jest.Mock).mockResolvedValue([]);

      await listaMedicos(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Não há nenhum medico cadastrado');
    });

    it('deve lidar com erros', async () => {
      const error = new Error('Database error');
      (listarMedicos as jest.Mock).mockRejectedValue(error);

      await listaMedicos(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao listar os medicos');
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('buscaMedico', () => {
    beforeEach(() => {
      req = { params: { id: '1' } } as any as Request;
    });

    it('deve retornar um médico', async () => {
      (buscarMedico as jest.Mock).mockResolvedValue({ id: 1, nome: 'Dr. John Doe' });

      await buscaMedico(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'Dr. John Doe' });
    });

    it('deve retornar 404 se o médico não for encontrado', async () => {
      (buscarMedico as jest.Mock).mockResolvedValue(null);

      await buscaMedico(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensagem: 'Medico não encontrado!' });
    });

    it('deve lidar com erros', async () => {
      const error = new Error('Database error');
      (buscarMedico as jest.Mock).mockRejectedValue(error);

      await buscaMedico(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao buscar medico');
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('buscaMedicoPorNome', () => {
    beforeEach(() => {
      req = { params: { nome: 'John' } } as any as Request;
    });

    it('deve retornar uma lista de médicos', async () => {
      (buscarMedicoPorNome as jest.Mock).mockResolvedValue([{ id: 1, nome: 'Dr. John Doe' }]);

      await buscaMedicoPorNome(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, nome: 'Dr. John Doe' }]);
    });

    it('deve retornar uma lista vazia se nenhum médico for encontrado', async () => {
      (buscarMedicoPorNome as jest.Mock).mockResolvedValue([]);

      await buscaMedicoPorNome(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('deve lidar com erros', async () => {
      const error = new Error('Database error');
      (buscarMedicoPorNome as jest.Mock).mockRejectedValue(error);

      await buscaMedicoPorNome(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao buscar medico');
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('criaMedico', () => {
    beforeEach(() => {
      req = { body: { nome: 'John Doe', email: 'john@example.com', cpf: '12345678901', rg: 'MG1234567', telefone: '123456789', crm: '12345' } } as any as Request;
    });

    it('deve criar um médico', async () => {
      const pessoa = { id: 1, nome: 'John Doe', email: 'john@example.com', cpf: '12345678901', rg: 'MG1234567', telefone: '123456789' };
      const medico = { id: 1, idPessoa: 1, crm: '12345' };

      (criarPessoa as jest.Mock).mockResolvedValue(pessoa);
      (criarMedico as jest.Mock).mockResolvedValue(medico);

      await criaMedico(req, res, next);

      expect(criarPessoa).toHaveBeenCalledWith({ nome: 'John Doe', email: 'john@example.com', cpf: '12345678901', rg: 'MG1234567', telefone: '123456789' });
      expect(criarMedico).toHaveBeenCalledWith({ idPessoa: 1, crm: '12345' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(medico);
    });

    it('deve lidar com erros', async () => {
      const error = new Error('Database error');
      (criarPessoa as jest.Mock).mockRejectedValue(error);

      await criaMedico(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao adicionar medico');
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deletaMedico', () => {
    beforeEach(() => {
      req = { params: { id: '1' } } as any as Request;
    });

    it('deve deletar um médico', async () => {
      const medico = { id: 1, crm: '12345' };

      (buscarMedico as jest.Mock).mockResolvedValue(medico);
      (deletarMedico as jest.Mock).mockResolvedValue(undefined);

      await deletaMedico(req, res, next);

      expect(buscarMedico).toHaveBeenCalledWith('1');
      expect(deletarMedico).toHaveBeenCalledWith(medico);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ mensagem: `Medico ${medico.crm} removida com sucesso!` });
    });

    it('deve retornar 404 se o médico não for encontrado', async () => {
      (buscarMedico as jest.Mock).mockResolvedValue(null);

      await deletaMedico(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensagem: 'Medico não encontrado!' });
    });

    it('deve lidar com erros', async () => {
      const error = new Error('Database error');
      (buscarMedico as jest.Mock).mockRejectedValue(error);

      await deletaMedico(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao excluir medico');
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('listaReceitas', () => {
    beforeEach(() => {
      req = { params: { idMedico: '1' } } as any as Request;
    });

    it('deve retornar uma lista de receitas', async () => {
      (listarReceitasMedico as jest.Mock).mockResolvedValue([{ id: 1, descricao: 'Receita 1' }]);

      await listaReceitas(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, descricao: 'Receita 1' }]);
    });

    it('deve retornar 404 se não houver receitas', async () => {
      (listarReceitasMedico as jest.Mock).mockResolvedValue([]);

      await listaReceitas(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Nenhum registro encontrado para o usuário fornecido');
    });

    it('deve lidar com erros', async () => {
      const error = new Error('Database error');
      (listarReceitasMedico as jest.Mock).mockRejectedValue(error);

      await listaReceitas(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao listar os registros');
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('criaReceita', () => {
    beforeEach(() => {
      req = { body: { idMedico: '1', descricao: 'Receita Teste' } } as any as Request;
    });

    it('deve criar uma receita', async () => {
      (buscarMedico as jest.Mock).mockResolvedValue({ id: 1, nome: 'Dr. John Doe' });
      (criarReceita as jest.Mock).mockResolvedValue({ id: 1, descricao: 'Receita Teste' });

      await criaReceita(req, res, next);

      expect(buscarMedico).toHaveBeenCalledWith('1');
      expect(criarReceita).toHaveBeenCalledWith({ idMedico: '1', descricao: 'Receita Teste' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, descricao: 'Receita Teste' });
    });

    it('deve retornar 404 se o médico não for encontrado', async () => {
      (buscarMedico as jest.Mock).mockResolvedValue(null);

      await criaReceita(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensagem: 'Não há médico registrado com esse id' });
    });

    it('deve lidar com erros', async () => {
      const error = new Error('Database error');
      (buscarMedico as jest.Mock).mockRejectedValue(error);

      await criaReceita(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao adicionar registro');
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('listaConsultasGeral', () => {
    it('deve retornar uma lista de consultas gerais', async () => {
      (listarConsultasGeral as jest.Mock).mockResolvedValue([{ id: 1, descricao: 'Consulta 1' }]);

      await listaConsultasGeral(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, descricao: 'Consulta 1' }]);
    });

    it('deve retornar 404 se não houver consultas', async () => {
      (listarConsultasGeral as jest.Mock).mockResolvedValue([]);

      await listaConsultasGeral(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Nenhuma consulta encontrada para o usuário fornecido');
    });

    it('deve lidar com erros', async () => {
      const error = new Error('Database error');
      (listarConsultasGeral as jest.Mock).mockRejectedValue(error);

      await listaConsultasGeral(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao listar as consultas');
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('listaConsultas', () => {
    beforeEach(() => {
      req = { params: { idMedico: '1' } } as any as Request;
    });

    it('deve retornar uma lista de consultas para um médico específico', async () => {
      (listarConsultasMedico as jest.Mock).mockResolvedValue([{ id: 1, descricao: 'Consulta 1' }]);

      await listaConsultas(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, descricao: 'Consulta 1' }]);
    });

    it('deve retornar 404 se não houver consultas', async () => {
      (listarConsultasMedico as jest.Mock).mockResolvedValue([]);

      await listaConsultas(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Nenhuma consulta encontrada para o usuário fornecido');
    });

    it('deve lidar com erros', async () => {
      const error = new Error('Database error');
      (listarConsultasMedico as jest.Mock).mockRejectedValue(error);

      await listaConsultas(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao listar as consultas');
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('criaConsulta', () => {
    beforeEach(() => {
      req = { body: { idMedico: '1', data: '14/07/2024', descricao: 'Consulta Teste' } } as any as Request;
    });

    it('deve criar uma consulta', async () => {
      const usuarioMedico = { idPessoa: '1' };
      const medico = { id: 1, nome: 'Dr. John Doe' };
      (buscarUsuario as jest.Mock).mockResolvedValue(usuarioMedico);
      (buscarMedicoPorIdPessoa as jest.Mock).mockResolvedValue(medico);
      (criarConsulta as jest.Mock).mockResolvedValue({ id: 1, descricao: 'Consulta Teste' });

      await criaConsulta(req, res, next);

      expect(buscarUsuario).toHaveBeenCalledWith('1');
      expect(buscarMedicoPorIdPessoa).toHaveBeenCalledWith('1');
      expect(criarConsulta).toHaveBeenCalledWith({ idMedico: '1', data: new Date('2024-07-14'), descricao: 'Consulta Teste' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, descricao: 'Consulta Teste' });
    });

    it('deve retornar 404 se o usuário não for encontrado', async () => {
      (buscarUsuario as jest.Mock).mockResolvedValue(null);

      await criaConsulta(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensagem: 'Não há usuário registrado com esse id de médico' });
    });

    it('deve lidar com erros', async () => {
      const error = new Error('Database error');
      (buscarUsuario as jest.Mock).mockRejectedValue(error);

      await criaConsulta(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao adicionar consulta');
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('buscaUsuario', () => {
    beforeEach(() => {
      req = { params: { idMedico: '1' } } as any as Request;
    });

    it('deve retornar o usuário associado ao médico', async () => {
      (buscarUsuario as jest.Mock).mockResolvedValue({ id: 1, nome: 'Usuário Teste' });

      await buscaUsuario(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'Usuário Teste' });
    });

    it('deve retornar 404 se o usuário não for encontrado', async () => {
      (buscarUsuario as jest.Mock).mockResolvedValue(null);

      await buscaUsuario(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensagem: 'Usuario não encontrado!' });
    });

    it('deve lidar com erros', async () => {
      const error = new Error('Database error');
      (buscarUsuario as jest.Mock).mockRejectedValue(error);

      await buscaUsuario(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao listar o usuario');
      expect(next).toHaveBeenCalledWith(error);
    });
  });
  
});

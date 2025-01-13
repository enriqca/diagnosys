import { listaMedicos, criaMedico, listaReceitas, criaReceita, listaConsultas, criaConsulta } from '@services/medicoService';
import { listarMedicos, buscarMedico, criarMedico, buscarMedicoPorIdPessoa } from '@dao/medicoDAO';
import { buscarUsuario } from '@dao/usuarioDAO';
import { listarReceitasMedico, criarReceita } from '@dao/receitaDAO';
import { listarConsultasMedico, criarConsulta } from '@dao/consultaDAO';
import { listaPessoas, buscaPessoa, criaPessoa } from '@services/pessoaService';
import { buscarPessoa, criarPessoa, listarPessoas } from '@dao/pessoaDAO';
import { Request, Response, NextFunction } from 'express';

jest.mock('@dao/medicoDAO');
jest.mock('@dao/pessoaDAO');
jest.mock('@dao/consultaDAO');
jest.mock('@dao/receitaDAO');
jest.mock('@dao/usuarioDAO');

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

  describe('cria um médico e busca o mesmo na lista de médicos', () => {
    it('deve criar um médico e verificar se ele aparece na lista de médicos', async () => {
      const medico = { nome: 'Dr. John Doe', email: 'john@example.com', cpf: '12345678901', rg: 'MG1234567', telefone: '123456789', crm: '12345' };
      const reqCriacao = { body: medico } as any as Request;
    
      const pessoaCriada = { id: 1, ...medico };
      const medicoCriado = { id: 1, idPessoa: 1, crm: medico.crm };
    
      (criarPessoa as jest.Mock).mockResolvedValue(pessoaCriada);
      (criarMedico as jest.Mock).mockResolvedValue(medicoCriado);
      (listarMedicos as jest.Mock).mockResolvedValue([medicoCriado]);
    
      await criaMedico(reqCriacao, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
    
      await listaMedicos(req, res, next);
      expect(res.json).toHaveBeenCalledWith([medicoCriado]);
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

    it('deve criar uma consulta e listá-la para o médico correspondente', async () => {
      const consulta = { idMedico: '1', data: '2025-01-10', descricao: 'Consulta Teste' };
      const reqConsulta = { body: consulta } as any as Request;
    
      const usuarioMedico = { idPessoa: '1' };
      const medico = { id: 1, nome: 'Dr. John Doe' };
      const consultaCriada = { id: 1, ...consulta };
    
      (buscarUsuario as jest.Mock).mockResolvedValue(usuarioMedico);
      (buscarMedicoPorIdPessoa as jest.Mock).mockResolvedValue(medico);
      (criarConsulta as jest.Mock).mockResolvedValue(consultaCriada);
      (listarConsultasMedico as jest.Mock).mockResolvedValue([consultaCriada]);
    
      await criaConsulta(reqConsulta, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
    
      const reqListarConsultas = { params: { idMedico: '1' } } as any as Request;
      await listaConsultas(reqListarConsultas, res, next);
      expect(res.json).toHaveBeenCalledWith([consultaCriada]);
    });

    describe('Testes de Integração de Pessoa', () => {
      let req: Partial<Request>;
      let res: Partial<Response>;
      let next: NextFunction;
    
      beforeEach(() => {
        req = {};
        res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          send: jest.fn(),
        };
        next = jest.fn();
      });
    
      it('Deve criar uma pessoa e listá-la', async () => {
        req.body = { nome: 'Pessoa Integração' };
    
        // Mock do DAO para criação de pessoa
        (criarPessoa as jest.Mock).mockResolvedValue({ id: 1, nome: 'Pessoa Integração' });
    
        // Testando criação da pessoa
        await criaPessoa(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'Pessoa Integração' }));
    
        // Mock do DAO para listagem de pessoas
        (listarPessoas as jest.Mock).mockResolvedValue([{ id: 1, nome: 'Pessoa Integração' }]);
    
        // Testando listagem de pessoas
        await listaPessoas(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([{ id: 1, nome: 'Pessoa Integração' }]));
      });
    
      it('Deve criar e buscar uma pessoa', async () => {
        req.body = { nome: 'Pessoa Teste' };
    
        // Mock para criar pessoa
        (criarPessoa as jest.Mock).mockResolvedValue({ id: 1, nome: 'Pessoa Teste' });
        await criaPessoa(req as Request, res as Response, next);
    
        req.params = { id: '1' };
    
        // Mock para buscar pessoa
        (buscarPessoa as jest.Mock).mockResolvedValue({ id: 1, nome: 'Pessoa Teste' });
    
        // Testando a busca pela pessoa
        await buscaPessoa(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'Pessoa Teste' }));
      });
    });
});
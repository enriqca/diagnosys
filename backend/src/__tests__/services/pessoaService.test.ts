import { listaPessoas, buscaPessoa, criaPessoa, deletaPessoa } from '@services/pessoaService';
import { listarPessoas, buscarPessoa, criarPessoa, deletarPessoa } from '@dao/pessoaDAO';
import { Request, Response, NextFunction } from 'express';
  
jest.mock('@dao/pessoaDAO');
  
describe('Pessoa Service', () => {
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
  
    describe('listaPessoas', () => {
      it('deve retornar uma lista de pessoas', async () => {
        (listarPessoas as jest.Mock).mockResolvedValue([{ id: 1, nome: 'Pessoa 1' }]);
  
        await listaPessoas(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, nome: 'Pessoa 1' }]);
      });
  
      it('deve retornar 404 se não houver pessoas', async () => {
        (listarPessoas as jest.Mock).mockResolvedValue([]);
  
        await listaPessoas(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Não há nenhuma pessoa cadastrada');
      });
  
      it('deve lidar com erros', async () => {
        const error = new Error('Database error');
        (listarPessoas as jest.Mock).mockRejectedValue(error);
  
        await listaPessoas(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao listar as pessoas');
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  
    describe('buscaPessoa', () => {
      beforeEach(() => {
        req = { params: { id: '1' } } as any as Request;
      });
  
      it('deve retornar uma pessoa', async () => {
        (buscarPessoa as jest.Mock).mockResolvedValue({ id: 1, nome: 'Pessoa Teste' });
  
        await buscaPessoa(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'Pessoa Teste' });
      });
  
      it('deve retornar 404 se a pessoa não for encontrada', async () => {
        (buscarPessoa as jest.Mock).mockResolvedValue(null);
  
        await buscaPessoa(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Pessoa não encontrada!' });
      });
  
      it('deve lidar com erros', async () => {
        const error = new Error('Database error');
        (buscarPessoa as jest.Mock).mockRejectedValue(error);
  
        await buscaPessoa(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao buscar pessoa');
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  
    describe('criaPessoa', () => {
      beforeEach(() => {
        req = { body: { nome: 'Pessoa Teste' } } as any as Request;
      });
  
      it('deve criar uma pessoa', async () => {
        (criarPessoa as jest.Mock).mockResolvedValue({ id: 1, nome: 'Pessoa Teste' });
  
        await criaPessoa(req, res, next);
  
        expect(criarPessoa).toHaveBeenCalledWith({ nome: 'Pessoa Teste' });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'Pessoa Teste' });
      });
  
      it('deve lidar com erros', async () => {
        const error = new Error('Database error');
        (criarPessoa as jest.Mock).mockRejectedValue(error);
  
        await criaPessoa(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao adicionar pessoa');
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  
    describe('deletaPessoa', () => {
      beforeEach(() => {
        req = { params: { id: '1' } } as any as Request;
      });
  
      it('deve deletar uma pessoa', async () => {
        (buscarPessoa as jest.Mock).mockResolvedValue({ id: 1, nome: 'Pessoa Teste' });
        (deletarPessoa as jest.Mock).mockResolvedValue(true);
  
        await deletaPessoa(req, res, next);
  
        expect(buscarPessoa).toHaveBeenCalledWith('1');
        expect(deletarPessoa).toHaveBeenCalledWith({ id: 1, nome: 'Pessoa Teste' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Pessoa Pessoa Teste removida com sucesso!' });
      });
  
      it('deve retornar 404 se a pessoa não for encontrada', async () => {
        (buscarPessoa as jest.Mock).mockResolvedValue(null);
  
        await deletaPessoa(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Pessoa não encontrada!' });
      });
  
      it('deve lidar com erros', async () => {
        const error = new Error('Database error');
        (buscarPessoa as jest.Mock).mockRejectedValue(error);
  
        await deletaPessoa(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao excluir pessoa');
        expect(next).toHaveBeenCalledWith(error);
      });
    });
});
  
import { listaUsuarios, buscaUsuario, criaUsuario, deletaUsuario, listaReceitas, listaConsultas, atualizaUsuario, logarUsuario } from '@services/usuarioService';
import { listarUsuarios, buscarUsuario, criarUsuario, deletarUsuario } from '@dao/usuarioDAO';
import { listarReceitas } from '@dao/receitaDAO';
import { listarConsultas } from '@dao/consultaDAO';
import { criarMedico } from '@dao/medicoDAO';
import { criarPessoa, atualizarPessoa } from '@dao/pessoaDAO';
import bcrypt from 'bcrypt';
import Usuario from '@models/usuario';
import Pessoa from '@models/pessoa';
import { Request, Response, NextFunction } from 'express';

jest.mock('@dao/usuarioDAO');
jest.mock('@dao/receitaDAO');
jest.mock('@dao/consultaDAO');
jest.mock('@dao/pessoaDAO');
jest.mock('@dao/medicoDAO');
jest.mock('bcrypt');
jest.mock('@models/usuario');
jest.mock('@models/pessoa');
  
describe('Usuario Service', () => {
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
  
    describe('listaUsuarios', () => {
      it('deve retornar uma lista de usuários', async () => {
        (listarUsuarios as jest.Mock).mockResolvedValue([{ id: 1, nome: 'Usuario 1' }]);
  
        await listaUsuarios(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, nome: 'Usuario 1' }]);
      });
  
      it('deve retornar 404 se não houver usuários', async () => {
        (listarUsuarios as jest.Mock).mockResolvedValue([]);
  
        await listaUsuarios(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Não há nenhum usuário cadastrado');
      });
  
      it('deve lidar com erros', async () => {
        const error = new Error('Database error');
        (listarUsuarios as jest.Mock).mockRejectedValue(error);
  
        await listaUsuarios(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao listar os usuários');
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  
    describe('buscaUsuario', () => {
      beforeEach(() => {
        req = { params: { id: '1' } } as any as Request;
      });
  
      it('deve retornar um usuário', async () => {
        (buscarUsuario as jest.Mock).mockResolvedValue({ id: 1, nome: 'Usuario Teste' });
  
        await buscaUsuario(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 1, nome: 'Usuario Teste' });
      });
  
      it('deve retornar 404 se o usuário não for encontrado', async () => {
        (buscarUsuario as jest.Mock).mockResolvedValue(null);
  
        await buscaUsuario(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Usuário não encontrado!' });
      });
  
      it('deve lidar com erros', async () => {
        const error = new Error('Database error');
        (buscarUsuario as jest.Mock).mockRejectedValue(error);
  
        await buscaUsuario(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao buscar usuário');
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  
    describe('criaUsuario', () => {
      beforeEach(() => {
        req = { body: { nome: 'Usuario Teste', senha: 'senha123', tipo: 'M' } } as any as Request;
      });
  
      it('deve criar um usuário', async () => {
        (criarUsuario as jest.Mock).mockResolvedValue({ id: 1, nome: 'Usuario Teste', tipo: req.body.tipo, save: jest.fn() });
        (criarPessoa as jest.Mock).mockResolvedValue({ id: 1, nome: 'Pessoa Teste' });
        (criarMedico as jest.Mock).mockResolvedValue({ id: 1, nome: 'Medico Teste', save: jest.fn() });
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedSenha');
  
        await criaUsuario(req, res, next);
  
        expect(bcrypt.hash).toHaveBeenCalledWith('senha123', 10);
        expect(criarUsuario).toHaveBeenCalledWith(expect.objectContaining({nome: 'Usuario Teste', senha: 'hashedSenha'}));
        expect(criarPessoa).toHaveBeenCalledWith(expect.objectContaining({nome: 'Usuario Teste', senha: 'hashedSenha'}));
        if(req.body.tipo === 'M')
            expect(criarMedico).toHaveBeenCalledWith(expect.objectContaining({nome: 'Usuario Teste', senha: 'senha123', tipo: 'M'}));
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1, nome: 'Usuario Teste' }));
      });
  
      it('deve lidar com erros', async () => {
        const error = new Error('Database error');
        (criarUsuario as jest.Mock).mockRejectedValue(error);
  
        await criaUsuario(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao adicionar usuário');
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  
    describe('deletaUsuario', () => {
      beforeEach(() => {
        req = { params: { id: '1' } } as any as Request;
      });
  
      it('deve deletar um usuário', async () => {
        (buscarUsuario as jest.Mock).mockResolvedValue({ id: 1, nome: 'Usuario Teste', login: 'userTeste' });
        (deletarUsuario as jest.Mock).mockResolvedValue(true);
  
        await deletaUsuario(req, res, next);
  
        expect(buscarUsuario).toHaveBeenCalledWith('1');
        expect(deletarUsuario).toHaveBeenCalledWith({ id: 1, nome: 'Usuario Teste', login: 'userTeste' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Usuário userTeste removido com sucesso!' });
      });
  
      it('deve retornar 404 se o usuário não for encontrado', async () => {
        (buscarUsuario as jest.Mock).mockResolvedValue(null);
  
        await deletaUsuario(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Usuário não encontrado!' });
      });
  
      it('deve lidar com erros', async () => {
        const error = new Error('Database error');
        (buscarUsuario as jest.Mock).mockRejectedValue(error);
  
        await deletaUsuario(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao excluir usuário');
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  
    describe('listaReceitas', () => {
      beforeEach(() => {
        req = { params: { id: '1' } } as any as Request;
      });
  
      it('deve retornar uma lista de receitas', async () => {
        (listarReceitas as jest.Mock).mockResolvedValue([{ id: 1, descricao: 'Receita Teste' }]);
  
        await listaReceitas(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, descricao: 'Receita Teste' }]);
      });
  
      it('deve retornar 404 se não houver receitas', async () => {
        (listarReceitas as jest.Mock).mockResolvedValue([]);
  
        await listaReceitas(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Nenhum registro encontrado para o usuário fornecido');
      });
  
      it('deve lidar com erros', async () => {
        const error = new Error('Database error');
        (listarReceitas as jest.Mock).mockRejectedValue(error);
  
        await listaReceitas(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao listar os registros');
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  
    describe('listaConsultas', () => {
      beforeEach(() => {
        req = { params: { id: '1' } } as any as Request;
      });
  
      it('deve retornar uma lista de consultas', async () => {
        (listarConsultas as jest.Mock).mockResolvedValue([{ id: 1, descricao: 'Consulta Teste' }]);
  
        await listaConsultas(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, descricao: 'Consulta Teste' }]);
      });
  
      it('deve retornar 404 se não houver consultas', async () => {
        (listarConsultas as jest.Mock).mockResolvedValue([]);
  
        await listaConsultas(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Nenhuma consulta encontrada para o usuário fornecido');
      });
  
      it('deve lidar com erros', async () => {
        const error = new Error('Database error');
        (listarConsultas as jest.Mock).mockRejectedValue(error);
  
        await listaConsultas(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao listar as consulta');
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  
    describe('atualizaUsuario', () => {
      beforeEach(() => {
        req = { params: { id: '1' }, body: { nome: 'Usuario Atualizado' } } as any as Request;
      });
  
      it('deve atualizar um usuário', async () => {
        const mockUsuario = { id: 1, nome: 'Usuario Teste', idPessoa: 1, update: jest.fn() };
        const mockPessoa = { id: 1, nome: 'Pessoa Teste' };
        (Usuario.findByPk as jest.Mock).mockResolvedValue(mockUsuario);
        (Pessoa.findByPk as jest.Mock).mockResolvedValue(mockPessoa);
        (atualizarPessoa as jest.Mock).mockResolvedValue(mockPessoa);
  
        await atualizaUsuario(req, res, next);
  
        expect(Usuario.findByPk).toHaveBeenCalledWith('1');
        expect(Pessoa.findByPk).toHaveBeenCalledWith(1);
        expect(mockUsuario.update).toHaveBeenCalledWith({ nome: 'Usuario Atualizado' });
        expect(atualizarPessoa).toHaveBeenCalledWith(mockPessoa, { nome: 'Usuario Atualizado' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockPessoa);
      });
  
      it('deve retornar erro se o usuário não for encontrado', async () => {
        (Usuario.findByPk as jest.Mock).mockResolvedValue(null);
  
        await atualizaUsuario(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao atualizar usuário');
      });
  
      it('deve lidar com erros', async () => {
        const error = new Error('Database error');
        (Usuario.findByPk as jest.Mock).mockRejectedValue(error);
  
        await atualizaUsuario(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao atualizar usuário');
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  
    describe('logarUsuario', () => {
      beforeEach(() => {
        req = { body: { email: 'teste@teste.com', senha: 'senha123' } } as any as Request;
      });
  
      it('deve logar um usuário', async () => {
        const mockUsuario = { id: 1, login: 'teste@teste.com', senha: 'hashedSenha' };
        const mockPessoa = { nome: 'Pessoa Teste' };
        (Usuario.findOne as jest.Mock).mockResolvedValue(mockUsuario);
        (Pessoa.findOne as jest.Mock).mockResolvedValue(mockPessoa);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
  
        await logarUsuario(req, res, next);
  
        expect(Usuario.findOne).toHaveBeenCalledWith({ where: { login: 'teste@teste.com' } });
        expect(bcrypt.compare).toHaveBeenCalledWith('senha123', 'hashedSenha');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Login bem-sucedido!', nome: 'Pessoa Teste' });
      });
  
      it('deve retornar 404 se o usuário não for encontrado', async () => {
        (Usuario.findOne as jest.Mock).mockResolvedValue(null);
  
        await logarUsuario(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Usuário não encontrado.' });
      });
  
      it('deve retornar 401 se a senha estiver incorreta', async () => {
        const mockUsuario = { id: 1, login: 'teste@teste.com', senha: 'hashedSenha' };
        (Usuario.findOne as jest.Mock).mockResolvedValue(mockUsuario);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);
  
        await logarUsuario(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Senha incorreta.' });
      });
  
      it('deve lidar com erros', async () => {
        const error = new Error('Database error');
        (Usuario.findOne as jest.Mock).mockRejectedValue(error);
  
        await logarUsuario(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao verificar usuário');
        expect(next).toHaveBeenCalledWith(error);
      });
    });
});
  
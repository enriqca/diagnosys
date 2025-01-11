//usuarioService.test.ts
import { listaUsuarios, buscaUsuario, criaUsuario, deletaUsuario, listaReceitas, listaConsultas, atualizaUsuario, logarUsuario } from '@services/usuarioService';
import { listarUsuarios, buscarUsuario, criarUsuario, deletarUsuario } from '@dao/usuarioDAO';
import { listarReceitas } from '@dao/receitaDAO';
import { listarConsultas } from '@dao/consultaDAO';
import { criarMedico } from '@dao/medicoDAO';
import { criarPessoa, atualizarPessoa } from '@dao/pessoaDAO';
import { Request, Response, NextFunction } from 'express';
const bcrypt = require('bcryptjs');
import Usuario from '@models/usuario';
import Pessoa from '@models/pessoa';


jest.mock('@models/usuario', () => {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();
    return dbMock.define('Usuario', {});
});

jest.mock('@models/pessoa', () => {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();
    return dbMock.define('Pessoa', {});
});

jest.mock('@dao/usuarioDAO', () => ({
    listarUsuarios: jest.fn(),
    buscarUsuario: jest.fn(),
    criarUsuario: jest.fn(),
    deletarUsuario: jest.fn(),
}));

jest.mock('@dao/pessoaDAO', () => ({
    criarPessoa: jest.fn(),
    atualizarPessoa: jest.fn(),
}));

jest.mock('@dao/medicoDAO', () => ({
    criarMedico: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

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

    beforeAll(() => {
        const Pessoa = require('@models/pessoa');
        const Usuario = require('@models/usuario');
        Pessoa.hasOne(Usuario, { foreignKey: 'idPessoa' });
        Usuario.belongsTo(Pessoa, { foreignKey: 'idPessoa' });
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
        
          // Chama a função do serviço
          await listaUsuarios(req, res, next);
        
          // Verifique se o status 500 foi chamado e a mensagem de erro foi enviada
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith('Erro ao listar os usuários');
        
          // Verifique se o próximo middleware (next) foi chamado com o erro
          expect(next).toHaveBeenCalledWith(error);
        
          // Adicione um log extra para verificação
          console.error('Erro ao listar os usuários:', error); // Para depuração
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

});
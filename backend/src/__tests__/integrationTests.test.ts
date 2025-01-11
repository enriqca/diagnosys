import { listaReceitas, criaReceita } from '@services/medicoService';
import { buscarMedico } from '@dao/medicoDAO';
import { listarReceitasMedico, criarReceita } from '@dao/receitaDAO';
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
});
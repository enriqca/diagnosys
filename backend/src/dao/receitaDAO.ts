import Receita, {ReceitaAtributos} from "@models/receita";

export async function criarReceita(registro: ReceitaAtributos): Promise<Receita> {
  return await Receita.create(registro);
}

export async function listarReceitas(id: number | string): Promise<Receita[]> {
  return await Receita.findAll({where: {idPessoa: id} });
}

export async function listarReceitasMedico(id: number | string): Promise<Receita[]> {
  return await Receita.findAll({where: {idMedico: id} });
}
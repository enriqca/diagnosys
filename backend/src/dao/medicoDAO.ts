import Medico, {MedicoAtributos} from "@models/medico";
import Pessoa from "@models/pessoa";

export async function listarMedicos(): Promise<Medico[]> {
  return await Medico.findAll({include: [{ model: Pessoa }]});
}

export async function criarMedico(dados: MedicoAtributos): Promise<Medico> {
  return await Medico.create(dados);
}

export async function buscarMedico(id: number | string): Promise<Medico | null> {
  return await Medico.findByPk(id, {include: {model: Pessoa}});
}

export async function buscarMedicoPorIdPessoa(id: number | string): Promise<Medico | null> {
  return await Medico.findOne({include: {model: Pessoa, where: {id}}});
}

export async function deletarMedico(medico: Medico): Promise<void> {
  return await medico.destroy();
}

export async function buscarMedicoPorNome(nome: string): Promise<Medico[] | null> {
  return await Medico.findAll({
    include: [{ model: Pessoa, where: {nome} }]
  });
}
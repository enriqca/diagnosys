import Pessoa, {PessoaAtributos} from "@models/pessoa";

export async function listarPessoas(): Promise<Pessoa[]> {
  return await Pessoa.findAll();
}

export async function criarPessoa(dados: PessoaAtributos): Promise<Pessoa> {
  return await Pessoa.create(dados);
}

export async function buscarPessoa(id: number | string): Promise<Pessoa | null> {
  return await Pessoa.findByPk(id);
}

export async function deletarPessoa(pessoa: Pessoa | null): Promise<void> {
  return await pessoa?.destroy();
}

export async function atualizarPessoa(pessoa: Pessoa, dados: Partial<PessoaAtributos>): Promise<Pessoa> {
  return await pessoa.update(dados);
}
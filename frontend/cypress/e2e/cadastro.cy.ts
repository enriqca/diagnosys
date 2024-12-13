import {faker} from '@faker-js/faker';

const login = faker.internet.displayName();
const senha = faker.internet.password();

const medico = 'medico';

describe('Cadastro', () => {

  it('Entra na página de cadastro', () => {
    cy.visit('http://localhost:5173/cadastro');

    cy.contains('Cadastro');
  });

  it("Cria um novo cadastro", () => {
    cy.visit('http://localhost:5173/cadastro');
    
    cy.get('#nome').type(faker.person.firstName());
    
    cy.get('#rg').type(faker.string.numeric(5));

    cy.get('#cpf').type(faker.string.numeric(11));

    cy.get('#email').type(faker.internet.email());

    cy.get('#botaoProsseguir').click();

    cy.get("#login").type(login);

    cy.get('#senha').type(senha);

    cy.get('#botaoCadastrar').click();
  });

  it('Loga com o novo cadastro', () => {
    cy.visit('http://localhost:5173/login');

    cy.get("#login").type(login);

    cy.get('#senha').type(senha);

    cy.get('#botaoEntrar').click();
    
    cy.contains('Agende sua consulta');
  });

  it('Acessa página de edição de perfil', () => {
    cy.visit('http://localhost:5173/login');

    cy.get("#login").type(login);

    cy.get('#senha').type(senha);

    cy.get('#botaoEntrar').click();
    
    cy.get("#botaoMeuPerfil").click();

    cy.url().should('include', '/perfil');
  });

  it('Visualiza página com os médicos disponíveis', () => {
    cy.visit('http://localhost:5173/login');

    cy.get("#login").type(login);

    cy.get('#senha').type(senha);

    cy.get('#botaoEntrar').click();
    
    cy.contains("Agende sua consulta");
  });

  it('Pesquisa um médico', () => {
    cy.visit('http://localhost:5173/login');

    cy.get("#login").type(login);

    cy.get('#senha').type(senha);

    cy.get('#botaoEntrar').click();
    
    cy.contains("Agende sua consulta");

    cy.get("#pesquisaMedico").type('Médico 2');

    cy.get("#botaoPesquisarMedico").click();

    cy.contains('Médico 2');
  });

  it('Lista receitas', () => {
    cy.visit('http://localhost:5173/login');

    cy.get("#login").type(login);

    cy.get('#senha').type(senha);

    cy.get('#botaoEntrar').click();
    
    cy.contains("Agende sua consulta");

    cy.get("#botaoListaReceitas").click();

    cy.contains('Receitas');
  });

  it('Cadastra receitas para um paciente', () => {
    cy.visit('http://localhost:5173/login');

    cy.get("#login").type(medico);

    cy.get('#senha').type(medico);

    cy.get('#botaoEntrar').click();

    cy.get('#botaoListaReceitas').click();
    
    cy.contains('Receitas');
  })

  it('Cadastra consulta para um paciente', () => {
    cy.visit('http://localhost:5173/login');

    cy.get("#login").type(medico);

    cy.get('#senha').type(medico);

    cy.get('#botaoEntrar').click();

    cy.get('#botaoListaConsultas').click();
    
    cy.contains('Consultas');

    cy.get('.botaoNovaConsulta').first().click();

    cy.contains('Nova consulta');

    cy.get('#tipoConsulta').select('consulta');

    cy.get('#descricao').type('Descrição consulta');

    cy.get('#botaoRegistrar').click();
  });

  it('Visualiza receitas', () => {
    cy.visit('http://localhost:5173/login');

    cy.get("#login").type(medico);

    cy.get('#senha').type(medico);

    cy.get('#botaoEntrar').click();

    cy.get('#botaoListaReceitas').click();
    
    cy.contains('Receitas');
  })
})
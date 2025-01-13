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
})
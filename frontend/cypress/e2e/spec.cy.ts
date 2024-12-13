describe('My First Test', () => {

  it('Entra na página de login', () => {
    cy.visit('http://localhost:5173');

    cy.contains('Entrar');
  });

  it("Faz login como médico", () => {
    cy.visit('http://localhost:5173');
    
    cy.get('#login').type('medico');
    
    cy.get('#senha').type('medico');

    cy.get('#botaoEntrar').click();

    cy.get('#botaoGerenciarUsuarios').click();
  })

  it('Faz login como admin', () => {
    cy.visit('http://localhost:5173');

    cy.get('#login').type('admin');
    
    cy.get('#senha').type('admin');

    cy.get('#botaoEntrar').click();

    cy.contains("Agende sua consulta!")
  });
})
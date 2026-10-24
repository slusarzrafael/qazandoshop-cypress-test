describe('Acessibilidade básica', () => {
  it('verifica alt das imagens e envio por Enter', { tags: ['@a11y', '@regressao'] }, () => {
    cy.visit('/');
    cy.get('img').each(($image) => expect($image).to.have.attr('alt').and.not.be.empty);
    cy.visit('/login');
    cy.get('#btnLogin').focus().type('{enter}');
    cy.get('.account_form').should('contain.text', 'E-mail inválido.');
  });

  it('associa labels aos campos de e-mail e senha do login', { tags: ['@a11y', '@regressao'] }, () => {
    cy.visit('/login');
    // BUG: os textos E-mail e Senha não estão associados aos inputs.
    cy.get('#user').should(($input) => expect($input[0].labels.length).to.be.greaterThan(0));
    cy.get('#password').should(($input) => expect($input[0].labels.length).to.be.greaterThan(0));
  });

  it('fecha a busca com a tecla Escape', { tags: ['@a11y', '@regressao'] }, () => {
    cy.viewport(1280, 720);
    cy.visit('/');
    cy.get('a.search_width[href="#search"]').click();
    cy.get('input[placeholder="type keyword(s) here"]').should('be.visible').type('{esc}');
    // BUG: Escape não fecha a busca; o input continua visível.
    cy.get('input[placeholder="type keyword(s) here"]').should('not.be.visible');
  });
});
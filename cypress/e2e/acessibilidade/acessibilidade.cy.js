describe('Acessibilidade básica', () => {
  it('verifica alt das imagens e envio por Enter', { tags: ['@a11y', '@regressao'] }, () => {
    cy.visit('/');
    cy.get('img').each(($image) => expect($image).to.have.attr('alt').and.not.be.empty);
    cy.visit('/login');
    cy.get('#btnLogin').focus();
    cy.focused().should('have.attr', 'id', 'btnLogin');
    cy.realPress('Enter');
    cy.get('.account_form').should('contain.text', 'E-mail inválido.');
  });

  it('BUG: deixa os campos de e-mail e senha sem labels associados', { tags: ['@a11y', '@regressao'] }, () => {
    cy.visit('/login');
    // BUG: os textos E-mail e Senha não estão associados aos inputs.
    cy.get('#user').should(($input) => expect($input[0].labels.length).to.equal(0));
    cy.get('#password').should(($input) => expect($input[0].labels.length).to.equal(0));
  });

  it('BUG: mantém a busca aberta após pressionar Escape', { tags: ['@a11y', '@regressao'] }, () => {
    cy.viewport(1280, 720);
    cy.visit('/');
    cy.get('a.search_width[href="#search"]').click();
    cy.get('input[placeholder="type keyword(s) here"]').should('be.visible').type('{esc}');
    // BUG: Escape não fecha a busca; o input continua visível.
    cy.get('input[placeholder="type keyword(s) here"]').should('be.visible');
  });
});
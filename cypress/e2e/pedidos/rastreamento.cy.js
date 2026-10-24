describe('Rastreamento de pedidos', () => {
  it('exige ID e e-mail antes de rastrear', { tags: '@regressao' }, () => {
    cy.visit('/order-tracking');
    ['#order_ID', '#billing_email'].forEach((selector) => {
      cy.get(selector).should(($input) => {
        expect($input[0].required).to.be.true;
        expect($input[0].checkValidity()).to.be.false;
      });
    });
    cy.contains('button', 'TRACK').click();
    cy.location('pathname').should('eq', '/order-tracking');
  });

  it('não conclui pedidos com dados de rastreio desconhecidos', { tags: '@regressao' }, () => {
    cy.visit('/order-tracking');
    cy.get('#order_ID').type('123456');
    cy.get('#billing_email').type('not-an-email');
    cy.contains('button', 'TRACK').click();
    // BUG: qualquer ID e e-mail levam à página de pedido concluído.
    cy.location('pathname').should('eq', '/order-tracking');
  });
});
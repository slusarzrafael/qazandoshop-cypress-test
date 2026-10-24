describe('Rastreamento de pedidos', () => {
  it('exige ID e e-mail antes de rastrear', { tags: '@regressao' }, () => {
    cy.visit('/order-tracking');
    ['#order_ID', '#billing_email'].forEach((selector) => {
      cy.get(selector).should(($input) => {
        expect($input[0].required).to.be.true;
        expect($input[0].checkValidity()).to.be.false;
      });
    });
    cy.get('#order_ID').closest('form').find('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/order-tracking');
  });

  it('BUG: conclui pedido com dados de rastreio desconhecidos', { tags: '@regressao' }, () => {
    cy.visit('/order-tracking');
    cy.get('#order_ID').type('123456');
    cy.get('#billing_email').type('not-an-email');
    cy.get('#order_ID').closest('form').find('button[type="submit"]').click();
    // BUG: qualquer ID e e-mail levam à página de pedido concluído.
    cy.location('pathname').should('eq', '/order-complete');
  });
});
describe('Checkout', () => {
  it('exibe validação quando não há dados de pagamento', { tags: '@regressao' }, () => {
    cy.visit('/checkout-one');
    cy.contains('button', 'PLACE ORDER').click();
    cy.contains('Preencha os dados de pagamento!').should('be.visible');
    cy.location('pathname').should('eq', '/checkout-one');
  });

  it('conclui o pedido após preencher os dados e selecionar pagamento', { tags: '@regressao' }, () => {
    cy.visit('/checkout-one');
    cy.get('#fname').type('QA');
    cy.get('#lname').type('Tester');
    cy.get('#cname').type('QA Shop');
    cy.get('#email').type('qa.checkout@teste.com');
    cy.get('#country').select('usa');
    cy.get('#city').select('Afghanistan');
    cy.get('#zip').type('12345');
    cy.get('#faddress').type('Rua de Teste, 10');
    cy.get('#messages').type('Pedido de teste');
    cy.get('#materialUnchecked').check();
    cy.get('#html').check();
    cy.contains('button', 'PLACE ORDER').click();
    // BUG: o site mantém a validação apesar do endereço e pagamento preenchidos.
    cy.location('pathname').should('eq', '/order-complete');
  });
});
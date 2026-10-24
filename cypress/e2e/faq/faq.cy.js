describe('Perguntas frequentes', () => {
  it('abre outro item sem fechar o item já aberto', { tags: '@regressao' }, () => {
    cy.visit('/faqs');
    cy.get('[role="tabpanel"]').eq(0).should('be.visible');
    cy.get('a[href="#collapse1"]').click();
    cy.get('[role="tabpanel"]').eq(0).should('be.visible');
    cy.get('[role="tabpanel"]').eq(1).should('be.visible');
  });
});
const StorePage = require('../../support/pages/store.page');

describe('Carrinho de compras', () => {
  it('informa quando o cupom é inválido', { tags: ['@smoke', '@regressao'] }, () => {
    cy.visit('/cart');
    cy.get('input[placeholder="Coupon code"]').type('INVALID-QA');
    cy.get('input[placeholder="Coupon code"]').closest('form').find('button[type="submit"]').click();
    cy.contains('.swal2-popup', 'Invalid Cuppon Code').should('be.visible');
  });

  it('BUG: perde o produto adicionado após navegar para o carrinho', { tags: '@regressao' }, () => {
    StorePage.visitProduct(1);
    StorePage.addToCart();
    cy.contains('.swal2-popup', 'Successfully added to your Cart').should('be.visible');
    cy.visit('/cart');
    // BUG: a navegação completa restaura apenas os três itens de demonstração.
    cy.get('table tbody').should('not.contain.text', 'Green Dress For Woman');
    cy.get('table tbody').should('contain.text', 'Fit-Flare Dress');
  });
});
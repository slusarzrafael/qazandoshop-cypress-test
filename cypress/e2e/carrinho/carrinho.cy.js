const StorePage = require('../../support/pages/store.page');

describe('Carrinho de compras', () => {
  it('informa quando o cupom é inválido', { tags: ['@smoke', '@regressao'] }, () => {
    cy.visit('/cart');
    cy.get('input[placeholder="Coupon code"]').type('INVALID-QA');
    cy.contains('button', 'APPLY COUPON').click();
    cy.contains('.swal2-popup', 'Invalid Cuppon Code').should('be.visible');
    cy.contains('CART TOTAL').should('be.visible');
  });

  it('mantém no carrinho o produto adicionado ao navegar', { tags: '@regressao' }, () => {
    StorePage.visitProduct(1);
    StorePage.addToCart();
    cy.get('.swal2-confirm').click();
    cy.visit('/cart');
    // BUG: a navegação completa restaura apenas os três itens de demonstração.
    cy.get('table tbody').should('contain.text', 'Green Dress For Woman');
  });
});
const StorePage = require('../../support/pages/store.page');

describe('Catálogo e produtos', () => {
  it('altera a ordenação do catálogo', { tags: '@regressao' }, () => {
    cy.visit('/shop');
    cy.get('select[name="product"]')
      .filter((index, select) => [...select.options].some((option) => option.text.trim() === 'Sort By Popularity'))
      .first().select('Sort By Popularity').find('option:selected').should('have.text', 'Sort By Popularity');
  });

  it('incrementa e decrementa quantidade e adiciona produto', { tags: ['@smoke', '@regressao'] }, () => {
    StorePage.visitProduct(1);
    StorePage.quantity().should('have.value', '1');
    StorePage.incrementQuantity();
    StorePage.quantity().should('have.value', '2');
    StorePage.decrementQuantity();
    StorePage.quantity().should('have.value', '1');
    StorePage.addToCart();
    cy.contains('.swal2-popup', 'Successfully added to your Cart').should('be.visible');
  });

  it('informa quando o produto já está no carrinho', { tags: '@regressao' }, () => {
    StorePage.visitProduct(5);
    StorePage.addToCart();
    cy.contains('.swal2-popup', 'This product is already added in your Cart').should('be.visible');
  });

  it('abre a seção de avaliações do produto', { tags: '@regressao' }, () => {
    StorePage.visitProduct(1);
    cy.get('a[href="#review"]').click();
    cy.get('#review').should('contain.text', 'Sara Anela');
  });
});
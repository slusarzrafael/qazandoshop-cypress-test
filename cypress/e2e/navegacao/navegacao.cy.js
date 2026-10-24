const routes = [
  '/', '/electronics', '/shop', '/shopTwo', '/shoplist', '/shop-left-bar', '/shop-right-bar',
  '/product-details-one/1', '/product-details-one/5', '/product-details-two/1', '/product-details-two/21',
  '/cart', '/cartTwo', '/empty-cart', '/checkout-one', '/checkout-two', '/wishlist', '/order-tracking',
  '/order-complete', '/my-account', '/my-account/customer-order', '/my-account/customer-download',
  '/my-account/customer-address', '/my-account/customer-account-details', '/login', '/register',
  '/about', '/contact-two', '/faqs', '/privacy-policy', '/compare',
];

describe('Navegação e busca', () => {
  it('abre as 31 rotas encontradas', { tags: ['@smoke', '@regressao'] }, () => {
    routes.forEach((route) => {
      cy.visit(route);
      cy.title().should('eq', 'QAZANDO Shop E-Commerce');
    });
  });

  it('retorna ao catálogo usando o botão voltar', { tags: '@regressao' }, () => {
    cy.visit('/shop');
    cy.contains('Most Popular').should('be.visible');
    cy.visit('/product-details-one/1');
    cy.contains('Green Dress For Woman').should('be.visible');
    cy.go('back');
    cy.location('pathname').should('eq', '/shop');
    cy.contains('Most Popular').should('be.visible');
  });

  it('busca um termo e abre a página de resultados', { tags: ['@smoke', '@regressao'] }, () => {
    cy.viewport(1280, 720);
    cy.visit('/');
    cy.get('a.search_width[href="#search"]').click();
    cy.get('input[placeholder="type keyword(s) here"]').type('Green Dress');
    cy.get('button.btn-main-search').click();
    cy.location('pathname').should('eq', '/shop');
    cy.contains('.swal2-popup', 'Check out the Results').should('be.visible');
  });

  it('bloqueia a busca vazia pelo campo obrigatório', { tags: '@regressao' }, () => {
    cy.viewport(1280, 720);
    cy.visit('/');
    cy.get('a.search_width[href="#search"]').click();
    cy.get('input[placeholder="type keyword(s) here"]')
      .should(($input) => expect($input[0].checkValidity()).to.be.false);
    cy.get('button.btn-main-search').click();
    cy.location('pathname').should('eq', '/');
  });

  it('rejeita e-mail malformado na newsletter', { tags: '@regressao' }, () => {
    cy.visit('/');
    cy.get('input[name="EMAIL"]').type('not-an-email');
    cy.get('button[name="subscribe"]').click();
    cy.get('input[name="EMAIL"]').should(($input) => {
      expect($input[0].checkValidity()).to.be.false;
      expect($input[0].validationMessage).to.contain("include an '@'");
    });
  });
});
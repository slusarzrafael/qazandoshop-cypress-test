class StorePage {
  visitProduct(productId) { cy.visit(`/product-details-one/${productId}`); }
  quantity() { return cy.get('.product_count_one .plus-minus-input input[type="number"]'); }
  incrementQuantity() { cy.get('.product_count_one .fa-plus').click(); }
  decrementQuantity() { cy.get('.product_count_one .fa-minus').click(); }
  addToCart() { cy.get('a.theme-btn-one.btn-black-overlay.btn_sm[href="#!"]').click(); }
  visitContact() { cy.visit('/contact-two'); }

  fillContact({ name, email, phone, subject, message }) {
    cy.get('input[name="name"]').clear().type(name);
    cy.get('input[name="email"]').clear().type(email);
    cy.get('input[name="phone"]').clear().type(phone);
    cy.get('input[name="subject"]').clear().type(subject);
    cy.get('textarea[name="message"]').clear().type(message);
  }

  submitContact() { cy.contains('button', /^Submit$/i).click(); }
}

module.exports = new StorePage();
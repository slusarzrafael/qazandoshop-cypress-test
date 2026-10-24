class StorePage {
  visitProduct(productId) { cy.visit(`/product-details-one/${productId}`); }
  quantity() { return cy.get('.plus-minus-input input[type="number"]'); }
  addToCart() { cy.contains('a', 'ADD TO CART').click(); }
  visitContact() { cy.visit('/contact-two'); }

  fillContact({ name, email, phone, subject, message }) {
    cy.get('input[name="name"]').clear().type(name);
    cy.get('input[name="email"]').clear().type(email);
    cy.get('input[name="phone"]').clear().type(phone);
    cy.get('input[name="subject"]').clear().type(subject);
    cy.get('textarea[name="message"]').clear().type(message);
  }

  submitContact() { cy.contains('button', 'SUBMIT').click(); }
}

module.exports = new StorePage();
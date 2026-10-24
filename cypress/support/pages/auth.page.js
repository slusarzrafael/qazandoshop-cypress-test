class AuthPage {
  visitLogin() { cy.visit('/login'); }
  visitRegister() { cy.visit('/register'); }

  fillLogin(email, password) {
    cy.get('#user').clear().type(email);
    cy.get('#password').clear().type(password);
  }

  submitLogin() { cy.get('#btnLogin').click(); }

  fillRegistration(name, email, password) {
    cy.get('#user').clear();
    if (name) cy.get('#user').type(name);
    cy.get('#email').clear();
    if (email) cy.get('#email').type(email);
    cy.get('#password').clear();
    if (password) cy.get('#password').type(password);
  }

  submitRegistration() { cy.get('#btnRegister').click(); }
}

module.exports = new AuthPage();
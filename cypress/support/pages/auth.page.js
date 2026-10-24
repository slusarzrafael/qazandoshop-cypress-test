class AuthPage {
  visitLogin() { cy.visit('/login'); }
  visitRegister() { cy.visit('/register'); }

  fillLogin(email, password) {
    cy.get('#user').clear().type(email);
    cy.get('#password').clear().type(password);
  }

  submitLogin() { cy.get('#btnLogin').click(); }

  fillRegistration(name, email, password) {
    cy.get('#user').clear().type(name);
    cy.get('#email').clear().type(email);
    cy.get('#password').clear().type(password);
  }

  submitRegistration() { cy.get('#btnRegister').click(); }
}

module.exports = new AuthPage();
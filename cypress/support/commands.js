// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('registerDynamicUser', () => {
	const timestamp = Date.now();
	return cy.env(['userName', 'userPassword']).then(({ userName, userPassword }) => {
		const user = {
			name: userName || 'QA Cypress',
			email: `user_${timestamp}@teste.com`,
			password: userPassword || String(timestamp).slice(-8),
		};

		cy.visit('/register');
		cy.get('#user').type(user.name);
		cy.get('#email').type(user.email);
		cy.get('#password').type(user.password);
		cy.get('#btnRegister').click();
		cy.get('.swal2-popup').should('contain.text', 'Cadastro realizado!');
		cy.get('.swal2-confirm').click();
		return cy.wrap(user, { log: false });
	});
});

Cypress.Commands.add('loginWithSession', (email, password) => {
	cy.session(['login', email], () => {
		cy.visit('/login');
		cy.get('#user').type(email);
		cy.get('#password').type(password);
		cy.get('#btnLogin').click();
		cy.get('.swal2-popup').should('contain.text', 'Login realizado');
		cy.get('.swal2-confirm').click();
	}, { cacheAcrossSpecs: true });
});
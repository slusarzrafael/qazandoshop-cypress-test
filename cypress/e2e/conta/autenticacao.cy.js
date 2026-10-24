const AuthPage = require('../../support/pages/auth.page');

describe('Autenticação e cadastro', () => {
  it('exibe erros de e-mail e senha no login', { tags: ['@smoke', '@regressao'] }, () => {
    AuthPage.visitLogin();
    AuthPage.submitLogin();
    cy.get('.account_form').should('contain.text', 'E-mail inválido.');
    AuthPage.fillLogin('e-mail-invalido', '123');
    AuthPage.submitLogin();
    cy.get('.account_form').should('contain.text', 'E-mail inválido.');
    AuthPage.fillLogin('qa@teste.com', '123');
    AuthPage.submitLogin();
    cy.get('.account_form').should('contain.text', 'Senha inválida.');
  });

  it('cadastra usuário dinâmico, encerra a sessão e reutiliza o login', { tags: ['@smoke', '@regressao'] }, () => {
    cy.registerDynamicUser().then((user) => {
      cy.contains('a', /^logout$/i).click();
      cy.contains('.swal2-popup', 'Logout Sucessfull').should('be.visible');
      cy.get('.swal2-confirm').click();
      cy.loginWithSession(user.email, user.password);
      cy.visit('/my-account');
      cy.contains('DASHBOARD').should('be.visible');
    });
  });

  it('valida campos vazios, e-mail e senha mínima no cadastro', { tags: '@regressao' }, () => {
    AuthPage.visitRegister();
    AuthPage.submitRegistration();
    cy.get('.account_form').should('contain.text', 'O campo nome deve ser prenchido');
    AuthPage.fillRegistration('QA Cypress', '', '');
    AuthPage.submitRegistration();
    cy.get('.account_form').should('contain.text', 'O campo e-mail deve ser prenchido corretamente');
    AuthPage.fillRegistration('QA Cypress', 'qa.validation@teste.com', '123');
    AuthPage.submitRegistration();
    cy.get('.account_form').should('contain.text', 'O campo senha deve ter pelo menos 6 dígitos');
  });

  it('rejeita nome composto apenas por espaços', { tags: '@regressao' }, () => {
    AuthPage.visitRegister();
    cy.get('#user').type('   ');
    AuthPage.submitRegistration();
    // BUG: o nome em branco é aceito e a validação avança para o e-mail.
    cy.get('.account_form').should('contain.text', 'O campo nome deve ser prenchido');
  });

  it('rejeita cadastro com e-mail já utilizado', { tags: '@regressao' }, () => {
    cy.registerDynamicUser().then((user) => {
      AuthPage.visitRegister();
      AuthPage.fillRegistration(user.name, user.email, user.password);
      AuthPage.submitRegistration();
      // BUG: o endereço duplicado é aceito e a aplicação redireciona ao dashboard.
      cy.location('pathname').should('eq', '/register');
    });
  });

  it('redireciona visitante anônimo para o login ao acessar a conta', { tags: '@regressao' }, () => {
    cy.visit('/my-account');
    // BUG: dashboard e pedidos ficam acessíveis sem autenticação.
    cy.location('pathname').should('eq', '/login');
  });
});
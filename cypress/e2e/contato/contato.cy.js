const StorePage = require('../../support/pages/store.page');

describe('Formulário de contato', () => {
  it('impede envio quando faltam campos obrigatórios', { tags: '@regressao' }, () => {
    StorePage.visitContact();
    ['name', 'email', 'phone', 'subject'].forEach((name) => {
      cy.get(`input[name="${name}"]`).should(($input) => {
        expect($input[0].required).to.be.true;
        expect($input[0].checkValidity()).to.be.false;
      });
    });
    cy.get('textarea[name="message"]').should(($input) => expect($input[0].required).to.be.false);
    StorePage.submitContact();
    cy.location('pathname').should('eq', '/contact-two');
    cy.get('.swal2-popup').should('not.exist');
  });

  it('envia uma mensagem com dados válidos', { tags: ['@smoke', '@regressao'] }, () => {
    StorePage.visitContact();
    StorePage.fillContact({ name: 'QA Test', email: 'qa.contato@teste.com', phone: '11987654321', subject: 'Mensagem de teste', message: 'Contato automatizado Cypress' });
    StorePage.submitContact();
    cy.contains('.swal2-popup', 'We Got Your Message').should('be.visible');
  });

  it('rejeita formato inválido no campo de e-mail', { tags: '@regressao' }, () => {
    StorePage.visitContact();
    StorePage.fillContact({ name: 'QA Test', email: 'not-an-email', phone: '11987654321', subject: 'Validação de e-mail', message: 'O formato deve ser rejeitado' });
    StorePage.submitContact();
    // BUG: o campo é type=text e o formulário aceita e-mail malformado.
    cy.get('.swal2-popup').should('not.contain.text', 'We Got Your Message');
  });
});
const devices = [
  { width: 1280, height: 720, menuVisible: true },
  { width: 768, height: 1024, menuVisible: false },
  { width: 375, height: 667, menuVisible: false },
];

describe('Responsividade', () => {
  it('adapta o menu sem rolagem horizontal nos três viewports', { tags: ['@responsivo', '@regressao'] }, () => {
    cy.visit('/');
    devices.forEach((device) => {
      cy.viewport(device.width, device.height);
      cy.get('#menuHome').should(device.menuVisible ? 'be.visible' : 'not.be.visible');
      cy.document().should((document) => {
        expect(document.documentElement.scrollWidth).to.be.at.most(document.defaultView.innerWidth);
      });
    });
  });
});
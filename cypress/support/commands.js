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

Cypress.Commands.add('', (locator, message) => {
  cy.get('locator').click();
  cy.on('window:alert', (msg) => {
    expect(msg).to.be.equal(message);
  });
});

Cypress.Commands.add('getToken', (user, passwd) => {
  cy.request({
    method: 'POST',
    url: 'https://barrigarest.wcaquino.me/signin',
    body: {
      email: user,
      redirecionar: false,
      senha: passwd,
    },
  })
    .its('body.token')
    .should('not.be.empty')
    .then((token) => {
      return token;
    });
});

Cypress.Commands.add('resetRest', () => {
  cy.getToken('lucasfernandespontes122@gmail.com', 'lucasfox22').then((token) => {
    cy.request({
      method: 'GET',
      url: 'https://barrigarest.wcaquino.me/reset',
      headers: { Authorization: `JWT ${token}` },
    })
      .its('status')
      .should('be.equal', 200);
  });
});

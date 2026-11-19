// Comandos personalizados del ejercicio 2.
// v2 (hallazgo 3): la URL sale de Cypress.env('apiUrl').

Cypress.Commands.add('createUser', (user) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/signup`,
    body: user
  })
})

Cypress.Commands.add('login', (user, failOnStatusCode = true) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/login`,
    body: user,
    failOnStatusCode
  })
})

class PurchaseModal {

  fillPurchaseForm({ name, country, city, card, month, year }) {
    // v2: los campos vacíos se omiten para poder probar las particiones inválidas
    if (name)    cy.get('#name').type(name)
    if (country) cy.get('#country').type(country)
    if (city)    cy.get('#city').type(city)
    if (card)    cy.get('#card').type(card)
    if (month)   cy.get('#month').type(month)
    if (year)    cy.get('#year').type(year)
  }

  confirmPurchase() {
    cy.contains('button', 'Purchase').click()
  }

  // v2: confirma la compra esperando la alerta de validación
  confirmPurchaseExpectingAlert(mensaje) {
    const alerta = cy.stub()
    cy.on('window:alert', alerta)
    this.confirmPurchase()
    cy.wrap(alerta).should('have.been.calledWithMatch', mensaje)
  }

  validateSuccessMessage() {
    cy.contains('Thank you for your purchase!')
      .should('be.visible')
  }

  closeConfirmation() {
    cy.contains('OK').click()
  }
}

export default PurchaseModal

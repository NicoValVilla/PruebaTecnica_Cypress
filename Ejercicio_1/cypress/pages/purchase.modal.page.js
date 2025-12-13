class PurchaseModal {

  fillPurchaseForm({ name, country, city, card, month, year }) {
    cy.get('#name').type(name)
    cy.get('#country').type(country)
    cy.get('#city').type(city)
    cy.get('#card').type(card)
    cy.get('#month').type(month)
    cy.get('#year').type(year)
  }

  confirmPurchase() {
    cy.contains('Purchase').click()
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

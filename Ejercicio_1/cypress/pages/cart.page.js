class CartPage {

  goToCart() {
    cy.contains('Cart').click()
  }

  validateProductInCart(productName) {
    cy.contains('td', productName)
      .should('be.visible')
  }

  clickPlaceOrder() {
    cy.contains('Place Order').click()
  }
}

export default CartPage

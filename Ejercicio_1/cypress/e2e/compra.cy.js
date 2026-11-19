import HomePage from '../pages/home.page'
import CartPage from '../pages/cart.page'
import PurchaseModal from '../pages/purchase.modal.page'

// Prueba de sistema, extremo a extremo: camino feliz del flujo de compra.
// Trazabilidad: ver TRAZABILIDAD.md, caso E2E-01.
describe('Flujo de compra - Demoblaze', () => {

  const homePage = new HomePage()
  const cartPage = new CartPage()
  const purchaseModal = new PurchaseModal()

  before(() => {
    cy.fixture('compraData').as('data')
  })

  it('E2E-01 Debe completar una compra exitosamente', function () {

    homePage.visit()

    // Producto 1 (v2: addToCart ahora verifica la alerta)
    homePage.selectProduct('Samsung galaxy s6')
    homePage.addToCart()
    homePage.goToHome()

    // Producto 2
    homePage.selectProduct('Nokia lumia 1520')
    homePage.addToCart()

    // Carrito
    cartPage.goToCart()
    cartPage.validateProductInCart('Samsung galaxy s6')
    cartPage.validateProductInCart('Nokia lumia 1520')
    cartPage.clickPlaceOrder()

    // Compra
    purchaseModal.fillPurchaseForm(this.data)
    purchaseModal.confirmPurchase()
    purchaseModal.validateSuccessMessage()
    purchaseModal.closeConfirmation()
  })
})

import HomePage from '../pages/home.page'
import CartPage from '../pages/cart.page'
import PurchaseModal from '../pages/purchase.modal.page'
import tabla from '../fixtures/formularioCompra.json'

// v2 (hallazgo 2): la versión 1 solo recorría el camino feliz.
// Estas pruebas aplican una tabla de decisión sobre los campos obligatorios
// del formulario de compra, con cobertura completa de las 4 combinaciones.
// Trazabilidad: ver TRAZABILIDAD.md, casos TD-R1 a TD-R4.
describe('Formulario de compra - tabla de decisión', () => {

  const homePage = new HomePage()
  const cartPage = new CartPage()
  const purchaseModal = new PurchaseModal()

  beforeEach(() => {
    // Condición fija de la tabla: carrito con un producto
    homePage.visit()
    homePage.selectProduct('Samsung galaxy s6')
    homePage.addToCart()
    cartPage.goToCart()
    cartPage.validateProductInCart('Samsung galaxy s6')
    cartPage.clickPlaceOrder()
  })

  tabla.reglas.forEach((regla) => {
    const desc = `${regla.id} nombre=${regla.c1_nombre ? 'sí' : 'no'} ` +
                 `tarjeta=${regla.c2_tarjeta ? 'sí' : 'no'} -> ${regla.esperado}`

    it(desc, () => {
      purchaseModal.fillPurchaseForm(regla.datos)
      if (regla.esperado === 'compra') {
        purchaseModal.confirmPurchase()
        purchaseModal.validateSuccessMessage()
        purchaseModal.closeConfirmation()
      } else {
        purchaseModal.confirmPurchaseExpectingAlert(tabla.mensajeRechazo)
      }
    })
  })
})

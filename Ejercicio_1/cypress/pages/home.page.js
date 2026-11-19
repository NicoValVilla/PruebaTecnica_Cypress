class HomePage {
  visit() {
    // v2 (hallazgo 3): ruta relativa; la URL base sale de cypress.config.js
    cy.visit("/");
  }

  selectProduct(productName) {
    cy.contains("a", productName).should("be.visible").click();
  }

  // v2 (hallazgo 1): el listener se registra ANTES del clic y la aserción
  // falla si la alerta no aparece. En la versión 1 el listener se registraba
  // después de la acción y la prueba pasaba aunque no hubiera alerta.
  addToCart() {
    const alerta = cy.stub();
    cy.on("window:alert", alerta);
    cy.contains("Add to cart").click();
    cy.wrap(alerta).should("have.been.calledWithMatch", "Product added");
  }

  goToHome() {
    cy.contains("Home").click();
  }
}

export default HomePage;

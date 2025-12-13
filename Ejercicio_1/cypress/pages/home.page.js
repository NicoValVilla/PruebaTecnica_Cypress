class HomePage {
  visit() {
    cy.visit("https://www.demoblaze.com/");
  }

  selectProduct(productName) {
    cy.contains("a", productName).should("be.visible").click();
  }

  addToCart() {
    cy.contains("Add to cart").click();
  }

  acceptAlert() {
    cy.on("window:alert", (text) => {
      expect(text).to.contain("Product added");
    });
  }

  goToHome() {
    cy.contains("Home").click();
  }
}

export default HomePage;

describe("API Signup", () => {
  it("Debe crear un nuevo usuario", () => {
    cy.fixture("users").then((users) => {
      const user = {
        username: users.validUser.username.replace("{{timestamp}}", Date.now()),
        password: users.validUser.password,
      };

      cy.request({
        method: "POST",
        url: "https://api.demoblaze.com/signup",
        body: user,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.empty;
      });
    });
  });

  it("Debe retornar error al intentar crear un usuario ya existente", () => {
    cy.fixture("users").then((users) => {
      const user = {
        username: users.validUser.username.replace("{{timestamp}}", Date.now()),
        password: users.validUser.password,
      };

      cy.request({
        method: "POST",
        url: "https://api.demoblaze.com/signup",
        body: user,
      });

      cy.request({
        method: "POST",
        url: "https://api.demoblaze.com/signup",
        body: user,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("errorMessage");
        expect(response.body.errorMessage).to.contain("exist");
      });
    });
  });
});

describe("API Login", () => {
  it("Debe permitir login con usuario y password correctos", () => {
    cy.fixture("users").then((users) => {
      const user = {
        username: users.validUser.username.replace("{{timestamp}}", Date.now()),
        password: users.validUser.password,
      };

      cy.createUser(user);

      cy.login(user).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.a("string");
        expect(response.body).to.contain("Auth_token");
      });
    });
  });

  it("Debe retornar error con usuario o password incorrectos", () => {
    cy.fixture("users").then((users) => {
      const user = {
        username: users.validUser.username.replace("{{timestamp}}", Date.now()),
        password: users.validUser.password,
      };

      cy.createUser(user);

      cy.login({ username: user.username, password: "wrongPass" }, false).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("errorMessage");
          expect(response.body.errorMessage.toLowerCase()).to.contain("wrong");
        }
      );
    });
  });
});

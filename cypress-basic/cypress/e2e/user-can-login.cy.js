describe('User can login to system', () => {
  it('user can login with valid email and password', () => {
    //arrange
    cy.visit('http://127.0.0.1:8000/');
    //act
    cy.get(':nth-child(2) > .form-control').type("superadmin@gmail.com");
    cy.get(':nth-child(3) > .form-control').type('password')
    cy.get('.btn').click();
    //assert
    cy.get('.nav-link > .d-sm-none').should("have.text", "Hi, SuperAdmin");
  });

  //negative test case
  it("user cannot login with valid email and wrong password", () =>{
    //arrange
    cy.visit('http://127.0.0.1:8000/');
    //act
    cy.get(':nth-child(2) > .form-control').type("superadmin@gmail.com");
    cy.get(':nth-child(3) > .form-control').type('password-salah')
    cy.get('.btn').click();
    //assert
    cy.get('.invalid-feedback').should(
      "have.text",
      "These credentials do not match our records."
    );
  });

  it("user cannot login with invalid email and valid password", () =>{
    //arrange
    cy.visit('http://127.0.0.1:8000/');
    //act
    cy.get(':nth-child(2) > .form-control').type("superadminppp@gmail.com");
    cy.get(':nth-child(3) > .form-control').type('password')
    cy.get('.btn').click();
    //assert
    cy.get('.invalid-feedback').should(
      "have.text",
      "These credentials do not match our records."
    );
  });

  it("user cannot login with empty email and correct password", () =>{
    //arrange
    cy.visit('http://127.0.0.1:8000/');
    //act
    cy.get(':nth-child(3) > .form-control').type('password')
    cy.get('.btn').click();
    //assert
    cy.get('.invalid-feedback').should(
      "have.text",
      "The email field is required."
    );
  });

  it("user cannot login with valid email and epmty password", () =>{
    //arrange
    cy.visit('http://127.0.0.1:8000/');
    //act
    cy.get(':nth-child(2) > .form-control').type("superadmin@gmail.com");
    cy.get('.btn').click();
    //assert
    cy.get('.invalid-feedback').should(
      "have.text",
      "The password field is required."
    );
  });

  // it.only("user cannot login with epmty email and epmty password", () =>{
  //   //arrange
  //   cy.visit('http://127.0.0.1:8000/');
  //   //act
  //   cy.get('.btn').click();
  //   //assert
  //   cy.get('.invalid-feedback').should(
  //     "have.text",
  //     "The email field is required.",
  //   );
  // });
})
describe('template spec', () => {
  afterEach(() => {
    cy.exec(
      "cd ../demo-app-cypress-automation && php artisan migrate:fresh --seed"
    );
  });
  //before each test case
  beforeEach(() => {
    //reset database using 
    cy.exec(
      "cd ../demo-app-cypress-automation && php artisan migrate:fresh --seed"
    );
    //arrange
    cy.visit('http://127.0.0.1:8000/');
    //act
    cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
    cy.get(':nth-child(3) > .form-control').type('password');
    cy.get('.btn').click();
    cy.visit("http://127.0.0.1:8000/user-management/user");
  });
  //positive test case
  it('User can delete data', () => {
    //cy.get(".table td").contains("user").next().next().next().contains("Delete").click();
    //cy.get(".table td").contains("user").nextAll().contains("Delete").click();
    cy.get(".table td").contains("user").parent().find("button").contains("Delete").click();
    //make sure sweet alert visible
    cy.get(".swal-button-container").find("button").contains("OK").click();
    cy.get(".alert").should("be.visible").and("have.class", "alert-success").contains("User Deleted Successfully");
    cy.get(".table td").contains("user").should("not.exist");
    //cy.get(".table").should("not.contain", "user");
    // cy.get(':nth-child(3) > .text-right > .d-flex > .ml-2 > .btn').click();
    // cy.get(':nth-child(2) > .swal-button').click();
    // cy.get('p').should('be.visible');
    // cy.get('p').should('contain', 'User Deleted Successfully');
  });

  it.only('User can cancel delete data', () => {
    //act
    cy.get(".table td").contains("user").parent().find("button").contains("Delete").click();
    //make sure sweet alert visible
    cy.get(".swal-button-container").find("button").contains("Cancel").click();
    //assert
    cy.get(".table td").contains("user").should("be.visible");
  });

  //negative test case
  it('dummy test', () => {
    //arrange
    //act
    //assert
  });



})
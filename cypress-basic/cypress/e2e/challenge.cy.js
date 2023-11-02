describe('challenge', () => {
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
  it('User can edit existing data', () => {
    cy.get(".table td").contains("user baru").parent().find("a").contains("Edit").click();
    cy.get('#name').clear('user baru');
    cy.get('#name').type('user 3');
    cy.get('.btn-primary').contains("Submit").click();
    cy.get(".table td").contains("user 3").should('have.text', 'user 3');
    cy.get('.alert').should("be.visible").and("have.class", "alert-success").and("contain", "User Berhasil Diupdate")
  });

  it.only('User can delete existing data', () => {
    cy.get(".table td").contains("Another Admin").parent().find("button").contains("Delete").click();
    cy.get(".swal-button-container").find("button").contains("OK").click();
    cy.get(".alert").should("be.visible").and("have.class", "alert-success").contains("User Deleted Successfully");
    cy.get(".table td").contains("Another Admin").should("not.exist");
  });

});
describe('template spec', () => {
  //positive test case
  it('user can create new user', () => {
    //arrange
    cy.visit('http://127.0.0.1:8000/');
    //reset database using 
    cy.exec(
      "cd ../demo-app-cypress-automation && php artisan migrate:fresh --seed"
    );
    //act
    cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
    cy.get(':nth-child(3) > .form-control').type('password');
    cy.get('.btn').click();
    cy.visit("http://127.0.0.1:8000/user-management/user");
    cy.get('.card-header-action > .btn-icon').click();
    cy.get('#name').type('mamank');
    cy.get('#email').type('mamank@gmail.com');
    cy.get('#password').type('12345678');
    cy.get('.btn-primary').click();
    //assert
    cy.get('p').should('be.visible');
    cy.get('p').should('have.text', 'Data Berhasil Ditambahkan');
    cy.get('.nav-link > .d-sm-none').click();
  });

  //negative test case
})
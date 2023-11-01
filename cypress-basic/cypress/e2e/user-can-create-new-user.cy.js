describe('template spec', () => {
  //before each test case
  beforeEach(() => {
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
  });
  //positive test case
  it('user can create new user', () => {
    
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
  it('user cannot create new user because invalid email', () => {

    cy.get('#name').type('mamank');
    cy.get('#email').type('mamank');
    cy.get('#password').type('12345678');
    cy.get('.btn-primary').click();
    //assert
    cy.get('.invalid-feedback').should('be.visible');
    cy.get('.invalid-feedback').should('have.text', '\n                                    The email must be a valid email address.\n                                ');
    cy.get('.navbar-right > :nth-child(2) > .nav-link').click();
    cy.get('.text-danger').click();

  });

  it('user cannot create new user because name is required', () => {

    cy.get('#email').type('mamank@gmail.com');
    cy.get('#password').type('12345678');
    cy.get('.btn-primary').click();
    // //assert
    cy.get('.invalid-feedback').should('be.visible');
    cy.get('.invalid-feedback').should('have.text', '\n                                    The name field is required.\n                                ');
    cy.get('.navbar-right > :nth-child(2) > .nav-link').click();
    cy.get('.text-danger').click();
  });

  it('user cannot create new user because password is required', () => {
    cy.get('#name').type('mamank');
    cy.get('#email').type('mamank@gmail.com');
    
    cy.get('.btn-primary').click();
    // //assert
    cy.get('.invalid-feedback').should('be.visible');
    cy.get('.invalid-feedback').should('have.text', '\n                                    The password field is required.\n                                ');
    cy.get('.navbar-right > :nth-child(2) > .nav-link').click();
    cy.get('.text-danger').click();
  });
})
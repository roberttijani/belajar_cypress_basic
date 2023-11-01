describe('User can login to system', () => {
  it('user can login with valid username and password', () => {
    //arrange
    cy.visit('http://127.0.0.1:8000/');
    cy.get('[data-id="email"]').type("superadmin@gmail.com");
    cy.get('[data-id="password"]').type("password");
    cy.get('[data-id="submit"]').click();
    cy.get('.navbar-right > :nth-child(2) > .nav-link').click();
    cy.get('.text-danger').click();
  });
})
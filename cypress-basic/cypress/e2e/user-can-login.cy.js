describe('User can login to system', () => {
  it('user can login with valid username and password', () => {
    cy.visit('http://127.0.0.1:8000/');
    // select emelent html yang dibutuhkan
    // kalau sudah dapat element nya mau diapakan?
    cy.get(':nth-child(2) > .form-control').type("superadmin@gmail.com");
    // select emelent html yang dibutuhkan
    // kalau sudah dapat element nya mau diapakan?
    cy.get(':nth-child(3) > .form-control').type('password')
    cy.get('.btn').click();
    //select elemen
    //lakukan assertion sesuai case
    cy.get('.nav-link > .d-sm-none').should("have.text", "Hi, SuperAdmin");
  })
})
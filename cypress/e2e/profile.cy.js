describe('ProfilePage E2E Tests', () => {
  it('переходить на сторінку профілю', () => {
    cy.visit('/profile');
    cy.url().should('include', '/profile');
  });
});

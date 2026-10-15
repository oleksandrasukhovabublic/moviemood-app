describe('CatalogPage E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/catalog');
  });

  it('відображає панель фільтрів та сітку фільмів', () => {
    cy.url().should('include', '/catalog');
    cy.get('main').should('exist');
  });

  it('дозволяє вводити текст у поле пошуку', () => {
    cy.get('input[type="text"]').first().type('Inception').should('have.value', 'Inception');
  });
});

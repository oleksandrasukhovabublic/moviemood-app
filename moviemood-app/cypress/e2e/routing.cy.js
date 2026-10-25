describe('Routing E2E Tests', () => {
  it('переходить між сторінками через меню шапки', () => {
    cy.visit('/');

    cy.get('nav').contains('Каталог').click();
    cy.location('pathname').should('eq', '/catalog');

    cy.get('nav').contains('Профіль').click();
    cy.location('pathname').should('eq', '/profile');

    cy.get('nav').contains('Головна').click();
    cy.location('pathname').should('eq', '/');
  });

  it('відкриває сторінку фільму за адресою /movie/:movieId', () => {
    cy.visit('/movie/3');
    cy.location('pathname').should('eq', '/movie/3');
    cy.get('main').should('exist');
  });

  it('показує сторінку 404 для неіснуючої адреси', () => {
    cy.visit('/some/unknown/page');
    cy.contains('404').should('exist');
    cy.contains('Сторінку не знайдено').should('exist');
  });

  it('показує сторінку 404 для неіснуючого фільму', () => {
    cy.visit('/movie/999');
    cy.contains('Сторінку не знайдено').should('exist');
  });
});

describe('HomePage E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('успішно завантажує головну сторінку та відображає заголовок', () => {
    cy.get('header').should('exist');
    cy.get('nav').should('exist');
  });

  it('перевіряє наявність блоку вибору настрою (MoodSelector)', () => {
    cy.contains(/настрій|mood/i).should('exist');
  });
});

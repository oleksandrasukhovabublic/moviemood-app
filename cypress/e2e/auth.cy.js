// Потрібен запущений бекенд: npm run server (демо-акаунт створюється автоматично)
describe('Auth E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('header button', /Увійти|Sign in/).click();
  });

  it('показує помилку при неправильному паролі', () => {
    cy.get('input[name="email"]').type('demo@moviemood.com');
    cy.get('input[name="password"]').type('wrong-password');
    cy.get('form button[type="submit"]').click();
    cy.get('[role="alert"]').should('contain', 'Невірний email або пароль');
  });

  it('входить з правильним паролем і запамʼятовує сесію після перезавантаження', () => {
    cy.get('input[name="email"]').type('demo@moviemood.com');
    cy.get('input[name="password"]').type('demo1234');
    cy.get('form button[type="submit"]').click();
    cy.get('header button[aria-label="Меню користувача"]').should('exist');

    cy.reload();
    cy.get('header button[aria-label="Меню користувача"]').should('exist');
  });

  it('валідує форму реєстрації', () => {
    cy.contains('[role="tab"]', 'Реєстрація').click();
    cy.get('input[name="password"]').type('123');
    cy.get('input[name="confirmPassword"]').type('456');
    cy.get('form button[type="submit"]').click();
    cy.contains('Паролі не збігаються').should('exist');
  });
});

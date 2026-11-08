// Кастомні команди Cypress (якщо знадобляться)
Cypress.Commands.add('login', (email = 'user@example.com', password = 'password123') => {
  cy.visit('/');
  // Додаткова логіка авторизації при потребі
});

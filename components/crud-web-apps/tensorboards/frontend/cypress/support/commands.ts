/// <reference types="cypress" />

Cypress.Commands.add('mockDashboardRequest', () => {
  cy.intercept('GET', '/dashboard_lib.bundle.js', { body: [] }).as(
    'mockDashboardRequest',
  );
});

Cypress.Commands.add('mockNamespacesRequest', () => {
  cy.intercept('GET', '/api/namespaces', {
    fixture: 'namespaces',
  }).as('mockNamespacesRequest');
});

Cypress.Commands.add('mockEmptyTensorboardsRequest', namespace => {
  cy.intercept('GET', `/api/namespaces/${namespace}/tensorboards`, {
    tensorboards: [],
  }).as('mockEmptyTensorboardsRequest');
});

Cypress.Commands.add('mockTensorboardsRequest', namespace => {
  cy.intercept('GET', `/api/namespaces/${namespace}/tensorboards`, {
    fixture: 'tensorboards',
  }).as('mockTensorboardsRequest');
});

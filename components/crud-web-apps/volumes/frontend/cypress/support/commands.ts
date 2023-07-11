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

Cypress.Commands.add('mockStorageClassesRequests', () => {
  cy.intercept('GET', '/api/storageclasses', {
    storageClasses: ['standard'],
  });
});

Cypress.Commands.add('mockDefaultStorageClassRequest', defaultStorageClass => {
  cy.intercept('GET', '/api/storageclasses/default', {
    defaultStorageClass,
  }).as('mockDefaultStorageClassRequest');
});

Cypress.Commands.add('mockEmptyPVCsRequest', namespace => {
  cy.intercept('GET', `/api/namespaces/${namespace}/pvcs`, {
    pvcs: [],
  }).as('mockEmptyPVCsRequest');
});

Cypress.Commands.add('mockPVCsRequest', namespace => {
  cy.intercept('GET', `/api/namespaces/${namespace}/pvcs`, {
    fixture: 'pvcs',
  }).as('mockPVCsRequest');
});

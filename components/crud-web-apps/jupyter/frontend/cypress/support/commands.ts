/// <reference types="cypress" />

Cypress.Commands.add('selectAllNamespaces', () => {
  cy.log(`Selecting all namespaces`);

  // click and select 'All namespaces' option
  cy.get('[data-cy-namespace-selector-dropdown]').click();
  cy.get(`[data-cy-all-namespaces]`).click();
});

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

Cypress.Commands.add('mockNotebooksRequest', namespace => {
  cy.intercept('GET', `/api/namespaces/${namespace}/notebooks`, {
    fixture: 'notebooks',
  }).as('mockNotebooksRequest');
});

Cypress.Commands.add('mockNotebooksAllNamespacesRequest', settingsNamespace => {
  cy.fixture('namespaces').then(res => {
    for (const namespace of res.namespaces) {
      if (namespace === settingsNamespace) {
        continue;
      }
      cy.intercept('GET', `/api/namespaces/${namespace}/notebooks`, {
        notebooks: [],
      });
    }
  });
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

Cypress.Commands.add('mockGpusRequest', () => {
  cy.intercept('GET', '/api/gpus', {
    status: 200,
    success: true,
    user: null,
    vendors: [],
  }).as('mockGpusRequest');
});

Cypress.Commands.add('mockConfigRequest', () => {
  cy.intercept('GET', '/api/config', {
    fixture: 'config',
  }).as('mockConfigRequest');
});

Cypress.Commands.add('mockPoddefaultsRequest', namespace => {
  cy.intercept('GET', `/api/namespaces/${namespace}/poddefaults`, {
    fixture: 'poddefaults',
  }).as('mockPoddefaultsRequest');
});

import { notebook } from '../fixtures/notebook';
import { settings } from '../fixtures/settings';

Cypress.Commands.add('selectNamespace', ns => {
  cy.intercept('GET', '/api/namespaces').as('getNamespaces');
  cy.visit('/');

  cy.log(`Selecting Namespace: ${ns}`);
  cy.wait('@getNamespaces');

  // click and select the provided namespace
  cy.get('[data-cy-namespace-selector-dropdown]').click();
  cy.get(`[data-cy-namespace=${ns}]`).click();
});

Cypress.Commands.add('selectAllNamespaces', () => {
  cy.intercept('GET', '/api/namespaces').as('getNamespaces');
  cy.visit('/');

  cy.log(`Selecting all namespaces`);
  cy.wait('@getNamespaces');

  // click and select the provided namespace
  cy.get('[data-cy-namespace-selector-dropdown]').click();
  cy.get(`[data-cy-all-namespaces]`).click();
});

Cypress.Commands.add('createNotebook', () => {
  const randomSubfix = Math.random().toString(36).substring(4);

  notebook.name = `test-notebook-${randomSubfix}`;
  notebook.namespace = settings.namespace;

  cy.log(`Creating a test Notebook ${notebook.namespace}/${notebook.name}`);

  const method = 'POST';
  const url = `api/namespaces/${settings.namespace}/notebooks`;
  const body = notebook;

  cy.request({ method, url, body, headers: settings.postHeaders }).then(() => {
    return notebook;
  });
});

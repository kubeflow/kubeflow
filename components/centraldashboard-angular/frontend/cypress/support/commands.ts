/// <reference types="cypress" />

import { equalUrlPaths, removePrefixFrom } from 'src/app/shared/utils';

Cypress.Commands.add('getIframeBody', () => {
  cy.log('getIframeBody');
  // Cypress yields jQuery element, which has the real
  // DOM element under property "0".
  // From the real DOM iframe element we can get
  // the "document" element, it is stored in "contentDocument" property
  // Cypress "its" command can access deep properties using dot notation
  // https://on.cypress.io/its

  // get the iframe > document > body
  // and retry until the body element is not empty
  return (
    cy
      .get('iframe', { log: false })
      .its('0.contentDocument.body', { log: false })
      .should('not.be.empty')
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      // https://on.cypress.io/wrap
      .then(body => cy.wrap(body, { log: false }))
  );
});

Cypress.Commands.add('getIframeUrl', () => {
  cy.log('getIframeLocation');
  cy.get('iframe', { log: false })
    .its('0.contentWindow.location', { log: false })
    .then(iframeLocation => {
      const iframeUrl: string = iframeLocation.pathname + iframeLocation.search;
      cy.wrap(iframeUrl, { log: false });
    });
});

Cypress.Commands.add('equalUrls', () => {
  cy.log('equalUrls command');
  cy.getIframeUrl().then(url => {
    cy.location({ log: false }).should(browserLocation => {
      let browserUrl = browserLocation.pathname + browserLocation.search;
      browserUrl = removePrefixFrom(browserUrl);

      expect(equalUrlPaths(browserUrl, url)).to.be.true;
    });
  });
});

Cypress.Commands.add('storageClassRequest', () => {
  cy.intercept('GET', '/jupyter/api/storageclasses/default').as(
    'storageClassRequest',
  );
});

Cypress.Commands.add('notebooksRequest', () => {
  cy.intercept('GET', '/jupyter/api/namespaces/kubeflow-user/notebooks').as(
    'notebooksRequest',
  );
});

Cypress.Commands.add('mockPodDefaultsRequest', () => {
  cy.intercept('GET', '/jupyter/api/namespaces/kubeflow-user/poddefaults', {
    body: {},
  }).as('mockPodDefaultsRequest');
});

Cypress.Commands.add('pvcRequest', () => {
  cy.intercept(
    'GET',
    '/volumes/api/namespaces/kubeflow-user/pvcs/test-notebook-workspace',
  ).as('pvcRequest');
});

Cypress.Commands.add('pvcPodsRequest', () => {
  cy.intercept(
    'GET',
    '/volumes/api/namespaces/kubeflow-user/pvcs/test-notebook-workspace/pods',
  ).as('pvcPodsRequest');
});

Cypress.Commands.add('notebookPodRequest', () => {
  cy.intercept(
    'GET',
    '/jupyter/api/namespaces/kubeflow-user/notebooks/test-notebook/pod',
  ).as('notebookPodRequest');
});

Cypress.Commands.add('mockDashboardLinksRequest', () => {
  cy.intercept('GET', '/api/dashboard-links', { fixture: 'dashboardlinks' }).as(
    'mockDashboardLinksRequest',
  );
});

Cypress.Commands.add('mockEnvInfoRequest', () => {
  cy.intercept('GET', '/api/workgroup/env-info', { fixture: 'envinfo' }).as(
    'mockEnvInfoRequest',
  );
});

Cypress.Commands.add('setNamespaceInLocalStorage', namespace => {
  cy.fixture('envinfo').then(envInfo => {
    const user = envInfo.user;
    const key =
      '/centraldashboard/selectedNamespace/' + ((user && '.' + user) || '');
    const value = JSON.stringify(namespace);
    window.localStorage.setItem(key, value);
  });
});

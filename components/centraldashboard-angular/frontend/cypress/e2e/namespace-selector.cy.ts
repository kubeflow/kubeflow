/*
 * This spec tests that namespace is initialized prioritizing correctly from:
 *  1. The query parameters of current URL
 *  2. The user's previous namespace (in browser's local storage)
 *  3. The first namespace in the namespaces list with Owner role
 *  4. The first namespace in the namespaces list
 */
describe('Esnure expected namespace is selected', () => {
  beforeEach(() => {
    cy.notebooksRequest();
    cy.mockDashboardLinksRequest();
    cy.mockEnvInfoRequest();
    cy.setNamespaceInLocalStorage('test-namespace-2');
    cy.fixture('envinfo').as('envInfo');
    /*
     * In order to prevent a mirror effect, CDB hides its sidebar and header
     * when running in an iframe. Thus, when running tests, we need to imitate
     * running in a browser and make the WA think that it doesn't run in an iframe.
     */
    cy.on('window:before:load', win => {
      win.parent = win;
    });
  });

  it('should select namespace according to query parameters', function () {
    const namespaces = this.envInfo.namespaces;
    for (const ns of namespaces) {
      cy.visit(`/?ns=${ns.namespace}`);
      cy.get('[data-cy-selected-namespace]').should('contain', ns.namespace);
    }
  });

  it('should not select an invalid namespace from query parameters', () => {
    const namespace = 'invalid-namespace';
    cy.visit(`/?ns=${namespace}`);
    cy.get('[data-cy-selected-namespace]').should('not.contain', namespace);
  });

  it('should not select All namespaces in Home path', () => {
    const namespace = 'All namespaces';
    cy.visit(`/?ns=${namespace}`);
    cy.get('[data-cy-selected-namespace]').should('not.contain', namespace);
  });

  it('should switch namespace when clicking the Home button if All namespaces was selected', () => {
    const namespace = 'All namespaces';
    cy.visit(`/_/jupyter?ns=${namespace}`);
    cy.get('[data-cy-selected-namespace]').should('contain', namespace);

    cy.get('[data-cy-sidenav-menu-item="Home"]').should('be.visible').click();
    cy.get('[data-cy-selected-namespace]').should('not.contain', namespace);
  });

  it('should select All namespaces in allowed paths', () => {
    const namespace = 'All namespaces';

    cy.visit(`/_/jupyter?ns=${namespace}`);
    cy.get('[data-cy-selected-namespace]').should('contain', namespace);

    cy.visit(`/_/volumes?ns=${namespace}`);
    cy.get('[data-cy-selected-namespace]').should('contain', namespace);
  });

  it('should select namespace according to local storage', () => {
    cy.visit('/');
    cy.get('[data-cy-selected-namespace]').should(
      'contain',
      'test-namespace-2',
    );
  });

  it('should not select invalid namespace from the local storage', () => {
    cy.setNamespaceInLocalStorage('invalid-namespace');
    cy.visit('/');
    cy.get('[data-cy-selected-namespace]').should(
      'not.contain',
      'invalid-namespace',
    );
  });

  it('should select namespace with Owner role', function () {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.get('[data-cy-selected-namespace]').should('contain', 'kubeflow-user');
  });

  it('should select first namespace from the list', function () {
    cy.clearLocalStorage();

    // Remove 'Owner' from role field of the `kubeflow-user` namespace
    this.envInfo.namespaces[1].role = '';
    cy.intercept('GET', '/api/workgroup/env-info', this.envInfo);

    cy.visit('/');
    cy.get('[data-cy-selected-namespace]').should(
      'contain',
      'test-namespace-1',
    );
  });

  it('should show No namespaces', function () {
    this.envInfo.namespaces = [];
    cy.intercept('GET', '/api/workgroup/env-info', this.envInfo);

    cy.visit('/');
    cy.wait(1000);
    cy.get('[data-cy-selected-namespace]').should('contain', 'No namespaces');
  });

  it('shows (Owner) when selected namespace has owner role', () => {
    cy.visit('/');
    cy.get('[data-cy-selected-namespace]')
      .click()
      .then(() => {
        cy.get('[data-cy-namespace="kubeflow-user"]').click();
        cy.get('[data-cy-selected-namespace]').contains('(Owner)');
      });
  });
});

import { settings } from '../fixtures/settings';

describe('Main table', () => {
  beforeEach(() => {});

  it('should have a "Notebook" title', () => {
    cy.visit('/');
    cy.get('[data-cy-toolbar-title]').contains('Notebooks').should('exist');
  });

  it('should list Notebooks without errors', () => {
    cy.selectNamespace(settings.namespace);

    // ensure there's at least one Notebook
    cy.createNotebook();

    // wait for the request to fetch notebooks
    const getUrl = `/api/namespaces/${settings.namespace}/notebooks`;
    cy.intercept('GET', getUrl).as('getNotebooks');
    cy.wait('@getNotebooks');

    // after fetching the data the page should not have an error snackbar
    cy.get('[data-cy-snack-status=ERROR]').should('not.exist');
  });

  it('should have a `Namespace` column, when showing all-namespaces', () => {
    cy.selectAllNamespaces();

    // ensure there's at least one Notebook
    cy.createNotebook().then(nb => {
      cy.log(nb);
      cy.get('[data-cy-table-header-row="Namespace"]').should('exist');
    });
  });
});

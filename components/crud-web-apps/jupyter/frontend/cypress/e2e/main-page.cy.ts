import { STATUS_TYPE } from 'kubeflow';

describe('Main table', () => {
  beforeEach(() => {
    cy.mockNamespacesRequest();
    cy.fixture('settings').then(settings => {
      cy.mockNotebooksRequest(settings.namespace);
    });
    cy.fixture('notebooks').as('notebooksRequest');
  });

  it('should have a "Notebooks" title', () => {
    cy.visit('/');
    cy.get('[data-cy-toolbar-title]').contains('Notebooks').should('exist');
  });

  it('should list Notebooks without errors', () => {
    cy.visit('/');
    // wait for the request to fetch notebooks and namespaces
    cy.wait(['@mockNamespacesRequest', '@mockNotebooksRequest']);

    // after fetching the data the page should not have an error snackbar
    cy.get('[data-cy-snack-status=ERROR]').should('not.exist');
  });

  it('should have a `Namespace` column, when showing all-namespaces', () => {
    cy.visit('/');
    cy.wait(['@mockNamespacesRequest', '@mockNotebooksRequest']);

    cy.fixture('settings').then(settings => {
      cy.mockNotebooksAllNamespacesRequest(settings.namespace);
    });
    cy.selectAllNamespaces();

    cy.get('[data-cy-table-header-row="Namespace"]').should('exist');
  });

  // We use function () in order to be able to access aliases via this
  it('renders every Notebook name into the table', function () {
    cy.visit('/');
    cy.wait(['@mockNamespacesRequest', '@mockNotebooksRequest']);

    let i = 0;
    const notebooks = this.notebooksRequest.notebooks;
    // Table is sorted by Name in ascending order by default
    // and pvcs object is also sorted alphabetically by name
    cy.get(`[data-cy-resource-table-row="Name"]`).each(element => {
      expect(element).to.contain(notebooks[i].name);
      i++;
    });
  });

  it('checks Status icon for all notebooks', function () {
    cy.visit('/');
    cy.wait(['@mockNamespacesRequest', '@mockNotebooksRequest']);

    let i = 0;
    const notebooks = this.notebooksRequest.notebooks;
    cy.get('[data-cy-resource-table-row="Status"]').each(element => {
      if (notebooks[i].status.phase === STATUS_TYPE.READY) {
        cy.wrap(element)
          .find('lib-status-icon>mat-icon')
          .should('contain', 'check_circle');
      } else if (notebooks[i].status.phase === STATUS_TYPE.STOPPED) {
        cy.wrap(element)
          .find('lib-status-icon>lib-icon')
          .should('have.attr', 'icon', 'custom:stoppedResource');
      } else if (notebooks[i].status.phase === STATUS_TYPE.UNAVAILABLE) {
        cy.wrap(element)
          .find('lib-status-icon>mat-icon')
          .should('contain', 'timelapse');
      } else if (notebooks[i].status.phase === STATUS_TYPE.WARNING) {
        cy.wrap(element)
          .find('lib-status-icon>mat-icon')
          .should('contain', 'warning');
      } else if (
        notebooks[i].status.phase === STATUS_TYPE.WAITING ||
        notebooks[i].status.phase === STATUS_TYPE.TERMINATING
      ) {
        cy.wrap(element).find('mat-spinner').should('exist');
      }
      i++;
    });
  });
});

import { STATUS_TYPE } from 'kubeflow';

describe('index page', () => {
  beforeEach(() => {
    cy.mockDashboardRequest();
    cy.mockNamespacesRequest();
    cy.fixture('settings').then(settings => {
      cy.mockPVCsRequest(settings.namespace);
    });
    cy.fixture('pvcs').as('pvcsRequest');
  });

  // We use function () in order to access aliases via this
  it('renders every PVC name into the table', function () {
    cy.visit('/');
    cy.wait([
      '@mockDashboardRequest',
      '@mockNamespacesRequest',
      '@mockPVCsRequest',
    ]);

    let i = 0;
    const pvcs = this.pvcsRequest.pvcs;
    // Table is sorted by Name in ascending order by default
    // and pvcs object is also sorted alphabetically by name
    cy.get(`[data-cy-resource-table-row="Name"]`).each(element => {
      expect(element).to.contain(pvcs[i].name);
      i++;
    });
  });

  it('checks Status icon for all PVCs', function () {
    cy.visit('/');
    cy.wait([
      '@mockDashboardRequest',
      '@mockNamespacesRequest',
      '@mockPVCsRequest',
    ]);

    let i = 0;
    const pvcs = this.pvcsRequest.pvcs;
    cy.get('[data-cy-resource-table-row="Status"]').each(element => {
      if (pvcs[i].status.phase === STATUS_TYPE.READY) {
        cy.wrap(element)
          .find('lib-status-icon>mat-icon')
          .should('contain', 'check_circle');
      } else if (pvcs[i].status.phase === STATUS_TYPE.UNAVAILABLE) {
        cy.wrap(element)
          .find('lib-status-icon>mat-icon')
          .should('contain', 'timelapse');
      } else if (pvcs[i].status.phase === STATUS_TYPE.WARNING) {
        cy.wrap(element)
          .find('lib-status-icon>mat-icon')
          .should('contain', 'warning');
      } else if (
        pvcs[i].status.phase === STATUS_TYPE.WAITING ||
        pvcs[i].status.phase === STATUS_TYPE.TERMINATING
      ) {
        cy.wrap(element).find('mat-spinner').should('exist');
      }
      i++;
    });
  });
});

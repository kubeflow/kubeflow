import { STATUS_TYPE } from 'kubeflow';

describe('+New Tensorboard form dialog', () => {
  beforeEach(() => {
    cy.mockDashboardRequest();
    cy.mockNamespacesRequest();
    cy.fixture('settings').then(settings => {
      cy.mockTensorboardsRequest(settings.namespace);
    });
    cy.fixture('tensorboards').as('tbsRequest');
  });

  // tslint:disable-next-line: space-before-function-paren
  it('renders every tensorboard name into the table', function () {
    cy.visit('/');
    cy.wait([
      '@mockDashboardRequest',
      '@mockNamespacesRequest',
      '@mockTensorboardsRequest',
    ]);

    let i = 0;
    const tbs = this.tbsRequest.tensorboards;
    // Table is sorted by Name in ascending order by default
    // and tensorboards object is also sorted alphabetically by name
    cy.get(`[data-cy-resource-table-row="Name"]`).each(element => {
      expect(element).to.contain(tbs[i].name);
      i++;
    });
  });

  // tslint:disable-next-line: space-before-function-paren
  it('renders correctly Status icon for every tensorboard', function () {
    cy.visit('/');
    cy.wait([
      '@mockDashboardRequest',
      '@mockNamespacesRequest',
      '@mockTensorboardsRequest',
    ]);

    let i = 0;
    const tbs = this.tbsRequest.tensorboards;
    cy.get('[data-cy-resource-table-row="Status"]').each(element => {
      if (tbs[i].status.phase === STATUS_TYPE.READY) {
        cy.wrap(element)
          .find('lib-status-icon>mat-icon')
          .should('contain', 'check_circle');
      } else if (tbs[i].status.phase === STATUS_TYPE.UNAVAILABLE) {
        cy.wrap(element)
          .find('lib-status-icon>mat-icon')
          .should('contain', 'timelapse');
      } else if (tbs[i].status.phase === STATUS_TYPE.WARNING) {
        cy.wrap(element)
          .find('lib-status-icon>mat-icon')
          .should('contain', 'warning');
      } else if (
        tbs[i].status.phase === STATUS_TYPE.WAITING ||
        tbs[i].status.phase === STATUS_TYPE.TERMINATING
      ) {
        cy.wrap(element).find('mat-spinner').should('exist');
      }
      i++;
    });
  });

  // tslint:disable-next-line: space-before-function-paren quotemark
  it("disables CONNECT button when tensorboard's status not ready", function () {
    cy.visit('/');
    cy.wait([
      '@mockDashboardRequest',
      '@mockNamespacesRequest',
      '@mockTensorboardsRequest',
    ]);

    let i = 0;
    const tbs = this.tbsRequest.tensorboards;
    cy.get('[data-cy-resource-table-row="actions"]').each(element => {
      if (tbs[i].status.phase === STATUS_TYPE.READY) {
        cy.wrap(element)
          .find('[data-cy-resource-table-action-button="connect"]>button')
          .should('not.have.attr', 'disabled');
      } else {
        cy.wrap(element)
          .find('[data-cy-resource-table-action-button="connect"]>button')
          .should('have.attr', 'disabled');
      }
      i++;
    });
  });
});

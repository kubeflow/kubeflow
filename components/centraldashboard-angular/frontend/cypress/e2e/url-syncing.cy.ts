describe('Browser and Iframe URL syncing', () => {
  beforeEach(() => {
    cy.notebooksRequest();
    cy.mockPodDefaultsRequest();
    cy.mockDashboardLinksRequest();
    cy.mockEnvInfoRequest();
  });

  it('checks the URLs when the user navigates to pages inside the same WA', () => {
    cy.storageClassRequest();
    cy.notebookPodRequest();
    cy.visit('/');

    cy.get('[data-cy-sidenav-menu-item="Notebooks"]')
      .should('be.visible')
      .click();
    cy.getIframeBody().find('button').contains('New Notebook').click();
    cy.wait('@storageClassRequest');
    cy.equalUrls();

    cy.getIframeBody().find('button').contains('keyboard_backspace').click();
    cy.wait('@notebooksRequest', { timeout: 10000 });
    cy.equalUrls();

    cy.wait('@notebooksRequest');
    cy.getIframeBody()
      .find('[data-cy-resource-table-row="Name"]')
      .contains('test-notebook')
      .click();
    cy.wait('@notebookPodRequest');
    cy.equalUrls();
  });

  it('checks the URLs when the user navigates to the corresponding PVC from JWA details page', () => {
    cy.pvcPodsRequest();
    cy.pvcRequest();
    cy.notebookPodRequest();
    cy.visit('/');

    cy.get('[data-cy-sidenav-menu-item="Notebooks"]')
      .should('be.visible')
      .click();

    cy.wait('@notebooksRequest', { timeout: 10000 });
    cy.getIframeBody()
      .find('[data-cy-resource-table-row="Name"]')
      .contains('test-notebook')
      .click();
    cy.getIframeBody().find('.lib-link').contains('test-notebook').click();
    cy.wait('@pvcRequest');
    cy.equalUrls();

    // We should wait for the app to load the Volume
    // details page before clicking on a link again
    cy.wait('@pvcPodsRequest', { timeout: 10000 });
    cy.getIframeBody().as('iframeBody');
    cy.get('@iframeBody').find('.lib-link').contains('test-notebook').click();

    cy.wait('@notebookPodRequest');
    cy.equalUrls();
  });

  it('checks the URLs when the user triggers an update in the query parameters of the current URL', () => {
    cy.notebookPodRequest();
    cy.visit('/');

    cy.get('[data-cy-sidenav-menu-item="Notebooks"]')
      .should('be.visible')
      .click();

    cy.wait('@notebooksRequest', { timeout: 10000 });
    cy.getIframeBody()
      .find('[data-cy-resource-table-row="Name"]')
      .contains('test-notebook')
      .click();
    cy.wait('@notebookPodRequest');
    cy.equalUrls();

    cy.getIframeBody().contains('LOGS').click();
    cy.equalUrls();
    cy.getIframeBody().contains('YAML').click();
    cy.equalUrls();
    cy.getIframeBody().contains('EVENTS').click();
    cy.equalUrls();
  });
});

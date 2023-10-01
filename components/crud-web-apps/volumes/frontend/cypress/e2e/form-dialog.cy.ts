describe('+New volume form dialog', () => {
  beforeEach(() => {
    cy.mockDashboardRequest();
    cy.mockNamespacesRequest();
    cy.fixture('settings').then(settings => {
      cy.mockEmptyPVCsRequest(settings.namespace);
    });
    cy.mockStorageClassesRequests();
    cy.mockDefaultStorageClassRequest('standard');
  });

  it('should have proper values in the form dialog', () => {
    cy.visit('/');
    cy.wait([
      '@mockDashboardRequest',
      '@mockNamespacesRequest',
      '@mockEmptyPVCsRequest',
    ]);

    cy.get('[data-cy-toolbar-button="New Volume"]')
      .should('be.visible')
      .click();
    cy.wait('@mockDefaultStorageClassRequest');

    // Should have a "New volume" title
    cy.get('[data-cy-form-section-header]')
      .contains('New Volume')
      .should('be.visible');

    // Should have storage class 'standard'
    cy.get('[data-cy-form-control-name-class]')
      .contains('standard')
      .should('be.visible');

    // CREATE button should be disabled when name is empty and
    // enabled when not
    cy.get('[data-cy-button-create]').should('be.disabled');
    cy.get('[data-cy-form-control-name]')
      .should('be.visible')
      .type('new-test-volume');
    cy.get('[data-cy-button-create]').should('not.be.disabled');
  });
});

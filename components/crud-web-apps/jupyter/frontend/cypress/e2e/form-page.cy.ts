describe('New notebook form', () => {
  beforeEach(() => {
    cy.mockDashboardRequest();
    cy.mockStorageClassesRequests();
    cy.mockDefaultStorageClassRequest('rok');
    cy.mockGpusRequest();
    cy.mockConfigRequest();
    cy.fixture('settings').then(settings => {
      cy.mockNotebooksRequest(settings.namespace);
      cy.mockPoddefaultsRequest(settings.namespace);
    });
  });

  it('should have a "New notebook" title', () => {
    cy.visit('/new');
    cy.get('[data-cy-toolbar-title]').contains('New notebook').should('exist');
  });

  it('should auto update mount value when name change', () => {
    cy.get('[data-cy="add new volume"]').click();

    cy.get('.last[data-cy="data volumes"]').click();

    cy.get('.last[data-cy="data volumes"]')
      .find('[data-cy="volume name input"]')
      .type('new-volume-name')
      .then($nameInput => {
        const nameValue = $nameInput.val();
        cy.get('.last[data-cy="data volumes"]')
          .find('[data-cy="mount path"]')
          .should($mountInput => {
            const mountValue = $mountInput.val();
            expect(mountValue).equal(`/home/jovyan/${nameValue}`);
          });
      });
  });

  it('should not auto update mount value when it is dirty', () => {
    cy.get('[data-cy="add new volume"]').click();

    cy.get('.last[data-cy="data volumes"]').click();

    cy.get('.last[data-cy="data volumes"]')
      .find('[data-cy="mount path"]')
      .type('dirty');

    cy.get('.last[data-cy="data volumes"]')
      .find('[data-cy="volume name input"]')
      .type('new-volume-name')
      .then($nameInput => {
        const nameValue = $nameInput.val();
        cy.get('.last[data-cy="data volumes"]')
          .find('[data-cy="mount path"]')
          .should($mountInput => {
            const mountValue = $mountInput.val();
            expect(mountValue).not.equal(`/home/jovyan/${nameValue}`);
          });
      });
  });
});

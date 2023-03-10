describe('New notebook form', () => {
  beforeEach(() => {
    cy.mockDashboardRequest();
    cy.mockStorageClassesRequests();
    cy.mockDefaultStorageClassRequest('standard');
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

  it('should update panel header name according to the name input field', () => {
    cy.visit('/new');

    cy.get('[data-cy="workspace volume"]').click();

    cy.get('[data-cy="volume name input"]').clear().type('test');

    cy.get('[data-cy="volume name header"]').contains('test');
  });

  it('should update name input field according to the ConfigMap', () => {
    cy.visit('/new');
    cy.wait(['@mockConfigRequest']);

    cy.get('[data-cy="workspace volume"]').click();

    cy.get('[data-cy="volume name input"]').should($nameInput => {
      const nameValue = $nameInput.val();
      // '{notebook-name}-workspace' is the name value of the config fixture
      expect(nameValue).equal('-workspace');
    });
  });

  it('should update size input field according to the ConfigMap', () => {
    cy.visit('/new');
    cy.wait(['@mockConfigRequest']);

    cy.get('[data-cy="workspace volume"]').click();

    cy.get('[data-cy="size input"]').should($sizeInput => {
      const sizeValue = $sizeInput.val();
      // '20Gi' is the storage value of the config fixture
      expect(sizeValue).equal('20');
    });
  });

  it('should update access mode input field according to the ConfigMap', () => {
    cy.visit('/new');
    cy.wait(['@mockConfigRequest']);

    cy.get('[data-cy="workspace volume"]').click();

    // 'ReadWriteMany' is the accessModes value of the config fixture
    cy.get('[data-cy="ReadWriteMany"]').should(
      'have.class',
      'mat-radio-checked',
    );
  });
});

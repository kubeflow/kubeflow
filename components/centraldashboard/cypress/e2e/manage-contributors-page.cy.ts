describe('Manage contributors page', () => {
  beforeEach(()=>{
    cy.mockWorkgroupRequest();
    cy.mockDashboardLinksRequest();
    cy.mockEnvInfoRequest();
    cy.mockActivitiesRequest('test-namespace');
    cy.mockGetNotebooksRequest('test-namespace');
    cy.mockGetContributorsRequest('test-namespace');
    
    cy.visit('/manage-users');

    cy.wait(['@mockWorkgroupRequest', '@mockDashboardLinksRequest', '@mockEnvInfoRequest', '@mockActivitiesRequest', '@mockGetNotebooksRequest', '@mockGetContributorsRequest']);
  });

  it('should access the manage contributors page', ()=>{
    cy.get('main-page').shadow().find('manage-users-view').should('exist');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('h1').should('have.text', 'Manage Contributors');
    // account info
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('#Main-Content > article.Acct-Info > h2 > span.text').should('have.text', 'Account info');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('#Main-Content > article.Acct-Info > div.content').should('have.text', 'user.name@cloud.statcan.ca');
    // namespaces list
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('#Main-Content > article.Namespaces > h2').should('have.text', 'Namespace memberships');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('#Main-Content > article.Namespaces > div > vaadin-grid').should('exist');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('#Main-Content > article.Namespaces > div > vaadin-grid > vaadin-grid-cell-content:nth-child(11)').should('have.text', 'test-namespace');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('#Main-Content > article.Namespaces > div > vaadin-grid > vaadin-grid-cell-content:nth-child(12)').should('have.text', 'Owner');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('#Main-Content > article.Namespaces > div > vaadin-grid > vaadin-grid-cell-content:nth-child(13)').should('have.text', 'test-namespace-2');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('#Main-Content > article.Namespaces > div > vaadin-grid > vaadin-grid-cell-content:nth-child(14)').should('have.text', 'Contributor');
    // manage contributors input
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('#Main-Content > article.Contributors > manage-users-view-contributor').should('exist');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('h2').should('have.text', 'Contributors to your namespace - test-namespace');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input > div.prefix > paper-chip').should('have.length', 2);
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input > div.prefix > paper-chip').eq(0).should('have.text', 'user.name@cloud.ca');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input > div.prefix > paper-chip').eq(1).should('have.text', 'first.last@domain.com');
  });

  it('should add contributors', ()=>{
    cy.intercept('POST', '/api/workgroup/add-contributor/test-namespace', {
      statusCode: 400,
      body: {
        error: "Contributor doesn't look like a valid email address"
      }
    }).as('mockAddContributorRequest');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input').shadow().find('input').type('a{enter}');
    cy.wait('@mockAddContributorRequest');

    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input').should('have.attr', 'has-error');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input').shadow().find('aside.Error').should('exist').and('have.text', 'An error occured while trying to add the email. Please make check the email format and make sure there are no duplicates in this namespace.');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input').shadow().find('input').type('{backspace}', {force: true});
    
    cy.intercept('POST', '/api/workgroup/add-contributor/test-namespace', 
      ["user.name@cloud.ca", "first.last@domain.com", "new.user@domain.gc"]
    ).as('mockAddContributorRequest');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input').shadow().find('input').type('new.user@domain.gc{enter}');
    cy.wait('@mockAddContributorRequest');

    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input > div.prefix > paper-chip').should('have.length', 3);
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input > div.prefix > paper-chip').eq(0).should('have.text', 'user.name@cloud.ca');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input > div.prefix > paper-chip').eq(1).should('have.text', 'first.last@domain.com');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input > div.prefix > paper-chip').eq(2).should('have.text', 'new.user@domain.gc');
    // test duplicate values
    cy.intercept('POST', '/api/workgroup/add-contributor/test-namespace', {
      statusCode: 403,
      body: {
        error: "rolebindings.rbac.authorization.k8s.io \"user-abc-abc-ca-clusterrole-edit\" already exists"
      }
    }).as('mockAddContributorRequest');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input').shadow().find('input').type('new.user@domain.gc{enter}', {force: true});
    cy.wait('@mockAddContributorRequest');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input').should('have.attr', 'has-error');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input').shadow().find('aside.Error').should('exist').and('have.text', 'An error occured while trying to add the email. Please make check the email format and make sure there are no duplicates in this namespace.');
  });

  it('should remove contributors', ()=>{
    cy.intercept('DELETE', '/api/workgroup/remove-contributor/test-namespace', 
      ["first.last@domain.com"]
    ).as('mockRemoveContributorRequest');
    
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input > div.prefix > paper-chip').eq(0).shadow().find('paper-icon-button').click();
    cy.wait('@mockRemoveContributorRequest');
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input > div.prefix > paper-chip').should('have.length', 1);
    cy.get('main-page').shadow().find('manage-users-view').shadow().find('manage-users-view-contributor').shadow().find('md2-input > div.prefix > paper-chip').eq(0).should('have.text', 'first.last@domain.com');
  });
});
describe('Main Page spec', () => {
  it('should access kubeflow', () => {
    cy.mockWorkgroupRequest();
    cy.mockDashboardLinksRequest();
    cy.mockEnvInfoRequest();

    
    cy.visit('/');
    
    cy.wait('@mockWorkgroupRequest');
    cy.wait('@mockDashboardLinksRequest');
    cy.wait('@mockEnvInfoRequest');
    cy.get('main-page').should('exist');
    cy.get('main-page').shadow().find('dashboard-view').should('exist');
  })
})
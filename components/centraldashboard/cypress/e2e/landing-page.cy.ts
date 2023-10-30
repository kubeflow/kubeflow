describe('Landing Page', () => {
  beforeEach(()=>{
    cy.mockDashboardLinksRequest();
    cy.intercept('GET', `/api/workgroup/exists`, {
      "hasAuth":true,
      "user":"user.name",
      "hasWorkgroup":false,
      "registrationFlowAllowed":true
    }).as('mockWorkgroupRequest');

    cy.visit('/');

    cy.wait(['@mockWorkgroupRequest', '@mockDashboardLinksRequest']);
  });

  it('should access the landing page', ()=>{
    cy.get('main-page').shadow().find('landing-page').should('exist');
    cy.get('main-page').shadow().find('landing-page').shadow().find('#MainCard > neon-animatable > h2').should('have.text', 'Welcome');
    cy.get('main-page').shadow().find('landing-page').shadow().find('#MainCard > neon-animatable > aside').should('have.text', 'It seems like you have not been assigned to a workspace, please refer to your project owner or join us on our Slack support channel at https://statcan-aaw.slack.com');
    cy.get('main-page').shadow().find('landing-page').shadow().find('#MainCard > neon-animatable > aside').find('a').should('exist').and('have.prop', 'href', 'https://statcan-aaw.slack.com/');
  });
});
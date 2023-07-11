import './commands';

// types of the custom commands
// Must be declared global to be detected by typescript (allows import/export)
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to mock request at '/dashboard_lib.bundle.js'
       * that causes tests to fail: @example cy.mockDashboardRequest()
       */
      mockDashboardRequest(): Chainable<void>;

      /**
       * Custom command to mock request at '/api/namespaces'
       * @example cy.mockNamespacesRequest()
       */
      mockNamespacesRequest(): Chainable<void>;

      /**
       * Custom command to mock requests at
       *  - '/api/storageclasses'
       * @example cy.mockStorageClassesRequests()
       */
      mockStorageClassesRequests(): Chainable<void>;

      /**
       * Custom command to mock requests at - '/api/storageclasses/default'
       * and returns parameter defaultStorageClass
       * @example cy.mockStorageClassesRequests()
       */
      mockDefaultStorageClassRequest(
        defaultStorageClass: string,
      ): Chainable<void>;

      /**
       * Custom command to mock request at '/api/namespaces/<namespace>/pvcs'
       * and returns emtpy array []
       * @example cy.mockEmptyPVCsRequest()
       */
      mockEmptyPVCsRequest(namespace: string): Chainable<void>;

      /**
       * Custom command to mock request at '/api/namespaces/<namespace>/pvcs'
       * and returns array with mock PVCs []
       * @example cy.mockPVCsRequest()
       */
      mockPVCsRequest(namespace: string): Chainable<void>;
    }
  }
}

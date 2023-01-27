import './commands';

// types of the custom commands
// Must be declared global to be detected by typescript (allows import/export)
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to mock request at '/dashboard_lib.bundle.js'
       */
      mockDashboardRequest(): Chainable<void>;

      /**
       * Custom command to mock request at '/api/namespaces'
       */
      mockNamespacesRequest(): Chainable<void>;

      /**
       * Custom command to mock request at '/api/namespaces/<namespace>/tensorboards'
       * and returns emtpy array []
       */
      mockEmptyTensorboardsRequest(namespace: string): Chainable<void>;

      /**
       * Custom command to mock request at '/api/namespaces/<namespace>/tensorboards'
       * and returns array with mock tensorboards []
       */
      mockTensorboardsRequest(namespace: string): Chainable<void>;
    }
  }
}

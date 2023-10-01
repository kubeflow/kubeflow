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
       * Custom command to select all-namespaces option from the dropdown
       */
      selectAllNamespaces(): Chainable;

      /**
       * Custom command to mock request at '/api/namespaces'
       */
      mockNamespacesRequest(): Chainable<void>;

      /**
       * Custom command to mock request at '/api/namespaces/<namespace>/notebooks'
       * and returns array with mock notebooks []
       */
      mockNotebooksRequest(namespace: string): Chainable<void>;

      /**
       * Custom command to mock request at '/api/namespaces/<namespace>/notebooks'
       * for each namespace of namespaces fixture and returns array with mock notebooks []
       */
      mockNotebooksAllNamespacesRequest(namespace: string): Chainable<void>;

      /**
       * Custom command to mock requests at '/api/storageclasses'
       */
      mockStorageClassesRequests(): Chainable<void>;

      /**
       * Custom command to mock requests at '/api/storageclasses/default'
       * and returns parameter defaultStorageClass
       */
      mockDefaultStorageClassRequest(
        defaultStorageClass: string,
      ): Chainable<void>;

      /**
       * Custom command to mock requests at '/api/gpus'
       * and returns an object with empty vendors list [].
       */
      mockGpusRequest(): Chainable<void>;

      /**
       * Custom command to mock requests at '/api/config'
       */
      mockConfigRequest(): Chainable<void>;

      /**
       * Custom command to mock request at '/api/namespaces/<namespace>/poddefaults'
       * and returns array with mock poddefaults []
       */
      mockPoddefaultsRequest(namespace: string): Chainable<void>;
    }
  }
}

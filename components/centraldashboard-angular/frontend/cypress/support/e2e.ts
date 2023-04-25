import './commands';

// types of the custom commands
// Must be declared global to be detected by typescript (allows import/export)

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command that returns Iframe's #document's body
       */
      getIframeBody(): Chainable<any>;

      /**
       * Custom command that returns Iframe's URL
       */
      getIframeUrl(): Chainable<string>;

      /**
       * Custom command that checks if Browser's and Iframe's URLs
       * are equal (as well their query parameters)
       */
      equalUrls(): Chainable<boolean>;

      /**
       * Custom command that intercepts the storage class request
       */
      storageClassRequest(): Chainable<void>;

      /**
       * Custom command that intercepts the notebooks request
       */
      notebooksRequest(): Chainable<void>;

      /**
       * Custom command that mocks pod defaults request
       */
      mockPodDefaultsRequest(): Chainable<void>;

      /**
       * Custom command that intercepts the test PVC request
       */
      pvcRequest(): Chainable<void>;

      /**
       * Custom command that intercepts the test PVC's pods request
       */
      pvcPodsRequest(): Chainable<void>;

      /**
       * Custom command that intercepts the test notebook's
       * underlying pod request
       */
      notebookPodRequest(): Chainable<void>;

      /**
       * Custom command that mocks Dashboard links request
       */
      mockDashboardLinksRequest(): Chainable<void>;

      /**
       * Custom command that mocks Env Info request
       */
      mockEnvInfoRequest(): Chainable<void>;

      /*
       * Saves namespace in browser's local storage
       */
      setNamespaceInLocalStorage(namespace: string): Chainable<void>;
    }
  }
}

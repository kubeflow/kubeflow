// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to mock request at '/api/workgroup/exists'
       * and returns object with mock workgroup
       */
      mockWorkgroupRequest(): Chainable<void>;

      /**
       * Custom command to mock request at '/api/workgroup/dashboard-links'
       * and returns object with mock dashboard-links
       */
      mockDashboardLinksRequest(): Chainable<void>;

      /**
       * Custom command to mock request at '/api/workgroup/env-info'
       * and returns object with mock env-info
       */
      mockEnvInfoRequest(): Chainable<void>;

      /**
       * Custom command to mock request at '/api/activities/<namespace>'
       * and returns object with mock activities for the given namespace
       */
      mockActivitiesRequest(namespace: string): Chainable<void>;

      /**
       * Custom command to mock request at '/jupyter/api/namespaces/<namespace>/notebooks'
       * and returns an object with a mock array of notebooks for the given namespace
       */
      mockGetNotebooksRequest(namespace: string): Chainable<void>;
      
      /**
       * Custom command to mock request at '/api/workgroup/get-contributors/<namespace>'
       * and returns an object with a mock list of contributor objects for the given namespace
       */
      mockGetContributorsRequest(namespace: string): Chainable<void>;

      /**
       * Custom command to mock request at '/notebook/<namespace>/a-dog-breed-katib/api/contents'
       * and returns an object with a mock object of contents for the given notebook in the given namespace
       */
      mockNotebookContentsRequest(namespace: string, notebook: string): Chainable<void>;
    }
  }
}
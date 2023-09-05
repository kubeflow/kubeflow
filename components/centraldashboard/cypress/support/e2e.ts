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
    }
  }
}
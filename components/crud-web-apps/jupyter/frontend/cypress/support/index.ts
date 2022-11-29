import './handlers';
import './commands';

// types of the custom commands
// Must be declared global to be detected by typescript (allows import/export)
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select a Namespace in the main page from the dropdown
       * @param ns The namespace to select from the dropdown
       */
      selectNamespace(ns: string): Chainable;

      /**
       * Custom command to select all-namespaces option from the dropdown
       */
      selectAllNamespaces(): Chainable;

      /**
       * Custom command to create a Notebook with random suffixed name
       */
      createNotebook(): Chainable;
    }
  }
}

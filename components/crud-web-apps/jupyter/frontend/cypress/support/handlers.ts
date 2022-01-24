Cypress.on('uncaught:exception', (err, runnable) => {
  // if testing the app locally, the backend server will return
  // index.html back for the dashboard_lib.bundle.js
  if (err.message.includes("Unexpected token '<'")) {
    return false;
  }

  return true;
});

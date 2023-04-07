// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000',
  resource: 'notebooks',
  ui: 'default',
  jupyterlabLogo: 'static/assets/logos/jupyterlab-logo.svg',
  jupyterIcon: 'static/assets/logos/jupyter-icon.svg',
  groupOneLogo: 'static/assets/logos/group-one-logo.svg',
  groupOneIcon: 'static/assets/logos/group-one-icon.svg',
  groupTwoLogo: 'static/assets/logos/group-two-logo.svg',
  groupTwoIcon: 'static/assets/logos/group-two-icon.svg',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

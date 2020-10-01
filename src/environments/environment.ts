import { CDN_BASE_URL } from 'src/app/core/consts/cdn.consts';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { firebaseConfig } from 'src/app/core/consts/firebase.consts';

export const environment = {
  production: false,
  firebase: firebaseConfig,
  cdnBaseUrl: CDN_BASE_URL,

  // Bluey API URL (TODO: Dev/Prod environments)
  // apiBaseUrl: 'https://api.blueyshop.com:3000',
  apiBaseUrl: 'http://localhost:3000',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

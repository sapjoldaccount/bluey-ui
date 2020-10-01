import { CDN_BASE_URL } from 'src/app/core/consts/cdn.consts';
import { firebaseConfig } from 'src/app/core/consts/firebase.consts';

export const environment = {
  production: true,
  firebase: firebaseConfig,
  cdnBaseUrl: CDN_BASE_URL,

  // Bluey API URL (TODO: Dev/Prod environments)
  apiBaseUrl: 'https://api.blueyshop.com:3000',
};

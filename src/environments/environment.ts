import { CDN_BASE_URL } from 'src/app/core/consts/cdn.consts';
import { firebaseConfig } from 'src/app/core/consts/firebase.consts';

export const environment = {
  production: false,
  firebase: firebaseConfig,
  cdnBaseUrl: CDN_BASE_URL,
  awsUrl:
    'https://aa02894q8a.execute-api.us-east-1.amazonaws.com/contact/submit',

  // Bluey API URL (TODO: Dev/Prod environments)
  // apiBaseUrl: 'https://api.blueyshop.com:3000',
  apiBaseUrl: 'http://localhost:3000',
};

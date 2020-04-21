// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl : 'http://localhost:3000/api',
  firebase: {
    apiKey: 'AIzaSyCidkPqMo4W1xufphNIuchcBrvZiCEi9t0',
    authDomain: 'raven-5f369.firebaseapp.com',
    databaseURL: '<your-database-URL>',
    projectId: 'raven-5f369',
    storageBucket: 'raven-5f369.appspot.com',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

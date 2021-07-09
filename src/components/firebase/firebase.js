// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.7.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.7.0/firebase-analytics.js"></script>


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  import firebase from "firebase";
  var firebaseConfig = {
    apiKey: "AIzaSyB4egRFYKYjkcerDLaTDqcV_KhrJC6jiz0",
    authDomain: "fabromall.firebaseapp.com",
    projectId: "fabromall",
    storageBucket: "fabromall.appspot.com",
    messagingSenderId: "413772096479",
    appId: "1:413772096479:web:c0d4514dfe3a64e6a09a6a",
    measurementId: "G-E4GBV9BQT3"
  };
  // Initialize Firebase


  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export const database=firebase



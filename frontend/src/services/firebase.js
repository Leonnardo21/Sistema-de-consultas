import firebase from 'firebase/app';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDKdOW_2GaCLIzxMPonUTGYBE8QdqNlPdA",
    authDomain: "healthsystem-b2384.firebaseapp.com",
    projectId: "healthsystem-b2384",
    storageBucket: "healthsystem-b2384.appspot.com",
    messagingSenderId: "1042277533331",
    appId: "1:1042277533331:web:a702db22ae957548f8ef66"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  export { firebase, auth, app };

  
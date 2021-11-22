import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const clientCredentials = {
  apiKey: "AIzaSyDoGnIqaMYei5UL2lvoQQG6txOftOMcJR0",
  authDomain: "engage-58236.firebaseapp.com",
  projectId: "engage-58236",
  storageBucket: "engage-58236.appspot.com",
  messagingSenderId: "372096462843",
  appId: "1:372096462843:web:5acc2bd29f6ab38aaee55e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
  // firebase.analytics();
}

export default firebase;

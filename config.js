import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC4hpSGDwRqNMfokBoaEvbo5x24qYcrxXU",
  authDomain: "attendance-register-5e4a0.firebaseapp.com",
  databaseURL: "https://attendance-register-5e4a0-default-rtdb.firebaseio.com",
  projectId: "attendance-register-5e4a0",
  storageBucket: "attendance-register-5e4a0.appspot.com",
  messagingSenderId: "142911687314",
  appId: "1:142911687314:web:b1ca1323bab5a16329744b",
  measurementId: "G-K5ZXQEEFH3"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.database();

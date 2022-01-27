// Import the functions you need from the SDKs you need
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQI_wxv-BeCDQUXVOiQdf1gJWM_obJtqQ",
  authDomain: "codestats-23905.firebaseapp.com",
  projectId: "codestats-23905",
  storageBucket: "codestats-23905.appspot.com",
  messagingSenderId: "49046516128",
  appId: "1:49046516128:web:0f604a76c5b7f76510b4c5",
  measurementId: "G-Z5WJ6Z2LZ8"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
// firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();

export default firebase;
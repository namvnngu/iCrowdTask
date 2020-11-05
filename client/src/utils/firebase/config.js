import * as firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBU0iH9QH2SAIMBX6a1azEfcJYjxmsJIGo",
  authDomain: "icrowdtaskid-63e5d.firebaseapp.com",
  databaseURL: "https://icrowdtaskid-63e5d.firebaseio.com",
  projectId: "icrowdtaskid-63e5d",
  storageBucket: "icrowdtaskid-63e5d.appspot.com",
  messagingSenderId: "488953248441",
  appId: "1:488953248441:web:a4268bbcf162aeda90f968",
  measurementId: "G-E601ZY6SV0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const fireStorage = firebase.storage();
const firestore = firebase.firestore();

export { fireStorage, firestore };

import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCET09inmK1TAIXjf0mySI1VWZCQDWkpis",
  authDomain: "icrowdtaskid.firebaseapp.com",
  databaseURL: "https://icrowdtaskid.firebaseio.com",
  projectId: "icrowdtaskid",
  storageBucket: "icrowdtaskid.appspot.com",
  messagingSenderId: "996818655324",
  appId: "1:996818655324:web:394d197857095bf4ae6e99",
  measurementId: "G-HEPK08DVFS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firestore = firebase.firestore();

export { storage, firestore };

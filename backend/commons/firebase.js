const firebase = require('firebase/app');
require('firebase/storage');
// import firebase from 'firebase/app';
// import 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyARoFsZnLBrzWdog80PaNOcQ11dH9joE3A',
  authDomain: 'e-commerce-123456.firebaseapp.com',
  projectId: 'e-commerce-123456',
  storageBucket: 'e-commerce-123456.appspot.com',
  messagingSenderId: '375088733411',
  appId: '1:375088733411:web:bb20597faab081d423b9d6',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();


module.exports = { storage, firebase };

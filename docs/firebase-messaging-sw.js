importScripts("https://www.gstatic.com/firebasejs/8.2.6/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.6/firebase-messaging.js");


firebase.initializeApp(
  {
    apiKey: "AIzaSyCICLuGzdDFivj6Yxpqywlt88eP4Y7I5yk",
    authDomain: "sas-pro.firebaseapp.com",
    databaseURL: "https://sas-pro-default-rtdb.firebaseio.com",
    projectId: "sas-pro",
    storageBucket: "sas-pro.appspot.com",
    messagingSenderId: "1085941653194",
    appId: "1:1085941653194:web:923593dd126a73734fde33",
    measurementId: "G-8NVDTL9JNG"
  }
)
const messaging = firebase.messaging();

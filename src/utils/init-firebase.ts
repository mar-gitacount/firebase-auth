import { initializeApp } from 'firebase/app';
import { getAuth, browserSessionPersistence } from 'firebase/auth';

// FirebaseApp初期化
// initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });

initializeApp({
  apiKey: "AIzaSyC4OJY74U4sMMA5l_DeawKDQM4RiSXYYWA",
  authDomain:"dog-note.firebaseapp.com",
  projectId: "dog-note",
  storageBucket: "dog-note.appspot.com",
  messagingSenderId: "359892341915",
  appId: "1:359892341915:web:2c0b5a3e93cbf86f6c623e",
});



console.log(process.env.REACT_APP_AUTH_PERSISIT);
const persisit = process.env.REACT_APP_AUTH_PERSISIT ?? '0';

if (persisit === '0') {
  // ログインを継続しない
  getAuth().setPersistence(browserSessionPersistence);
}

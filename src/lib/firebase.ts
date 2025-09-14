
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "studio-9057087504-c0bb3",
  "appId": "1:564574159159:web:d9eb6097ce9f57babc5ab2",
  "storageBucket": "studio-9057087504-c0bb3.firebasestorage.app",
  "apiKey": "AIzaSyDlqPdsfd_Unq4zk-pf_0AJCDdKxDCNuao",
  "authDomain": "studio-9057087504-c0bb3.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "564574159159"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { app, db };

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'BfE8y8N3AcFuenV3iF2f',
  authDomain: 'examenreact.firebaseapp.com',
  projectId: 'test-f5203',
  storageBucket: 'test-f5203.appspot.com',
  messagingSenderId: '950303591380',
  appId: '1:950303591380:android:4d8210562c0d5765c1e441',
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export { db };

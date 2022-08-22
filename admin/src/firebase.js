import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyCuS5vhVS-ZmXTVZPjP8p2Q4Hqd-qJiUdk',

  authDomain: 'nock-attendance-app.firebaseapp.com',

  projectId: 'nock-attendance-app',

  storageBucket: 'nock-attendance-app.appspot.com',

  messagingSenderId: '936031502862',

  appId: '1:936031502862:web:ebca363c7477eb908a725f'
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }

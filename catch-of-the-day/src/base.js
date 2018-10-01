import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAayeGp4CxY-yxy7FJ8sErBvivIMdSpIbI',
  authDomain: 'catch-of-the-day-ashwins93.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-ashwins93.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;

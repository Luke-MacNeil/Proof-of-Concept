// import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// import { environment  } from '../../environments/environment';

app.initializeApp(environment.firebaseConfig);

//AUTHENTICATION
export const authRef = app.auth();
export const provider = new app.auth.GoogleAuthProvider();
export const emailProvider = app.auth.EmailAuthProvider;

//DATABASE REFERENCES
export const databaseRef = app.database().ref();

//STORAGE REFERENCE
export const storage = app.storage();
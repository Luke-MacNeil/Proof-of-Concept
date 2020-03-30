// import { Router } from '@angular/router';
// import { Injectable } from '@angular/core';
// // import { authRef } from '../../config/firebase.js';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(
//     private router: Router
//   ) {}

//   /**
//    * Login using the form
//    */
//   logIn = (formValues) => async () => {

//     const signInSuccess = await authRef.signInWithEmailAndPassword(formValues.email, formValues.password);

//     // if the user authenticated
//     if (signInSuccess) {

//       // Redirecting the user
//       this.router.navigate(['/home'], { replaceUrl: true });

//       // If the user is able to sign in with valid credentials, and
//       // their account wasn't suspended.
//       return new Promise((resolve) => {
//         resolve('succeeded');
//       });
//     } else {
//       // If the user failed to sign in
//       return new Promise((resolve) => {
//           resolve('invalid');
//       });
//     }
//   }
// }

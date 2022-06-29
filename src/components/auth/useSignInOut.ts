import React, {useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

function useSignInOut() {
  const [error, setError] =
    React.useState<FirebaseAuthTypes.NativeFirebaseAuthError | null>(null);

  function handleSignIn(email: string, password: string) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log({user});
      })
      .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
        setError(error);
      });
  }

  function handleSignOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return {
    handleSignIn,
    handleSignOut,
    error,
  };
}

export default useSignInOut;

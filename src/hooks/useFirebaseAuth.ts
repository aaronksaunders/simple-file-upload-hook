import { useState, useEffect } from "react";
import firebase from "firebase";

var firebaseConfig = {
  // ADD YOUR FIREBASE CONFIGURATION
  apiKey: "AIzaSyAlTTdjRdmEt_UCHgqY7W4CiRNTht-Mv0M",
  authDomain: "vueclass-106b7.firebaseapp.com",
  databaseURL: "https://vueclass-106b7.firebaseio.com",
  projectId: "vueclass-106b7",
  storageBucket: "vueclass-106b7.appspot.com",
  messagingSenderId: "800099862302",
  appId: "1:800099862302:web:645135db6c9b16f899ab0f"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// defining types...

function FirebaseAuthHook(): [
  {
    authCheckDone: boolean;
    isLoading: boolean;
    isError: any;
    authUser: any;
  },
  {
    clearError: Function;
    signInWithEmailAndPassword: Function;
    signOut : Function;
  }
] {
  const [authCheckDone, setAuthCheckDone] = useState(false);
  const [authUser, setAuthUser] = useState<firebase.auth.UserCredential>();

  // if we are loading a file or not
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // if an error happened during the process
  const [isError, setIsError] = useState<any>(false);

  const authCheck = () => {
    if (!authCheckDone) {
      firebase.auth().onAuthStateChanged(user => {
        setAuthCheckDone(true);
        user && console.log(user.email);
      });
    }
  };

  /**
   *
   */
  const signOut = () => {
    setIsLoading(true);
    clearError();
    return firebase
      .auth()
      .signOut()
      .then(
        () => {
          setAuthUser(undefined);
          return true;
        },
        error => setIsError(error)
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  /**
   *
   * @param _e
   * @param _p
   */
  const signInWithEmailAndPassword = (_e: string, _p: string) => {
    setIsLoading(true);
    clearError();
    return firebase
      .auth()
      .signInWithEmailAndPassword(_e, _p)
      .then(
        _user => {
          setAuthUser(_user);
          return _user;
        },
        error => setIsError(error)
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  const clearError = () => {
    setIsError(null);
  };

  // this function will be called when the any properties in the dependency array changes
  useEffect(() => {
    authCheck();
  });

  return [
    {
      authCheckDone,
      isLoading,
      isError,
      authUser
    },
    {
      clearError,
      signInWithEmailAndPassword,
      signOut
    }
  ];
}

export default FirebaseAuthHook;

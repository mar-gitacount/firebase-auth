import React, { VFC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getAuth,
  EmailAuthProvider,
} from 'firebase/auth';
import { auth } from 'firebaseui';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';

const uiConfig: auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
  ],
};

const LoginForm: VFC<{ moveTo?: string }> = ({ moveTo }) => {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  const callbacks: auth.Config['callbacks'] = {
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      const displayName = authResult.user.displayName;
      const uid = authResult.user.uid;
      const db = getFirestore();
      const userdata = {
        username: authResult.user.displayName,
        email: authResult.user.email,
      }
      const userDocRef = doc(db, 'users', uid);
      setDoc(userDocRef, { userdata });
      
      if (moveTo) {
        history.push(moveTo);
      }

      return false;
    },
  };

  return (
    <StyledFirebaseAuth
      firebaseAuth={getAuth()}
      uiConfig={{ ...uiConfig, callbacks }}
    />
  );
};

export default LoginForm;

import { VFC } from 'react';
// import {authtest} from '../firebase';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  EmailAuthProvider,

  // FacebookAuthProvider,
  // GoogleAuthProvider,
  // TwitterAuthProvider,
} from 'firebase/auth';
import { auth } from 'firebaseui';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getFirestore, collection, getDocs, QuerySnapshot, doc, setDoc ,addDoc} from 'firebase/firestore';
import { useState, useEffect } from 'react';
// ログインフォームの設定(メール認証以外にも複数設定可能)
//   複数選択した場合は、ログイン方法の選択画面が表示されます。
const uiConfig: auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    // FacebookAuthProvider.PROVIDER_ID,
    // GoogleAuthProvider.PROVIDER_ID,
    // TwitterAuthProvider.PROVIDER_ID,
  ],
  // signInSuccessUrl:"", リダイレクト(reactアプリのリロード)が発生するため利用しない
};

/**
 * react-firebaseuiを利用したログインフォーム
 */
const LoginForm: VFC<{ moveTo?: string }> = ({ moveTo }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const db = getFirestore();
  //   const usersCollectionRef = collection(db, 'users');
  //   console.log(usersCollectionRef);
  //   getDocs(usersCollectionRef).then((querySnapshot) => {
  //     querySnapshot.docs.forEach((doc) => console.log(doc));
  //   });
  // }, []);



  // signInSuccessUrlを設定すると、リダイレクトが発生してReact自体がリロードしてしまう。
  // ⇒リダイレクト防止のため、navigateで遷移する。
  //   <RequireAuth>で認証のチェックをしている場合は、useAuthState()フックでコンポーネントが切り替わるため、callbackでの切り替え不要(moveToを空白にしておく)
  const callbacks: auth.Config['callbacks'] = {
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      console.log(authResult);
      console.log(authResult.user.displayName);
      //displayNameを取得する
      const displayName = authResult.user.displayName;
      //ユーザーidを取得する。
      const uid = authResult.user.uid;
      // Firestoreのインスタンスを取得
      const db = getFirestore();
      //保存するユーザーデータの設定をする。
      const userdata = {
        username:authResult.user.displayName,
        email:authResult.user.email
      }
      // usersコレクションのドキュメントを参照
      const userDocRef = doc(db, 'users', uid);
      setDoc(userDocRef, { userdata }); // ユーザーデータを保存
      // 新しいユーザーの情報
      // const newUser = {
      //   username: displayName,
      //   email: "aaa@gmail.com",
      //   // 他のユーザー情報を追加...
      // };
      // const docRef = addDoc(collection(db, 'users'), newUser);
      //ユーザーidをdbに保存する処理。
      if (moveTo) {
        navigate(moveTo);

      }

      return false;
    },
  };

  // ログイン画面(react-firebaseui)
  return (

    <StyledFirebaseAuth
      firebaseAuth={getAuth()}

      uiConfig={{ ...uiConfig, callbacks }}
    />
  );
};

export default LoginForm;

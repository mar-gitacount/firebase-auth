import useAuthState from 'hooks/useAuthState';
// import LoginPage from 'pages/LoginPage';
import SignInPage from 'pages/SignIn';

/**
 * 認証が必要なページをラップすることで、認証を強制するコンポーネント
 * ・未ログインの場合、ログインページを先に割り込ませてから該当コンポーネントを表示する。
 */
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isSignedIn, isLoading } = useAuthState();
  if (isLoading) {
    return <></>;
  }
  return isSignedIn ? children : <SignInPage />;
};

export default RequireAuth;

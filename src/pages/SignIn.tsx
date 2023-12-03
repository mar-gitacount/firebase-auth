import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, User, getAuth } from "firebase/auth"; // getAuth をインポート
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase"; // Firebase の設定ファイルを正しくインポート
import { doc, setDoc, getFirestore } from 'firebase/firestore';

const SignIn = () => {  
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const auth = getAuth(); // Firebase Auth を初期化

        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            // ログイン成功時のリダイレクト
      navigate('/private'); // privateページに遷移
        } catch (error) {
            alert("メールアドレスまたはパスワードが間違っています");
        }
    };

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const auth = getAuth(); // Firebase Auth を初期化

        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []); // 空の配列を第2引数に渡して初回のみ実行するよう設定

    return (
        <>
            <h1>ログインページ</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>メールアドレス</label>
                    <input
                        name="email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>パスワード</label>
                    <input
                        name="password"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                </div>
                <button type="submit">ログイン</button>
            </form>
        </>
    );
};

export default SignIn;

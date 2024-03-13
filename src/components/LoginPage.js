// LoginPage.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  const handleLogin = async () => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
      // Вход успешен, переадресация будет обработана в App.js
    } catch (error) {
      console.error("Ошибка входа: ", error);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}

export default LoginPage;

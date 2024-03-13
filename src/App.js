// App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import BoilerConfigurator from "./components/BoilerConfigurator";
import AdminPanel from "./components/AdminPanel";
import LoginPage from "./components/LoginPage";
import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/theme/theme';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Подписываемся на изменения состояния аутентификации
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    // Отписываемся от слушателя при размонтировании компонента
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route exact path="/" element={<BoilerConfigurator />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate replace to="/admin" /> : <LoginPage />
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated ? <AdminPanel /> : <Navigate replace to="/login" />
          }
        />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;

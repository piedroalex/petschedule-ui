// src/App.jsx
import React, { useState, useEffect } from "react";
import { Login } from "./pages/Login";
import { CadastrarTutor } from "./pages/tutores/CadastrarTutor";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  
  const [currentScreen, setCurrentScreen] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedSession = localStorage.getItem("@petschedule:session");
    if (savedSession) {
      setCurrentUser(JSON.parse(savedSession));
      setCurrentScreen("dashboard");
    }
  }, []);

  function handleLoginSuccess(user) {
    setCurrentUser(user);
    setCurrentScreen("dashboard");
  }

  function handleLogout() {
    localStorage.removeItem("@petschedule:session");
    setCurrentUser(null);
    setCurrentScreen("login");
  }

  return (
    <>
      {currentScreen === "login" && (
        <Login
          onNavigateToRegister={() => setCurrentScreen("register")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentScreen === "register" && (
        <CadastrarTutor
          onNavigateToLogin={() => setCurrentScreen("login")}
        />
      )}

      {currentScreen === "dashboard" && (
        <Dashboard
          user={currentUser}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
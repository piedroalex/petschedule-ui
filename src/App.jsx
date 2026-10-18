import { useState, useEffect } from "react";
import { Login } from "./pages/Login";
import { CadastrarTutor } from "./pages/tutores/CadastrarTutor";
import { CadastrarPet } from "./pages/pets/CadastrarPet";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const session = localStorage.getItem("@petschedule:session");
      if (session && session !== "undefined") {
        setUser(JSON.parse(session));
        setCurrentScreen("dashboard");
      }
    } catch (err) {
      localStorage.removeItem("@petschedule:session");
      setCurrentScreen("login");
    }
  }, []);

  function handleLoginSuccess(userData) {
    setUser(userData);
    setCurrentScreen("dashboard");
  }

  function handleLogout() {
    localStorage.removeItem("@petschedule:session");
    setUser(null);
    setCurrentScreen("login");
  }

  return (
    <main>
      {currentScreen === "login" && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onNavigateToRegister={() => setCurrentScreen("register-tutor")}
        />
      )}

      {currentScreen === "register-tutor" && (
        <CadastrarTutor
          onNavigateToLogin={() => setCurrentScreen("login")}
        />
      )}

      {currentScreen === "dashboard" && (
        <Dashboard
          user={user}
          onNavigateToNovoPet={() => setCurrentScreen("register-pet")}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === "register-pet" && (
        <CadastrarPet
          tutorId={user?.id}
          onPetCadastrado={() => setCurrentScreen("dashboard")}
          onVoltar={() => setCurrentScreen("dashboard")}
        />
      )}
    </main>
  );
}
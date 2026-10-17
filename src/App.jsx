import { useState, useEffect } from "react";
import { Login } from "./pages/Login";
import { CadastrarTutor } from "./pages/tutores/CadastrarTutor";
import { CadastrarPet } from "./pages/pets/CadastrarPet";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login"); // 'login' | 'register-tutor' | 'dashboard' | 'register-pet'
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem("@petschedule:session");
    if (session) {
      setUser(JSON.parse(session));
      setCurrentScreen("dashboard");
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
          onNavigateToRegister={() => setCurrentScreen("cadastrar-tutor")}
        />
      )}

      {currentScreen === "cadastrar-tutor" && (
        <CadastrarTutor
          onNavigateToLogin={() => setCurrentScreen("login")}
        />
      )}

      {currentScreen === "dashboard" && (
        <Dashboard
          user={user}
          onNavigateToNovoPet={() => setCurrentScreen("cadastrar-pet")}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === "cadastrar-pet" && (
        <CadastrarPet
          tutorId={user?.id}
          onPetCadastrado={() => setCurrentScreen("dashboard")}
          onVoltar={() => setCurrentScreen("dashboard")}
        />
      )}
    </main>
  );
}
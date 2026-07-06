import { Navigate, Route, Routes } from "react-router-dom";
import { useDarkMode } from "./hooks/useDarkMode.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Settings from "./pages/Settings.jsx";
import Saved from "./pages/Saved.jsx";

export default function App() {
  const [dark, toggleTheme] = useDarkMode();

  return (
    <div
      id="top"
      className="min-h-[100dvh] bg-cream text-ink-900 dark:bg-ink-950 dark:text-cream"
    >
      {/* Sentinel for the navbar's scroll-state (IntersectionObserver). */}
      <div id="top-sentinel" aria-hidden className="absolute top-0 h-px w-full" />

      <Navbar dark={dark} onToggleTheme={toggleTheme} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

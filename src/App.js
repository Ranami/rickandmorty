import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { HeroesPage } from "./pages/HeroesPage";
import { SignInPage } from "./pages/SignInPage";
import { Auth } from "./context/Auth";
import { useState } from "react";
import { HeroPage } from "./pages/HeroPage";
import { Counter } from "./pages/Counter";
import { FCounter } from "./pages/FCounter";

function App() {
  const [token, setToken] = useState(localStorage.getItem("idToken"));

  return (
    <Auth.Provider value={{ token, setToken }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={"Home"} />
          <Route path="/heroes" element={<HeroesPage />} />
          <Route path="/heroes/:id" element={<HeroPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/fcounter" element={<FCounter />} />
        </Routes>
      </div>
    </Auth.Provider>
  );
}

export default App;

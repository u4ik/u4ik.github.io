import {  useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Projects, Contact, Resume } from "./pages";
import { Navbar, Sidebar } from "./components";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //     setDarkMode(true);
  //   } else {
  //     setDarkMode(false);
  //   }
  // }, []);

  return (
    <div className="App" data-theme={darkMode ? "dark" : "light"}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>

      <Sidebar />
    </div>
  );
}

export default App;

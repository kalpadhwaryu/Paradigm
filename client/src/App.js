import "./App.css";
import Footer from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import LandingPage from "./pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyProjects from "./pages/MyProjects/MyProjects";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AddProject from "./pages/AddProject/AddProject";
import SingleProject from "./pages/SingleProject/SingleProject";
import { useState } from "react";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/myprojects" element={<MyProjects search={search} />} />
          <Route path="/addproject" element={<AddProject />} />
          <Route path="/project/:id" element={<SingleProject />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

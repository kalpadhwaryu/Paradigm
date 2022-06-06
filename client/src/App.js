import "./App.css";
import Footer from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import LandingPage from "./pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyIdeas from "./pages/MyIdeas/MyIdeas";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AddIdea from "./pages/AddIdea/AddIdea";
import SingleIdea from "./pages/SingleIdea/SingleIdea";
import { useState } from "react";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <Router>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/myideas" element={<MyIdeas search={search} />} />
          <Route path="/addidea" element={<AddIdea />} />
          <Route path="/idea/:id" element={<SingleIdea />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

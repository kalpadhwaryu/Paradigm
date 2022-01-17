import "./App.css";
import Footer from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import LandingPage from "./pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyIdeas from "./pages/MyIdeas/MyIdeas";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/myideas" element={<MyIdeas />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

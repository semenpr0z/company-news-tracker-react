import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Main from "@/pages/Main/Main";
import Rates from "@/pages/Rates";
import Faq from "@/pages/Faq";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/Footer";
import { Auth } from "@/pages/Auth/Auth";
import { useSelector } from "react-redux";
import { Search } from "@/pages/Search/Search";
import { Results } from "@/pages/Results/Results";
import { useEffect } from "react";

const pages = [
  {
    path: "/",
    name: "Главная",
    id: 1,
  },
  {
    path: "/rates",
    name: "Тарифы",
    id: 2,
  },
  {
    path: "/faq",
    name: "FAQ",
    id: 3,
  },
];

function App() {
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !token &&
      (window.location.pathname === "/search" ||
        window.location.pathname === "/results")
    ) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token && window.location.pathname === "/authorization") {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="wrapper">
      <Header pages={pages} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/authorization" element={<Auth />} />
          <Route path="/search" element={<Search />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "@/pages/Main";
import Rates from "@/pages/Rates";
import Faq from "@/pages/Faq";
import { Header } from "@/components/header/header";


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
  return (
    <Router>
      <Header pages={pages} />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

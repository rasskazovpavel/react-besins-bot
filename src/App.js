import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homa from "./pages/Homa/Homa.jsx";
import Green from "./pages/Green/Green.jsx";
import Isa from "./pages/Isa/Isa.jsx";
import Imt from "./pages/Imt/Imt.jsx";
import Hypertens from "./pages/Hypertens/Hypertens.jsx";
import Vteo from "./pages/Vteo/Vteo";
import Calendar from "./pages/Calendar/Calendar";
import Home from "./pages/Home/Home";

import "./App.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/imt" element={<Imt />} />
          <Route path="/homa" element={<Homa />} />
          <Route path="/hypertens" element={<Hypertens />} />
          <Route path="/green" element={<Green />} />
          <Route path="/isa" element={<Isa />} />
          <Route path="/vteo" element={<Vteo />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

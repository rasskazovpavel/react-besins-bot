import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Link to="/imt">IMT</Link>
      <Link to="/homa">HOMA</Link>
      <Link to="/hypertens">Hypertens</Link>
      <Link to="/green">Green</Link>
      <Link to="/isa">ISA</Link>
      <Link to="/vteo">VTEO</Link>
      <Link to="/calendar">Calendar</Link>
    </div>
  );
}

export default Home;

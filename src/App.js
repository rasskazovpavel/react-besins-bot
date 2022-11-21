import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import "./App.css";

const Homa = React.lazy(() => import("./pages/Homa/Homa.jsx"));
const Green = React.lazy(() => import("./pages/Green/Green.jsx"));
const Isa = React.lazy(() => import("./pages/Isa/Isa.jsx"));
const Imt = React.lazy(() => import("./pages/Imt/Imt.jsx"));
const Hypertens = React.lazy(() => import("./pages/Hypertens/Hypertens.jsx"));
const Vteo = React.lazy(() => import("./pages/Vteo/Vteo.jsx"));
const Calendar = React.lazy(() => import("./pages/Calendar/Calendar.jsx"));
const Home = React.lazy(() => import("./pages/Home/Home.jsx"));
const OvulationCalendar = React.lazy(() =>
  import("./pages/OvulationCalendar/OvulationCalendar.jsx")
);

function App() {
  return (
    <div className="app">
      <HashRouter>
        <Routes>
          <Route
            index
            element={
              <React.Suspense fallback={<>...</>}>
                <Home />
              </React.Suspense>
            }
          />
          <Route
            path="ovulation"
            element={
              <React.Suspense fallback={<>...</>}>
                <OvulationCalendar />
              </React.Suspense>
            }
          />
          <Route
            path="imt"
            element={
              <React.Suspense fallback={<>...</>}>
                <Imt />
              </React.Suspense>
            }
          />
          <Route
            path="homa"
            element={
              <React.Suspense fallback={<>...</>}>
                <Homa />
              </React.Suspense>
            }
          />
          <Route
            path="hypertens"
            element={
              <React.Suspense fallback={<>...</>}>
                <Hypertens />
              </React.Suspense>
            }
          />
          <Route
            path="green"
            element={
              <React.Suspense fallback={<>...</>}>
                <Green />
              </React.Suspense>
            }
          />
          <Route
            path="isa"
            element={
              <React.Suspense fallback={<>...</>}>
                <Isa />
              </React.Suspense>
            }
          />
          <Route
            path="vteo"
            element={
              <React.Suspense fallback={<>...</>}>
                <Vteo />
              </React.Suspense>
            }
          />
          <Route
            path="calendar"
            element={
              <React.Suspense fallback={<>...</>}>
                <Calendar />
              </React.Suspense>
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

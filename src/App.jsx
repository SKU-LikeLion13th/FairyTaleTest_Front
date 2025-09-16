import React from "react";
import Start from "./pages/Start";
import Result from "./pages/Result";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CinderellaTest from "./pages/CinderellaMBTITest";
import Loading from "./pages/LoadingPage";
import Team from "./pages/Team";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/result" element={<Result />} />
          <Route path="/cinderella" element={<CinderellaTest />} />
          <Route path="loading" element={<Loading />} />
          <Route path="team" element={<Team />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

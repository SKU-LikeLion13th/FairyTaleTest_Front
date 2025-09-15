import React from "react";
import Start from "./pages/Start";
import Result from "./pages/Result";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CinderellaTest from "./pages/CinderellaMBTITest";
import Loading from "./pages/LoadingPage";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/result" element={<Result />} />
          <Route path="/cinderella" element={<CinderellaTest />} />
          <Route path="loading" element={<Loading />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

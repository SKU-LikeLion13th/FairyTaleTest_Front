import React from "react";
import Start from "./pages/Start";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Start />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

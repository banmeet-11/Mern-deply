import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CardsPage from "./pages/CardsPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cards" element={<CardsPage />} />
      </Routes>
    </div>
  );
}

export default App;
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import HomePage from "./HomePage/HomePage";
import Gra from "./Gra/Gra";

function App() {
  return (
    <div className="website">
      <Navbar />
      <Routes>
        <Route path="" element={<HomePage />}/>
        <Route path="gra" element={<Gra />}/>
      </Routes>
    </div>
  );
}

export default App;

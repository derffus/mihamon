import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import HomePage from "./HomePage/HomePage";
import Gra, { Lokacje } from "./Gra/Gra";
import Ogrodek from "./Gra/lokacje/Ogrodek";

function App() {
  return (
    <div className="website">
      <Navbar />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="gra" element={<Gra />} >
          <Route path="" element={<Lokacje/>}/>
          <Route path="ogrodek" element={<Ogrodek />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import "./Navbar.scss";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <>
      <nav>
        <NavLink to="">Strona główna</NavLink>
        <NavLink to="gra">Graj</NavLink>
      </nav>
    </>
  );
}

export default Navbar;

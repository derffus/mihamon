import "./HomePage.scss";
import { NavLink } from "react-router-dom";

function HomePage() {
  
  return (
    <>
      <header className="welcome-homepage">MIHAMON</header>
      <div className="start-buttons">
        <NavLink to="gra">Start</NavLink>
        <button>Info</button>
      </div>
    </>
  );
}

export default HomePage;

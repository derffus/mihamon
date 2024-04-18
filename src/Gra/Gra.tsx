import { useEffect, useState } from "react";
import "./Gra.scss";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { atom, useAtom } from "jotai";

export const Eq = atom<string[]>([]);
export const Name = atom<string>("");

function Gra() {
  const [eq, setEq] = useAtom(Eq);
  const nowyPokemon = (pokemon: string) => {
    setEq([...eq, pokemon]);
  };

  const location = useLocation();

  const [nameTyping, setNameTyping] = useState<string>("");
  const [name, setName] = useAtom<string>(Name);
  const changeName = (e: any) => {
    e.preventDefault();
    setNameTyping(e.target.value);
  };
  const submitName = () => {
    if (nameTyping.length >= 3) setName(nameTyping);
    else alert("Imię musi mieć minimalnie 3 znaki");
    setNameTyping("");
  };

  const [starterHovered, setStarterHovered] = useState<string>("");

  return (
    <section className="gra-section">
      <Ekwipunek />
      <div className="gra-main">
        <header className="welcome-gra">
          {location.pathname === "/gra" && (
            <h3>Witaj {name ? name + "!" : "trenerze mihamon!"}</h3>
          )}
          {!name && <h5>Jak mamy cię nazywać?</h5>}
          {!name && (
            <form onSubmit={submitName}>
              <input
                type="text"
                placeholder="Imię"
                value={nameTyping}
                className="imie"
                onChange={changeName}
                required
              />
              <input type="submit" className="submit" />
            </form>
          )}
        </header>
        {name && !eq[0] && (
          <div className="startery">
            <header>Wybierz startera:</header>
            <div className="startery-lista">
              <div>
                <img
                  src="assets/Images/mihasaur.png"
                  onClick={() => nowyPokemon("mihasaur")}
                  onMouseEnter={() => setStarterHovered("mihasaur")}
                  onMouseLeave={() => setStarterHovered("")}
                />
                {starterHovered === "mihasaur" || window.innerWidth < 767
                  ? "mihasaur"
                  : ""}
              </div>
              <div>
                <img
                  src="assets/Images/mihander.png"
                  onClick={() => nowyPokemon("mihander")}
                  onMouseEnter={() => setStarterHovered("mihander")}
                  onMouseLeave={() => setStarterHovered("")}
                />
                {starterHovered === "mihander" || window.innerWidth < 767
                  ? "mihander"
                  : ""}
              </div>
              <div>
                <img
                  src="assets/Images/mihtle.png"
                  onClick={() => nowyPokemon("mihtle")}
                  onMouseEnter={() => setStarterHovered("mihtle")}
                  onMouseLeave={() => setStarterHovered("")}
                />
                {starterHovered === "mihtle" || window.innerWidth < 767
                  ? "mihtle"
                  : ""}
              </div>
            </div>
          </div>
        )}
        <Outlet />
      </div>
      <Profil name={name} setName={setName} />
    </section>
  );
}

export function Lokacje() {
  const [name] = useAtom(Name);
  const [eq] = useAtom(Eq);
  return (
    <>
      {name && eq[0] && (
        <div className="lokacje">
          <header>Gdzie chcesz iść?</header>
          <div className="lokacje-lista">
            <>
              <NavLink to="ogrodek" className="ogrodek">
                <img src="assets/Images/ogrodek.png" alt="ogrodek" />
              </NavLink>
              <div className="ogrodek-div">Ogródek</div>
            </>
          </div>
        </div>
      )}
    </>
  );
}

function Ekwipunek() {
  const [eq] = useAtom(Eq);
  let ekwipunek = [...eq];
  useEffect(() => {
    let ekwipunek = [...eq];
    ekwipunek.push("mihgey");
  }, []);
  return (
    <div className="ekwipunek">
      <button className="backpack">
        <FontAwesomeIcon icon={faSuitcase} />
      </button>
      <div className="party">
        <button>
          {ekwipunek[0] && (
            <img src={`/assets/Images/${ekwipunek[0]}.png`} alt={ekwipunek[0]} />
          )}
        </button>
        <button>
          {ekwipunek[1] && (
            <img src={`/assets/Images/${ekwipunek[1]}.png`} alt={ekwipunek[1]} />
          )}
        </button>
        <button>
          {ekwipunek[2] && (
            <img src={`/assets/Images/${ekwipunek[2]}.png`} alt={ekwipunek[2]} />
          )}
        </button>
        <button>
          {ekwipunek[3] && (
            <img src={`/assets/Images/${ekwipunek[3]}.png`} alt={ekwipunek[3]} />
          )}
        </button>
        <button>
          {ekwipunek[4] && (
            <img src={`/assets/Images/${ekwipunek[4]}.png`} alt={ekwipunek[4]} />
          )}
        </button>
        <button>
          {ekwipunek[5] && (
            <img src={`/assets/Images/${ekwipunek[5]}.png`} alt={ekwipunek[5]} />
          )}
        </button>
      </div>
    </div>
  );
}

function Profil(props: any) {
  const navigate = useNavigate();
  return (
    <div className="profil">
      <img src="assets/Images/pfpmale.png" alt="pfp" className="pfp" />
      <div className="name">
        {props.name ? (
          <>
            {props.name}
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => {
                props.setName("");
                navigate("");
              }}
            />
          </>
        ) : (
          "imię"
        )}
      </div>
    </div>
  );
}

export default Gra;

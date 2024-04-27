import { useState } from "react";
import "./Gra.scss";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { atom, useAtom } from "jotai";

export const Name = atom<string>("derf");
export const Pokemony = atom<string[]>([]);
export const Eq = atom<[{ name: string; amount: number }]>([
  { name: "pokeball", amount: 15 },
]);

function Gra() {
  const [pokemony, setPokemony] = useAtom(Pokemony);
  const nowyPokemon = (pokemon: string) => {
    setPokemony([...pokemony, pokemon]);
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
        {name && !pokemony[0] && <Startery nowyPokemon={nowyPokemon} />}
        <Outlet />
      </div>
      <Profil name={name} setName={setName} />
    </section>
  );
}
const ShiniesStarters = atom<boolean[]>([
  Math.floor(Math.random() * 40) === 0,
  Math.floor(Math.random() * 40) === 0,
  Math.floor(Math.random() * 40) === 0,
]);

function Startery(props: any) {
  const [starterHovered, setStarterHovered] = useState<string>("");
  const [shiniesStarters] = useAtom(ShiniesStarters);
  return (
    <div className="startery">
      <header>Wybierz startera:</header>
      <div className="startery-lista">
        <div>
          <img
            src={`assets/Images/${shiniesStarters[0] ? "s" : ""}mihasaur.png`}
            onClick={() =>
              props.nowyPokemon(shiniesStarters[0] ? "smihasaur" : "mihasaur")
            }
            onMouseEnter={() => setStarterHovered("mihasaur")}
            onMouseLeave={() => setStarterHovered("")}
          />
          {starterHovered === "mihasaur" || window.innerWidth < 767
            ? "mihasaur"
            : ""}
        </div>
        <div>
          <img
            src={`assets/Images/${shiniesStarters[1] ? "s" : ""}mihander.png`}
            onClick={() =>
              props.nowyPokemon(shiniesStarters[1] ? "smihander" : "mihander")
            }
            onMouseEnter={() => setStarterHovered("mihander")}
            onMouseLeave={() => setStarterHovered("")}
          />
          {starterHovered === "mihander" || window.innerWidth < 767
            ? "mihander"
            : ""}
        </div>
        <div>
          <img
            src={`assets/Images/${shiniesStarters[2] ? "s" : ""}mihtle.png`}
            onClick={() =>
              props.nowyPokemon(shiniesStarters[2] ? "smihtle" : "mihtle")
            }
            onMouseEnter={() => setStarterHovered("mihtle")}
            onMouseLeave={() => setStarterHovered("")}
          />
          {starterHovered === "mihtle" || window.innerWidth < 767
            ? "mihtle"
            : ""}
        </div>
      </div>
    </div>
  );
}

export function Lokacje() {
  const [name] = useAtom(Name);
  const [pokemony] = useAtom(Pokemony);
  return (
    <>
      {name && pokemony[0] && (
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
  const [pokemony] = useAtom(Pokemony);
  const [eq] = useAtom(Eq);
  const [showBag, setShowBag] = useState<boolean>(false);
  return (
    <div className="ekwipunek">
      <button className="backpack" onClick={() => setShowBag(!showBag)}>
        <FontAwesomeIcon icon={faSuitcase} />
      </button>
      {showBag && (
        <div className="bag-opened">
          <div className="pokemony">
            {pokemony.map((x: string) => (
              <div>
                <img src={`/assets/Images/${x}.png`} alt={x} />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="party">
        <button>
          {pokemony[0] && (
            <img src={`/assets/Images/${pokemony[0]}.png`} alt={pokemony[0]} />
          )}
        </button>
        <button>
          {pokemony[1] && (
            <img src={`/assets/Images/${pokemony[1]}.png`} alt={pokemony[1]} />
          )}
        </button>
        <button>
          {pokemony[2] && (
            <img src={`/assets/Images/${pokemony[2]}.png`} alt={pokemony[2]} />
          )}
        </button>
        <button>
          {pokemony[3] && (
            <img src={`/assets/Images/${pokemony[3]}.png`} alt={pokemony[3]} />
          )}
        </button>
        <button>
          {pokemony[4] && (
            <img src={`/assets/Images/${pokemony[4]}.png`} alt={pokemony[4]} />
          )}
        </button>
        <button>
          {pokemony[5] && (
            <img src={`/assets/Images/${pokemony[5]}.png`} alt={pokemony[5]} />
          )}
        </button>
      </div>
      <div className="items-bag">
        <span className="przedmioty">przedmioty:</span>
        <div className="lista-itemow">
          {eq.map((x: any) => (
            <div className={x.name} key={x.name}>
              <img src="assets/Images/pokeball.png" alt={x.name} />
              {x.amount}
            </div>
          ))}
        </div>
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

import { useEffect, useState } from "react";
import "./Lokacje.scss";
import CatchingPokemon from "../CatchingPokemon";
import { useAtom, atom } from "jotai";
import { Pokemony, Eq } from "../Gra";

const PokemonSpawned = atom<any[][]>([]);

function Ogrodek() {
  const chanceToCatch = 40;

  const [pokemony, setPokemony] = useAtom(Pokemony);
  const [eq, setEq] = useAtom(Eq);
  const pokemonClicked = (pokemon: string, id: number) => {
    setPokemonRightNow(pokemon);
    setPokemonRightNowId(id);
    setCatchingPokemon(true);
  };
  const catchPokemon = (ball:string) => {
    setPokemonRightNow("");
    setPokemonSpawned((prev) =>
      prev.filter(
        (x: any, index: number) => index !== pokemonRightNowId
      )
    );
    setCatchingPokemon(false);
    setPokemonRightNowId(-1);
    setPokemony([...pokemony, pokemonRightNow]);
    switch(ball){
      case "pokeball":
        const eqCopy:any = [...eq];
        eqCopy[0] = {...eqCopy[0], amount: eqCopy[0].amount - 1}
        setEq(eqCopy)
    }
  };

  const [ticks, setTicks] = useState<boolean>(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTicks((prevTicks) => !prevTicks);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * chanceToCatch * 2);
    randomNumber === 0 && spawnPokemon();
  }, [ticks]);

  const [pokemonSpawned, setPokemonSpawned] = useAtom<any[][]>(PokemonSpawned);
  const [showPokemon, setShowPokemon] = useState<boolean>(false);

  const [catchingPokemon, setCatchingPokemon] = useState<boolean>(false);
  const [pokemonRightNow, setPokemonRightNow] = useState<string>("");
  const [pokemonRightNowId, setPokemonRightNowId] = useState<number>(-1);

  function spawnPokemon() {
    setShowPokemon(false);
    let topvalue, leftvalue;
    do {
      topvalue = Math.floor(Math.random() * 350);
      leftvalue = Math.floor(Math.random() * 375);
    } while (
      leftvalue < 290 &&
      leftvalue > 110 &&
      topvalue < 280 &&
      topvalue > 100
    );
    let rotationvalue = Math.floor(Math.random() * 2);
    let pokemonNameChance = Math.floor(Math.random() * 100);
    let pokemonnamevalue: string;
    if (pokemonNameChance < 40) pokemonnamevalue = "mihgey";
    else if (pokemonNameChance < 80) pokemonnamevalue = "mihatta";
    else if (pokemonNameChance < 90) pokemonnamevalue = "mihanat";
    else if (pokemonNameChance < 95) pokemonnamevalue = "mihotto";
    else if (pokemonNameChance < 100) pokemonnamevalue = "mihasaur";

    setPokemonSpawned((prevPokemonSpawned) => [
      ...prevPokemonSpawned,
      [
        Math.floor(Math.random() * 100) === 0
          ? "s" + pokemonnamevalue
          : pokemonnamevalue,
        topvalue,
        leftvalue,
        rotationvalue,
      ],
    ]);
    setShowPokemon(true);
    setTimeout(() => {
      setPokemonSpawned((prevPokemonSpawned) => {
        const newPrevPokemonSpawned = [...prevPokemonSpawned];
        newPrevPokemonSpawned.shift();
        return newPrevPokemonSpawned;
      });
    }, Math.floor(Math.random() * 20000) + 55000);
  }
  return (
    <section className="lokacja-section">
      {!catchingPokemon ? (
        <>
          <header>Ogródek</header>
          <div className="ogrodek lokacja">
            <img
              src={`../assets/Images/${ticks ? "you" : "youmoved"}.png`}
              className="you"
            />
            {showPokemon &&
              pokemonSpawned.map((x: any, index: number) => (
                <img
                  key={x + 1}
                  src={`../assets/Images/${x[0]}.png`}
                  className="pokemon"
                  style={{
                    top: x[1],
                    left: x[2],
                    transform: `rotateY(${x[3] === 0 ? "180deg" : "0"})`,
                  }}
                  alt={x[0]}
                  onClick={() => {
                    pokemonClicked(x[0], index);
                  }}
                />
              ))}
          </div>
        </>
      ) : (
        <CatchingPokemon
          pokemonSpawned={pokemonSpawned}
          pokemonRightNow={pokemonRightNow}
          catchPokemon={catchPokemon}
        />
      )}
    </section>
  );
}

export default Ogrodek;

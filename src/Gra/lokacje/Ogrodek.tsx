import { useEffect, useState } from "react";
import "./Lokacje.scss";
import CatchingPokemon from "../CatchingPokemon";
import { useAtom } from "jotai";
import { Eq } from "../Gra";

function Ogrodek() {
  const [eq, setEq] = useAtom(Eq);
  const pokemonClicked = (pokemon: string, id: number) => {
    setPokemonRightNow(pokemon);
    setPokemonRightNowId(id);
    setCatchingPokemon(true);
  };
  const catchPokemon = () => {
    setPokemonRightNow("");
    setPokemonSpawned(prev => prev.splice(pokemonRightNowId,1));
    setCatchingPokemon(false);
    setEq([...eq, pokemonRightNow]);
    
  }
  
  const [ticks, setTicks] = useState<boolean>(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTicks((prevTicks) => !prevTicks);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 15);
    randomNumber === 0 && spawnPokemon();
  }, [ticks]);

  const [pokemonSpawned, setPokemonSpawned] = useState<any[][]>([]);
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
      topvalue < 300 &&
      topvalue > 100
    );
    let rotationvalue = Math.floor(Math.random() * 2);
    let pokemonNameChance = Math.floor(Math.random() * 100);
    let pokemonnamevalue: any;
    if (pokemonNameChance < 45) pokemonnamevalue = "mihgey";
    else if (pokemonNameChance < 90) pokemonnamevalue = "mihatta";
    else if (pokemonNameChance < 100) pokemonnamevalue = "mihasaur";

    setPokemonSpawned((prevPokemonSpawned) => [
      ...prevPokemonSpawned,
      [pokemonnamevalue, topvalue, leftvalue, rotationvalue],
    ]);
    setShowPokemon(true);
    setTimeout(() => {
      setPokemonSpawned((prevPokemonSpawned) => {
        const newPrevPokemonSpawned = [...prevPokemonSpawned];
        newPrevPokemonSpawned.pop();
        return newPrevPokemonSpawned;
      });
    }, Math.floor(Math.random() * 20000) + 20000);
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
              pokemonSpawned.map((x: any,index:number) => (
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
                    pokemonClicked(x[0],index);
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

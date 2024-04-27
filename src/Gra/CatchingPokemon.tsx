import { useAtom } from "jotai";
import "./CatchingPokemon.scss";
import { Eq } from "./Gra";

function CatchingPokemon(props: any) {
  const [eq] = useAtom(Eq);
  return (
    <div className="catching-pokemon">
      <img
        src={`/assets/Images/${props.pokemonRightNow}.png`}
        className="pokemon"
      />
      <div className="info">
        To dziki{" "}
        {props.pokemonRightNow[0] !== "s"
          ? props.pokemonRightNow
          : "shiny " + props.pokemonRightNow.slice(1)}
        !
      </div>
      <div className="inventory">
        <div className="pokeball">
          <button onClick={()=>eq[0].amount>0?props.catchPokemon("pokeball"):null}>
            <img src="/logo.png" />
          </button>
          <div>{eq[0].amount}</div>
        </div>
      </div>
    </div>
  );
}

export default CatchingPokemon;

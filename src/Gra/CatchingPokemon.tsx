import "./CatchingPokemon.scss";

function CatchingPokemon(props: any) {
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
        <button className="pokeball" onClick={props.catchPokemon}>
          <img src="/logo.png" />
        </button>
      </div>
    </div>
  );
}

export default CatchingPokemon;

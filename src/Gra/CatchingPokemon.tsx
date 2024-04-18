import "./CatchingPokemon.scss";

function CatchingPokemon(props: any) {
  return (
    <div className="catching-pokemon">
      <img src={`/assets/Images/${props.pokemonRightNow}.png`} className="pokemon"/>
      <div className="inventory">
        <button className="pokeball" onClick={props.catchPokemon}>
          <img src="/logo.png" />
        </button>
      </div>
    </div>
  );
}

export default CatchingPokemon;

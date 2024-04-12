import { useState } from "react";
import "./Gra.scss";

function Gra() {
  const [nameTyping, setNameTyping] = useState<string>("");
  const [name, setName] = useState<string>("");
  const changeName = (e: any) => {
    e.preventDefault();
    setNameTyping(e.target.value);
  };
  const submitName = () => {
    setName(nameTyping);
    setNameTyping("");
  };
  return (
    <>
      <header className="welcome-gra">
        Witaj {name ? name + "!" : "trenerze mihamon! Jak mamy cię nazywać?"}
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
      <div className="startery">
        {name && <img src="assets/Images/bulbasaur.png" />}
        {name && <img src="assets/Images/charmander.png" />}
        {name && <img src="assets/Images/squirtle.png" />}
      </div>
    </>
  );
}

export default Gra;

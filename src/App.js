import React, { useState, useEffect } from "react";
import "./App.css";
import CharacterCard from "./components/CharacterCard";

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await fetch("https://swapi.dev/api/people/");
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    }

    fetchCharacters();
  }, []);

  return (
    <div className="App">
      <div className="navbar">
        <img
          className="logo-img"
          alt="logo"
          src="https://s3-alpha-sig.figma.com/img/e187/8e97/66a4d05dfbe4223df6e2166f51678ea4?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YJzhAJt7O69G-zHicgEbUC49d4Cbv8VM8bgl6bXlqYRa6idTt6O5Sh3cP-hA5AzifND5YVVUGGSvTV-FOdK0VFc8iU8JLoInSlfHGQ2ixaZySgRqrM~V-FDxP3dFRxI7rC9MoO4Dq-aSxadRbxV~HX~MtxMcCrOrg10ZkS8RpYdF15EihsyfPWNEFzIo7Eq6GFaqoGFoooRUM6~WO6INyvwl6DbS4FLS0lEnrc0kTWgTHQF20ztcsv7CJPASoTH6ULsMoLxNyv6~aSvwyAOidJFGvjbep5XlCfOOGQnAdMbPxpCGAnRFHI8Vwhbs0e8w~erJMtnRiePYxODgxQhQXg__"
        />
      </div>
      <div className="hero-section">
        <div className="search-section">
          <input
            name="search"
            className="search-input"
            placeholder="Type your character...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button name="search-button" className="search-button">
            Search
          </button>
        </div>
        <div className="hero-img" />
      </div>
      <CharacterCard characters={characters} searchQuery={searchQuery} />
      {/* {selectedCharacter && (
        <div className="character-details">
          <h2>{selectedCharacter.name}</h2>
          <p>Height: {selectedCharacter.height}</p>
          <p>DOB: {selectedCharacter.birth_year}</p>
          <p>Movies: {selectedCharacter.movies}</p>
        </div>
      )} */}
    </div>
  );
}

export default App;

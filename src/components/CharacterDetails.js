import React from "react";
import "../styles/CharacterDetails.css";

const CharacterDetails = ({ character }) => {
  return (
    <div className="character-details">
      <h2>Character Details</h2>
      <div className="details-table">
        <div className="row">
          <div className="label">Name:</div>
          <div className="value">{character.name}</div>
        </div>
        <div className="row">
          <div className="label">Height:</div>
          <div className="value">{character.height}</div>
        </div>
        <div className="row">
          <div className="label">Birth Year:</div>
          <div className="value">{character.birth_year}</div>
        </div>
        <div className="row">
          <div className="label">Gender:</div>
          <div className="value">{character.gender}</div>
        </div>
        <div className="row">
          <div className="label">Eye Color:</div>
          <div className="value">{character.eye_color}</div>
        </div>
        <div className="row">
          <div className="label">Skin Color:</div>
          <div className="value">{character.skin_color}</div>
        </div>
        <div className="row">
          <div className="label">Hair Color:</div>
          <div className="value">{character.hair_color}</div>
        </div>
        <div className="row">
          <div className="label">Movies Acted in:</div>
          <div className="value">{character.movies || "Loading..."}</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;

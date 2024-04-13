import React, { useState, useEffect } from "react";
import CharacterDetails from "./CharacterDetails";

const CharacterCard = ({ characters, searchQuery }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [movieNames, setMovieNames] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 6;

  const fetchMovies = async (films) => {
    const movieNames = await Promise.all(
      films.map(async (filmUrl) => {
        try {
          const response = await fetch(filmUrl);
          const filmData = await response.json();
          return filmData.title;
        } catch (error) {
          console.error("Error fetching movie:", error);
          return "Unknown";
        }
      })
    );
    return movieNames.join(", ");
  };

  useEffect(() => {
    const fetchMovieNames = async () => {
      const movieNameMap = {};
      await Promise.all(
        characters.map(async (character) => {
          const names = await fetchMovies(character.films);
          movieNameMap[character.name] = names;
        })
      );
      setMovieNames(movieNameMap);
    };

    fetchMovieNames();
  }, [characters]);

  const handleCharacterClick = async (character) => {
    const movies = movieNames[character.name] || "Unknown";
    setSelectedCharacter({ ...character, movies });
  };

  const fetchImageSrc = (gender) => {
    switch (gender) {
      case "male":
        return "https://s3-alpha-sig.figma.com/img/38fa/ecba/1f990fb8e85e435f62aba733b0e7fa4c?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Zyf6a32Ty-PS9-OJjJ6sZv5X4sNMf8VEr4atGvXjldv-u7BVDX1a7MrBSvjZhiuNmeeR96OR-KtD~b9bidpNWvSXxmJCShGsl~Z~UW0LvONQbFyXEeooOv1G-YoUmIOrthnLPD~upwFOi2UANQoQLRfEwMLwstBcY3zN4EOOWhj~7Z0aLvBSf7~n1wQg3HYxkzF5rfNDn~6t~VQkkkx1NxdYVhPfXsSdZq0pBm2qbPzgwtF3Lb6TkZNxbpgSFJJ-69RmwbKsORb4aNu5eJ6rO-i9nw-iKLpk~uevsZv8W8OZxRxCkNOPfyb71rIszRla8vz13RWCVXaBGi752rtbtg__";
      case "female":
        return "https://s3-alpha-sig.figma.com/img/4d48/ba11/40cc9df8d31700cce071540046eb16cd?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Z5V~EawKLIYxhX1E1SpPYa3Vu1IUjSEona9c5bcJL0Txn5hQGcEthz78JWck4H3zP7Ow51nK4tRs2aCF9yEo5u1iD-5iO~8zQnnakMggkLvK-RjGVwvp2sqJ781ujztB4O3wmK-EXzy87q-Wm-0CWGtJdnXE4yGWGITJpojDs8r46GN2-FsJc5kagNINJMx5VbvB8k-niY5Yhy0xmpsbRMwrBZY2RTOGozo59WpdNcDK2wSyIBFU1HPl1OJdypGV8r55wV82uaVTYWTaI2X9SHyi8h49U01SWEKtMf6PLOO-tw-bYmjxCwqAYqibzhq~iVzBOP0varb2mpKR6HOOvg__";
      default:
        return "https://s3-alpha-sig.figma.com/img/a165/f849/8a9b923eac21b24b0aac86fdc5b53209?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XRtHtvy27zwllEvQJTxOF4iIkje4bO1nkJA--yCuutchlgdeovBpkeR2tBNpywxKzlvMspnxFucmXzuF0BPoFz1Dw5rYzVWawoLftuut~FSsyKheeZk2Mftce-XEOuNi6u0VsWJ-b4Mddbl2O1ANhb8EkGmerUKdLKeROk815cPYNaTUf6GDuJdRhW~-6tldwnY8f-lgoYplfVJYYMVEOWCSeZZBdl2vcM4Cu1oQI3Qtpu368-wgtht-cTOlmLQ4p2RXuBMnjvHTI9NBhXaYF3cimPrTpbtvHTVw04PIxhKTbA7JUcxzGWxOKhVG7QP7cnDTWPUxL3EPaq8XJhxhCA__";
    }
  };

  const handleCloseDetails = () => {
    setSelectedCharacter(null);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="characters-list">
        {currentCharacters.map((character, index) => (
          <div
            key={index}
            className="character-card"
            onClick={() => handleCharacterClick(character)}
          >
            <img
              alt="character"
              className="character-img"
              src={fetchImageSrc(character.gender)}
            />
            <div className="char-content">
              <div className="char-title">{character.name}</div>
              <div className="height-dob-section">
                <span>Height: {character.height} cm | </span>
                <span>DOB: {character.birth_year}</span>
              </div>

              <div className="movies-list">
                <span className="movies-sub-heading">Movies acted in:</span>{" "}
                {movieNames[character.name] || "Loading..."}
              </div>
              <div className="see-more">See more {">"}</div>
            </div>
          </div>
        ))}
        {selectedCharacter && (
          <div className="popup">
            <CharacterDetails character={selectedCharacter} />
            <button onClick={handleCloseDetails}>Close</button>
          </div>
        )}{" "}
      </div>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(characters.length / charactersPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default CharacterCard;

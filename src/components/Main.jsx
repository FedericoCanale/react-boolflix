import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY;
const API_URL = import.meta.env.VITE_MOVIE_URL;

export default function Main() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    function handleInputChange(event) {
        setQuery(event.target.value);
    }

    function handleSearchClick() {
        axios
            .get(API_URL, {
                params: {
                    api_key: API_KEY,
                    query: query
                },
            })
            .then((res) => {
                setMovies(res.data.results);
            });
    }

    return (
        <>
            <h1>Movie Search</h1>

            <div>
                <input
                    type="text"
                    placeholder="Scrivi il nome di un film..."
                    value={query}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearchClick}>Cerca</button>
            </div>

            <h2>Risultati</h2>

            {movies.length === 0 && <p>Nessun film trovato.</p>}

            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <p><strong>Titolo:</strong> {movie.title}</p>
                        <p><strong>Titolo originale:</strong> {movie.original_title}</p>
                        <p><strong>Lingua:</strong> {movie.original_language}</p>
                        <p><strong>Voto:</strong> {movie.vote_average}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}
import { useState } from "react";
import axios from "axios";

const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY;
const MOVIE_URL = import.meta.env.VITE_MOVIE_URL;

const SERIES_API_KEY = import.meta.env.VITE_SERIES_DB_API_KEY;
const SERIES_URL = import.meta.env.VITE_SERIES_URL;

// base URL per le immagini TMDB
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const IMAGE_SIZE = "w342"; // puoi cambiare dimensione se vuoi

// mappa codice lingua → bandiera
const languageToFlag = {
    en: "🇬🇧",
    it: "🇮🇹",
    fr: "🇫🇷",
    es: "🇪🇸",
    de: "🇩🇪",
    ja: "🇯🇵",
    ko: "🇰🇷",
    zh: "🇨🇳",
    hi: "🇮🇳",
};

function getLanguageFlag(langCode) {
    if (languageToFlag[langCode]) {
        return languageToFlag[langCode];
    }
    return langCode;
}


function getPosterUrl(posterPath) {
    if (!posterPath) {
        return null; // niente immagine se il path non c'è
    }
    return IMAGE_BASE_URL + IMAGE_SIZE + posterPath;
}

export default function Main() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    function handleInputChange(event) {
        setQuery(event.target.value);
    }

    function handleSearchClick() {
        const movieParams = {
            api_key: MOVIE_API_KEY,
            query: query,
        };

        const seriesParams = {
            api_key: SERIES_API_KEY,
            query: query,
        };

        Promise.all([
            axios.get(MOVIE_URL, { params: movieParams }),
            axios.get(SERIES_URL, { params: seriesParams }),
        ]).then(([moviesRes, seriesRes]) => {
            const movieResults = moviesRes.data.results.map((item) => {
                return {
                    id: "movie-" + item.id,
                    title: item.title,
                    original_title: item.original_title,
                    original_language: item.original_language,
                    vote_average: item.vote_average,
                    poster_path: item.poster_path,
                };
            });

            const seriesResults = seriesRes.data.results.map((item) => {
                return {
                    id: "series-" + item.id,
                    title: item.name,
                    original_title: item.original_name,
                    original_language: item.original_language,
                    vote_average: item.vote_average,
                    poster_path: item.poster_path,
                };
            });

            setMovies([...movieResults, ...seriesResults]);
        });
    }

    return (
        <>
            <h1>Movie Search</h1>

            <div>
                <input
                    type="text"
                    placeholder="Scrivi il nome di un film o serie..."
                    value={query}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearchClick}>Cerca</button>
            </div>

            <h2>Risultati</h2>

            {movies.length === 0 && <p>Nessun risultato trovato.</p>}

            <ul>
                {movies.map((movie) => {
                    const posterUrl = getPosterUrl(movie.poster_path);

                    return (
                        <li key={movie.id}>
                            {posterUrl && (
                                <img
                                    src={posterUrl}
                                    alt={movie.title}
                                />
                            )}

                            <p>
                                <strong>Titolo:</strong> {movie.title}
                            </p>
                            <p>
                                <strong>Titolo originale:</strong> {movie.original_title}
                            </p>
                            <p>
                                <strong>Lingua:</strong> {getLanguageFlag(movie.original_language)}
                            </p>
                            <p>
                                <strong>Voto:</strong> {movie.vote_average}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
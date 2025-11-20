
import { createContext, useState } from "react";
import axios from "axios";

const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY;
const MOVIE_URL = import.meta.env.VITE_MOVIE_URL;

const SERIES_API_KEY = import.meta.env.VITE_SERIES_DB_API_KEY;
const SERIES_URL = import.meta.env.VITE_SERIES_URL;

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
export const IMAGE_SIZE = "w342";

export const languageToFlag = {
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

export const MovieContext = createContext();

export function MovieProvider({ children }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    function search() {
        if (!query.trim()) return;

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
            const movieResults = moviesRes.data.results.map((item) => ({
                id: "movie-" + item.id,
                type: "movie",
                title: item.title,
                original_title: item.original_title,
                original_language: item.original_language,
                vote_average: item.vote_average,
                poster_path: item.poster_path,
            }));

            const seriesResults = seriesRes.data.results.map((item) => ({
                id: "series-" + item.id,
                type: "series",
                title: item.name,
                original_title: item.original_name,
                original_language: item.original_language,
                vote_average: item.vote_average,
                poster_path: item.poster_path,
            }));

            setResults([...movieResults, ...seriesResults]);
        });
    }

    const value = {
        query,
        setQuery,
        results,
        search,
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
}
import { useState } from "react";

export default function Main() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]); // per ora non lo usiamo davvero

    function handleInputChange(event) {
        setQuery(event.target.value);
    }

    function handleSearchClick() {
        console.log("Cerco il film:", query);
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
        </>
    );
}
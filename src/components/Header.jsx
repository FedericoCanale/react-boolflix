
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

export default function Header() {
    const { query, setQuery, search } = useContext(MovieContext);

    function handleInputChange(event) {
        setQuery(event.target.value);
    }

    function handleSearchClick() {
        search();
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            search();
        }
    }

    return (
        <header className="header">
            <h1 className="logo">BoolFlix</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Scrivi il nome di un film o serie..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="search-input"
                />
                <button onClick={handleSearchClick} className="search-button">
                    Cerca
                </button>
            </div>
        </header>
    );
}
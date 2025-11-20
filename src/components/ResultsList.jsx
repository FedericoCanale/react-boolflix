
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import ResultCard from "./ResultCard";

export default function ResultsList() {
    const { results } = useContext(MovieContext);

    return (
        <section className="results-section">
            <h2 className="results-title">Risultati</h2>

            {results.length === 0 && (
                <p className="no-results">Nessun risultato trovato.</p>
            )}

            <ul className="results-list">
                {results.map((item) => (
                    <ResultCard key={item.id} movie={item} />
                ))}
            </ul>
        </section>
    );
}
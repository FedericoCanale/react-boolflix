import {
    IMAGE_BASE_URL,
    IMAGE_SIZE,
    languageToFlag,
} from "../context/MovieContext";

function getLanguageFlag(langCode) {
    return languageToFlag[langCode] || langCode;
}

function getPosterUrl(posterPath) {
    if (!posterPath) return null;
    return IMAGE_BASE_URL + IMAGE_SIZE + posterPath;
}

function getStars(vote) {
    const normalized = Math.ceil(vote / 2);
    const filledStars = Math.min(Math.max(normalized, 0), 5);
    const emptyStars = 5 - filledStars;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
        stars.push(
            <i key={"f" + i} className="fa-solid fa-star star-icon"></i>
        );
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(
            <i key={"e" + i} className="fa-regular fa-star star-icon"></i>
        );
    }

    return stars;
}

export default function ResultCard({ movie }) {
    const posterUrl = getPosterUrl(movie.poster_path);

    return (
        <li className="result-card">
            {posterUrl && (
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="result-poster"
                />
            )}

            <div className="result-overlay">
                <p className="result-type">
                    <strong>{movie.type === "movie" ? "Film" : "Serie"}:</strong>{" "}
                    {movie.title}
                </p>
                <p className="result-original-title">
                    <strong>Titolo originale:</strong> {movie.original_title}
                </p>
                <p className="result-language">
                    <strong>Lingua:</strong> {getLanguageFlag(movie.original_language)}
                </p>
                <p className="result-vote">
                    <strong>Voto:</strong>{" "}
                    <span className="stars">{getStars(movie.vote_average)}</span>
                </p>
                <p className="result-overview">
                    <strong>Overview:</strong> {movie.overview}
                </p>
            </div>
        </li>
    );
}
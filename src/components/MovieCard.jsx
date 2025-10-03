import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({movie}){
    //Taking stuff we want from MovieContext, since this component will be a child of MovieProvider/context in App.jsx
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteBtnClick(event){
        event.preventDefault()
        //So clicking a favorited movie again removes it, else add it to favorites.
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }


    return (
    <div className="movie-card">

        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteBtnClick}><i class="fa-solid fa-heart"></i></button>
            </div>
        </div>

        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
        </div>
    </div>
    );
}

export default MovieCard
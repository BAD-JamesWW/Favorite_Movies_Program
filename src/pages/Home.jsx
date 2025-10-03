import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { getMovies, searchMovies, getPopularMovies } from "../services/api"
import "../css/Home.css"

function Home() {
    //When a state change occurs, the entire component is re-ran/re-rendered
    const [searchQueryState, setSearchQuery] = useState("") 

    const [moviesState, setMovies] = useState([]); 

    const [error, setError] = useState(null);
    //True so loading occurs initially.
    const [loading, setLoading] = useState(true)

    //To control when loading of movies happens
    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true)
            try {
                const moviesToLoad = searchQueryState.trim() === "" ? await getPopularMovies() : await searchMovies(searchQueryState)//So by default favorite movies show else expand database to search
                setMovies(moviesToLoad)
                setError(null)
            } catch (err) {
                console.log(err)
                setError("Falied to load movies")
            } finally {
                setLoading(false)
            }
        }
        loadMovies()
    }, [searchQueryState]) 

    
    return (
    <div className="home">
        
        <form className="search-form">
            <input className="search-input" type="text" placeholder="Search for movies..." value={searchQueryState} onChange={(userInputEvent) => setSearchQuery(userInputEvent.target.value)}/>
            <button className="search-button" type="submit">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
            <div className="loading">Loading...</div> 
        ) : (
            <div className="movies-grid">
            {moviesState.map(movieIteration => (
                movieIteration.title.toLowerCase().startsWith(searchQueryState.toLowerCase()) && <MovieCard movie={movieIteration} key={movieIteration.id}/>))}
            </div>
        )}
    </div>)
}

export default Home
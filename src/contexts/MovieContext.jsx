import { createContext, useState, useContext, useEffect } from "react"

const MovieContext = createContext()


export const useMovieContext = () => useContext(MovieContext)

/**Creating a context to wrap around the other components
 * in App.jsx so they can have access to everything in this context.
 * 
 * Also note that children is a reserved prop and is anything that the written component
 * wraps around when rendered.
*/
export const MovieProvider = ({children}) => {
    //favorites updates whenever setFavorites returns something
    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem("favorites")
        return storedFavs ? JSON.parse(storedFavs) : []
    })

    //Because [] is empty, this only happens on-render
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])


    //Anytime favorites changes set the state equal to whats stored
    useEffect (() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])


    const addToFavorites = (movie) => {
        setFavorites(stateValue => [...stateValue, movie])//Adds onto the previous state value corresponding to setFavorites.
    }
    const removeFromFavorites = (movieID) => {
        setFavorites(stateValue => stateValue.filter(movie => movie.id !== movieID))
    }
    const isFavorite = (movieID) => {
        return favorites.some(movie => movie.id === movieID)
    }

    //What we want children to have access to.
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}
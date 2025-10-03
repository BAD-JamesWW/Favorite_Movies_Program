import { Route, Routes } from 'react-router-dom'
import './css/App.css'
import MovieCard from './components/MovieCard'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import { MovieProvider } from './contexts/MovieContext'
import NavigationBar from './components/NavigationBar'


function App() {
  return (
    <MovieProvider>
      <NavigationBar/> 
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/favorites' element={<Favorites />}/>
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App

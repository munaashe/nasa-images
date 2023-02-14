import { Routes, Route } from 'react-router-dom'
import Details from './pages/details'
import Search from './pages/search'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" exact element={<Search />} />
                <Route path="/search/:id" element={<Details />} />
            </Routes>
        </>
    )
}

export default App

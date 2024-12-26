import { Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Search from './pages/Search'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/profile" element={<Profile />} /> 
    </Routes>
  )
}

export default App

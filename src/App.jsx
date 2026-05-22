import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import Homee from "./pages/Homee"
import BebidaDetalle  from './pages/BebidaDetalle'
import Login from './pages/Login'
import RutaProtegida from './components/RutaProtegida'
import Admin from './pages/Admin'
import Footer from './components/Footer'



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homee />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bebida/:id" element={<BebidaDetalle />} />
        <Route 
            path="/admin" 
                element={
                  <RutaProtegida>
                    <Admin />
                  </RutaProtegida>
                } 
          />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
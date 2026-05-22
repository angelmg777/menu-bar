import { Navigate } from 'react-router-dom'

function RutaProtegida({ children }) {
  const esAdmin = localStorage.getItem('admin')

  if (!esAdmin) {
    return <Navigate to="/login" />
  }

  return children
}

export default RutaProtegida
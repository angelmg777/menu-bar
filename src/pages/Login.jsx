import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setCargando(true)
    setError('')

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.mensaje)
        setCargando(false)
        return
      }

      localStorage.setItem('token', data.token)
      navigate('/admin')

    } catch {
      setError('Error al conectar con el servidor')
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="bg-gray-900 rounded-3xl p-8 w-full max-w-md border border-yellow-500/10">
        <h1 className="text-yellow-400 text-2xl font-bold text-center mb-2">Ruso Bar</h1>
        <p className="text-gray-500 text-sm text-center mb-8">Panel de administración</p>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full bg-gray-800 text-white border border-white/5 rounded-2xl px-4 py-3 mb-3 outline-none focus:border-yellow-500/50 transition-colors"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-800 text-white border border-white/5 rounded-2xl px-4 py-3 mb-4 outline-none focus:border-yellow-500/50 transition-colors"
        />

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={cargando}
          className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-2xl hover:bg-yellow-300 transition-colors disabled:opacity-50"
        >
          {cargando ? 'Entrando...' : 'Entrar'}
        </button>
      </div>
    </div>
  )
}

export default Login
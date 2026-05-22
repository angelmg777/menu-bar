import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageUploader from '../components/ImageUploader'


function Admin() {
  const [bebidas, setBebidas] = useState([])
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()
  const [bebidaEditando, setBebidaEditando] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/bebidas`)
      .then((res) => res.json())
      .then((data) => {
        setBebidas(data)
        setCargando(false)
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin')
    navigate('/login')
  }

  const handleEliminar = async (id) => {
  if (!confirm('¿Seguro que quieres eliminar esta bebida?')) return

  await fetch(`${import.meta.env.VITE_API_URL}/bebidas/${id}`, {
    method: 'DELETE'
  })

  setBebidas(bebidas.filter((b) => b._id !== id))
}

const [mostrarFormulario, setMostrarFormulario] = useState(false)
const [nuevaBebida, setNuevaBebida] = useState({
  nombre: '', tipo: '', base: '', tags: '',
  alcohol: '', precio: '', imagen: '', descripcion: ''
})

const handleCrear = async () => {
  const bebidaData = {
    ...nuevaBebida,
    tags: nuevaBebida.tags.split(',').map((t) => t.trim()),
    alcohol: Number(nuevaBebida.alcohol),
    precio: Number(nuevaBebida.precio)
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}/bebidas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bebidaData)
  })

  const creada = await res.json()
  setBebidas([...bebidas, creada])
  setMostrarFormulario(false)
  setNuevaBebida({
    nombre: '', tipo: '', base: '', tags: '',
    alcohol: '', precio: '', imagen: '', descripcion: ''
  })
}


const handleEditar = async () => {
  const bebidaData = {
    ...bebidaEditando,
    tags: typeof bebidaEditando.tags === 'string'
      ? bebidaEditando.tags.split(',').map((t) => t.trim())
      : bebidaEditando.tags
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}/bebidas/${bebidaEditando._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bebidaData)
  })

  const actualizada = await res.json()
  setBebidas(bebidas.map((b) => b._id === actualizada._id ? actualizada : b))
  setBebidaEditando(null)
}

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-yellow-400 animate-pulse">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold">Panel Admin</h1>
            <p className="text-gray-500 text-sm">Ruso Bar</p>
          </div>
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-xl text-sm hover:bg-yellow-300 transition-colors"
            >
            {mostrarFormulario ? 'Cancelar' : '+ Nueva bebida'}
            </button>
          <button
            onClick={handleLogout}
            className="text-red-400 border border-red-400/30 px-4 py-2 rounded-xl text-sm hover:bg-red-400/10 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

{mostrarFormulario && (
  <div className="bg-gray-900 rounded-3xl border border-yellow-500/10 p-6 mb-6">
    <h2 className="text-white font-bold text-lg mb-4">Nueva bebida</h2>
    <div className="grid grid-cols-2 gap-4">
      {['nombre', 'tipo', 'base', 'alcohol', 'precio'].map((campo) => (
        <input
          key={campo}
          type="text"
          placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
          value={nuevaBebida[campo]}
          onChange={(e) => setNuevaBebida({ ...nuevaBebida, [campo]: e.target.value })}
          className="bg-gray-800 text-white border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 transition-colors"
        />
      ))}
      <input
        type="text"
        placeholder="Tags (separados por coma)"
        value={nuevaBebida.tags}
        onChange={(e) => setNuevaBebida({ ...nuevaBebida, tags: e.target.value })}
        className="bg-gray-800 text-white border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 transition-colors"
      />
      <textarea
        placeholder="Descripción"
        value={nuevaBebida.descripcion}
        onChange={(e) => setNuevaBebida({ ...nuevaBebida, descripcion: e.target.value })}
        className="bg-gray-800 text-white border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 transition-colors"
      />
      <ImageUploader
        onUpload={(url) => setNuevaBebida({ ...nuevaBebida, imagen: url })}
        />
    </div>
    <button
      onClick={handleCrear}
      className="mt-4 bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors"
    >
      Crear bebida
    </button>
  </div>
)}

{bebidaEditando && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6">
    <div className="bg-gray-900 rounded-3xl border border-yellow-500/10 p-6 w-full max-w-lg">
      <h2 className="text-white font-bold text-lg mb-4">Editar bebida</h2>
      <div className="grid grid-cols-2 gap-4">
        {['nombre', 'tipo', 'base', 'alcohol', 'precio'].map((campo) => (
          <input
            key={campo}
            type="text"
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            value={bebidaEditando[campo]}
            onChange={(e) => setBebidaEditando({ ...bebidaEditando, [campo]: e.target.value })}
            className="bg-gray-800 text-white border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 transition-colors"
          />
        ))}
        <input
          type="text"
          placeholder="Tags (separados por coma)"
          value={bebidaEditando.tags}
          onChange={(e) => setBebidaEditando({ ...bebidaEditando, tags: e.target.value })}
          className="bg-gray-800 text-white border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 transition-colors"
        />
        <textarea
          placeholder="Descripción"
          value={bebidaEditando.descripcion}
          onChange={(e) => setBebidaEditando({ ...bebidaEditando, descripcion: e.target.value })}
          className="bg-gray-800 text-white border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 transition-colors col-span-2"
        />
        <ImageUploader
          onUpload={(url) => setBebidaEditando({ ...bebidaEditando, imagen: url })}
        />
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleEditar}
          className="flex-1 bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl hover:bg-yellow-300 transition-colors"
        >
          Guardar cambios
        </button>
        <button
          onClick={() => setBebidaEditando(null)}
          className="flex-1 border border-white/10 text-gray-400 py-3 rounded-xl hover:bg-white/5 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}

        <div className="bg-gray-900 rounded-3xl border border-yellow-500/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-gray-500 text-xs uppercase tracking-widest px-6 py-4">Nombre</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-widest px-6 py-4">Tipo</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-widest px-6 py-4">Precio</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-widest px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bebidas.map((bebida) => (
                <tr key={bebida._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{bebida.nombre}</td>
                  <td className="px-6 py-4 text-gray-400 capitalize">{bebida.tipo}</td>
                  <td className="px-6 py-4 text-yellow-400 font-bold">${bebida.precio}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setBebidaEditando({
                            ...bebida,
                            tags: bebida.tags.join(', ')
                        })}
                        className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg hover:bg-blue-500/20 transition-colors"
                        >
                        Editar
                        </button>
                      <button
                        onClick={() => handleEliminar(bebida._id)}
                        className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Admin
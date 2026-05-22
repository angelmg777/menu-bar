import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import BebidaCard from '../components/BebidaCard'

function BebidaDetalle() {
  const { id } = useParams()
  const [bebida, setBebida] = useState(null)
  const [relacionadas, setRelacionadas] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/bebidas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBebida(data)
        setCargando(false)
      })
  }, [id])

  useEffect(() => {
    if (!bebida) return
    fetch(`${import.meta.env.VITE_API_URL}/bebidas`)
      .then((res) => res.json())
      .then((data) => {
        const filtradas = data.filter(
          (b) => b.tipo === bebida.tipo && b._id !== bebida._id
        )
        setRelacionadas(filtradas)
      })
  }, [bebida])

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-yellow-400 animate-pulse text-xl">Cargando...</p>
      </div>
    )
  }

  if (!bebida) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-white text-xl">Bebida no encontrada</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">

      <Link to="/" className="text-yellow-400/70 text-sm hover:text-yellow-400 transition-colors mb-8 inline-block">
        ← Volver al menú
      </Link>

      <div className="max-w-2xl mx-auto">

        <div className="bg-gray-900 rounded-3xl overflow-hidden border border-yellow-500/10 shadow-2xl">

          <div className="relative">
            <img
              src={bebida.imagen}
              alt={bebida.nombre}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <span className="absolute top-4 left-4 bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full border border-yellow-500/30 uppercase tracking-widest">
              {bebida.tipo}
            </span>
            <span className="absolute top-4 right-4 bg-yellow-400 text-gray-900 font-bold text-xl px-4 py-2 rounded-2xl">
              ${bebida.precio}
            </span>
          </div>

          <div className="p-6">

            <div className="mb-4">
              <h1 className="text-white text-3xl font-bold mb-1">{bebida.nombre}</h1>
              <p className="text-gray-500 text-sm capitalize">{bebida.base}</p>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {bebida.descripcion}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {bebida.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-teal-500/10 text-teal-400 px-4 py-1.5 rounded-full border border-teal-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-800 rounded-2xl p-4 text-center border border-white/5">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Tipo</p>
                <p className="text-white font-bold capitalize text-sm">{bebida.tipo}</p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-4 text-center border border-white/5">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Base</p>
                <p className="text-white font-bold capitalize text-sm">{bebida.base}</p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-4 text-center border border-white/5">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Alcohol</p>
                <p className="text-white font-bold text-sm">{bebida.alcohol}%</p>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span className="uppercase tracking-widest">Nivel de alcohol</span>
                <span>{bebida.alcohol}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(bebida.alcohol * 2.5, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>Suave</span>
                <span>Fuerte</span>
              </div>
            </div>

          </div>
        </div>

        {relacionadas.length > 0 && (
          <div className="mt-10">
            <h2 className="text-white text-xl font-bold mb-4">
              También te puede gustar
            </h2>
            <div className="flex flex-wrap gap-4">
              {relacionadas.map((b) => (
                <BebidaCard key={b._id} bebida={b} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default BebidaDetalle
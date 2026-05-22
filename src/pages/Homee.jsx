import { useState, useEffect } from 'react'
import BebidaCard from '../components/BebidaCard'

function Home() {
  const [bebidas, setBebidas] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [tipoActivo, setTipoActivo] = useState('todos')
  const [tagActivo, setTagActivo] = useState('todos')
  const [cargando, setCargando] = useState(true)
  const [contador, setContador] = useState(0)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/bebidas`)
      .then((res) => res.json())
      .then((data) => {
        setBebidas(data)
        setCargando(false)
        let i = 0
        const intervalo = setInterval(() => {
          i++
          setContador(i)
          if (i >= data.length) clearInterval(intervalo)
        }, 100)
      })
  }, [])

  const todosLosTags = ['todos', ...new Set(bebidas.flatMap((b) => b.tags))]
  const todosLosTipos = ['todos', ...new Set(bebidas.map((b) => b.tipo))]

  const bebidasFiltradas = bebidas
    .filter((b) => b.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    .filter((b) => tipoActivo === 'todos' ? true : b.tipo === tipoActivo)
    .filter((b) => tagActivo === 'todos' ? true : b.tags.includes(tagActivo))

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-yellow-400 animate-pulse text-xl tracking-widest">Cargando menú...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">

      {/* Hero con gradiente animado */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, #854d0e 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #065f46 0%, transparent 60%), radial-gradient(ellipse at 60% 80%, #1e3a5f 0%, transparent 60%)',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />
        <div className="relative px-6 py-20 text-center">
          <p className="text-yellow-400/60 tracking-[0.3em] text-xs uppercase mb-4">
            Bienvenido a
          </p>
          <h1 className="text-white text-6xl font-black tracking-tight mb-2">
            Ruso <span className="text-yellow-400">Bar</span>
          </h1>
          <p className="text-gray-500 text-sm tracking-widest mb-10">
            Cocktails & Experiencias
          </p>

          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-6 py-3">
            <span className="text-yellow-400 text-2xl font-black">{contador}</span>
            <span className="text-yellow-400/60 text-sm">bebidas disponibles</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-10 max-w-6xl mx-auto">

        {/* Buscador */}
        <div className="relative mb-8">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Busca tu bebida favorita..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-gray-900 text-white border border-yellow-500/10 rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-yellow-500/40 transition-all text-sm placeholder-gray-600"
          />
        </div>

        {/* Filtros por tipo */}
        <div className="mb-4">
          <p className="text-gray-600 text-xs uppercase tracking-widest mb-3">Tipo</p>
          <div className="flex flex-wrap gap-2">
            {todosLosTipos.map((tipo) => (
              <button
                key={tipo}
                onClick={() => setTipoActivo(tipo)}
                className={`px-4 py-2 rounded-full text-sm border transition-all capitalize ${
                  tipoActivo === tipo
                    ? 'bg-yellow-400 text-gray-900 border-yellow-400 font-bold'
                    : 'bg-transparent text-yellow-400 border-yellow-500/20 hover:border-yellow-500/50'
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>

        {/* Filtros por tag */}
        <div className="mb-10">
          <p className="text-gray-600 text-xs uppercase tracking-widest mb-3">Sabor</p>
          <div className="flex flex-wrap gap-2">
            {todosLosTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setTagActivo(tag)}
                className={`px-4 py-2 rounded-full text-sm border transition-all capitalize ${
                  tagActivo === tag
                    ? 'bg-teal-400 text-gray-900 border-teal-400 font-bold'
                    : 'bg-transparent text-teal-400 border-teal-500/20 hover:border-teal-500/50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Resultado */}
        {bebidasFiltradas.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🍹</p>
            <p className="text-gray-500">No encontramos bebidas con ese filtro</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-6">
              {bebidasFiltradas.length} bebida{bebidasFiltradas.length !== 1 ? 's' : ''}
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              {bebidasFiltradas.map((bebida) => (
                <BebidaCard key={bebida._id} bebida={bebida} />
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Home
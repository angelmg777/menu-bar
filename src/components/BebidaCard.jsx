import { Link } from 'react-router-dom'


function BebidaCard({ bebida }) {
  return (
    <Link to={`/bebida/${bebida._id}`}>

    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-yellow-500/10 hover:border-yellow-500/40 hover:scale-105 transition-all duration-300 cursor-pointer w-64">
      
      <div className="relative h-48 overflow-hidden">
        <img
          src={bebida.imagen}
          alt={bebida.nombre}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <span className="absolute top-3 right-3 bg-gray-950 text-yellow-400 text-xs px-3 py-1 rounded-full border border-yellow-500/40 font-medium shadow-lg">
          {bebida.tipo}
        </span>
      </div>

      <div className="p-4">
        <h2 className="text-white font-bold text-lg mb-1">{bebida.nombre}</h2>
        <p className="text-gray-400 text-sm mb-3">{bebida.base}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {bebida.tags.map((tag) => (
            <span key={tag} className="text-xs bg-teal-500/10 text-teal-400 px-2 py-1 rounded-full border border-teal-500/20">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-yellow-400 font-bold text-xl">${bebida.precio}</span>
          <span className="text-gray-500 text-xs">{bebida.alcohol}% alc.</span>
        </div>
      </div>

    </div>
    </Link>
  )
}

export default BebidaCard
import { useState } from 'react'

function ImageUploader({ onUpload }) {
  const [subiendo, setSubiendo] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleArchivo = async (e) => {
    const archivo = e.target.files[0]
    if (!archivo) return

    setPreview(URL.createObjectURL(archivo))
    setSubiendo(true)

    const formData = new FormData()
    formData.append('file', archivo)
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    )

    const data = await res.json()
    onUpload(data.secure_url)
    setSubiendo(false)
  }

  return (
    <div className="col-span-2">
      <label className="block w-full cursor-pointer">
        <div className="bg-gray-800 border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-yellow-500/30 transition-colors">
          {preview ? (
            <img src={preview} className="w-full h-40 object-cover rounded-lg mb-2" />
          ) : (
            <p className="text-gray-500 text-sm">📸 Haz clic para subir una imagen</p>
          )}
          {subiendo && <p className="text-yellow-400 text-xs mt-2 animate-pulse">Subiendo imagen...</p>}
        </div>
        <input type="file" accept="image/*" onChange={handleArchivo} className="hidden" />
      </label>
    </div>
  )
}

export default ImageUploader
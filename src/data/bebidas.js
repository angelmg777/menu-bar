import margarita from "../assets/margarita.jpg"
import michelada from "../assets/michelada.jpg"
import suero from "../assets/suero.jpeg"

const bebidas = [
  {
    id: 1,
    nombre: "Margarita",
    tipo: "cocktail",
    base: "tequila",
    tags: ["ácido", "salado"],
    alcohol: 15,
    precio: 120,
    imagen: margarita,
    descripcion: "Clásico cocktail mexicano con tequila, triple sec y jugo de limón."
  },
  {
    id: 2,
    nombre: "Michelada",
    tipo: "cerveza",
    base: "malta",
    tags: ["ácido", "salado", "picoso"],
    alcohol: 5,
    precio: 90,
    imagen: michelada,
    descripcion: "Clásico cocktail mexicano con jugo de tomate, y salsas negras"
  },
  {
    id: 3,
    nombre: "Suero",
    tipo: "cocktail",
    base: "vodka",
    tags: ["dulce"],
    alcohol: 20,
    precio: 100,
    imagen: suero,
    descripcion: "Cocktel de vodka con suero y bebida energizante"
  },
  

]

export default bebidas
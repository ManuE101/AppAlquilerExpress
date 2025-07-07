"use client";

import { eliminarInmueble , editarInmueble } from "../utils/inmuebles_fetch";

export default function CardInmuebleSimple({ inmueble , onEliminar, onEditar }) {

  const handleEliminar = async () => {
    try {
      const response = await eliminarInmueble(inmueble.id);
      alert("Inmueble eliminado correctamente");
      onEliminar(inmueble._id); // Llama a la función onEliminar pasada como prop
     }
    catch (error) {
      console.error("Error al eliminar el inmueble:", error);
    }}

  

  return (
     <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-4/5 ">
      <h2 className="text-xl font-bold mb-2">{inmueble.titulo}</h2>
      <p className="text-gray-700 mb-2">{inmueble.descripcion}</p>
      <p className="text-gray-500">Precio: ${inmueble.precio}</p>
      <p className="text-gray-500">Ubicación: {inmueble.ubicacion}</p>
      <p className="text-gray-500">Tipo: {inmueble.tipo}</p>
       <div className="flex flex-row gap-2 items-start justify-end">
      <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded" onClick={handleEliminar}> Eliminar Inmueble</button>
      <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded" onClick={() => onEditar(inmueble)}> Editar Inmueble</button>
      </div>
    </div>
  );
}
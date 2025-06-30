export default function CardInmuebleSimple({ inmueble }) {
  return (
     <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-4/5 ">
      <h2 className="text-xl font-bold mb-2">{inmueble.titulo}</h2>
      <p className="text-gray-700 mb-2">{inmueble.descripcion}</p>
      <p className="text-gray-500">Precio: ${inmueble.precio}</p>
      <p className="text-gray-500">Ubicación: {inmueble.ubicacion}</p>
      <p className="text-gray-500">Tipo: {inmueble.tipo}</p>
       <div className="flex flex-row gap-2 items-start justify-end">
      <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded"> Eliminar Inmueble</button>
      <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded"> Editar Inmueble</button>
      </div>
    </div>
  );
}
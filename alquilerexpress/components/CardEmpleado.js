"use client";
import { useState } from "react";
import { eliminarEmpleado} from "../utils/user_fetchs";

export default function CardEmpleado({ empleado, onEliminado , onEditar }) {
  const [fading, setFading] = useState(false);

  async function handleEliminar() {
    setFading(true); 
      try {
        const res = await eliminarEmpleado(empleado._id);
        if (res) {
          onEliminado(empleado._id); // Elimina del estado y muestra el cartel en el padre
        }
      } catch (error) {
        setFading(false); // Si falla, vuelve a mostrar la card
        alert("Error al eliminar el empleado. Por favor, inténtalo de nuevo más tarde.");
      }
  }

  

  return (
    <div className={`bg-white shadow-md rounded-lg p-4 mb-4 w-4/5 transition-all duration-300 ${fading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
      <h2 className="text-xl font-bold mb-2">{empleado.nombre} {empleado.apellido}</h2>
      <p className="text-gray-700 mb-2">Correo: {empleado.correo || empleado.email}</p>
      <p className="text-gray-500">Teléfono: {empleado.telefono}</p>
      <p className="text-gray-500">Rol: {empleado.rol}</p>
      <p className="text-gray-500">ID {empleado._id}</p>
      <div className="flex flex-row gap-2 items-start justify-end">
        <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded" onClick={handleEliminar}> Eliminar Empleado</button>
        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded" onClick={() => onEditar(empleado)}> Editar Empleado</button>
      </div>
    </div>
  );
}
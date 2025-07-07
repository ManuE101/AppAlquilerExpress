"use client";
import { useState } from "react";
import { eliminarEmpleado ,cambiarRol} from "../utils/user_fetchs";

export default function CardEmpleado({ empleado, onEliminado , onEditar , handleSuccessEdicion }) {
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

 async function handleCambiarRol() {
  console.log("Rol a cambiar " , empleado._id);
    try {
      const res = await cambiarRol(empleado._id);
      if (res) {
        alert(`Rol cambiado a ${res.user.rol} correctamente.`);
        handleSuccessEdicion(res.user); // Actualiza el estado del empleado con el nuevo rol
      }
    } catch (error) {
      alert("Error al cambiar el rol del empleado." + error.message);
    }
  }
  

  return (
    <div className={`bg-white shadow-md rounded-lg p-4 mb-4 w-4/5 transition-all duration-300 ${fading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
      <h2 className="text-xl font-bold mb-2">{empleado.nombre} {empleado.apellido}</h2>
      <p className="text-gray-700 mb-2">Correo: {empleado.correo || empleado.email}</p>
      <p className="text-gray-500">Teléfono: {empleado.telefono}</p>
      <div className="flex flex-row items-center justify-start w-full gap-2">
      <p className="text-gray-500">Rol: {empleado.rol}</p>
      <button onClick={handleCambiarRol} className="bg-blue-500 font-bold text-white text-xs border-1 border-black rounded p-1"> Cambiar rol</button>
      </div>
      <p className="text-gray-500">ID {empleado._id}</p>
      <div className="flex flex-row gap-2 items-start justify-end">
        <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded" onClick={handleEliminar}> Eliminar Empleado</button>
        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded" onClick={() => onEditar(empleado)}> Editar Empleado</button>
      </div>
    </div>
  );
}